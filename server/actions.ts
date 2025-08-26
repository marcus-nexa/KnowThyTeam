"use server";

import { db } from "@/db/drizzle";
import * as s from "@/db/schema"; // Alias for schema
import { and, eq } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { cookies, headers } from "next/headers";
import { v4 as uuidv4 } from "uuid";
import { revalidatePath } from "next/cache";

// Create test (recruiter only)
export async function createTest(
  traits: (typeof s.personalityTraitEnum.enumValues)[number][],
  questions: Array<{ text: string; type: "likert" | "mcq"; options?: string[] }>
) {
  const hdrs = (await headers()) as unknown as Headers;
  const session = await auth.api.getSession({ headers: hdrs });
  if (!session || session.user.role !== "recruiter") {
    throw new Error("Unauthorized");
  }

  const testId = uuidv4();
  await db.insert(s.tests).values({
    id: testId,
    recruiterId: session.user.id,
    traits,
    questions,
  });

  revalidatePath("/dashboard");
  return { testId }; // Link will be /test/{testId}
}

// Get test by ID (for taking test)
export async function getTestById(testId: string) {
  const [test] = await db.select().from(s.tests).where(eq(s.tests.id, testId)).limit(1);
  if (!test) {
    throw new Error("Test not found");
  }

  const [recruiter] = await db.select({ name: s.user.name, org: s.user.org }).from(s.user).where(eq(s.user.id, test.recruiterId));
  return { ...test, recruiterName: recruiter?.name, recruiterOrg: recruiter?.org };
}

// Submit answers (guest or auth)
export async function submitAnswers(testId: string, answers: Record<string, string>) {
  const hdrs = (await headers()) as unknown as Headers;
  const session = await auth.api.getSession({ headers: hdrs });
  let guestId: string | undefined;
  let applicantId: string | undefined;

  if (session && session.user.role === "applicant") {
    applicantId = session.user.id;
  } else {
    guestId = uuidv4();
    const ck = (await cookies()) as unknown as {
      set: (name: string, value: string, opts?: { path?: string; maxAge?: number }) => void;
    };
    ck.set("guestId", guestId, { path: "/", maxAge: 3600 }); // 1 hour
  }

  const submissionId = uuidv4();
  await db.insert(s.submissions).values({
    id: submissionId,
    testId,
    applicantId,
    guestId,
    answers,
  });

  return { submissionId, isGuest: !!guestId };
}

// Claim guest submission (post-auth)
export async function claimGuestSubmission(submissionId: string) {
  const hdrs = (await headers()) as unknown as Headers;
  const session = await auth.api.getSession({ headers: hdrs });
  if (!session || session.user.role !== "applicant") {
    throw new Error("Unauthorized");
  }

  const ck = (await cookies()) as unknown as { get: (name: string) => { name: string; value: string } | undefined; delete: (name: string) => void };
  const guestId = ck.get("guestId")?.value as string | undefined;
  if (!guestId) {
    throw new Error("No guest session");
  }

  await db
    .update(s.submissions)
    .set({ applicantId: session.user.id, guestId: null })
    .where(and(eq(s.submissions.id, submissionId), eq(s.submissions.guestId, guestId)));

  ck.delete("guestId");
  revalidatePath("/applicant-landing");
}

// Get recruiter's submissions
export async function getRecruiterSubmissions() {
  const hdrs = (await headers()) as unknown as Headers;
  const session = await auth.api.getSession({ headers: hdrs });
  if (!session || session.user.role !== "recruiter") {
    throw new Error("Unauthorized");
  }

  const subs = await db
    .select({
      submissionId: s.submissions.id,
      applicantName: s.user.name,
      org: s.user.org, // Recruiter's org, but since it's per test, maybe fetch from test
      submittedAt: s.submissions.submittedAt,
      testId: s.submissions.testId,
    })
    .from(s.submissions)
    .leftJoin(s.user, eq(s.submissions.applicantId, s.user.id))
    .leftJoin(s.tests, eq(s.submissions.testId, s.tests.id))
    .where(eq(s.tests.recruiterId, session.user.id))
    .orderBy(s.submissions.submittedAt);

  return subs;
}

// Get applicant's submissions
export async function getApplicantSubmissions() {
  const hdrs = (await headers()) as unknown as Headers;
  const session = await auth.api.getSession({ headers: hdrs });
  if (!session || session.user.role !== "applicant") {
    throw new Error("Unauthorized");
  }

  const subs = await db
    .select({
      submissionId: s.submissions.id,
      recruiterName: s.user.name,
      recruiterOrg: s.user.org,
      submittedAt: s.submissions.submittedAt,
      testId: s.submissions.testId,
    })
    .from(s.submissions)
    .leftJoin(s.tests, eq(s.submissions.testId, s.tests.id))
    .leftJoin(s.user, eq(s.tests.recruiterId, s.user.id))
    .where(eq(s.submissions.applicantId, session.user.id))
    .orderBy(s.submissions.submittedAt);

  return subs;
}

// Get submission by ID (for preview/view)
export async function getSubmissionById(submissionId: string) {
  const hdrs = (await headers()) as unknown as Headers;
  const session = await auth.api.getSession({ headers: hdrs });
  if (!session) {
    throw new Error("Unauthorized");
  }

  const [sub] = await db
    .select()
    .from(s.submissions)
    .where(eq(s.submissions.id, submissionId))
    .limit(1);

  if (!sub) {
    throw new Error("Submission not found");
  }

  // Check access: recruiter owns test, or applicant owns sub
  const [test] = await db.select().from(s.tests).where(eq(s.tests.id, sub.testId));
  if (
    (session.user.role === "recruiter" && test.recruiterId !== session.user.id) ||
    (session.user.role === "applicant" && sub.applicantId !== session.user.id)
  ) {
    throw new Error("Unauthorized");
  }

  return sub;
}