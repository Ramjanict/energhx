import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CourseCard } from "../components/course-card";
import { CourseManagement } from "../components/course-management";
import { StudentList } from "../components/student-list";
import { AssignmentManagement } from "../components/assignment-management";
import { SettingsForm } from "../components/settings-form";

interface InstructorDashboardProps {
  activePage: string;
}

import course5 from "../../assets/courses/fan4.png";
export function InstructorDashboard({ activePage }: InstructorDashboardProps) {
  const renderContent = () => {
    switch (activePage) {
      case "dashboard":
        return <InstructorOverview />;
      case "courses":
        return <InstructorCourses />;
      case "course-management":
        return <CourseManagement />;
      case "assignments":
        return <AssignmentManagement />;
      case "students":
        return <StudentList />;
      case "settings":
        return <SettingsForm userRole="instructor" />;
      default:
        return <InstructorOverview />;
    }
  };

  return renderContent();
}

function InstructorOverview() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-xl lg:text-3xl font-bold tracking-tight">
          Instructor Dashboard
        </h1>
        <p className="text-muted-foreground">
          Welcome back, Dr. Miller! Here's an overview of your teaching
          activities.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Courses
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">
              2 in progress, 1 upcoming
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Students
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87</div>
            <p className="text-xs text-muted-foreground">+12 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pending Assignments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">Needs grading</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Average Rating
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.8/5</div>
            <p className="text-xs text-muted-foreground">Based on 56 reviews</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Your Courses</CardTitle>
            <CardDescription>Courses you're currently teaching</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { title: "Introduction to React", students: 42, progress: 65 },
                {
                  title: "Advanced React Patterns",
                  students: 28,
                  progress: 40,
                },
                {
                  title: "Web Development Fundamentals",
                  students: 17,
                  progress: 85,
                },
              ].map((course, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between">
                    <div className="font-medium">{course.title}</div>
                    <div className="text-sm text-muted-foreground">
                      {course.students} students
                    </div>
                  </div>
                  <Progress value={course.progress} className="h-2" />
                  <div className="text-xs text-muted-foreground text-right">
                    {course.progress}% completed
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest teaching activities</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {[
                {
                  action: "Graded assignment",
                  item: "React Hooks Quiz",
                  student: "Alex Johnson",
                  time: "2 hours ago",
                },
                {
                  action: "Added new lesson",
                  item: "Advanced Component Patterns",
                  course: "Introduction to React",
                  time: "Yesterday",
                },
                {
                  action: "Responded to question",
                  item: "State Management",
                  student: "Emma Davis",
                  time: "2 days ago",
                },
                {
                  action: "Updated course material",
                  item: "Web Development Fundamentals",
                  section: "CSS Grid",
                  time: "3 days ago",
                },
              ].map((item, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center border-b pb-2 last:border-0"
                >
                  <div>
                    <p className="font-medium">{item.action}</p>
                    <p className="text-sm text-muted-foreground">
                      {item.item} {item.student ? `- ${item.student}` : ""}{" "}
                      {item.course ? `- ${item.course}` : ""}
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
          <CardTitle>Upcoming Deadlines</CardTitle>
          <CardDescription>Assignment and course deadlines</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {[
              {
                title: "React Components Quiz",
                course: "Introduction to React",
                date: "May 10, 2025",
                type: "Assignment Due",
              },
              {
                title: "TypeScript Project",
                course: "Advanced TypeScript",
                date: "May 15, 2025",
                type: "Assignment Due",
              },
              {
                title: "Final Exam",
                course: "Introduction to React",
                date: "May 20, 2025",
                type: "Exam",
              },
              {
                title: "Course Review",
                course: "Web Development Fundamentals",
                date: "May 25, 2025",
                type: "Administrative",
              },
            ].map((item, index) => (
              <li
                key={index}
                className="flex justify-between items-center border-b pb-2 last:border-0"
              >
                <div>
                  <p className="font-medium">{item.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {item.course} - {item.type}
                  </p>
                </div>
                <span className="text-sm">{item.date}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}

function InstructorCourses() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">My Courses</h1>
        <p className="text-muted-foreground">Manage your teaching courses</p>
      </div>

      <Tabs defaultValue="active" className="space-y-4">
        <TabsList>
          <TabsTrigger value="active">Active Courses</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="archived">Archived</TabsTrigger>
        </TabsList>
        <TabsContent value="active" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <CourseCard
              title="Introduction to React"
              instructor="Dr. Sarah Miller"
              students={42}
              image={course5}
              lessons={12}
              duration="6 weeks"
              isInstructor
            />
            <CourseCard
              title="Advanced React Patterns"
              instructor="Dr. Sarah Miller"
              students={28}
              image={course5}
              lessons={8}
              duration="4 weeks"
              isInstructor
            />
            <CourseCard
              title="Web Development Fundamentals"
              instructor="Dr. Sarah Miller"
              students={17}
              image={course5}
              lessons={15}
              duration="8 weeks"
              isInstructor
            />
          </div>
        </TabsContent>
        <TabsContent value="upcoming" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <CourseCard
              title="React Native Essentials"
              instructor="Dr. Sarah Miller"
              students={0}
              image={course5}
              lessons={10}
              duration="6 weeks"
              isInstructor
              status="draft"
            />
          </div>
        </TabsContent>
        <TabsContent value="archived" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <CourseCard
              title="JavaScript for Beginners"
              instructor="Dr. Sarah Miller"
              students={35}
              image={course5}
              lessons={10}
              duration="5 weeks"
              isInstructor
              status="archived"
            />
            <CourseCard
              title="CSS Masterclass"
              instructor="Dr. Sarah Miller"
              students={22}
              image={course5}
              lessons={8}
              duration="4 weeks"
              isInstructor
              status="archived"
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
