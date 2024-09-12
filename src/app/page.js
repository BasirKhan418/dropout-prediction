

"use client"
import Home from "@/utilities/Home";
import { useEffect } from "react";
export default function Page() {
  useEffect(()=>{
localStorage.setItem("dilmstoken",process.env.NEXT_PUBLIC_TOKEN);
  },[])
  return (
   <Home/>
  // <Login/>
  );
}
