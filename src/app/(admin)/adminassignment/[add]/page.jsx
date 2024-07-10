
"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import Chat from "@/utilities/Ai/Chat"
import { Toaster,toast } from "sonner"
import ProfielSpinner from "@/utilities/Spinner/ProfielSpinner"
import { GoogleGenerativeAI } from "@google/generative-ai";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
export default function Page({params}) {
  const [allAssignment,setAllAssignment] = useState([])
  const [modalOpen, setModalOpen] = useState(false)
  const [id,setId] = useState("")
  const [alertopen,setAlertopen] = useState(false)
  const [promptmodalopen,setPromptmodalopen] = useState(false)
  const [aiprompt,setAiprompt] = useState("")
  const [ailoading,setAiloading] = useState(false)
  //fetch all asignment
  const fetchAllAssignment = async()=>{
    const res = await fetch(`/api/assignment?id=${params.add}`,{
      method:"GET",
      headers:{
        "Content-Type":"application/json",
        "token":localStorage.getItem("dilmsadmintoken")
      }
    })
    const data = await res.json()
    if(data.success){
      setAllAssignment(data.data)
    }
    else{
      toast.error(data.message)
      console.log(data)
    }
  }
  //end
  //useeffectfor fetch all assignment
  useEffect(()=>{
    fetchAllAssignment()
  },[])
  console.log(allAssignment)
  //end
  const [activeTab, setActiveTab] = useState("create")
  const [aiopen,setaiopen] = useState(false)
  const [loading,setLoading] = useState(false)
  //create assignment 
  const [assignmentForm,setAssignmentform]=useState({
    title:"",
    desc:"",
    duedate:"",
    crid:params.add,
    type:"",
    link:"",
  })
  //onchange
  const handleChange = (e)=>{
   setAssignmentform({...assignmentForm,[e.target.name]:e.target.value})
  }
  //handleAddAssignment
  const handleSubmitForm = async()=>{
if(assignmentForm.name==""||assignmentForm.type==""||assignmentForm.link==""||assignmentForm.duedate==""||assignmentForm.desc==""){
  toast.error("Please fill all the fields")
  return;
}
else{
  setLoading(true)
  const res = await fetch("/api/assignment",{
    method:"POST",
    headers:{
      "Content-Type":"application/json",
      "token":localStorage.getItem("dilmsadmintoken")
    },
    body:JSON.stringify(assignmentForm)
  })
  const data = await res.json()
  setLoading(false)
  if(data.success){
    fetchAllAssignment()
    toast.success(data.message)
    setAssignmentform({
      title:"",
      desc:"",
      duedate:"",
      crid:params.add,
      type:"",
      link:"",
    })
  }
  else{
    toast.error(data.message);
  }
}
  }
  //update functions start from here
  const handleUpdate = (item)=>{
    setAssignmentform({
      title:item.title,
      desc:item.desc,
      duedate:item.duedate,
      crid:params.add,
      type:item.type,
      link:item.link,
      id:item._id
    })
    setId(item._id)
    setModalOpen(true)
  }
  //handle Submit Assignment
  const handleSubmitUpdate = async()=>{
    let data = {...assignmentForm,id:id}
    if(assignmentForm.title==""||assignmentForm.type==""||assignmentForm.link==""||assignmentForm.duedate==""||assignmentForm.desc==""){
      toast.error("Please fill all the fields")
      return
    }
    const res = await fetch("/api/assignment",{
      method:"PUT",
      headers:{
        "Content-Type":"application/json",
        "token":localStorage.getItem("dilmsadmintoken")
      },
      body:JSON.stringify(data)
    })
    const resdata = await res.json()
    if(resdata.success){
      toast.success(resdata.message)
      setModalOpen(false)
      setAssignmentform({
        title:"",
        desc:"",
        duedate:"",
        crid:params.add,
        type:"",
        link:"",
      })
      fetchAllAssignment()
    }
    else{
      toast.error(resdata.message)
    }
  }
  //delete assignment
  //handle delete prev
  const handleDeletePrev = (id)=>{
    setId(id)
    setAlertopen(true)
  }
  //handle delete fom data base
  const handleDelete = async()=>{
    const res = await fetch("/api/assignment",{
      method:"DELETE",
      headers:{
        "Content-Type":"application/json",
        "token":localStorage.getItem("dilmsadmintoken")
      },
      body:JSON.stringify({id:id})
    })
    const data = await res.json()
    if(data.success){
      toast.success(data.message)
      setAlertopen(false)
      fetchAllAssignment()
    }
    else{
      toast.error(data.message)
    }
  }
  //ai create assignment starts from here
  const handleAipromptChange=(e)=>{
    setAiprompt(e.target.value)
  }
  //intialize ai
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);

  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });

  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };
  const handleRunAi = async()=>{
    if(aiprompt==""){
      toast.error("Please enter prompt")
      return
    }
    try{
      setAiloading(true)
    const chatSession = model.startChat({
      generationConfig,
      history: [],
    });
    let prevprompt = "for this Generate a JSON object for an assignment with the following details: Title: The title of the assignment. Description: A complete description of the assignment. Link: A URL linking to an image, PDF, or video related to the assignment. Due Date: The due date for the assignment. Type: The type of content the assignment is based on. For example, image, video, or PDF ,note:not any other format. json key should look like ,title,desc,link,duedate,type"
    let orginalprompt = prevprompt+" "+aiprompt
    const result = await chatSession.sendMessage(orginalprompt);
    let data = JSON.parse(result.response.text())
    setAssignmentform({
      title:data.title,
      desc:data.desc,
      duedate:data.duedate,
      crid:params.add,
      type:data.type.toLowerCase(),
      link:data.link,
    })
    setAiloading(false)
    setPromptmodalopen(false)
  }
  catch(err){
    toast.error("Something went wrong please try again later.Or Too many requests, please try again later!" + err);
  }
  }

  return (
    <>
     <Toaster position="top-center" expand={false}/>
    {loading?<div className="flex justify-center items-center h-full w-full"><ProfielSpinner/></div>:<>
   
    <div className="w-full min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 md:px-6 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Assignments</h1>
          <div className="flex gap-2 mt-4 md:mt-0">
            <Button
              variant={activeTab === "create" ? "primary" : "outline"}
              onClick={() => setActiveTab("create")}
              className="px-4 py-2 rounded-md text-sm font-medium"
            >
              Create Assignment
            </Button>
            <Button
              variant={activeTab === "created" ? "primary" : "outline"}
              onClick={() => setActiveTab("created")}
              className="px-4 py-2 rounded-md text-sm font-medium"
            >
              Assignments Created
            </Button>
            <Button
              variant={activeTab === "submitted" ? "primary" : "outline"}
              onClick={() => setActiveTab("submitted")}
              className="px-4 py-2 rounded-md text-sm font-medium"
            >
              Assignments Submitted
            </Button>
            <Button
              variant={activeTab === "evaluated" ? "primary" : "outline"}
              onClick={() => setActiveTab("evaluated")}
              className="px-4 py-2 rounded-md text-sm font-medium"
            >
              Assignments Evaluated
            </Button>
          </div>
        </div>
        {activeTab === "create" && (
          <Card className="shadow-lg rounded-lg">
            <CardHeader className="bg-card p-6">
              <CardTitle className="text-lg font-bold">Create Assignment</CardTitle>
              <CardDescription className="text-muted-foreground">
                Fill out the form to create a new assignment.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6" >
                <div className="grid gap-2">
                  <Label htmlFor="title" className="text-sm font-medium">
                    Title
                  </Label>
                  <Input
                    id="title"
                    name="title"
                    value={assignmentForm.title}
                    onChange={handleChange}
                    placeholder="Assignment Title"
                    className="rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm transition-colors focus:outline-none focus:ring-1 focus:ring-ring"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="due-date" className="text-sm font-medium">
                    Due Date
                  </Label>
                  <Input
                    id="due-date"
                    type="date"
                    name="duedate"
                    value={assignmentForm.duedate}
                    onChange={handleChange}
                    className="rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm transition-colors focus:outline-none focus:ring-1 focus:ring-ring"
                  />
                </div>
                <div className="grid gap-2 col-span-1 md:col-span-2">
                  <Label htmlFor="description" className="text-sm font-medium">
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    rows={4}
                    value={assignmentForm.desc}
                    name="desc"
                    onChange={handleChange}
                    placeholder="Assignment Description"
                    className="rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm transition-colors focus:outline-none focus:ring-1 focus:ring-ring"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="link" className="text-sm font-medium">
                    Links
                  </Label>
                  <Input
                    id="link"
                    type="url"
                    name="link"
                    value={assignmentForm.link}
                    onChange={handleChange}
                    className="rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm transition-colors focus:outline-none focus:ring-1 focus:ring-ring"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="type" className="text-sm font-medium">
                    Type
                  </Label>
                  <select
                  name="type"
                  onChange={handleChange}
                  value={assignmentForm.type}
                  className="rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm transition-colors focus:outline-none focus:ring-1 focus:ring-ring"
                  >
                    <option value={""}>Select</option>
                    <option value={"image"}>Image</option>
                    <option value={"video"}>Video</option>
                    <option value={"pdf"}>Pdf</option>

                  </select>
                </div>
              </div>
            </CardContent>
            <CardFooter className="bg-card p-6">
              <Button className="px-4 py-2 rounded-md text-sm font-medium"
              onClick={handleSubmitForm}
              >
                Create Assignment
              </Button>
              <Button type="submit" className="px-4 py-2 rounded-md text-sm font-medium mx-2"
              onClick={()=>setPromptmodalopen(true)}
              >
                Create by DI-Nxt Ai
              </Button>
            </CardFooter>
          </Card>
        )}
        {activeTab === "created" && (
          <Card className="shadow-lg rounded-lg">
            <CardHeader className="bg-card p-6">
              <CardTitle className="text-lg font-bold">Assignments Created</CardTitle>
              <CardDescription className="text-muted-foreground">
                View and manage the assignments you have created.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <Table className="w-full">
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-sm font-medium">Title</TableHead>
                    <TableHead className="text-sm font-medium">Due Date</TableHead>
                    <TableHead className="text-sm font-medium">Status</TableHead>
                    <TableHead className="text-sm font-medium text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {allAssignment&&allAssignment.map((item,index)=>(<TableRow key={index}>
                    <TableCell className="font-medium">{item.title}</TableCell>
                    <TableCell>{new Date(item.duedate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</TableCell>
                    <TableCell>
                      <div className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                        Published
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="" size="sm" className="px-2 py-1 rounded-md text-sm " onClick={()=>{
                        handleUpdate(item)
                      }}>
                        Edit
                      </Button>
                      <Button variant="destructive" size="sm" className="ml-2 px-2 py-1 rounded-md text-sm " onClick={()=>{
                        handleDeletePrev(item._id)
                      }}>
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>))}
                 
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}
        {activeTab === "submitted" && (
          <Card className="shadow-lg rounded-lg">
            <CardHeader className="bg-card p-6">
              <CardTitle className="text-lg font-bold">Assignments Submitted</CardTitle>
              <CardDescription className="text-muted-foreground">
                Review and grade the assignments submitted by students.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <Table className="w-full">
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-sm font-medium">Student</TableHead>
                    <TableHead className="text-sm font-medium">Assignment</TableHead>
                    <TableHead className="text-sm font-medium">Submitted</TableHead>
                    <TableHead className="text-sm font-medium">Grade</TableHead>
                    <TableHead className="text-sm font-medium text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">John Doe</TableCell>
                    <TableCell>Midterm Exam</TableCell>
                    <TableCell>2023-05-14</TableCell>
                    <TableCell>
                      <div className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">A</div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm" className="px-2 py-1 rounded-md text-sm">
                        View
                      </Button>
                      <Button variant="outline" size="sm" className="ml-2 px-2 py-1 rounded-md text-sm">
                        Grade
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Jane Smith</TableCell>
                    <TableCell>Final Project</TableCell>
                    <TableCell>2023-06-29</TableCell>
                    <TableCell>
                      <div className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">B</div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm" className="px-2 py-1 rounded-md text-sm">
                        View
                      </Button>
                      <Button variant="outline" size="sm" className="ml-2 px-2 py-1 rounded-md text-sm">
                        Grade
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}
        {activeTab === "evaluated" && (
          <Card className="shadow-lg rounded-lg">
            <CardHeader className="bg-card p-6">
              <CardTitle className="text-lg font-bold">Assignments Evaluated</CardTitle>
              <CardDescription className="text-muted-foreground">
                View and manage the assignments that have been evaluated.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <Table className="w-full">
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-sm font-medium">Student</TableHead>
                    <TableHead className="text-sm font-medium">Assignment</TableHead>
                    <TableHead className="text-sm font-medium">Submitted</TableHead>
                    <TableHead className="text-sm font-medium">Grade</TableHead>
                    <TableHead className="text-sm font-medium text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">John Doe</TableCell>
                    <TableCell>Midterm Exam</TableCell>
                    <TableCell>2023-05-14</TableCell>
                    <TableCell>
                      <div className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">A</div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm" className="px-2 py-1 rounded-md text-sm">
                        View
                      </Button>
                      <Button variant="outline" size="sm" className="ml-2 px-2 py-1 rounded-md text-sm">
                        Edit Grade
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Jane Smith</TableCell>
                    <TableCell>Final Project</TableCell>
                    <TableCell>2023-06-29</TableCell>
                    <TableCell>
                      <div className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">B</div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm" className="px-2 py-1 rounded-md text-sm">
                        View
                      </Button>
                      <Button variant="outline" size="sm" className="ml-2 px-2 py-1 rounded-md text-sm">
                        Edit Grade
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}
      </div>
      <Button className="flex items-center gap-2 fixed lg:bottom-6 lg:right-6 md:bottom-4 md:right-4 bottom-2 right-2 rounded-full lg:py-8 md:py-8 py-8" size="lg" onClick={()=>{
      setaiopen(!aiopen)
    }}>
      <MessageCircleIcon className="h-5 w-5" />
      Chat with AI
    </Button>
   
<Chat aiopen={aiopen} setaiopen={setaiopen}/>
    </div>
    </>}
    {/* dialog box sarted from here */}
    <Dialog open={modalOpen}>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>Edit Assignment</DialogTitle>
          <DialogDescription>
            Make changes to your assignment here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <Card className="shadow-lg rounded-lg">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6" >
                <div className="grid gap-2">
                  <Label htmlFor="title" className="text-sm font-medium">
                    Title
                  </Label>
                  <Input
                    id="title"
                    name="title"
                    value={assignmentForm.title}
                    onChange={handleChange}
                    placeholder="Assignment Title"
                    className="rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm transition-colors focus:outline-none focus:ring-1 focus:ring-ring"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="due-date" className="text-sm font-medium">
                    Due Date
                  </Label>
                  <Input
                    id="due-date"
                    type="date"
                    name="duedate"
                    value={assignmentForm.duedate}
                    onChange={handleChange}
                    className="rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm transition-colors focus:outline-none focus:ring-1 focus:ring-ring"
                  />
                </div>
                <div className="grid gap-2 col-span-1 md:col-span-2">
                  <Label htmlFor="description" className="text-sm font-medium">
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    rows={4}
                    value={assignmentForm.desc}
                    name="desc"
                    onChange={handleChange}
                    placeholder="Assignment Description"
                    className="rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm transition-colors focus:outline-none focus:ring-1 focus:ring-ring"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="link" className="text-sm font-medium">
                    Links
                  </Label>
                  <Input
                    id="link"
                    type="url"
                    name="link"
                    value={assignmentForm.link}
                    onChange={handleChange}
                    className="rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm transition-colors focus:outline-none focus:ring-1 focus:ring-ring"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="type" className="text-sm font-medium">
                    Type
                  </Label>
                  <select
                  name="type"
                  onChange={handleChange}
                  value={assignmentForm.type}
                  className="rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm transition-colors focus:outline-none focus:ring-1 focus:ring-ring"
                  >
                    <option value={""}>Select</option>
                    <option value={"image"}>Image</option>
                    <option value={"video"}>Video</option>
                    <option value={"pdf"}>Pdf</option>

                  </select>
                </div>
              </div>
            </CardContent>
          </Card>
        <DialogFooter>
          <Button onClick={handleSubmitUpdate}>Update Assignment</Button>
          <Button variant={"destructive"} onClick={()=>{
            setModalOpen(false)
            setAssignmentform({
              title:"",
              desc:"",
              duedate:"",
              crid:params.add,
              type:"",
              link:"",
            })
          }}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
    {/* confirmation modal */}
    <AlertDialog open={alertopen}>

<AlertDialogContent>
  <AlertDialogHeader>
    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
    <AlertDialogDescription>
      This action cannot be undone. This will permanently delete your content
      and remove your data from our servers.
    </AlertDialogDescription>
  </AlertDialogHeader>
  <AlertDialogFooter>
    <AlertDialogCancel onClick={()=>{
      setAlertopen(false)
      setId("")
    }}>Cancel</AlertDialogCancel>
    <AlertDialogAction 
    onClick={handleDelete}
    >Continue</AlertDialogAction>
  </AlertDialogFooter>
</AlertDialogContent>
</AlertDialog>
{/* dialog box ended here */}
{/* dialog box for ai modal */}
<Dialog open={promptmodalopen}>
      
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Enter Your Prompt</DialogTitle>
          <DialogDescription>
            Enter your assignment topic name to create a assignment
          </DialogDescription>
        </DialogHeader>
        {!ailoading&&<div className="grid gap-4 py-4">
          <div className="">
            <Label htmlFor="name" className="text-right">
              Prompt 
            </Label>
            <Input id="name" className="my-2" placeholder="Enter Your Prompt to create a assignment" onChange={handleAipromptChange}
            value={aiprompt}
            />
          </div>
        </div>}
        {
          ailoading&&<div className="w-full max-w-md mx-auto animate-pulse p-9">
          <h1 className="h-2 bg-gray-300 rounded-lg w-52 dark:bg-gray-600" />
          <p className="w-48 h-2 mt-6 bg-gray-200 rounded-lg dark:bg-gray-700" />
          <p className="w-full h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700" />
          <p className="w-64 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700" />
          <p className="w-4/5 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700" />
        </div>
        
        }
        <DialogFooter>
    
          <Button variant={"destructive"} onClick={()=>{
            setPromptmodalopen(false)
          }}>Cancel</Button>
                <Button onClick={handleRunAi}>Create</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
    </>
  )
}
function MessageCircleIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
    </svg>
  )
}