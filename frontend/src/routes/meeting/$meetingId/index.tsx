import { MeetingDetails } from '@/components/meeting/meeting-details'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/meeting/$meetingId/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { meetingId } = Route.useParams()

  return (
    <MeetingDetails />
  )
}
