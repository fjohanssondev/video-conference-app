import { Container } from "@/components/container";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <main className="flex h-screen">
      <Container className="flex-1">
        <Outlet />
      </Container>
    </main>
  );
}
