"use client"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import {ClipboardList,FolderGit2,TvMinimalPlay,X,BookCheck,NotebookPen} from "lucide-react"
import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Toaster,toast } from "sonner"
import Chat from "@/utilities/Ai/Chat"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog"
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
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import ProfielSpinner from "@/utilities/Spinner/ProfielSpinner"
import { set } from "mongoose"
export default function Component({params}) {
  //useEffect
  const fetchallcoursedata = async()=>{
try{
  setLoading(true)
const res = await fetch(`/api/contentcrud?id=${params.addcourse}`,{
  method:"GET",
  headers:{
    "Content-Type":"application/json",
    "token":localStorage.getItem("dilmsadmintoken")
  }
})
const result = await res.json()
setLoading(false)
console.log(result)
setWeeks(result.data.content)
toast.success(result.message)
}
catch(err){
  toast.error("Something went wrong! try again later"+err)
}
  }
  //ender the fetch all course data
  useEffect(()=>{
fetchallcoursedata()
  },[])
  //states
  const [aiopen,setaiopen] = useState(false)
  const [alertopen,setalertopen] = useState(false)
  const [alertconfirm,setalertconfirm] = useState(false)
  const [alertfor,setalertfor] = useState("")
  const [createweek,setcreateweek] = useState(false)
  const [index,setindex] = useState("")
  const [loading,setLoading] = useState(false)
  const [weekindex,setweekindex] = useState("")
  const [update,setupdate] = useState(false)
  const [createcontentbool,setcreatecontentbool] = useState(false)
  const [createcontentform,setcreatecontentform] = useState({
    name:"",
    description:"",
    link:"",
    type:"",
    comment:[]
  })
  const [createweekform,setcreateweekform] = useState({
    name:"",
    type:"",
    description:"",
    content:[]
  })
//handlechanges
const handlecreateformchnage = (e)=>{
  setcreateweekform({...createweekform,[e.target.id]:e.target.value})
}
//handlecontentformchanges
const handlecreatecontentformchnage = (e)=>{
  setcreatecontentform({...createcontentform,[e.target.id]:e.target.value})

}
//handlesubmits
const handlecreateweeksubmit = ()=>{
  setWeeks([...weeks,createweekform])
  setcreateweek(false)
  setcreateweekform({name:"",type:"",description:"",content:[]})

}
//cruds for weeks injson
const updateweek = (index)=>{
setupdate(true)
setindex(index)
setcreateweekform(weeks[index])
setcreateweek(true)
}
//update submit
const handleupdatesubmit = ()=>{
  let temp = weeks
  temp[index]=createweekform
  setWeeks([...temp])
  setcreateweek(false)
  setupdate(false)
  setcreateweekform({name:"",type:"",description:"",content:[]})
  setindex("")
}
//content submit form
const handlecreatecontentsubmit = ()=>{
  console.log(createcontentform)
  let temp = weeks
  temp[index].content.push(createcontentform)
  setWeeks([...temp])
  setcreatecontentbool(false)
  setindex("")
  setcreatecontentform({name:"",type:"",description:"",link:""})

}
//update content submit
const handleupdatecontentsubmit = ()=>{
  let temp = weeks
  temp[index].content.push(createcontentform)
  setWeeks([...temp])
  setcreatecontentbool(false)
  setcreatecontentform({name:"",type:"",description:"",link:""})
  setupdate(false)
  setindex("")

}
//delete week
const deleteweek = (index)=>{
setindex(index)
setalertfor("week")
if(alertconfirm){
  let temp = weeks
  temp.splice(index,1)
  setWeeks([...temp])
  setalertopen(false)
  setalertconfirm(false)
  setalertfor("")
  setindex("")
}
else{
  setalertopen(true)
}
}
//update content
const updatecontent = (index,indexi)=>{
  setupdate(true)
  setindex(indexi)
  setweekindex(index)
  setcreatecontentform(weeks[index].content[indexi])
  setcreatecontentbool(true)
}
const updatecontentmodal=()=>{
  const temp = weeks
  temp[weekindex].content[index]=createcontentform
  setWeeks([...temp])
  setcreatecontentbool(false)
  setupdate(false)
  setcreatecontentform({name:"",type:"",description:"",link:""})
  setindex("")
  setweekindex("")
}
//trigger delete alert
const deletecontent = (index,indexi)=>{
setindex(indexi)
setweekindex(index)
setalertfor("content")
if(alertconfirm){
  let temp = weeks
  temp[index].content.splice(indexi,1)
  setWeeks([...temp])
  setalertopen(false)
  setalertconfirm(false)
  setalertfor("")
  setindex("")
  setweekindex("")
}
else{
  setalertopen(true)
}
}

//chnagesapi in db
  const [weeks, setWeeks] = useState([])
//saving all data into the data base
const handleSubmit = async()=>{
  const data = {content:weeks,id:params.addcourse}
  console.log(data)
  try{
    setLoading(true)  
   const res = await fetch("/api/contentcrud",{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
        "token":localStorage.getItem("dilmsadmintoken")
      },
      body:JSON.stringify(data)
   })
   const result = await res.json()
   console.log(result)  
    setLoading(false)
    if(result.success){
      toast.success(result.message)
    }
    else{
      toast.error(result.message)
    }

  }
  catch(err){
toast.error("Something went wrong! try again later"+err)
  }
}
  return (
    <>
     <Toaster position="top-center" expand={false}/>
   { loading?<ProfielSpinner/>:<>
   
    <div className="mx-4 my-2 ">
    <Card className="w-full max-w-2xl lg:max-w-4xl">
      <CardHeader>
        <CardTitle>Course Content</CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible>
          {weeks&&weeks.map((item,index)=>(<AccordionItem value={item.name} key={item.name}>
            <AccordionTrigger className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FolderIcon className="h-5 w-5 text-muted-foreground" />
                <span className="font-medium">{item.name}</span>
              </div>
              <div className="flex items-center gap-2 ">
              {item.type&&item.type.split(",").map((item,index)=>(<Badge variant="" className={"bg-black"} key={index}>{item}</Badge>))}
              </div>
            </AccordionTrigger>
            <AccordionContent className="space-y-4 p-4">
            

              
              {item.content&&item.content.map((cont,indexi)=>(<div className="flex items-center justify-between" key={indexi}>
           
                {cont.type=="video"&&<span className="flex justify-center items-center "> <VideoIcon className="h-5 w-5 text-muted-foreground mx-2" /> {cont.name}</span>}
               {cont.type=="assignment"&& <span className="flex justify-center items-center ">  <ClipboardList className="h-5 w-5 text-muted-foreground mx-2" /> {cont.name}</span>}
               {cont.type=="project"&& <span className="flex justify-center items-center ">  <FolderGit2 className="h-5 w-5 text-muted-foreground mx-2" /> {cont.name}</span>}
               {cont.type=="meeting"&& <span className="flex justify-center items-center ">  <TvMinimalPlay className="h-5 w-5 text-muted-foreground mx-2" /> {cont.name}</span>}
               {cont.type=="test"&& <span className="flex justify-center items-center ">  <BookCheck className="h-5 w-5 text-muted-foreground mx-2" /> {cont.name}</span>}
               {cont.type=="note"&& <span className="flex justify-center items-center ">  <NotebookPen className="h-5 w-5 text-muted-foreground mx-2" /> {cont.name}</span>}
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" onClick={()=>{
                    updatecontent(index,indexi)
                  }}>
                    <FilePenIcon className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                  </Button>
                  <Button variant="ghost" size="icon" onClick={()=>{
                    deletecontent(index,indexi)
                  }}>
                    <TrashIcon className="h-4 w-4" />
                    <span className="sr-only">Delete</span>
                  </Button>
                 
                </div>
              </div>))}
             
             
              <div className="flex justify-start items-center w-full">
              <Button className="bg-black rounded-full px-6 mx-2" size="sm" onClick={()=>{
                setcreatecontentbool(true)
                setindex(index) 
              }}>Create Content</Button>
              <Button className="bg-black rounded-full px-6 mx-2" size="sm" onClick={()=>updateweek(index)}>Update Week</Button>
              <Button className="bg-black rounded-full px-6 mx-2" size="sm" onClick={()=>{deleteweek(index)}}>Delete Week</Button>
              </div>
            </AccordionContent>
          </AccordionItem>))}
         
         
        </Accordion>
      </CardContent>
      <CardFooter className="flex justify-end">
       <Button className="bg-black rounded-full px-6 mx-2" onClick={()=>{setcreateweek(true)}}>Create</Button>
       <Button className="bg-black rounded-full px-6 mx-2" onClick={handleSubmit}>Save</Button>
      </CardFooter>
    </Card>
    
    <Button className="flex items-center gap-2 fixed lg:bottom-8 lg:right-8 md:bottom-4 md:right-4 bottom-2 right-2 rounded-full lg:py-8 md:py-8 py-8" size="lg" onClick={()=>{
      setaiopen(!aiopen)
    }}>
      <MessageCircleIcon className="h-5 w-5" />
      Chat with AI
    </Button>
   
<Chat aiopen={aiopen} setaiopen={setaiopen}/>
    </div>
    {/* <Dialog> //starts from here</Dialog> */}
    <Dialog open={createweek}>
      <DialogContent className="sm:max-w-[425px] ">
        <div className="absolute right-4 top-4 cursor-pointer" >
        <X onClick={()=>{
          setcreateweek(false)
          setupdate(false)
          setcreateweekform({name:"",type:"",description:"",content:[]})
          setindex("")
          }}/>
        </div>
        <DialogHeader>
          <DialogTitle>Create Content Folder/Week</DialogTitle>
          <DialogDescription>
            Make changes to your content folder here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              defaultValue=""
              onChange={handlecreateformchnage}
              value={createweekform.name}
              className="col-span-3"
              placeholder="Week 1"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Type
            </Label>
            <Input
              id="type"
              onChange={handlecreateformchnage}
              value={createweekform.type}
              className="col-span-3"
              placeholder="Orientation, Recording, Live Class"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Description
            </Label>
            <Input
              id="description"
              onChange={handlecreateformchnage}
              value={createweekform.description}
              className="col-span-3"
              placeholder="This is the first week of the course"
            />
          </div>
        </div>
        <DialogFooter>
         {!update&& <Button onClick={handlecreateweeksubmit}>Save changes</Button>}
         {update&& <Button onClick={handleupdatesubmit}>Update changes</Button>}
        </DialogFooter>
      </DialogContent>
    </Dialog>
    {/* create content dialog starts from here */}
    <Dialog open={createcontentbool}>
      <DialogContent className="sm:max-w-[625px] ">
        <div className="absolute right-4 top-4 cursor-pointer" >
        <X onClick={()=>{
          setcreatecontentbool(false)
          setupdate(false)
          setcreatecontentform({name:"",type:"",description:"",link:""})
          setindex("")
          setweekindex("")
          }}/>
        </div>
        <DialogHeader>
          <DialogTitle>Create Content Video,Assigments ,Meetings and Projects</DialogTitle>
          <DialogDescription>
            Make changes to your Video,Assigments ,Meetings and Projects here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              defaultValue=""
              onChange={handlecreatecontentformchnage}
              value={createcontentform.name}
              className="col-span-3"
              placeholder="Weekly Video"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="type" className="text-right">
              Type
            </Label>
            <Select id="type" value={createcontentform.type} onValueChange={(value) =>
        handlecreatecontentformchnage({ target: { id: 'type', value } })
      } >
      <SelectTrigger className="lg:w-[425px]" >
        <SelectValue placeholder="Select a Type" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup >
          <SelectLabel>Content Type</SelectLabel>
          <SelectItem value="video">Video</SelectItem>
          <SelectItem value="assignment">Assignment</SelectItem>
          <SelectItem value="meeting">Meeting</SelectItem>
          <SelectItem value="project">Projects</SelectItem>
          <SelectItem value="note">Notes</SelectItem>
          <SelectItem value="test">Test</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Input
              id="description"
              onChange={handlecreatecontentformchnage}
              value={createcontentform.description}
              className="col-span-3"
              placeholder="This is the first week of the course"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="link" className="text-right">
              Link
            </Label>
            <Input
              id="link"
              onChange={handlecreatecontentformchnage}
              value={createcontentform.link}
              className="col-span-3"
              placeholder="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
            />
          </div>
        </div>
        <DialogFooter>
         {!update&& <Button onClick={handlecreatecontentsubmit}>Save changes</Button>}
         {update&& <Button onClick={updatecontentmodal}>Update changes</Button>}
        </DialogFooter>
      </DialogContent>
    </Dialog>
    {/* alerts starts here */}
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
      setalertconfirm(false)
      setalertopen(false)
      setalertfor("")
      setindex("")
      }}>Cancel</AlertDialogCancel>
      <AlertDialogAction onClick={()=>{setalertconfirm(true) 
        if(alertfor=="week"){
          deleteweek(index)
        }
        else if(alertfor=="content"){
          deletecontent(weekindex,index)
        }
        else{
          setalertopen(false)
        }
      }}>Continue</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>

    </>}
    </>
  )
}

function FileIcon(props) {
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
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
    </svg>
  )
}


function FilePenIcon(props) {
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
      <path d="M12 22h6a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v10" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <path d="M10.4 12.6a2 2 0 1 1 3 3L8 21l-4 1 1-4Z" />
    </svg>
  )
}


function FolderIcon(props) {
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
      <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" />
    </svg>
  )
}


function MoveHorizontalIcon(props) {
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
      <polyline points="18 8 22 12 18 16" />
      <polyline points="6 8 2 12 6 16" />
      <line x1="2" x2="22" y1="12" y2="12" />
    </svg>
  )
}


function TrashIcon(props) {
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
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  )
}


function VideoIcon(props) {
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
      <path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5" />
      <rect x="2" y="6" width="14" height="12" rx="2" />
    </svg>
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