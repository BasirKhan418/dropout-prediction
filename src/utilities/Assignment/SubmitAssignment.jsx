"use client"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useState,useEffect } from "react"
export default function SubmitAssignment({aid,crid}) {
    const [data,setData] = useState(null);
    const [loading,setLoading] = useState(false);
    const fetchAssignment = async()=>{
        try{
            setLoading(true);
            const response = await fetch(`/api/getassignment?id=${aid}`,{
                method:"GET",
                headers:{
                    "content-type":"application/json",
                    "token":localStorage.getItem("dilmstoken")
                }
            })
            const res = await response.json();
            console.log(res)
            setLoading(false);
            if(res.success){
                setData(res.data);
            }
            else{
                setData(null)
            }
        }
        catch(err){
            setLoading(false);
            setData(null)
        }
    }
    useEffect(()=>{
        fetchAssignment();
        
    },[])
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 h-screen w-full">
      <div className="bg-background rounded-lg border p-6 flex flex-col gap-4 dry">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold">Assignment: {data&&data[0].title}</h2>
            <p className="text-sm text-muted-foreground">Assignment ID: {aid}</p>
          </div>
          <div className="bg-muted rounded-full w-8 h-8 flex items-center justify-center">
            <ClockIcon className="w-5 h-5 text-muted-foreground" />
          </div>
        </div>
        <div className="prose text-muted-foreground flex-1">
          <p>{data&&data[0].desc}</p>
         
        </div>
        <div className="bg-muted rounded-md p-4">
        <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden' }}>
      <iframe 
        src={data&&data[0].link} 
        width="100%" 
        height="500px" 
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: '0' }}
        onError={(e) => {
          e.target.style.display = 'none';
          // Optionally display an error message or a fallback
          console.error('Error loading iframe');
        }}
      ></iframe>
    </div>
            <h3 className="text-lg font-semibold">Instructions</h3>
            <ul className="list-disc list-inside">
                <li>Do not copy from the internet</li>
                <li>Do not share your solution with others</li>
                <li>Submit your solution before the deadline</li>
                <li>Do not submit multiple times</li>   
                <li>Do not submit incomplete solution</li>
            
            </ul>
        </div>
      </div>
      <div className="bg-background rounded-lg border p-6 flex flex-col gap-4">
        <Textarea
          className="flex-1 resize-none p-4 rounded-md border border-input shadow-sm"
          placeholder="Write your solution here..."
          onCopy={(e) => e.preventDefault()}
            onCut={(e) => e.preventDefault()}
            onPaste={(e) => e.preventDefault()}
        />
        <div className="flex justify-start gap-2">
          <Button variant="ghost">Cancel</Button>
          <Button>Submit</Button>
        </div>
      </div>
    </div>
  )
}

function ClockIcon(props) {
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
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  )
}