"use client"
import React, { useEffect, useState } from 'react'
import Card from '@/utilities/Course/Card'
import Link from 'next/link'
import useAuth from '../../../hooks/useAuth'
import HomePageSkl from '@/utilities/skeleton/HomePageSkl'
import Head from 'next/head'

const Page = () => {
  const [data,setData] = useState(null);
  const [loading,setLoading] = useState(false);
 
  const validatefun = async()=>{
     try{
         setLoading(true);
         const response = await fetch("/api/homeauth",{
          method:"POST",
          headers:{
            "content-type":"application/json",
            "token":localStorage.getItem("dilmstoken")
          }
         })
        const res = await response.json();
          setLoading(false);
        if(res.success){
        setData(res.data);
       
        }
        else{
          console.log(res.message)
        }
     }
     catch(err){
       setLoading(false);
       
     }
   
  }
  useEffect(()=>{
 validatefun();
  },[])
  const [progress,setProgress] = useState(0)
  //get course completion progress//
  const UpdateandGetProgress = async(id,crid)=>{
    try{
      const res = await fetch(`/api/progress?id=${id}&&crid=${crid}`,{
        method:"GET",
        headers:{
          "Content-Type":"application/json",
          "token":localStorage.getItem("dilmstoken")
        }
      })
      const result = await res.json();
      setProgress(result.progress)
    }
    catch(err){
      console.log(err)
    }
  }
  //end
  //useEffect
  useEffect(()=>{
    if(data&&data[0]){
      UpdateandGetProgress(data[0]._id,data[0].Regdomain._id)
    }
  },[data])
  return (
    <>
   { loading?<HomePageSkl/>:<div className='flex justify-start items-center flex-wrap '>
    {data&&data.map((item)=>(
        <Link href={`/course/detail/${item.Regdomain._id}`} key={item._id}><Card title={item.Regdomain.title} description={item.Regdomain.desc} duration={item.Regdomain.duration} validity={"1"} img={item.Regdomain.img} skills={item.Regdomain.skills} isadmin={false} progress={progress==null?0:progress}/></Link>
      ))}
      
    </div>}
    </>
  )
}

export default Page
