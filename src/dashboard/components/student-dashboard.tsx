import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "../../components/ui/progress";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import { CourseCard } from "../components/course-card";
import { VideoModule } from "../components/video-module";
import { AssignmentList } from "../components/assignment-list";
import { CertificateCard } from "../components/certificate-card";
import { MessageList } from "../components/message-list";
import { SettingsForm } from "../components/settings-form";

import course from "../../assets/courses/fan.png";
import course1 from "../../assets/courses/fan1.png";
import course3 from "../../assets/courses/fan2.png";
import course4 from "../../assets/courses/fan3.png";
import course5 from "../../assets/courses/fan4.png";
interface StudentDashboardProps {
  activePage: string;
}

export function StudentDashboard({ activePage }: StudentDashboardProps) {
  const renderContent = () => {
    switch (activePage) {
      case "dashboard":
        return <StudentOverview />;
      case "courses":
        return <StudentCourses />;
      case "videos":
        return <StudentVideos />;
      case "assignments":
        return <StudentAssignments />;
      case "certificates":
        return <StudentCertificates />;

      case "messages":
        return <MessageList />;
      case "settings":
        return <SettingsForm userRole="student" />;
      default:
        return <StudentOverview />;
    }
  };

  return renderContent();
}

function StudentOverview() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-xl lg:text-3xl font-bold tracking-tight">
          Student Dashboard
        </h1>
        <p className="text-muted-foreground">
          Welcome back, Alex! Here's an overview of your learning progress.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Enrolled Courses
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">
              2 in progress, 2 completed
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Assignments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7</div>
            <p className="text-xs text-muted-foreground">
              3 pending, 4 completed
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Certificates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">2 courses completed</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Overall Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <div className="text-2xl font-bold">68%</div>
              <Progress value={68} className="h-2" />
            </div>
            <p className="text-xs text-muted-foreground">
              +12% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="in-progress" className="space-y-4">
        <TabsList>
          <TabsTrigger value="in-progress">In Progress</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="recommended">Recommended</TabsTrigger>
        </TabsList>
        <TabsContent value="in-progress" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <CourseCard
              title="Introduction to React"
              instructor="Dr. Sarah Miller"
              progress={75}
              image={course}
              lessons={12}
              duration="6 weeks"
            />
            <CourseCard
              title="Advanced TypeScript"
              instructor="Prof. James Wilson"
              progress={45}
              image={course1}
              lessons={10}
              duration="8 weeks"
            />
          </div>
        </TabsContent>
        <TabsContent value="completed" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <CourseCard
              title="HTML & CSS Fundamentals"
              instructor="Lisa Chen"
              progress={100}
              image={course}
              lessons={8}
              duration="4 weeks"
              completed
            />
            <CourseCard
              title="JavaScript Basics"
              instructor="Michael Brown"
              progress={100}
              image={course1}
              lessons={10}
              duration="5 weeks"
              completed
            />
          </div>
        </TabsContent>
        <TabsContent value="recommended" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <CourseCard
              title="Node.js Fundamentals"
              instructor="David Thompson"
              image={course4}
              lessons={14}
              duration="8 weeks"
            />
            <CourseCard
              title="Full Stack Development"
              instructor="Emma Rodriguez"
              image={course3}
              lessons={20}
              duration="12 weeks"
            />
            <CourseCard
              title="UI/UX Design Principles"
              instructor="Jason Lee"
              image={course4}
              lessons={12}
              duration="6 weeks"
            />
          </div>
        </TabsContent>
      </Tabs>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Deadlines</CardTitle>
            <CardDescription>
              Your pending assignments and exams
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {[
                {
                  title: "React Components Quiz",
                  course: "Introduction to React",
                  date: "May 10, 2025",
                },
                {
                  title: "TypeScript Project",
                  course: "Advanced TypeScript",
                  date: "May 15, 2025",
                },
                {
                  title: "Final Exam",
                  course: "Introduction to React",
                  date: "May 20, 2025",
                },
              ].map((item, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center border-b pb-2 last:border-0"
                >
                  <div>
                    <p className="font-medium">{item.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {item.course}
                    </p>
                  </div>
                  <span className="text-sm">{item.date}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest learning activities</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {[
                {
                  action: "Completed lesson",
                  item: "React Hooks",
                  time: "2 hours ago",
                },
                {
                  action: "Submitted assignment",
                  item: "TypeScript Interfaces",
                  time: "Yesterday",
                },
                {
                  action: "Watched video",
                  item: "Component Lifecycle",
                  time: "2 days ago",
                },
                {
                  action: "Earned certificate",
                  item: "JavaScript Basics",
                  time: "1 week ago",
                },
              ].map((item, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center border-b pb-2 last:border-0"
                >
                  <div>
                    <p className="font-medium">{item.action}</p>
                    <p className="text-sm text-muted-foreground">{item.item}</p>
                  </div>
                  <span className="text-sm">{item.time}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function StudentCourses() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">My Courses</h1>
        <p className="text-muted-foreground">
          Manage and explore your enrolled courses
        </p>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Courses</TabsTrigger>
          <TabsTrigger value="in-progress">In Progress</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <CourseCard
              title="Introduction to React"
              instructor="Dr. Sarah Miller"
              progress={75}
              image={course1}
              lessons={12}
              duration="6 weeks"
            />
            <CourseCard
              title="Advanced TypeScript"
              instructor="Prof. James Wilson"
              progress={45}
              image={course5}
              lessons={10}
              duration="8 weeks"
            />
            <CourseCard
              title="HTML & CSS Fundamentals"
              instructor="Lisa Chen"
              progress={100}
              image={course1}
              lessons={8}
              duration="4 weeks"
              completed
            />
            <CourseCard
              title="JavaScript Basics"
              instructor="Michael Brown"
              progress={100}
              image={course5}
              lessons={10}
              duration="5 weeks"
              completed
            />
          </div>
        </TabsContent>
        <TabsContent value="in-progress" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <CourseCard
              title="Introduction to React"
              instructor="Dr. Sarah Miller"
              progress={75}
              image={course1}
              lessons={12}
              duration="6 weeks"
            />
            <CourseCard
              title="Advanced TypeScript"
              instructor="Prof. James Wilson"
              progress={45}
              image={course3}
              lessons={10}
              duration="8 weeks"
            />
          </div>
        </TabsContent>
        <TabsContent value="completed" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <CourseCard
              title="HTML & CSS Fundamentals"
              instructor="Lisa Chen"
              progress={100}
              image={course3}
              lessons={8}
              duration="4 weeks"
              completed
            />
            <CourseCard
              title="JavaScript Basics"
              instructor="Michael Brown"
              progress={100}
              image={course3}
              lessons={10}
              duration="5 weeks"
              completed
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function StudentVideos() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Video Modules</h1>
        <p className="text-muted-foreground">
          Access your course video content
        </p>
      </div>

      <div className="grid gap-6">
        <VideoModule
          title="React Hooks Explained"
          course="Introduction to React"
          duration="45 minutes"
          thumbnail={course5}
          progress={80}
        />
        <VideoModule
          title="Building Components"
          course="Introduction to React"
          duration="38 minutes"
          thumbnail={course5}
          progress={100}
        />
        <VideoModule
          title="TypeScript Interfaces"
          course="Advanced TypeScript"
          duration="52 minutes"
          thumbnail={course5}
          progress={60}
        />
        <VideoModule
          title="Advanced Types"
          course="Advanced TypeScript"
          duration="47 minutes"
          thumbnail={course5}
          progress={0}
        />
      </div>
    </div>
  );
}

function StudentAssignments() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Assignments</h1>
        <p className="text-muted-foreground">
          View and submit your course assignments
        </p>
      </div>

      <Tabs defaultValue="pending" className="space-y-4">
        <TabsList>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="submitted">Submitted</TabsTrigger>
          <TabsTrigger value="graded">Graded</TabsTrigger>
        </TabsList>
        <TabsContent value="pending" className="space-y-4">
          <AssignmentList
            assignments={[
              {
                title: "React Components Quiz",
                course: "Introduction to React",
                dueDate: "May 10, 2025",
                status: "pending",
              },
              {
                title: "TypeScript Project",
                course: "Advanced TypeScript",
                dueDate: "May 15, 2025",
                status: "pending",
              },
              {
                title: "Final Exam",
                course: "Introduction to React",
                dueDate: "May 20, 2025",
                status: "pending",
              },
            ]}
          />
        </TabsContent>
        <TabsContent value="submitted" className="space-y-4">
          <AssignmentList
            assignments={[
              {
                title: "React State Management",
                course: "Introduction to React",
                dueDate: "April 28, 2025",
                submittedDate: "April 27, 2025",
                status: "submitted",
              },
              {
                title: "TypeScript Basics",
                course: "Advanced TypeScript",
                dueDate: "April 20, 2025",
                submittedDate: "April 19, 2025",
                status: "submitted",
              },
            ]}
          />
        </TabsContent>
        <TabsContent value="graded" className="space-y-4">
          <AssignmentList
            assignments={[
              {
                title: "React Introduction",
                course: "Introduction to React",
                dueDate: "April 10, 2025",
                submittedDate: "April 9, 2025",
                grade: "A",
                feedback:
                  "Excellent work! Your understanding of React fundamentals is solid.",
                status: "graded",
              },
              {
                title: "JavaScript Functions",
                course: "JavaScript Basics",
                dueDate: "March 25, 2025",
                submittedDate: "March 24, 2025",
                grade: "B+",
                feedback: "Good job. Work on optimizing your code a bit more.",
                status: "graded",
              },
            ]}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function StudentCertificates() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">My Certificates</h1>
        <p className="text-muted-foreground">
          View and download your earned certificates
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <CertificateCard
          title="JavaScript Basics"
          issueDate="April 15, 2025"
          instructor="Michael Brown"
          image={course3}
        />
        <CertificateCard
          title="HTML & CSS Fundamentals"
          issueDate="March 10, 2025"
          instructor="Lisa Chen"
          image={course3}
        />
      </div>
    </div>
  );
}
