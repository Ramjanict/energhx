import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Eye, MessageSquare, Search } from "lucide-react"

export function StudentList() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Students</h1>
        <p className="text-muted-foreground">Manage students enrolled in your courses</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle>Student Management</CardTitle>
              <CardDescription>View and manage your students</CardDescription>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search students..." className="pl-8 w-full sm:w-[250px]" />
              </div>
              <Select defaultValue="all-courses">
                <SelectTrigger className="w-full sm:w-[200px]">
                  <SelectValue placeholder="Filter by course" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-courses">All Courses</SelectItem>
                  <SelectItem value="react">Introduction to React</SelectItem>
                  <SelectItem value="advanced-react">Advanced React Patterns</SelectItem>
                  <SelectItem value="web-dev">Web Development Fundamentals</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Course</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar>
                      <AvatarImage src={`/placeholder.svg?height=32&width=32`} alt="Alex Johnson" />
                      <AvatarFallback>AJ</AvatarFallback>
                    </Avatar>
                    <span className="font-medium">Alex Johnson</span>
                  </div>
                </TableCell>
                <TableCell>alex.johnson@example.com</TableCell>
                <TableCell>Introduction to React</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="w-full max-w-24 bg-muted rounded-full h-2 overflow-hidden">
                      <div className="bg-primary h-full rounded-full" style={{ width: "75%" }}></div>
                    </div>
                    <span className="text-xs">75%</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="default">Active</Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon">
                      <Eye className="h-4 w-4" />
                      <span className="sr-only">View</span>
                    </Button>
                    <Button variant="ghost" size="icon">
                      <MessageSquare className="h-4 w-4" />
                      <span className="sr-only">Message</span>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar>
                      <AvatarImage src={`/placeholder.svg?height=32&width=32`} alt="Emma Davis" />
                      <AvatarFallback>ED</AvatarFallback>
                    </Avatar>
                    <span className="font-medium">Emma Davis</span>
                  </div>
                </TableCell>
                <TableCell>emma.davis@example.com</TableCell>
                <TableCell>Introduction to React</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="w-full max-w-24 bg-muted rounded-full h-2 overflow-hidden">
                      <div className="bg-primary h-full rounded-full" style={{ width: "60%" }}></div>
                    </div>
                    <span className="text-xs">60%</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="default">Active</Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon">
                      <Eye className="h-4 w-4" />
                      <span className="sr-only">View</span>
                    </Button>
                    <Button variant="ghost" size="icon">
                      <MessageSquare className="h-4 w-4" />
                      <span className="sr-only">Message</span>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar>
                      <AvatarImage src={`/placeholder.svg?height=32&width=32`} alt="James Wilson" />
                      <AvatarFallback>JW</AvatarFallback>
                    </Avatar>
                    <span className="font-medium">James Wilson</span>
                  </div>
                </TableCell>
                <TableCell>james.wilson@example.com</TableCell>
                <TableCell>Advanced TypeScript</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="w-full max-w-24 bg-muted rounded-full h-2 overflow-hidden">
                      <div className="bg-primary h-full rounded-full" style={{ width: "45%" }}></div>
                    </div>
                    <span className="text-xs">45%</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="default">Active</Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon">
                      <Eye className="h-4 w-4" />
                      <span className="sr-only">View</span>
                    </Button>
                    <Button variant="ghost" size="icon">
                      <MessageSquare className="h-4 w-4" />
                      <span className="sr-only">Message</span>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar>
                      <AvatarImage src={`/placeholder.svg?height=32&width=32`} alt="Sophia Chen" />
                      <AvatarFallback>SC</AvatarFallback>
                    </Avatar>
                    <span className="font-medium">Sophia Chen</span>
                  </div>
                </TableCell>
                <TableCell>sophia.chen@example.com</TableCell>
                <TableCell>Web Development Fundamentals</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="w-full max-w-24 bg-muted rounded-full h-2 overflow-hidden">
                      <div className="bg-primary h-full rounded-full" style={{ width: "85%" }}></div>
                    </div>
                    <span className="text-xs">85%</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="default">Active</Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon">
                      <Eye className="h-4 w-4" />
                      <span className="sr-only">View</span>
                    </Button>
                    <Button variant="ghost" size="icon">
                      <MessageSquare className="h-4 w-4" />
                      <span className="sr-only">Message</span>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
