import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Clock, GraduationCap, Users } from "lucide-react";
interface CourseCardProps {
  title: string;
  instructor: string;
  image: string;
  lessons: number;
  duration: string;
  progress?: number;
  completed?: boolean;
  isInstructor?: boolean;
  students?: number;
  status?: "active" | "draft" | "archived";
}

export function CourseCard({
  title,
  instructor,
  image,
  lessons,
  duration,
  progress,
  completed = false,
  isInstructor = false,
  students,
  status = "active",
}: CourseCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="relative">
        <img
          src={image || "/placeholder.svg"}
          alt={title}
          className="w-full h-40 object-cover"
        />
        {status !== "active" && (
          <div className="absolute top-2 right-2">
            <Badge variant={status === "draft" ? "outline" : "secondary"}>
              {status === "draft" ? "Draft" : "Archived"}
            </Badge>
          </div>
        )}
        {completed && (
          <div className="absolute top-2 right-2">
            <Badge variant="default">Completed</Badge>
          </div>
        )}
      </div>
      <CardHeader className="p-4">
        <div className="space-y-1">
          <h3 className="font-semibold text-lg leading-tight">{title}</h3>
          <p className="text-sm text-muted-foreground">{instructor}</p>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0 space-y-3">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-1">
            <GraduationCap className="h-4 w-4" />
            <span>{lessons} lessons</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{duration}</span>
          </div>
          {isInstructor && students !== undefined && (
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>{students} students</span>
            </div>
          )}
        </div>
        {progress !== undefined && (
          <div className="space-y-1">
            <Progress value={progress} className="h-2" />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Progress</span>
              <span>{progress}%</span>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button variant={completed ? "outline" : "default"} className="w-full">
          {completed
            ? "View Certificate"
            : progress !== undefined && progress > 0
            ? "Continue Learning"
            : isInstructor
            ? "Manage Course"
            : "Start Learning"}
        </Button>
      </CardFooter>
    </Card>
  );
}
