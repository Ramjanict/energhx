// User roles in the LMS system
export type UserRole = "student" | "instructor" | "admin"

// Course status types
export type CourseStatus = "active" | "draft" | "archived"

// Assignment status types
export type AssignmentStatus = "pending" | "submitted" | "graded"

// User interface
export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  avatar?: string
  status: "active" | "inactive"
  joinedDate: string
}

// Course interface
export interface Course {
  id: string
  title: string
  instructor: string
  description?: string
  image?: string
  lessons: number
  duration: string
  progress?: number
  completed?: boolean
  students?: number
  status?: CourseStatus
}

// Assignment interface
export interface Assignment {
  id?: string
  title: string
  course: string
  dueDate: string
  submittedDate?: string
  grade?: string
  feedback?: string
  status: AssignmentStatus
}
