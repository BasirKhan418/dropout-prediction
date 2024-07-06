
"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import { AiOutlineMenuFold } from "react-icons/ai";
import { AiOutlineMenuUnfold } from "react-icons/ai";
import { IoMdArrowRoundBack } from "react-icons/io";
import { IoVideocamOutline } from "react-icons/io5";
import { MdOutlineAssignmentTurnedIn } from "react-icons/md";
import { FaFolder } from "react-icons/fa";
import { Badge } from "@/components/ui/badge"

import {ClipboardList,FolderGit2,TvMinimalPlay,X,BookCheck,NotebookPen,Video} from "lucide-react"
import { set } from "mongoose"
export default function CourseSidebar({weeksdata,alldata}) {
  const [activeFolder, setActiveFolder] = useState("overview")
  const [activemenu,setActivemenu] = useState("")
  const [content,setContent] = useState([])
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isopen,setIsopen] = useState(true);
  const [menuWeek, setMenuWeek] = useState("")
  console.log(content)
  return (
    <div className=" h-[100vh] w-full flex-col  ">
       <header className="fixed top-0 left-0 w-full bg-white dark:bg-gray-900 p-3 md:p-4 flex flex-col md:flex-row justify-between items-center shadow h-20 z-20">
            
            <div className="flex items-center mb-2 md:mb-0">
           { !isopen&&<div className="mx-4">
                 <AiOutlineMenuUnfold className="h-7 w-7" onClick={()=>{
                      setIsopen(!isopen)
                    }}
                    />
                  </div>}
              <img src="https://res.cloudinary.com/dst73auvn/image/upload/v1718998002/ljyzihnrzwfd61veakyb.png" alt="Company Logo" className="h-10 mr-2" onClick={()=>{
                    setActiveFolder("overview")
                  }}/>
              <h1 className="text-xl font-bold text-gray-800 dark:text-gray-200">DevsIndia</h1>
            </div>
            <h2 className="text-md md:text-lg font-bold text-gray-800 dark:text-gray-400 mb-2 md:mb-0">{alldata.title}</h2>
            <div className="flex space-x-3">
              <button className="flex items-center bg-blue-600 text-white px-3 py-1.5 rounded-full shadow hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition duration-300 ease-in-out">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                </svg>
                Previous
              </button>
              <button className="flex items-center bg-blue-600 text-white px-3 py-1.5 rounded-full shadow hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition duration-300 ease-in-out">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
                Next
              </button>
            </div>
          </header>
      <header className="flex items-center justify-between bg-muted px-4 py-3 md:hidden ">
        <Link href="/course" >
          < IoMdArrowRoundBack className="h-6 w-6" />
        </Link>
        <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <MenuIcon className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </header>

      <div className="flex flex-1 pt-16">
      <div
        className={`z-50 bg-white dark:bg-gray-800 p-6 border-r w-[300px] fixed top-0 left-0 h-full transform transition-transform duration-300 ease-in-out ${isopen?"sm:translate-x-0":"-translate-x-full"} ${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
          <div className="flex items-center mb-2 md:mb-0 justify-between">
            <div className="flex justify-center items-center" onClick={()=>{
              setActiveFolder("overview")
            }}>
        <img src="https://res.cloudinary.com/dst73auvn/image/upload/v1718998002/ljyzihnrzwfd61veakyb.png" alt="Company Logo" className="h-10 mr-2" />
        <h1 className="text-xl font-bold text-gray-800 dark:text-gray-200">DevsIndia</h1>
        </div>
        {!isMenuOpen&&<Link href="/course" >
          < IoMdArrowRoundBack className="h-6 w-6" />
        </Link>}
      </div>
    
          <div className="flex items-center justify-between mb-4 mt-4 ">
        
           
             {!isMenuOpen&& <AiOutlineMenuFold className="h-6 w-6" onClick={()=>{
                setIsopen(!isopen)
              }}/>}
               {isMenuOpen&& <AiOutlineMenuFold className="h-6 w-6" onClick={()=>{
                setIsMenuOpen(!isMenuOpen)
              }}/>}
              
          
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">75%</span>
              <Progress value={75} className="w-32" />
            </div>
          </div>
          <Accordion type="single" collapsible value={menuWeek} onValueChange={setMenuWeek}>
            {weeksdata&&weeksdata.map((item)=>(<AccordionItem value={item.name} >
              <AccordionTrigger className="flex items-center justify-between" >
                <div className="flex items-center gap-2">
                  <FolderIcon className="h-5 w-5" />
                  <span className="font-semibold">{item.name}</span>
                </div>
                <div className="flex items-center gap-1">
                  <ChevronRightIcon className="h-4 w-4 transition-transform data-[state=open]:rotate-90" />
                  <ChevronRightIcon className="h-4 w-4 transition-transform data-[state=open]:rotate-90" />
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid gap-2 pl-6">
                  {item.content.map((item,index)=>(<>
                 { item.type=="video"&&<Link
                    href="#"
                    key={index}
                    className={`flex items-center gap-2 rounded-md px-2 py-1 transition-colors hover:bg-accent hover:text-accent-foreground font-medium ${
                      activemenu == item.name ? "bg-accent text-accent-foreground" : ""
                    }`}
                    onClick={() => {
                      setActiveFolder("video")
                      setActivemenu(item.name)
                      setContent(item)
                    }}
                    prefetch={false}
                  >
                    <Video className="h-5 w-5" />
                    <span>{item.name}</span>
                  </Link>}
                  { item.type=="note"&&<Link
                    href="#"
                    key={index}
                    className={`flex items-center gap-2 rounded-md px-2 py-1 transition-colors hover:bg-accent hover:text-accent-foreground font-medium ${
                      activemenu === item.name ? "bg-accent text-accent-foreground" : ""
                    }`}
                    onClick={() => {
                      setActiveFolder("note")
                      setActivemenu(item.name)
                      setContent(item)
                    }}
                    prefetch={false}
                  >
                    <NotebookPen className="h-5 w-5" />
                    <span>{item.name}</span>
                  </Link>}
                  { item.type=="assignment"&&<Link
                    href="#"
                    key={index}
                    className={`flex items-center gap-2 rounded-md px-2 py-1 transition-colors hover:bg-accent hover:text-accent-foreground font-medium ${
                      activemenu === item.name ? "bg-accent text-accent-foreground" : ""
                    }`}
                    onClick={() => {
                      setActiveFolder("assignment")
                      setActivemenu(item.name)
                      setContent(item)
                    }}
                    prefetch={false}
                  >
                    <ClipboardList className="h-5 w-5" />
                    <span>{item.name}</span>
                  </Link>}
                  { item.type=="project"&&<Link
                    href="#"
                    key={index}
                    className={`flex items-center gap-2 rounded-md px-2 py-1 transition-colors hover:bg-accent hover:text-accent-foreground font-medium ${
                      activemenu=== item.name ? "bg-accent text-accent-foreground" : ""
                    }`}
                    onClick={() => {
                      setActiveFolder("project")
                      setActivemenu(item.name)
                      setContent(item)
                    }}
                    prefetch={false}
                  >
                    <FolderGit2 className="h-5 w-5" />
                    <span>{item.name}</span>
                  </Link>}
                  { item.type=="meeting"&&<Link
                    href="#"
                    key={index}
                    className={`flex items-center gap-2 rounded-md px-2 py-1 transition-colors hover:bg-accent hover:text-accent-foreground font-medium ${
                      activemenu === item.name ? "bg-accent text-accent-foreground" : ""
                    }`}
                    onClick={() => {
                      setActiveFolder("meeting")
                      setActivemenu(item.name)
                      setContent(item)
                    }}
                    prefetch={false}
                  >
                    <TvMinimalPlay className="h-5 w-5" />
                    <span>{item.name}</span>
                  </Link>}
                  { item.type=="test"&&<Link
                    href="#"
                    key={index}
                    className={`flex items-center gap-2 rounded-md px-2 py-1 transition-colors hover:bg-accent hover:text-accent-foreground font-medium ${
                      activemenu=== item.name ? "bg-accent text-accent-foreground" : ""
                    }`}
                    onClick={() => {
                      setActiveFolder("test")
                      setActivemenu(item.name)
                      setContent(item)
                    }}
                    prefetch={false}
                  >
                    <BookCheck className="h-5 w-5" />
                    <span>{item.name}</span>
                  </Link>}
                  
                  </>))}
                  
                
                </div>
              </AccordionContent>
            </AccordionItem>))}
           
          
          </Accordion>
        </div>
        <div className="flex-1 p-8">
          {activeFolder === "overview" && (
            <div className={`${isopen?"sm:absolute sm:left-80":""} `}>
              <div className="flex flex-col">
      <section className="bg-white py-12  ">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 grid md:grid-cols-2 gap-8 items-center">
          <div className="text-center md:text-left">
            <h1 className="text-4xl font-bold text-black md:text-5xl lg:text-5xl">
              Welcome to Our {alldata&&alldata.title} Course
            </h1>
            <p className=" text-sm text-gray-700 font-medium mt-10 leading-6">
              {alldata&&alldata.desc}
            </p>
            <p className=" text-sm text-gray-700 font-medium mt-2 leading-6">
           { alldata.skills&&alldata.skills.split(",").map((item,index)=>(<Badge variant="outline" className="mx-2 my-2 " key={index}>{item}  </Badge>))}

            </p>
            <div className="mt-8">
              <button
                className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-primary/90 focus:outline-none focus:ring-1 focus:ring-primary focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                onClick={()=>{setMenuWeek(weeksdata[0].name)}}
              >
                Get Started
              </button>
              <Link
                href="#coursecontent"
                className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-primary/90 focus:outline-none focus:ring-1 focus:ring-primary focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 mx-6"
                prefetch={false}
              >
                Course Content
              </Link>
            </div>
          </div>
          <div className="w-full md:max-w-[500px] lg:max-w-[600px] mx-auto ">
            <img
              src={alldata&&alldata.img}
              width={600}
              height={400}
              alt="Hero Image"
              className="rounded-lg object-cover w-full"
            />
          </div>
        </div>
      </section>
      <section className="py-12 md:py-20 lg:py-28" id="coursecontent">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <h2 className="mb-8 text-3xl font-bold md:text-4xl">Course Modules</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {weeksdata&&weeksdata.map((item,index)=>(<div className="rounded-lg bg-card p-4 shadow transition-all hover:scale-105" key={index} onClick={()=>{
              setMenuWeek(item.name)
            }}>
              <img
                src="/course/folderimg.jpg"
                width={300}
                height={200}
                alt={item.name}
                className="mb-4 rounded-lg object-cover "
              />
              <h3 className="mb-2 text-lg font-semibold">{item.name}: {item.type}</h3>
              <p className="text-muted-foreground">
               {item.description}
              </p>
            </div>))}
           
        </div>
        </div>
      </section>
    </div>
            </div>
          )}
          {/* video starts here */}
          {activeFolder === "video" && (
           <>
             <div className={`${isopen?"sm:absolute sm:left-80":""} `}>
              {content.name}: {content.type} : {content.link}
             </div>
           </>
          )}
          {/* assigment starts here */}
           {activeFolder === "assignment" && (
           <>
             <div className={`${isopen?"sm:absolute sm:left-80":""} `}>
              {content.name}: {content.type} : {content.link}
             </div>
           </>
          )}
          {/* note start here */}
          {activeFolder === "note" && (
           <>
             <div className={`${isopen?"sm:absolute sm:left-80":""} `}>
              {content.name}: {content.type} : {content.link}
             </div>
           </>
          )}
          {/* //meeting starts here */}
          {activeFolder === "meeting" && (
           <>
             <div className={`${isopen?"sm:absolute sm:left-80":""} `}>
              {content.name}: {content.type} : {content.link}
             </div>
           </>
          )}
          {/* //project starts here */}
          {activeFolder === "project" && (
           <>
             <div className={`${isopen?"sm:absolute sm:left-80":""} `}>
              {content.name}: {content.type} : {content.link}
             </div>
           </>
          )}
        </div>
      </div>
    </div>
  )
}

function ChevronRightIcon(props) {
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
      <path d="m9 18 6-6-6-6" />
    </svg>
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


function MenuIcon(props) {
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
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  )
}


function MountainIcon(props) {
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
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  )
}