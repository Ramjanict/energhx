import { FaGraduationCap } from "react-icons/fa6";
import { FaBookOpen } from "react-icons/fa";
import { FaMedal } from "react-icons/fa";
import courseImage from "../../assets/server-intern-assets/course1.jpg";
import { generateRandomId } from "@/lib/utils";
 import fan1 from "../../assets/courses/fan.png"
 import fan2 from "../../assets/courses/fan1.png"
 import fan3 from "../../assets/courses/fan2.png"
 import fan4 from "../../assets/courses/fan3.png"
 import fan5 from "../../assets/courses/fan4.png"
 import fan6 from "../../assets/courses/fan5.png"
export const courseFilterArray = [
  {
    id: generateRandomId(),
    icon: FaGraduationCap,
    label: "Enrolled Courses",
    number: "02",
    value: "enrolled",
  },
  {
    id: generateRandomId(),
    icon: FaBookOpen,
    label: "Active Courses",
    number: "01",
    value: "active",
  },
  {
    id: generateRandomId(),
    icon: FaMedal,
    label: "Completed Courses",
    number: "01",
    value: "completed",
  },
];

export const courseList = [
  {
    id: generateRandomId(),
    image: courseImage,
    rating: 4,
    review: 22,
    title: "Introduction to Energhx",
    totalLesson: 40,
    completedLesson: 3,
    status: "active",
  },
  {
    id: generateRandomId(),
    image: courseImage,
    rating: 3.5,
    review: 25,
    title: "Introduction to React",
    totalLesson: 35,
    completedLesson: 15,
    status: "enrolled",
  },
  {
    id: generateRandomId(),
    image: courseImage,
    rating: 3,
    review: 36,
    title: "Introduction to Node JS",
    label: "Completed Courses",
    totalLesson: 14,
    completedLesson: 14,
    status: "completed",
  },
];

export const singleCourseModuleList = [
  {
    id: 1,
    title: "Energhx Fan Fixing Course",
    description:
      "Upon successful completion of the course, you will be awarded this certificate.",
    totalModules: "08",
    moduleNo: 1,
    totalClass: 24,
    completedClass: 10,
    assignment: 14,
    completedAssignment: 7,
    rating: 4.0,
    reviews: 22,
    image: "/src/assets/courses/fan.png",
  },
  {
    id: 2,
    title: "Energhx Fan Fixing Course",
    description:
      "Upon successful completion of the course, you will be awarded this certificate.",
    totalModules: "05",
    moduleNo: 2,
    totalClass: 24,
    completedClass: 12,
    assignment: 14,
    completedAssignment: 9,
    rating: 5.0,
    reviews: 10,
    image: "/src/assets/courses/fan1.png",
  },
  {
    id: 3,
    title: "Energhx Fan Fixing Course",
    description:
      "Upon successful completion of the course, you will be awarded this certificate.",
    totalModules: "06",
    moduleNo: 3,
    totalClass: 24,
    completedClass: 14,
    assignment: 14,
    completedAssignment: 10,
    rating: 3.5,
    reviews: 11,
    image: "/src/assets/courses/fan2.png",
  },
  {
    id: 4,
    title: "Energhx Fan Fixing Course",
    description:
      "Upon successful completion of the course, you will be awarded this certificate.",
    totalModules: "06",
    moduleNo: 4,
    totalClass: 24,
    completedClass: 15,
    assignment: 14,
    completedAssignment: 11,
    rating: 3.5,
    reviews: 20,
    image: "/src/assets/courses/fan3.png",
  },
  {
    id: 5,
    title: "Energhx Fan Fixing Course",
    description:
      "Upon successful completion of the course, you will be awarded this certificate.",
    totalModules: "06",
    moduleNo: 5,
    totalClass: 24,
    completedClass: 18,
    assignment: 14,
    completedAssignment: 12,
    rating: 4.0,
    reviews: 22,
    image: "/src/assets/courses/fan4.png",
  },
  {
    id: 6,
    title: "Energhx Fan Fixing Course",
    description:
      "Upon successful completion of the course, you will be awarded this certificate.",
    totalModules: "06",
    moduleNo: 6,
    totalClass: 24,
    completedClass: 20,
    assignment: 14,
    completedAssignment: 13,
    rating: 4.0,
    reviews: 15,
    image: "/src/assets/courses/fan5.png",
  },
];

export const singleCourseClassList = [
  {
    id: generateRandomId(),
    title: "Introduction to Fan Repair",
    topic: "Basic Components & Tools",
    timeInMinutes: 30,
    classNumber: 1,
    isCompleted: true,
    isWatching: false,
    files: ["info.pdf"],
    image: "/src/assets/courses/fan.png",
  },
  {
    id: generateRandomId(),
    title: "Diagnosing Fan Issues",
    topic: "Common Problems & Troubleshooting",
    timeInMinutes: 45,
    classNumber: 2,
    isCompleted: false,
    isWatching: false,
    files: ["diagnostics.pdf"],
    image: "/src/assets/courses/fan.png",
  },
  {
    id: generateRandomId(),
    title: "Motor and Wiring Fixes",
    topic: "Replacing & Repairing Electrical Components",
    timeInMinutes: 40,
    classNumber: 3,
    isCompleted: false,
    isWatching: true,
    files: ["wiring_guide.pdf"],
    image: "/src/assets/courses/fan.png",
  },
  {
    id: generateRandomId(),
    title: "Blade & Speed Control Mechanisms",
    topic: "Balancing, Cleaning & Replacing Blades",
    timeInMinutes: 35,
    classNumber: 4,
    isCompleted: false,
    isWatching: true,
    files: ["blades_maintenance.pdf"],
    image: "/src/assets/courses/fan.png",
  },
  {
    id: generateRandomId(),
    title: "Final Assembly & Safety",
    topic: "Testing & Ensuring Safety Standards",
    timeInMinutes: 50,
    classNumber: 5,
    isCompleted: true,
    isWatching: false,
    files: ["safety_guidelines.pdf"],
    image: "/src/assets/courses/fan.png",
  },
];

export const singleCourseAssignmentList = [
  {
    id: generateRandomId(),
    name: "Energhx New LED Light Fix",
    submissionDate: new Date("2025-03-20T12:00:00Z"),
    status: "completed",
  },
  {
    id: generateRandomId(),
    name: "Ceiling Fan Motor Repair",
    submissionDate: new Date("2025-03-22T15:30:00Z"),
    status: "pending",
  },
  {
    id: generateRandomId(),
    name: "Table Fan Blade Balancing",
    submissionDate: new Date("2025-03-18T09:45:00Z"),
    status: "completed",
  },
  {
    id: generateRandomId(),
    name: "Wall Fan Speed Control Fix",
    submissionDate: new Date("2025-03-25T18:00:00Z"),
    status: "pending",
  },
  {
    id: generateRandomId(),
    name: "Pedestal Fan Wiring Check",
    submissionDate: new Date("2025-03-21T14:15:00Z"),
    status: "completed",
  },
  {
    id: generateRandomId(),
    name: "Testing Safety Measures",
    submissionDate: new Date("2025-03-23T08:20:00Z"),
    status: "pending",
  },
];

export const courseData=[
  {
    "id": 1,
    "title": "Energhx Fan Fixing Course",
    "description": "Upon successful completion of the course, you will be awarded this certificate.",
    "totalModules": "08",
    "totalClass": 24,
    "assignment": 14,
    "rating": 4.0,
    "reviews": 22,
    "image": fan1
  },
  {
    "id": 2,
    "title": "Energhx Fan Fixing Course",
    "description": "Upon successful completion of the course, you will be awarded this certificate.",
    "totalModules": "05",
    "totalClass": 24,
    "assignment": 14,
    "rating": 4.0,
    "reviews": 22,
    "image": fan2
  },
  {
    "id": 3,
    "title": "Energhx Fan Fixing Course",
    "description": "Upon successful completion of the course, you will be awarded this certificate.",
    "totalModules": "06",
    "totalClass": 24,
    "assignment": 14,
    "rating": 4.0,
    "reviews": 22,
    "image": fan3
  },

  {
      "id": 4,
      "title": "Energhx Fan Fixing Course",
      "description": "Upon successful completion of the course, you will be awarded this certificate.",
      "totalModules": "06",
      "totalClass": 24,
      "assignment": 14,
      "rating": 4.0,
      "reviews": 22,
      "image": fan4
    },
    {
      "id": 3,
      "title": "Energhx Fan Fixing Course",
      "description": "Upon successful completion of the course, you will be awarded this certificate.",
      "totalModules": "06",
      "totalClass": 24,
      "assignment": 14,
      "rating": 4.0,
      "reviews": 22,
      "image": fan5
    },
    {
      "id": 3,
      "title": "Energhx Fan Fixing Course",
      "description": "Upon successful completion of the course, you will be awarded this certificate.",
      "totalModules": "06",
      "totalClass": 24,
      "assignment": 14,
      "rating": 4.0,
      "reviews": 22,
      "image": fan6
    }


]
