import { Container } from "@/components/container";
import { CreateMeeting } from "@/components/meeting/create-meeting";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Dashboard,
});

function Dashboard() {
  return (
    <main className="mt-8">
      <Container>
        <CreateMeeting />
      </Container>
    </main>
  );
}
