// Updated applicant landing page: page-applicant.tsx
import { SiteHeader } from "@/components/site-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"; // Added for sectioned views

export default function ApplicantLandingPage() {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <SidebarInset>
        <div className="flex flex-col min-h-screen">
          <SiteHeader />
          <div className="flex-1 container mx-auto py-6">
            <h1 className="text-3xl font-bold mb-6">Welcome, Applicant!</h1>
            <p className="text-muted-foreground mb-8">
              Explore job opportunities, take personality tests, view results, and manage your profile.
            </p>
            
            {/* Updated to use Tabs for better organization of sections */}
            <Tabs defaultValue="jobs" className="space-y-4">
              <TabsList>
                <TabsTrigger value="jobs">Job Opportunities</TabsTrigger>
                <TabsTrigger value="tests">Tests & Results</TabsTrigger>
                <TabsTrigger value="profile">Profile</TabsTrigger>
              </TabsList>
              
              <TabsContent value="jobs" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Search Jobs</CardTitle>
                    <CardDescription>Browse available positions and apply with a personality test.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {/* Placeholder for job list - will fetch from API later */}
                    <div className="text-muted-foreground mb-4">Job listings will appear here.</div>
                    <Button>Start Searching</Button>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Application Tracker</CardTitle>
                    <CardDescription>Track your submitted applications and status.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {/* Placeholder for tracker list */}
                    <div className="text-muted-foreground mb-4">Your applications will be listed here.</div>
                    <Button>View Tracker</Button>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="tests" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Pending Tests</CardTitle>
                    <CardDescription>View and take personality tests for job applications.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {/* Placeholder for pending tests list */}
                    <div className="text-muted-foreground mb-4">No pending tests. Check job listings to start one.</div>
                    <Button>Take a Test</Button> {/* Will link to test page later */}
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Submitted Results</CardTitle>
                    <CardDescription>Review your past test results.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {/* Placeholder for results list */}
                    <div className="text-muted-foreground mb-4">Your submitted results will appear here.</div>
                    <Button>View Results</Button>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="profile" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Update Profile</CardTitle>
                    <CardDescription>Keep your profile and resume up-to-date. Optionally view org-averaged results if allowed.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {/* Placeholder for profile form/edit */}
                    <div className="text-muted-foreground mb-4">Profile details and averages will load here.</div>
                    <Button>Edit Profile</Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}