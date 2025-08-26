import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/db/drizzle";
import * as s from "@/db/schema";
import { v4 as uuidv4 } from "uuid";

export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: request.headers });
    if (!session || session.user.role !== "recruiter") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const traits = body?.traits as (typeof s.personalityTraitEnum.enumValues)[number][];
    const questions = body?.questions as Array<{ text: string; type: "likert" | "mcq"; options?: string[] }>;

    if (!Array.isArray(traits) || traits.length === 0) {
      return NextResponse.json({ error: "Traits required" }, { status: 400 });
    }
    if (!Array.isArray(questions) || questions.length === 0) {
      return NextResponse.json({ error: "At least one question required" }, { status: 400 });
    }

    const testId = uuidv4();
    await db.insert(s.tests).values({
      id: testId,
      recruiterId: session.user.id,
      traits,
      questions,
    });

    return NextResponse.json({ testId });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}


