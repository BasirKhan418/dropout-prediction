"use client"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { useEffect, useState } from "react"
import { Toaster,toast } from "sonner"
import ProfielSpinner from "../Spinner/ProfielSpinner"
export default function UserAssignment({id}) {
  const [allAssignments, setAllAssignments] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchAllAssignment = async()=>{
    setLoading(true)
    const res = await fetch(`/api/assignment?id=${id}`,{
      method:"GET",
      headers:{
        "Content-Type":"application/json",
        "token":localStorage.getItem("dilmsadmintoken")
      }
    })
    const data = await res.json()
    setLoading(false)
    if(data.success){
      setAllAssignments(data.data)
    }
    else{
      toast.error(data.message)
      console.log(data)
    }
  }
  useEffect(()=>{
    fetchAllAssignment();
  },[])
  console.log(allAssignments)
  return (
    <>
    <Toaster position="top-center" expand={"false"}/>
    {loading?<div className="flex justify-center items-center"><ProfielSpinner/></div>:<>
   <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Assignments</h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div>
          <h2 className="text-lg font-semibold mb-4">Pending Assignments</h2>
          {allAssignments&&allAssignments.map((item,index)=>(<Card className="my-2" key={index}>
            <CardHeader>
              <CardTitle>{item.title}</CardTitle>
              <CardDescription>{item.desc.slice(0,90)+"...."}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">Due: {new Date(item.duedate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</div>
              </div>
            </CardContent>
            <CardFooter>
              <Link href={`/assignment/${id}/${item._id}`}><Button>View Assignment</Button></Link>
            </CardFooter>
          </Card>))}
          
        </div>
        <div>
          <h2 className="text-lg font-semibold mb-4 mt-2">Submitted Assignments</h2>
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
          <h2 className="text-lg font-semibold mb-4 mt-2">Evaluated Assignments</h2>
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
    </>}
    </>
  )
}