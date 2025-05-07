"use client";

import { useState } from "react";
import { LMSDashboard } from "./components/lms-dashboard";
import type { UserRole } from "../lib/types";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
const Dashboard = () => {
  const [role, setRole] = useState<UserRole>("admin");

  return (
    <div className="min-h-screen w-full   ">
      <div className="fixed  top-4 right-10 flex items-center gap-1 ">
        <span className="text-sm font-medium">Role</span>
        <Select
          value={role}
          onValueChange={(value) => setRole(value as UserRole)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Role" />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectGroup>
              <SelectLabel>Select a role</SelectLabel>
              <SelectItem
                className=" hover:!bg-primary hover:text-white"
                value="student"
              >
                student
              </SelectItem>
              <SelectItem
                className=" hover:!bg-primary hover:text-white"
                value="instructor"
              >
                instructor
              </SelectItem>
              <SelectItem
                className=" hover:!bg-primary hover:text-white"
                value="admin"
              >
                Administrator
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <LMSDashboard userRole={role} />
    </div>
  );
};

export default Dashboard;
