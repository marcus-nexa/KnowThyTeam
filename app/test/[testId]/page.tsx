import { getTestById } from "@/server/actions";
import TestClient from "./test-client";

type Question = { text: string; type: "likert" | "mcq"; options?: string[] };

export default async function TestPage({ params }: { params: { testId: string } }) {
  const data = await getTestById(params.testId);
  return <TestClient testId={params.testId} questions={data.questions as Question[]} />;
}