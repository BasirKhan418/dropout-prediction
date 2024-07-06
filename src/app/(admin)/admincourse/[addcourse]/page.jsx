"use client"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import {ClipboardList,FolderGit2,TvMinimalPlay,X} from "lucide-react"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
import { set } from "mongoose"


export default function Component() {
  //states
  const [aiopen,setaiopen] = useState(false)
  const [alertopen,setalertopen] = useState(false)
  const [alertconfirm,setalertconfirm] = useState(false)
  const [alertfor,setalertfor] = useState("")
  const [createweek,setcreateweek] = useState(false)
  const [index,setindex] = useState("")
  const [update,setupdate] = useState(false)
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
//chnagesapi in db
  const [weeks, setWeeks] = useState([
    {
      name: "Week 1",
      type:"Orientation, Recording, Live Class",
      description: "This is the first week of the course",
      content: [
        {
          name: "Weekly Video",
          description: "This is the video of the week",
          link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
          type: "video"
        },
        {
          name: "Weekly Assignment",
          description: "This is the report of the week",
          link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
          type: "assignment"
        }
        ,
        {
          name: "Weekly Project",
          description: "This is the report of the week",
          link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
          type: "project"
        },
        {
          name: "Weekly Meeting",
          description: "This is the report of the week",
          link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
          type: "meeting"
        }
      ]
    },
    {
      name: "Week 2",
      type:"Orientation, Recording",
      description: "This is the first week of the course",
      content: [
        {
          name: "Weekly Video",
          description: "This is the video of the week",
          link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
          type: "video"
        },
        {
          name: "Weekly Assignment",
          description: "This is the report of the week",
          link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
          type: "assignment"
        },
        {
          name: "Weekly Meeting",
          description: "This is the report of the week",
          link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
          type: "meeting"
        }
      ]
    }
  ])
  return (
    <>
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
            

              
              {item.content&&item.content.map((cont,index)=>(<div className="flex items-center justify-between" key={index}>
           
                {cont.type=="video"&&<span className="flex justify-center items-center "> <VideoIcon className="h-5 w-5 text-muted-foreground mx-2" /> {cont.name}</span>}
               {cont.type=="assignment"&& <span className="flex justify-center items-center ">  <ClipboardList className="h-5 w-5 text-muted-foreground mx-2" /> {cont.name}</span>}
               {cont.type=="project"&& <span className="flex justify-center items-center ">  <FolderGit2 className="h-5 w-5 text-muted-foreground mx-2" /> {cont.name}</span>}
               {cont.type=="meeting"&& <span className="flex justify-center items-center ">  <TvMinimalPlay className="h-5 w-5 text-muted-foreground mx-2" /> {cont.name}</span>}
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon">
                    <FilePenIcon className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                  </Button>
                  <Button variant="ghost" size="icon">
                    <TrashIcon className="h-4 w-4" />
                    <span className="sr-only">Delete</span>
                  </Button>
                 
                </div>
              </div>))}
             
             
              <div className="flex justify-start items-center w-full">
              <Button className="bg-black rounded-full px-6 mx-2" size="sm">Create Content</Button>
              <Button className="bg-black rounded-full px-6 mx-2" size="sm" onClick={()=>updateweek(index)}>Update Week</Button>
              <Button className="bg-black rounded-full px-6 mx-2" size="sm" onClick={()=>{deleteweek(index)}}>Delete Week</Button>
              </div>
            </AccordionContent>
          </AccordionItem>))}
         
         
        </Accordion>
      </CardContent>
      <CardFooter className="flex justify-end">
       <Button className="bg-black rounded-full px-6 mx-2" onClick={()=>{setcreateweek(true)}}>Create</Button>
       <Button className="bg-black rounded-full px-6 mx-2">Save</Button>
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
        else{
          setalertopen(false)
        }
      }}>Continue</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>

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