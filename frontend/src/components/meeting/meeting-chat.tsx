import { useChat } from "@livekit/components-react";

function MeetingChat() {
  const { chatMessages, isSending, send } = useChat();

  return (
    <section>
      {chatMessages.map((msg) => (
        <div key={msg.timestamp}>
          {msg.from?.identity}: {msg.message}
        </div>
      ))}
      <button disabled={isSending} onClick={() => send("Hello!")}>
        Send Message
      </button>
    </section>
  );
}

export { MeetingChat };
