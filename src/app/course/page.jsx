"use client"
import React from 'react'
import Card from '@/utilities/Course/Card'
import Link from 'next/link'
import useAuth from '../../../hooks/useAuth'
import HomePageSkl from '@/utilities/skeleton/HomePageSkl'
const Page = () => {
  const [data,message,loading] = useAuth();
  console.log(data,message,loading)
  return (
    <>
   { loading?<HomePageSkl/>:<div className='flex justify-start items-center'>
    {data&&data.map((item)=>(
        <Link href={`/course/${item.Regdomain._id}`} key={item._id}><Card title={item.Regdomain.title} description={item.Regdomain.desc} duration={item.Regdomain.duration} validity={"25/5/2025"} progress={20} img={item.Regdomain.img}/></Link>
      ))}
      
    </div>}
    </>
  )
}

export default Page
