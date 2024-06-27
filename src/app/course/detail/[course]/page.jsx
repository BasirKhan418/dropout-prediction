import React from 'react'
import CourseSidebar from '@/utilities/CourseSidebar'
const Page = ({params}) => {
  return (
    <div>
        <CourseSidebar/>
      {params.course} -  Detailed course page
    </div>
  )
}

export default Page
