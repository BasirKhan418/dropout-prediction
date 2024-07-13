"use client"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {Toaster,toast} from "sonner";
import { useEffect, useState } from "react"
import ProfilePageSkeleton from "@/utilities/skeleton/ProfilePageSkeleton"
export default function Page() {
  const [data,setData] =useState(null)
  const [loading,setLoading] = useState(false)
  const [avname,setavname] = useState("DI")
  //validate function
  const validatesFunc = async(token)=>{
    console.log(token);
    setLoading(true);
   const response = await fetch("/api/adminhomeauth",{
    method:"POST",
    headers:{
      "content-type":"application/json",
      "token":token
    }
   })
  const res = await response.json();
    setLoading(false);
  if(res.success){
    setData(res.data)
    let user = res.data[0];

    // Split the name into an array of words
    let nameParts = user.name.split(" ");
    
    // Extract the initials from the first and second words
    let initials = nameParts[0][0].toUpperCase() + nameParts[1][0].toUpperCase();
    
    // Log the initials
    console.log(initials);
    
    // Set the initials to the state variable (assuming setavname is a state setter function)
    setavname(initials);
  }
  else{
  toast.error(res.message);
  setTimeout(()=>{
    router.push("/adminlogin");
      },1000)
  }
  }
  useEffect(()=>{
validatesFunc(localStorage.getItem("dilmsadmintoken"))
  },[])
  console.log(data)
  return (
    <>
    <Toaster position='top-center' expand={false}/>
    {loading?<ProfilePageSkeleton/>:<div className="flex flex-col items-center justify-center min-h-screen bg-muted/40">
      <div className="w-full max-w-4xl bg-background rounded-lg shadow-lg">
        <div className="flex flex-col md:flex-row">
          <div className="bg-slate-900 p-8 rounded-t-lg md:rounded-t-none md:rounded-l-lg md:w-1/3">
            <div className="flex flex-col items-center">
              <Avatar className="h-24 w-24 mb-4">
                <AvatarFallback>{avname}</AvatarFallback>
              </Avatar>
              <h2 className="text-2xl font-bold text-primary-foreground mb-2">{data&&data[0].name}</h2>
              <p className="text-primary-foreground">
                <span className="font-medium "> {data&&data[0].email}</span> 
              </p>
              <p className="text-primary-foreground">
                <span className="font-medium">Phone:</span> +91 {data&&data[0].phone}
              </p>
            </div>
          </div>
          <div className="p-8 md:w-2/3">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold">Admin Details</h3>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  Edit
                </Button>
                <Button variant="outline" size="sm">
                  Delete
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              <div className="bg-muted p-4 rounded-lg">
                <h4 className="text-lg font-medium mb-2">Role</h4>
                <p>System Administrator</p>
              </div>
              <div className="bg-muted p-4 rounded-lg">
                <h4 className="text-lg font-medium mb-2">Permissions</h4>
                <ul className="list-disc pl-4">
                  <li>Manage users</li>
                  <li>Manage courses</li>
                  <li>Generate reports</li>
                  <li>Access all data</li>
                </ul>
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-4">Courses Managed</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Course Name</TableHead>
                  <TableHead>Enrollment</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Introduction to Web Development</TableCell>
                  <TableCell>125</TableCell>
                  <TableCell>
                    <Badge variant="success">Active</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                      <Button variant="outline" size="sm">
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Advanced JavaScript</TableCell>
                  <TableCell>92</TableCell>
                  <TableCell>
                    <Badge variant="success">Active</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                      <Button variant="outline" size="sm">
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Data Structures and Algorithms</TableCell>
                  <TableCell>68</TableCell>
                  <TableCell>
                    <Badge variant="success">Active</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                      <Button variant="outline" size="sm">
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Introduction to Machine Learning</TableCell>
                  <TableCell>45</TableCell>
                  <TableCell>
                    <Badge variant="success">Active</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                      <Button variant="outline" size="sm">
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>}
    </>
  )
}