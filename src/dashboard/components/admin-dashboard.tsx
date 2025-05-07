import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CourseManagement } from "../components/course-management";
import { UserManagement } from "../components/user-management";
import { SettingsForm } from "../components/settings-form";

interface AdminDashboardProps {
  activePage: string;
}

export function AdminDashboard({ activePage }: AdminDashboardProps) {
  const renderContent = () => {
    switch (activePage) {
      case "dashboard":
        return <AdminOverview />;
      case "users":
        return <UserManagement />;
      case "course-management":
        return <CourseManagement />;

      case "settings":
        return <SettingsForm userRole="admin" />;
      default:
        return <AdminOverview />;
    }
  };

  return renderContent();
}

function AdminOverview() {
  return (
    <div className="space-y-6 ">
      <div className="flex flex-col gap-2">
        <h1 className="text-xl lg:text-3xl font-bold tracking-tight">
          Admin Dashboard
        </h1>
        <p className="text-muted-foreground">
          Welcome back, Admin! Here's an overview of your platform.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Students
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,247</div>
            <p className="text-xs text-muted-foreground">
              +156 from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Courses
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42</div>
            <p className="text-xs text-muted-foreground">
              Across 12 instructors
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$24,389</div>
            <p className="text-xs text-muted-foreground">
              +12.5% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Classes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1500</div>
            <p className="text-xs text-muted-foreground">Video modules</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Platform Rating
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.7/5</div>
            <p className="text-xs text-muted-foreground">
              Based on 856 reviews
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>User Distribution</CardTitle>
            <CardDescription>Breakdown of platform users</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] flex items-center justify-center">
              <div className="w-full max-w-md grid grid-cols-3 gap-4 text-center">
                <div className="flex flex-col items-center">
                  <div className="text-3xl font-bold">1,125</div>
                  <div className="text-sm text-muted-foreground">Students</div>
                  <div className="w-full h-2 bg-muted mt-2 rounded-full overflow-hidden">
                    <div
                      className="bg-primary h-full rounded-full"
                      style={{ width: "90%" }}
                    ></div>
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="text-3xl font-bold">87</div>
                  <div className="text-sm text-muted-foreground">
                    Instructors
                  </div>
                  <div className="w-full h-2 bg-muted mt-2 rounded-full overflow-hidden">
                    <div
                      className="bg-primary h-full rounded-full"
                      style={{ width: "7%" }}
                    ></div>
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="text-3xl font-bold">35</div>
                  <div className="text-sm text-muted-foreground">Admins</div>
                  <div className="w-full h-2 bg-muted mt-2 rounded-full overflow-hidden">
                    <div
                      className="bg-primary h-full rounded-full"
                      style={{ width: "3%" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest platform activities</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {[
                {
                  action: "New user registered",
                  details: "Student: Emily Johnson",
                  time: "10 minutes ago",
                },
                {
                  action: "New course created",
                  details: "React Native Essentials by Dr. Sarah Miller",
                  time: "2 hours ago",
                },
                {
                  action: "Payment processed",
                  details: "Advanced TypeScript course - $129",
                  time: "5 hours ago",
                },
                {
                  action: "System update",
                  details: "Platform version 2.4.1 deployed",
                  time: "Yesterday",
                },
              ].map((item, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center border-b pb-2 last:border-0"
                >
                  <div>
                    <p className="font-medium">{item.action}</p>
                    <p className="text-sm text-muted-foreground">
                      {item.details}
                    </p>
                  </div>
                  <span className="text-sm">{item.time}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Platform Statistics</CardTitle>
          <CardDescription>Key metrics for the last 30 days</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-1">
              <p className="text-sm font-medium">New Enrollments</p>
              <p className="text-2xl font-bold">342</p>
              <div className="text-xs text-green-500 flex items-center">
                +18% ↑
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium">Course Completions</p>
              <p className="text-2xl font-bold">187</p>
              <div className="text-xs text-green-500 flex items-center">
                +12% ↑
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium">Average Engagement</p>
              <p className="text-2xl font-bold">4.2h</p>
              <div className="text-xs text-green-500 flex items-center">
                +5% ↑
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium">Support Tickets</p>
              <p className="text-2xl font-bold">24</p>
              <div className="text-xs text-red-500 flex items-center">
                +8% ↑
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
