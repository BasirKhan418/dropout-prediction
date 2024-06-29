
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"

export default function Component() {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Assignments</h1>
        <Button>Create New</Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div>
          <h2 className="text-lg font-semibold mb-4">Pending Assignments</h2>
          <Card className="my-2">
            <CardHeader>
              <CardTitle>Intro to React</CardTitle>
              <CardDescription>Learn the fundamentals of React and build your first app.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">Due: June 30, 2023</div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="sm">Submit</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Submit Assignment</DialogTitle>
                      <DialogDescription>Upload your assignment files and click submit.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid items-center grid-cols-4 gap-4">
                        <Label htmlFor="file" className="text-right">
                          File
                        </Label>
                        <Input id="file" type="file" className="col-span-3" />
                      </div>
                      <div className="grid items-center grid-cols-4 gap-4">
                        <Label htmlFor="notes" className="text-right">
                          Notes
                        </Label>
                        <Textarea
                          id="notes"
                          rows={3}
                          className="col-span-3"
                          placeholder="Add any additional notes..."
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit">Submit</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
          <Card className="my-2">
            <CardHeader>
              <CardTitle>Advanced CSS Techniques</CardTitle>
              <CardDescription>Explore advanced CSS concepts and build complex layouts.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">Due: July 15, 2023</div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="sm">Submit</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Submit Assignment</DialogTitle>
                      <DialogDescription>Upload your assignment files and click submit.</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid items-center grid-cols-4 gap-4">
                        <Label htmlFor="file" className="text-right">
                          File
                        </Label>
                        <Input id="file" type="file" className="col-span-3" />
                      </div>
                      <div className="grid items-center grid-cols-4 gap-4">
                        <Label htmlFor="notes" className="text-right">
                          Notes
                        </Label>
                        <Textarea
                          id="notes"
                          rows={3}
                          className="col-span-3"
                          placeholder="Add any additional notes..."
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit">Submit</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        </div>
        <div>
          <h2 className="text-lg font-semibold mb-4">Submitted Assignments</h2>
          <Card className="my-2">
            <CardHeader>
              <CardTitle>Mastering JavaScript</CardTitle>
              <CardDescription>Dive deep into JavaScript and learn advanced concepts.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">Due: August 1, 2023</div>
                <Badge variant="success">Submitted</Badge>
              </div>
            </CardContent>
          </Card>
          <Card className="my-2">
            <CardHeader>
              <CardTitle>Responsive Web Design</CardTitle>
              <CardDescription>Learn how to build responsive and mobile-friendly websites.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">Due: September 1, 2023</div>
                <Badge variant="success">Submitted</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
        <div>
          <h2 className="text-lg font-semibold mb-4">Evaluated Assignments</h2>
          <Card className="my-2">
            <CardHeader>
              <CardTitle>Intro to React</CardTitle>
              <CardDescription>Learn the fundamentals of React and build your first app.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">Due: June 30, 2023</div>
                <div className="flex items-center gap-2">
                  <Badge variant="success">Evaluated</Badge>
                  <div className="text-sm text-muted-foreground">Score: 90%</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Advanced CSS Techniques</CardTitle>
              <CardDescription>Explore advanced CSS concepts and build complex layouts.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">Due: July 15, 2023</div>
                <div className="flex items-center gap-2">
                  <Badge variant="success">Evaluated</Badge>
                  <div className="text-sm text-muted-foreground">Score: 85%</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}