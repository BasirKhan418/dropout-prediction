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
  <SheetContent className="w-full h-full">
    <div className="absolute right-[13px] top-[10px] cursor-pointer" onClick={()=>{
      setaiopen(!aiopen)
    }}>
    <IoCloseSharp className="text-2xl  " />
    </div>
    <>
    <div className="flex flex-col h-full w-full bg-background">
      <header className="flex items-center gap-4 px-6 py-4 border-b bg-card">
        <Avatar className="w-10 h-10 border">
          <AvatarImage src="/placeholder-user.jpg" />
          <AvatarFallback>NXT</AvatarFallback>
        </Avatar>
        <div>
          <div className="font-medium">DI-NXT AI</div>
          <div className="text-sm text-muted-foreground">AI Assistant</div>
        </div>
      </header>
      <div className="flex-1 overflow-auto p-6 space-y-4">
        <div className="flex items-start gap-4">
          <div className="rounded-lg w-11 h-11 bg-[#55efc4] text-3xl flex items-center justify-center px-4">
            <BotIcon className="w-6 h-6" />
          </div>
          <div className="grid gap-1 items-start text-sm">
            <div className="font-medium">NXT-AI</div>
            <div className="bg-card p-3 rounded-lg max-w-[80%] text-card-foreground">
              <p>Hello! I'm an AI assistant created by Anthropic. How can I help you today?</p>
            </div>
          </div>
        </div>
        <div className="flex items-start gap-4 justify-end">
          <div className="grid gap-1 items-end text-sm">
            <div className="font-medium">You</div>
            <div className="bg-primary p-3 rounded-lg max-w-[80%] text-primary-foreground">
              <p>Hi ChatGPT! I'd like to learn more about the latest advancements in natural language processing.</p>
            </div>
          </div>
          <div className="rounded-lg w-11 h-11 bg-[#fdcb6e] text-3xl flex items-center justify-center px-4">
            <UserIcon className="w-6 h-6" />
          </div>
        </div>
        <div className="flex items-start gap-4 px-4">
          <div className="rounded-lg w-11 h-11 bg-[#55efc4] text-3xl flex items-center justify-center px-4">
            <BotIcon className="w-6 h-6" />
          </div>
          <div className="grid gap-1 items-start text-sm">
            <div className="font-medium">NXT-AI</div>
            <div className="bg-card p-3 rounded-lg w-full text-card-foreground">
              <p>
                Natural language processing (NLP) has seen some exciting advancements in recent years. Some key
                developments include:
              </p>
              <ul className="list-disc pl-4 mt-2">
                <li>Transformer-based models like BERT and GPT-3 that can understand and generate human-like text</li>
                <li>
                  Advancements in machine translation, allowing for more accurate and natural-sounding translations
                </li>
                <li>
                  Improvements in sentiment analysis, allowing for better understanding of the emotional context of text
                </li>
                <li>Advances in conversational AI, enabling more natural and contextual dialogues</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="flex items-start gap-4 justify-end">
          <div className="grid gap-1 items-end text-sm">
            <div className="font-medium">You</div>
            <div className="bg-primary p-3 rounded-lg max-w-[80%] text-primary-foreground">
              <p>
                That's really fascinating! Can you give me an example of how these advancements are being used in
                practical applications?
              </p>
            </div>
          </div>
          <div className="rounded-lg w-11 h-11 bg-[#fdcb6e] text-3xl flex items-center justify-center px-4">
            <UserIcon className="w-6 h-6 " />
          </div>
        </div>
      </div>
      <div className="bg-card p-4 border-t">
        <div className="relative">
          <Textarea
            placeholder="Type your message..."
            name="message"
            id="message"
            rows={1}
            className="min-h-[48px] rounded-2xl resize-none p-4 border border-neutral-400 shadow-sm pr-16"
          />
          <Button type="submit" size="icon" className="absolute w-8 h-8 top-3 right-3">
            <ArrowUpIcon className="w-4 h-4" />
            <span className="sr-only">Send</span>
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
function ArrowUpIcon(props) {
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
      <path d="m5 12 7-7 7 7" />
      <path d="M12 19V5" />
    </svg>
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


function UserIcon(props) {
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
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )
}

export default Chat
