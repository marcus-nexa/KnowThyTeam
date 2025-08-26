import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { getTestById } from "@/server/actions";
// no cookies usage here

export default async function QuickAccessPage({ params }: { params: { testId: string } }) {
  const { recruiterName, recruiterOrg } = await getTestById(params.testId);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Join the Test from {recruiterName} at {recruiterOrg}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button asChild className="w-full">
            <Link href="/signup">Sign Up</Link>
          </Button>
          <Button variant="outline" asChild className="w-full">
            <Link href="/login">Log In</Link>
          </Button>
          <Button variant="secondary" className="w-full" asChild>
            <Link href={`/test/${params.testId}`}>Continue as Guest</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}