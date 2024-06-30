"use client"
import React, { useEffect, useState } from 'react'
import Home from '@/utilities/Admin/Home'
import SessionDetected from '@/utilities/Auth/SessionDetected'
import HomePageSkl from '@/utilities/skeleton/HomePageSkl'
import { Toaster,toast } from 'sonner'
import { useRouter } from 'next/navigation'
const Page = () => {
    const router = useRouter();
    const [isansession,setisansession]=useState(false);
    const [data,setData]=useState(null);
    const [loading,setLoading] = useState(false)
    const validatesFunc = async(token)=>{
        console.log(token);
        setLoading(true);
       const response = await fetch("/api/adminhomeauth",{
        method:"POST",
        headers:{
          "content-type":"application/json",
          "token":token
        }
       })
      const res = await response.json();
        setLoading(false);
      console.log(res);
      if(res.success){
    setData(res.data)
      }
      else{
      toast.error(res.message);
      if(res.ansession){
        setisansession(true);
        setTimeout(()=>{
      router.push("/adminlogin");
        },4000)
      }
      setTimeout(()=>{
        router.push("/adminlogin");
          },3000)
      }
      }
      useEffect(()=>{
    validatesFunc(localStorage.getItem("dilmsadmintoken"))
      },[])
  return (
    <div>
        <Toaster position='top-center' expand={false}/>
       { loading?<HomePageSkl/>:<>
        {isansession&&<SessionDetected/>}
     { !isansession&&<Home name={data&&data[0].name}/>}
   
    </>}
    </div>
  )
}

export default Page
