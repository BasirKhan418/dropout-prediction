
"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import { AiOutlineMenuFold } from "react-icons/ai";
import { AiOutlineMenuUnfold } from "react-icons/ai";
import { IoMdArrowRoundBack } from "react-icons/io";
export default function CourseSidebar() {
  const [activeFolder, setActiveFolder] = useState("overview")
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isopen,setIsopen] = useState(true);
  return (
    <div className=" h-[100vh] w-full flex-col">
         <header className="bg-white dark:bg-gray-900 p-3 md:p-4 flex flex-col md:flex-row justify-between items-center shadow h-20">
            
      <div className="flex items-center mb-2 md:mb-0">
     { !isopen&&<div className="mx-4">
           <AiOutlineMenuUnfold className="h-7 w-7" onClick={()=>{
                setIsopen(!isopen)
              }}
              />
            </div>}
        <img src="https://res.cloudinary.com/dst73auvn/image/upload/v1718998002/ljyzihnrzwfd61veakyb.png" alt="Company Logo" className="h-10 mr-2" />
        <h1 className="text-xl font-bold text-gray-800 dark:text-gray-200">DevsIndia</h1>
      </div>
      <h2 className="text-md md:text-lg font-bold text-gray-800 dark:text-gray-400 mb-2 md:mb-0">Full Stack Developement</h2>
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
      <header className="flex items-center justify-between bg-muted px-4 py-3 md:hidden">
        <Link href="/course" >
          < IoMdArrowRoundBack className="h-6 w-6" />
        </Link>
        <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <MenuIcon className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </header>
      <div className="flex flex-1">
      <div
        className={`bg-white dark:bg-gray-800 p-6 border-r w-[300px] fixed top-0 left-0 h-full transform transition-transform duration-300 ease-in-out ${isopen?"sm:translate-x-0":"-translate-x-full"} ${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
          <div className="flex items-center mb-2 md:mb-0 justify-between">
            <div className="flex justify-center items-center">
        <img src="https://res.cloudinary.com/dst73auvn/image/upload/v1718998002/ljyzihnrzwfd61veakyb.png" alt="Company Logo" className="h-10 mr-2" />
        <h1 className="text-xl font-bold text-gray-800 dark:text-gray-200">DevsIndia</h1>
        </div>
        {!isMenuOpen&&<Link href="/course" >
          < IoMdArrowRoundBack className="h-6 w-6" />
        </Link>}
      </div>
    
          <div className="flex items-center justify-between mb-4 mt-4">
        
           
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
          <Accordion type="single" collapsible>
            <AccordionItem value="week1">
              <AccordionTrigger className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FolderIcon className="h-5 w-5" />
                  <span>Week 1</span>
                </div>
                <div className="flex items-center gap-1">
                  <ChevronRightIcon className="h-4 w-4 transition-transform data-[state=open]:rotate-90" />
                  <ChevronRightIcon className="h-4 w-4 transition-transform data-[state=open]:rotate-90" />
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid gap-2 pl-6">
                  <Link
                    href="#"
                    className={`flex items-center gap-2 rounded-md px-2 py-1 transition-colors hover:bg-accent hover:text-accent-foreground ${
                      activeFolder === "video1" ? "bg-accent text-accent-foreground" : ""
                    }`}
                    onClick={() => setActiveFolder("video1")}
                    prefetch={false}
                  >
                    <FileIcon className="h-4 w-4" />
                    <span>Video 1</span>
                  </Link>
                  <Link
                    href="#"
                    className={`flex items-center gap-2 rounded-md px-2 py-1 transition-colors hover:bg-accent hover:text-accent-foreground ${
                      activeFolder === "note1" ? "bg-accent text-accent-foreground" : ""
                    }`}
                    onClick={() => setActiveFolder("note1")}
                    prefetch={false}
                  >
                    <FileIcon className="h-4 w-4" />
                    <span>Note 1</span>
                  </Link>
                  <Link
                    href="#"
                    className={`flex items-center gap-2 rounded-md px-2 py-1 transition-colors hover:bg-accent hover:text-accent-foreground ${
                      activeFolder === "assignment1" ? "bg-accent text-accent-foreground" : ""
                    }`}
                    onClick={() => setActiveFolder("assignment1")}
                    prefetch={false}
                  >
                    <FileIcon className="h-4 w-4" />
                    <span>Assignment 1</span>
                  </Link>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="week2">
              <AccordionTrigger className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FolderIcon className="h-5 w-5" />
                  <span>Week 2</span>
                </div>
                <div className="flex items-center gap-1">
                  <ChevronRightIcon className="h-4 w-4 transition-transform data-[state=open]:rotate-90" />
                  <ChevronRightIcon className="h-4 w-4 transition-transform data-[state=open]:rotate-90" />
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid gap-2 pl-6">
                  <Link
                    href="#"
                    className={`flex items-center gap-2 rounded-md px-2 py-1 transition-colors hover:bg-accent hover:text-accent-foreground ${
                      activeFolder === "video2" ? "bg-accent text-accent-foreground" : ""
                    }`}
                    onClick={() => setActiveFolder("video2")}
                    prefetch={false}
                  >
                    <FileIcon className="h-4 w-4" />
                    <span>Video 2</span>
                  </Link>
                  <Link
                    href="#"
                    className={`flex items-center gap-2 rounded-md px-2 py-1 transition-colors hover:bg-accent hover:text-accent-foreground ${
                      activeFolder === "note2" ? "bg-accent text-accent-foreground" : ""
                    }`}
                    onClick={() => setActiveFolder("note2")}
                    prefetch={false}
                  >
                    <FileIcon className="h-4 w-4" />
                    <span>Note 2</span>
                  </Link>
                  <Link
                    href="#"
                    className={`flex items-center gap-2 rounded-md px-2 py-1 transition-colors hover:bg-accent hover:text-accent-foreground ${
                      activeFolder === "assignment2" ? "bg-accent text-accent-foreground" : ""
                    }`}
                    onClick={() => setActiveFolder("assignment2")}
                    prefetch={false}
                  >
                    <FileIcon className="h-4 w-4" />
                    <span>Assignment 2</span>
                  </Link>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="week3">
              <AccordionTrigger className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FolderIcon className="h-5 w-5" />
                  <span>Week 3</span>
                </div>
                <div className="flex items-center gap-1">
                  <ChevronRightIcon className="h-4 w-4 transition-transform data-[state=open]:rotate-90" />
                  <ChevronRightIcon className="h-4 w-4 transition-transform data-[state=open]:rotate-90" />
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid gap-2 pl-6">
                  <Link
                    href="#"
                    className={`flex items-center gap-2 rounded-md px-2 py-1 transition-colors hover:bg-accent hover:text-accent-foreground ${
                      activeFolder === "video3" ? "bg-accent text-accent-foreground" : ""
                    }`}
                    onClick={() => setActiveFolder("video3")}
                    prefetch={false}
                  >
                    <FileIcon className="h-4 w-4" />
                    <span>Video 3</span>
                  </Link>
                  <Link
                    href="#"
                    className={`flex items-center gap-2 rounded-md px-2 py-1 transition-colors hover:bg-accent hover:text-accent-foreground ${
                      activeFolder === "note3" ? "bg-accent text-accent-foreground" : ""
                    }`}
                    onClick={() => setActiveFolder("note3")}
                    prefetch={false}
                  >
                    <FileIcon className="h-4 w-4" />
                    <span>Note 3</span>
                  </Link>
                  <Link
                    href="#"
                    className={`flex items-center gap-2 rounded-md px-2 py-1 transition-colors hover:bg-accent hover:text-accent-foreground ${
                      activeFolder === "assignment3" ? "bg-accent text-accent-foreground" : ""
                    }`}
                    onClick={() => setActiveFolder("assignment3")}
                    prefetch={false}
                  >
                    <FileIcon className="h-4 w-4" />
                    <span>Assignment 3</span>
                  </Link>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        <div className="flex-1 p-8">
          {activeFolder === "overview" && (
            <div className={`${isopen?"sm:absolute sm:left-80":""} `}>
              <h2 className="text-2xl font-bold">Introduction</h2>
              <p className="mt-4 text-muted-foreground">
                Welcome to the Introduction to Web Development course! In this course, you will learn the fundamentals
                of web development, including HTML, CSS, and JavaScript. You will build a solid foundation in web
                technologies and learn how to create responsive and interactive web pages.
              </p>
              <h2 className="mt-8 text-2xl font-bold">Syllabus</h2>
              <ul className="mt-4 list-disc pl-6 text-muted-foreground">
                <li>HTML Basics</li>
                <li>CSS Fundamentals</li>
                <li>JavaScript Essentials</li>
                <li>Responsive Design</li>
                <li>Web Accessibility</li>
                <li>Web Development Workflow</li>
              </ul>
            </div>
          )}
          {activeFolder === "syllabus" && (
            <div className="">
              <h2 className="text-2xl font-bold">Course Syllabus</h2>
              <div className="mt-4 grid gap-4">
                <div>
                  <h3 className="text-xl font-bold">Module 1: HTML Basics</h3>
                  <p className="mt-2 text-muted-foreground">
                    In this module, you will learn the fundamentals of HTML, including tags, elements, and structure.
                  </p>
                  <ul className="mt-2 list-disc pl-6 text-muted-foreground">
                    <li>Introduction to HTML</li>
                    <li>HTML Tags and Elements</li>
                    <li>HTML Structure and Semantics</li>
                    <li>HTML Forms and Input Types</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-bold">Module 2: CSS Fundamentals</h3>
                  <p className="mt-2 text-muted-foreground">
                    In this module, you will learn the basics of CSS, including selectors, properties, and layout.
                  </p>
                  <ul className="mt-2 list-disc pl-6 text-muted-foreground">
                    <li>Introduction to CSS</li>
                    <li>CSS Selectors and Specificity</li>
                    <li>CSS Properties and Values</li>
                    <li>CSS Layout and Positioning</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-bold">Module 3: JavaScript Essentials</h3>
                  <p className="mt-2 text-muted-foreground">
                    In this module, you will learn the fundamentals of JavaScript, including variables, functions, and
                    DOM manipulation.
                  </p>
                  <ul className="mt-2 list-disc pl-6 text-muted-foreground">
                    <li>Introduction to JavaScript</li>
                    <li>JavaScript Variables and Data Types</li>
                  </ul>
                </div>
              </div>
            </div>
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