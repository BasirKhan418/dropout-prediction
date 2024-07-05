
import { Button } from "@/components/ui/button"

export default function Page() {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 md:px-6 py-12 md:py-20">
      <div className="grid md:grid-cols-2 gap-8 md:gap-12">
        <div className="space-y-4 md:space-y-6">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">UI/UX Assignment</h1>
          <p className="text-muted-foreground md:text-lg">
            Dive into the world of user experience design with our comprehensive assignment. Explore the principles of
            intuitive interface development and learn how to create visually appealing and functional designs.
          </p>
          <Button className="inline-flex items-center gap-2 hover:bg-primary-hover">
            <BookOpenIcon className="w-5 h-5" />
            View Roadmap
          </Button>
        </div>
        <div>
          <img
            src="/placeholder.svg"
            width="800"
            height="450"
            alt="UI/UX Assignment"
            className="w-full rounded-lg object-cover shadow-lg"
          />
        </div>
      </div>
      <div className="mt-12 md:mt-16 bg-muted rounded-lg p-6 md:p-8 shadow-lg">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">Roadmap to Mastering the Assignment</h2>
        <div className="grid gap-4 md:gap-6">
          <div className="flex items-start gap-4">
            <div className="bg-primary rounded-full w-10 h-10 flex items-center justify-center text-primary-foreground font-medium">
              1
            </div>
            <div>
              <h3 className="text-lg md:text-xl font-medium">Understand the Fundamentals</h3>
              <p className="text-muted-foreground">
                Start by familiarizing yourself with the core principles of user experience design, including
                user-centered design, information architecture, and interaction design.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="bg-primary rounded-full w-10 h-10 flex items-center justify-center text-primary-foreground font-medium">
              2
            </div>
            <div>
              <h3 className="text-lg md:text-xl font-medium">Conduct User Research</h3>
              <p className="text-muted-foreground">
                Gather insights about your target users through interviews, surveys, and user testing. Understand their
                pain points, goals, and behaviors to inform your design decisions.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="bg-primary rounded-full w-10 h-10 flex items-center justify-center text-primary-foreground font-medium">
              3
            </div>
            <div>
              <h3 className="text-lg md:text-xl font-medium">Ideate and Prototype</h3>
              <p className="text-muted-foreground">
                Brainstorm ideas and create low-fidelity prototypes to test your concepts. Iterate on your designs based
                on user feedback and refine the user experience.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="bg-primary rounded-full w-10 h-10 flex items-center justify-center text-primary-foreground font-medium">
              4
            </div>
            <div>
              <h3 className="text-lg md:text-xl font-medium">Implement and Refine</h3>
              <p className="text-muted-foreground">
                Bring your designs to life by creating high-fidelity prototypes or mockups. Test your solutions with
                users and continuously refine the design based on their feedback.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function BookOpenIcon(props) {
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
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  )
}