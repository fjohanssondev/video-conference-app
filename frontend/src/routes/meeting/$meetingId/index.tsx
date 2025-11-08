import { createFileRoute } from "@tanstack/react-router";
import { MeetingDetails } from "@/components/meeting/meeting-details";
import { LiveKitRoom } from "@livekit/components-react";
import { z } from "zod";
import { MeetingConference } from "@/components/meeting/meeting-conference";
import { MeetingChat } from "@/components/meeting/meeting-chat";

const livekitTokenSchema = z.object({
  token: z.string(),
});

export const Route = createFileRoute("/meeting/$meetingId/")({
  component: RouteComponent,
  validateSearch: livekitTokenSchema,
});

function RouteComponent() {
  const { token } = Route.useSearch();

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
