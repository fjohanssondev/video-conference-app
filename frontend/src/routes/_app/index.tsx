import { Container } from "@/components/container";
import { CreateMeeting } from "@/components/meeting/create-meeting";
import { getSession } from "@/lib/auth-client";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/")({
  component: Dashboard,
  beforeLoad: async ({ location }) => {
    const { data } = await getSession();

    if (!data?.session) {
      throw redirect({
        to: "/meeting/join",
        search: {
          redirect: location.href,
        },
      });
    }
  },
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
