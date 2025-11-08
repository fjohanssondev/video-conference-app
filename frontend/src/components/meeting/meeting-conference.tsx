import { useTracks } from "@livekit/components-react";
import { Track } from "livekit-client";
import { ParticipantVideo } from "@/components/meeting/participant-video";

function MeetingConference() {
  const tracks = useTracks([Track.Source.Camera]);

  return (
    <div className="grid grid-cols-2 gap-4">
      {tracks.map((track) => (
        <ParticipantVideo key={track.publication.trackSid} track={track} />
      ))}
    </div>
  );
}

export { MeetingConference };
