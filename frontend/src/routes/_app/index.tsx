import { Container } from "@/components/container";
import { CreateMeeting } from "@/components/meeting/create-meeting";
import { JoinMeeting } from "@/components/meeting/join-meeting";
import { getSession } from "@/lib/auth-client";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/")({
  component: Dashboard,
  beforeLoad: async ({ location }) => {
    const { data } = await getSession();

    if (!data?.session) {
      throw redirect({
        to: "/login",
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
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-medium">Dashboard</h1>
          <div className="flex items-center space-x-2">
            <CreateMeeting />
            <JoinMeeting />
          </div>
        </div>
      </Container>
    </main>
  );
}
