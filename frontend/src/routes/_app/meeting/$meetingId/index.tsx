import { createFileRoute } from "@tanstack/react-router";
import { MeetingDetails } from "@/components/meeting/meeting-details";
import { LiveKitRoom } from "@livekit/components-react";
import { MeetingConference } from "@/components/meeting/meeting-conference";
import { MeetingChat } from "@/components/meeting/meeting-chat";
import { useRoomToken } from "@/hooks/useRoomToken";
import { useRef } from "react";

export const Route = createFileRoute("/_app/meeting/$meetingId/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { meetingId } = Route.useParams();
  const identityRef = useRef(
    `anonymous-${Math.random().toString(36).substring(7)}`
  );
  const { data: token, isLoading } = useRoomToken(
    meetingId,
    identityRef.current
  );

  return (
    <LiveKitRoom
      serverUrl="ws://localhost:7880"
      token={token}
      connect={true}
      video={true}
    >
      <main>
        <MeetingDetails />
        <div className="flex">
          <div className="flex-1">
            <MeetingConference />
          </div>
          <div className="min-w-1/6">
            <MeetingChat />
          </div>
        </div>
      </main>
    </LiveKitRoom>
  );
}
