import { SiteHeader } from "@/components/site-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { getApplicantSubmissions } from "@/server/actions";
import Link from "next/link";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default async function ApplicantLandingPage() {
  const submissions = await getApplicantSubmissions();

  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex-1 container mx-auto py-6">
          <h1 className="text-3xl font-bold mb-6">Applicant Dashboard</h1>
          <Card>
            <CardHeader>
              <CardTitle>Your Submitted Tests</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Recruiter Name</TableHead>
                    <TableHead>Organization</TableHead>
                    <TableHead>Submission Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {submissions.map((sub) => (
                    <TableRow key={sub.submissionId}>
                      <TableCell>{sub.recruiterName}</TableCell>
                      <TableCell>{sub.recruiterOrg}</TableCell>
                      <TableCell>{sub.submittedAt.toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Button variant="outline" asChild>
                          <Link href={`/submission/${sub.submissionId}`}>View</Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                  {submissions.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center">No submissions yet</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}