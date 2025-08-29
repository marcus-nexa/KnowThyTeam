"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { claimGuestSubmission } from "@/server/actions";
import { useState } from "react";

interface Submission {
  id: string;
  answers: unknown;
}

export default function SubmissionClient({ submission }: { submission: Submission }) {
  const searchParams = useSearchParams();
  const isGuest = searchParams.get("guest") === "true";
  const [claiming, setClaiming] = useState(false);

  const handleClaim = async () => {
    try {
      setClaiming(true);
      await claimGuestSubmission(submission.id);
    } finally {
      setClaiming(false);
    }
  };

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-4">Submission Preview</h1>
      <Card>
        <CardHeader>
          <CardTitle>Your Answers</CardTitle>
        </CardHeader>
        <CardContent>
          <pre>{JSON.stringify(submission.answers, null, 2)}</pre>
          {isGuest ? (
            <div className="mt-4 space-x-2">
              <p>To save and send to recruiter, please:</p>
              <Button asChild>
                <Link href="/signup">Sign Up</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/login">Log In</Link>
              </Button>
              <Button variant="secondary" disabled={claiming} onClick={handleClaim}>
                Claim after login
              </Button>
            </div>
          ) : (
            <Button asChild>
              <Link href="/applicant-landing">Back to Dashboard</Link>
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}