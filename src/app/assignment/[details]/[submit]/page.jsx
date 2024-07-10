
import SubmitAssignment from '@/utilities/Assignment/SubmitAssignment'
const page = ({params}) => {
  return (
    <div>
      <SubmitAssignment aid={params.submit} crid={params.details}/>
    </div>
  )
}

export default page
