"use client"
import React, { useEffect, useState } from 'react'
import Card from '@/utilities/Course/Card'
import Link from 'next/link'
import useAuth from '../../../hooks/useAuth'
import HomePageSkl from '@/utilities/skeleton/HomePageSkl'
const Page = () => {
  const [data,message,loading] = useAuth();
  console.log(data,message,loading)
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
