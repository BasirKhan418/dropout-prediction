import React from 'react'
import UserAssignment from '@/utilities/Assignment/UserAssignment'
const page = ({params}) => {
  return (
    <div>
      <UserAssignment id={params.details}/>
    </div>
  )
}

export default page
