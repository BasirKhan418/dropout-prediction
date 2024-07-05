
"use client"

import { useState } from "react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"

export default function Page() {
  const [activeTab, setActiveTab] = useState("sent")
  return (
    <section className="w-full max-w-4xl mx-auto py-12 md:py-16 lg:py-20">
      <div className="px-4 md:px-6">
        <div className="space-y-4 mb-8">
          <h1 className="text-3xl font-bold">Send Notification</h1>
          <p className="text-muted-foreground">Craft and send notifications to your students.</p>
        </div>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList>
            <TabsTrigger value="sent">Sent</TabsTrigger>
            <TabsTrigger value="previouslySent">Previously Sent</TabsTrigger>
          </TabsList>
          <TabsContent value="sent">
            <Card>
              <CardContent className="grid gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" placeholder="Enter notification subject" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" placeholder="Enter notification message" rows={5} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="recipients">Recipients</Label>
                  <Select id="recipients" multiple>
                    <SelectTrigger>
                      <SelectValue placeholder="Select recipients" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="student1">Student 1</SelectItem>
                      <SelectItem value="student2">Student 2</SelectItem>
                      <SelectItem value="student3">Student 3</SelectItem>
                      <SelectItem value="student4">Student 4</SelectItem>
                      <SelectItem value="student5">Student 5</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button type="submit">Send Notification</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="previouslySent">
            <Card className="w-full overflow-x-auto md:overflow-x-visible">
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Subject</TableHead>
                      <TableHead>Message</TableHead>
                      <TableHead>Recipients</TableHead>
                      <TableHead>Sent At</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>Upcoming Exam</TableCell>
                      <TableCell>Don't forget to study for the upcoming exam!</TableCell>
                      <TableCell>Student 1, Student 2, Student 3</TableCell>
                      <TableCell>2023-04-15 10:30 AM</TableCell>
                      <TableCell className="flex items-center justify-end gap-2">
                        <Button variant="outline" size="sm">
                          Resend
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Class Cancellation</TableCell>
                      <TableCell>There will be no class tomorrow due to a holiday.</TableCell>
                      <TableCell>Student 2, Student 4, Student 5</TableCell>
                      <TableCell>2023-05-01 2:00 PM</TableCell>
                      <TableCell className="flex items-center justify-end gap-2">
                        <Button variant="outline" size="sm">
                          Resend
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Homework Reminder</TableCell>
                      <TableCell>Don't forget to submit your homework by the end of the day.</TableCell>
                      <TableCell>Student 1, Student 3, Student 5</TableCell>
                      <TableCell>2023-06-10 8:00 AM</TableCell>
                      <TableCell className="flex items-center justify-end gap-2">
                        <Button variant="outline" size="sm">
                          Resend
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}