import React from 'react'
import Card from '@/utilities/Course/Card'
import Link from 'next/link'
const Page = () => {
  return (
    <div className='flex justify-start items-center'>
      <Link href="/course/IntroductionToReact"><Card/></Link>
      <Link href="/course/IntroductionToReact"><Card/></Link>
    </div>
  )
}

export default Page
