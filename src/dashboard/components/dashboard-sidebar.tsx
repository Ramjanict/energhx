import logo from "../../assets/logo.svg";
import person from "../../assets/user.png";
import type { UserRole } from "@/lib/types";
import {
  BookOpen,
  LayoutDashboard,
  Settings,
  Users,
  Video,
  FileText,
  Award,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  SidebarTrigger,
} from "@/components/ui/sidebar";

interface DashboardSidebarProps {
  userRole: UserRole;
  activePage: string;
  setActivePage: (page: string) => void;
}

export function DashboardSidebar({
  userRole,
  activePage,
  setActivePage,
}: DashboardSidebarProps) {
  const userName =
    userRole === "student"
      ? "Alex Johnson"
      : userRole === "instructor"
      ? "Dr. Sarah Miller"
      : "Admin User";

  return (
    <Sidebar>
      <SidebarHeader className="flex flex-col gap-2 py-4">
        <div className="flex  items-center gap-2 px-4">
          <img src={logo} alt="logo" />
        </div>
        <div className="flex items-center gap-2 px-4 py-2">
          <img className="w-12 h-12 rounded-full" src={person} alt="person " />
          <div className="flex flex-col">
            <span className="text-sm font-bold">{userName}</span>
            <span className="text-xs text-muted-foreground capitalize">
              {userRole}
            </span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarSeparator />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={activePage === "dashboard"}
                  onClick={() => setActivePage("dashboard")}
                >
                  <LayoutDashboard />
                  <span>Dashboard</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={activePage === "courses"}
                  onClick={() => setActivePage("courses")}
                >
                  <BookOpen />
                  <span>Courses</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {userRole === "student" && (
          <SidebarGroup>
            <SidebarGroupLabel>Learning</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    isActive={activePage === "assignments"}
                    onClick={() => setActivePage("assignments")}
                  >
                    <FileText />
                    <span>Assignments</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    isActive={activePage === "videos"}
                    onClick={() => setActivePage("videos")}
                  >
                    <Video />
                    <span>Video Modules</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    isActive={activePage === "certificates"}
                    onClick={() => setActivePage("certificates")}
                  >
                    <Award />
                    <span>Certificates</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        {userRole === "instructor" && (
          <SidebarGroup>
            <SidebarGroupLabel>Teaching</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    isActive={activePage === "course-management"}
                    onClick={() => setActivePage("course-management")}
                  >
                    <BookOpen />
                    <span>Course Management</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    isActive={activePage === "assignments"}
                    onClick={() => setActivePage("assignments")}
                  >
                    <FileText />
                    <span>Assignments</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    isActive={activePage === "students"}
                    onClick={() => setActivePage("students")}
                  >
                    <Users />
                    <span>Students</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        {userRole === "admin" && (
          <SidebarGroup>
            <SidebarGroupLabel>Administration</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    isActive={activePage === "users"}
                    onClick={() => setActivePage("users")}
                  >
                    <Users />
                    <span>User Management</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    isActive={activePage === "course-management"}
                    onClick={() => setActivePage("course-management")}
                  >
                    <BookOpen />
                    <span>Course Management</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              isActive={activePage === "settings"}
              onClick={() => setActivePage("settings")}
            >
              <Settings />
              <span>Settings</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarTrigger className="absolute top-4 right-4 md:hidden" />
    </Sidebar>
  );
}
