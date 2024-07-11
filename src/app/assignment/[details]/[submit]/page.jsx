"use client"
import SubmitAssignment from '@/utilities/Assignment/SubmitAssignment'
import useAuth from '../../../../../hooks/useAuth'
const page = ({params}) => {
  const [data,loading] = useAuth();
  return (
    <div>
      <SubmitAssignment aid={params.submit} crid={params.details} id={data&&data[0]._id}/>
    </div>
  )
}

export default page
