import { SiteHeader } from "@/components/site-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
//
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getRecruiterSubmissions } from "@/server/actions";
import Link from "next/link";
import { AppSidebar } from "@/components/app-sidebar"; // If you want sidebar
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import TestCreationForm from "./test-creation-form";

// form schema moved to client component

export default async function DashboardPage() {
  const submissions = await getRecruiterSubmissions(); // Server fetch

  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="container mx-auto py-6">
          <h1 className="text-3xl font-bold mb-6">Recruiter Dashboard</h1>
          
          {/* Test Creation Form */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Create New Test</CardTitle>
            </CardHeader>
            <CardContent>
              <TestCreationForm />
            </CardContent>
          </Card>
          
          {/* Submissions List */}
          <Card>
            <CardHeader>
              <CardTitle>Applicant Submissions</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Applicant Name</TableHead>
                    <TableHead>Organization</TableHead>
                    <TableHead>Submission Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {submissions.map((sub) => (
                    <TableRow key={sub.submissionId}>
                      <TableCell>{sub.applicantName || "Guest"}</TableCell>
                      <TableCell>{sub.org}</TableCell>
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

// Test creation form moved to ./test-creation-form