
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"

export default function Card({title, description, progress, duration, validity,img}) {
  return (
    <div className="flex flex-col mx-8 h-screen bg-gray-50">
      <div className="max-w-sm w-full p-6 bg-card rounded-lg shadow-lg">
        <div className="flex flex-col gap-4">
          <img src={img} width={400} height={400} alt="Course Image" className="rounded-lg object-cover" />
          <div className="space-y-2">
            <h2 className="text-2xl font-bold">{title}</h2>
            <p className="text-muted-foreground">
            {description}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 ">
              <Progress value={progress} className="flex-1 w-40 " />
              <span className="text-sm text-muted-foreground">{progress}%</span>
            </div>
            <div className="flex items-center gap-2">
              <CalendarIcon className="w-5 h-5 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">{duration} months</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ClockIcon className="w-5 h-5 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Valid until{validity}</span>
            </div>
            <Button className="w-full">View Course</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

function CalendarIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
    </svg>
  )
}


function ClockIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  )
}