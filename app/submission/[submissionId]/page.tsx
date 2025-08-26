import { getSubmissionById } from "@/server/actions";
import { Suspense } from "react";
import SubmissionClient from "./submission-client";

export default async function SubmissionPage({ params }: { params: { submissionId: string } }) {
  const submission = await getSubmissionById(params.submissionId);
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SubmissionClient submission={submission} />
    </Suspense>
  );
}