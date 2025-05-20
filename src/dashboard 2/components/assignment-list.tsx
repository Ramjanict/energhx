import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Upload, Check, Clock } from "lucide-react";

interface Assignment {
  title: string;
  course: string;
  dueDate: string;
  submittedDate?: string;
  grade?: string;
  feedback?: string;
  status: "pending" | "submitted" | "graded";
}

interface AssignmentListProps {
  assignments: Assignment[];
}

export function AssignmentList({ assignments }: AssignmentListProps) {
  return (
    <div className="space-y-4">
      {assignments.map((assignment, index) => (
        <Card key={index}>
          <CardHeader className="p-4 pb-2">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <div className="bg-primary/10 p-2 rounded-md">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-lg">{assignment.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {assignment.course}
                  </p>
                </div>
              </div>
              <Badge
                variant={
                  assignment.status === "pending"
                    ? "outline"
                    : assignment.status === "submitted"
                    ? "secondary"
                    : "default"
                }
              >
                {assignment.status === "pending"
                  ? "Pending"
                  : assignment.status === "submitted"
                  ? "Submitted"
                  : "Graded"}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="grid gap-2">
              <div className="flex items-center text-sm">
                <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                <span>Due: {assignment.dueDate}</span>
              </div>

              {assignment.submittedDate && (
                <div className="flex items-center text-sm">
                  <Check className="mr-2 h-4 w-4 text-green-500" />
                  <span>Submitted: {assignment.submittedDate}</span>
                </div>
              )}

              {assignment.grade && (
                <div className="mt-2 space-y-2">
                  <div className="flex items-center">
                    <span className="font-medium mr-2">Grade:</span>
                    <Badge variant="outline" className="font-bold">
                      {assignment.grade}
                    </Badge>
                  </div>
                  {assignment.feedback && (
                    <div className="bg-muted p-3 rounded-md text-sm">
                      <p className="font-medium mb-1">Feedback:</p>
                      <p>{assignment.feedback}</p>
                    </div>
                  )}
                </div>
              )}

              <div className="flex justify-end gap-2 mt-2">
                {assignment.status === "pending" && (
                  <Button>
                    <Upload className="mr-2 h-4 w-4" />
                    Submit Assignment
                  </Button>
                )}
                {assignment.status === "submitted" && (
                  <Button variant="outline">View Submission</Button>
                )}
                {assignment.status === "graded" && (
                  <Button variant="outline">View Feedback</Button>
                )}
                <Button variant="outline">View Details</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
