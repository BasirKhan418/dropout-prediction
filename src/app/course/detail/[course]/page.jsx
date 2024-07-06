"use client"
import React, { useEffect, useState } from 'react'
import CourseSidebar from '@/utilities/CourseSidebar'
import { Toaster,toast } from 'sonner'
import HomePageSkl from '@/utilities/skeleton/HomePageSkl'
const Page = ({params}) => {
  const [loading, setLoading] = useState(false)
  const [weeksdata, setWeeksdata] = useState([]);
  const [alldata, setAlldata] = useState([])
  const fetchallcoursedata = async()=>{
    try{
      setLoading(true)
    const res = await fetch(`/api/contentcrud?id=${params.course}`,{
      method:"GET",
      headers:{
        "Content-Type":"application/json",
        "token":localStorage.getItem("dilmstoken")
      }
    })
    const result = await res.json()
    setLoading(false)
    setWeeksdata(result.data.content)
    setAlldata(result.data)
    toast.success(result.message)
    }
    catch(err){
      toast.error("Something went wrong! try again later"+err)
    }
      }
  useEffect(()=>{
fetchallcoursedata()
  },[])
  return (
    <div>
      <Toaster position='top-center' expand={false} />
       {loading?<HomePageSkl/> :<CourseSidebar weeksdata={weeksdata} alldata={alldata}/>}
    </div>
  )
}

export default Page
