"use client"
import React, { useEffect, useState } from 'react'
import Card from '@/utilities/Course/Card'
import Link from 'next/link'
import HomePageSkl from '@/utilities/skeleton/HomePageSkl'

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
    }
    catch(err){
      console.log(err)
    }
  }
  //end
  //useEffect
  useEffect(()=>{
    if(data&&data[0]){
      if(data.length==1){
        UpdateandGetProgress(data[0]._id,data[0].Regdomain._id)
      }
      else{
        data.map((item)=>{
          UpdateandGetProgress(item._id,item.Regdomain._id)
        })
      }
     
    }
  },[data])
  return (
    <>
   { loading?<HomePageSkl/>:<div className='flex justify-start items-center flex-wrap '>
    {data&&data.map((item)=>(
        <Link href={`/course/detail/${item.Regdomain._id}`} key={item._id}><Card title={item.Regdomain.title} description={item.Regdomain.desc} duration={item.Regdomain.duration} validity={"1"} img={item.Regdomain.img} skills={item.Regdomain.skills} isadmin={false} progress={item.progress&&item.progress==null?0:item.progress}/></Link>
      ))}
      
    </div>}
    </>
  )
}

export default Page
