import { CreateMeeting } from '@/components/meeting/create-meeting'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/meeting/create')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <main className="flex flex-col min-h-screen">
      <div className="flex flex-1 justify-center items-center">
        <CreateMeeting />
      </div>
    </main>
  )
}
