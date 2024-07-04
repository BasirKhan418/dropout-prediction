"use client"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { IoCloseSharp } from "react-icons/io5";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
const Chat = ({aiopen,setaiopen}) => {
    console.log(aiopen)
  return (
    <>
     <Sheet open={aiopen} >
  <SheetContent >
    <div className="absolute right-[13px] top-[10px] cursor-pointer" onClick={()=>{
      setaiopen(!aiopen)
    }}>
    <IoCloseSharp className="text-2xl  " />
    </div>
    <>
    <div className="flex flex-col h-screen">
      <header className="bg-primary text-primary-foreground py-4 px-6 flex items-center">
        <div className="flex items-center gap-2">
          <BotIcon className="w-6 h-6" />
          <h1 className="text-xl font-bold">AI Chat</h1>
        </div>
      </header>
      <div className="flex-1 overflow-auto p-6">
        <div className="grid gap-4">
          <div className="flex items-start gap-4">
            <Avatar className="w-10 h-10 bg-primary text-primary-foreground flex items-center justify-center">
              <AvatarFallback>AI</AvatarFallback>
            </Avatar>
            <div className="bg-muted rounded-2xl p-4 max-w-[70%]">
              <p>Hello! I'm an AI assistant. How can I help you today?</p>
            </div>
          </div>
          <div className="flex items-start gap-4 justify-end">
            <div className="bg-primary text-primary-foreground rounded-2xl p-4 max-w-[70%]">
              <p>Hi there! I have a question about the new product features.</p>
            </div>
            <Avatar className="w-10 h-10 bg-accent text-accent-foreground flex items-center justify-center">
              <AvatarImage src="/placeholder-user.jpg" />
            </Avatar>
          </div>
          <div className="flex items-start gap-4">
            <Avatar className="w-10 h-10 bg-primary text-primary-foreground flex items-center justify-center">
              <AvatarFallback>AI</AvatarFallback>
            </Avatar>
            <div className="bg-muted rounded-2xl p-4 max-w-[70%]">
              <p>Sure, I'd be happy to help with that. What would you like to know?</p>
            </div>
          </div>
          <div className="flex items-start gap-4 justify-end">
            <div className="bg-primary text-primary-foreground rounded-2xl p-4 max-w-[70%]">
              <p>I'm curious about the new AI-powered features. How do they work?</p>
            </div>
            <Avatar className="w-10 h-10 bg-accent text-accent-foreground flex items-center justify-center">
              <AvatarImage src="/placeholder-user.jpg" />
            </Avatar>
          </div>
          <div className="flex items-start gap-4">
            <Avatar className="w-10 h-10 bg-primary text-primary-foreground flex items-center justify-center">
              <AvatarFallback>AI</AvatarFallback>
            </Avatar>
            <div className="bg-muted rounded-2xl p-4 max-w-[70%]">
              <p>
                The new AI features use advanced language models to provide intelligent assistance. They can understand
                natural language, answer questions, and even help with tasks like research and analysis. Let me know if
                you have any other questions!
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-background border-t px-6 py-4 mb-8">
        <div className="relative">
          <Textarea
            placeholder="Type your message..."
            className="w-full rounded-2xl pr-16 border-muted focus:border-primary focus:ring-primary "
            rows={1}
          />
          <Button type="submit" variant="ghost" size="icon" className="absolute top-1/2 -translate-y-1/2 right-4">
            <SendIcon className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
    </>
  </SheetContent>
</Sheet>
    </>
    
  )
}
function BotIcon(props) {
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
        <path d="M12 8V4H8" />
        <rect width="16" height="12" x="4" y="8" rx="2" />
        <path d="M2 14h2" />
        <path d="M20 14h2" />
        <path d="M15 13v2" />
        <path d="M9 13v2" />
      </svg>
    )
  }
  
  
  function SendIcon(props) {
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
        <path d="m22 2-7 20-4-9-9-4Z" />
        <path d="M22 2 11 13" />
      </svg>
    )
  }

export default Chat
