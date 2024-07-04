"use client"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"


import { useState } from "react"
import Chat from "@/utilities/Ai/Chat"

export default function Component() {
  const [aiopen,setaiopen] = useState(false)
  return (
    <>
    <div className="mx-4 my-2 ">
    <Card className="w-full max-w-2xl lg:max-w-4xl">
      <CardHeader>
        <CardTitle>Course Content</CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible>
          <AccordionItem value="week-1">
            <AccordionTrigger className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FolderIcon className="h-5 w-5 text-muted-foreground" />
                <span className="font-medium">Week 1</span>
              </div>
              <div className="flex items-center gap-2">
              <Badge variant="" className={"bg-black"}>Orientation</Badge>
              <Badge variant="" className={"bg-black"}>Recording</Badge>
              <Badge variant="" className={"bg-black"}>Live Class</Badge>
              </div>
            </AccordionTrigger>
            <AccordionContent className="space-y-4 p-4">
            

              
              <div className="flex items-center justify-between">
           
                <span className="flex justify-center items-center "> <VideoIcon className="h-5 w-5 text-muted-foreground mx-2" /> Weekly Video</span>
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
              </div>
             
              <div className="flex items-center justify-between">
                <span className="flex justify-center items-center ">  <FileIcon className="h-5 w-5 text-muted-foreground mx-2" /> Weekly Report</span>
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
              </div>
            </AccordionContent>
          </AccordionItem>
         
         
        </Accordion>
      </CardContent>
      <CardFooter className="flex justify-end">
       <Button className="bg-black rounded-full px-6">Create</Button>
      </CardFooter>
    </Card>
    
    <Button className="flex items-center gap-2 absolute lg:bottom-8 lg:right-8 md:bottom-4 md:right-4 bottom-2 right-2 rounded-full lg:py-8 md:py-8 py-8" size="lg" onClick={()=>{
      setaiopen(!aiopen)
    }}>
      <MessageCircleIcon className="h-5 w-5" />
      Chat with AI
    </Button>
   
<Chat aiopen={aiopen} setaiopen={setaiopen}/>
    </div>
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