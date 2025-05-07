import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Edit, Lock, Search, Trash2, Unlock, UserPlus } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function UserManagement() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
        <p className="text-muted-foreground">Manage users across the platform</p>
      </div>

      <div className="flex justify-between items-center">
        <div>
          <Input placeholder="Search users..." className="max-w-sm" />
        </div>
        <Button>
          <UserPlus className="mr-2 h-4 w-4" />
          Add User
        </Button>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Users</TabsTrigger>
          <TabsTrigger value="students">Students</TabsTrigger>
          <TabsTrigger value="instructors">Instructors</TabsTrigger>
          <TabsTrigger value="admins">Admins</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <CardTitle>All Users</CardTitle>
                  <CardDescription>Manage all platform users</CardDescription>
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Filter users..." className="pl-8 w-full sm:w-[250px]" />
                  </div>
                  <Select defaultValue="all">
                    <SelectTrigger className="w-full sm:w-[150px]">
                      <SelectValue placeholder="Filter by role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Roles</SelectItem>
                      <SelectItem value="student">Students</SelectItem>
                      <SelectItem value="instructor">Instructors</SelectItem>
                      <SelectItem value="admin">Admins</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Joined</TableHead>
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
                    <TableCell>
                      <Badge variant="outline">Student</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="default">Active</Badge>
                    </TableCell>
                    <TableCell>Jan 15, 2025</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Lock className="h-4 w-4" />
                          <span className="sr-only">Lock</span>
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar>
                          <AvatarImage src={`/placeholder.svg?height=32&width=32`} alt="Dr. Sarah Miller" />
                          <AvatarFallback>SM</AvatarFallback>
                        </Avatar>
                        <span className="font-medium">Dr. Sarah Miller</span>
                      </div>
                    </TableCell>
                    <TableCell>sarah.miller@example.com</TableCell>
                    <TableCell>
                      <Badge variant="outline">Instructor</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="default">Active</Badge>
                    </TableCell>
                    <TableCell>Nov 5, 2024</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Lock className="h-4 w-4" />
                          <span className="sr-only">Lock</span>
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
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
                    <TableCell>
                      <Badge variant="outline">Student</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="default">Active</Badge>
                    </TableCell>
                    <TableCell>Feb 20, 2025</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Lock className="h-4 w-4" />
                          <span className="sr-only">Lock</span>
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar>
                          <AvatarImage src={`/placeholder.svg?height=32&width=32`} alt="Admin User" />
                          <AvatarFallback>AU</AvatarFallback>
                        </Avatar>
                        <span className="font-medium">Admin User</span>
                      </div>
                    </TableCell>
                    <TableCell>admin@example.com</TableCell>
                    <TableCell>
                      <Badge variant="outline">Admin</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="default">Active</Badge>
                    </TableCell>
                    <TableCell>Jan 1, 2024</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Lock className="h-4 w-4" />
                          <span className="sr-only">Lock</span>
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
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
                    <TableCell>
                      <Badge variant="outline">Student</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">Inactive</Badge>
                    </TableCell>
                    <TableCell>Mar 10, 2025</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Unlock className="h-4 w-4" />
                          <span className="sr-only">Unlock</span>
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="students">
          <Card>
            <CardHeader>
              <CardTitle>Students</CardTitle>
              <CardDescription>Manage student accounts</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Similar table structure as above but filtered for students */}
              <div className="text-center py-4">
                <p>Student management interface would be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="instructors">
          <Card>
            <CardHeader>
              <CardTitle>Instructors</CardTitle>
              <CardDescription>Manage instructor accounts</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Similar table structure as above but filtered for instructors */}
              <div className="text-center py-4">
                <p>Instructor management interface would be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="admins">
          <Card>
            <CardHeader>
              <CardTitle>Administrators</CardTitle>
              <CardDescription>Manage administrator accounts</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Similar table structure as above but filtered for admins */}
              <div className="text-center py-4">
                <p>Administrator management interface would be displayed here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
