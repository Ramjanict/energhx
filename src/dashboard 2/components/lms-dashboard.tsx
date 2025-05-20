"use client";

import { useState } from "react";
import type { UserRole } from "@/lib/types";
import { DashboardSidebar } from "../components/dashboard-sidebar";
import { StudentDashboard } from "../components/student-dashboard";
import { InstructorDashboard } from "../components/instructor-dashboard";
import { AdminDashboard } from "../components/admin-dashboard";
import { SidebarProvider } from "../../components/ui/sidebar";

interface LMSDashboardProps {
  userRole: UserRole;
}

export function LMSDashboard({ userRole }: LMSDashboardProps) {
  const [activePage, setActivePage] = useState<string>("dashboard");

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <DashboardSidebar
          userRole={userRole}
          activePage={activePage}
          setActivePage={setActivePage}
        />
        <main className="flex-1 p-6 md:p-8 pt-16 md:pt-8 overflow-auto">
          {userRole === "student" && (
            <StudentDashboard activePage={activePage} />
          )}
          {userRole === "instructor" && (
            <InstructorDashboard activePage={activePage} />
          )}
          {userRole === "admin" && <AdminDashboard activePage={activePage} />}
        </main>
      </div>
    </SidebarProvider>
  );
}
