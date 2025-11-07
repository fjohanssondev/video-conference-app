import { Timer } from "@/components/ui/timer"

function MeetingDetails(){
  return (
    <section className="py-4 bg-neutral-200">
      <div className="flex justify-between container mx-auto">
        <h1>Sprint Review</h1>
        <Timer />
      </div>
    </section>
  )
}

export { MeetingDetails }