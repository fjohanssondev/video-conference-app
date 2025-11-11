import { Container } from "@/components/container";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/meeting/join/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <main>
      <Container>
        <h1 className="sr-only">Join meeting</h1>
        <section className="flex items-center justify-center h-[calc(100vh-4rem)]">
          <Card className="max-w-lg w-full">
            <CardHeader>
              <CardTitle>Join meeting</CardTitle>
              <CardDescription>
                Paste the link to the meeting you wan't to join
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col space-y-3">
                <Label>Paste link</Label>
                <Input placeholder="https://localhost:5173/meeting/129039123?code=1902032" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Join</Button>
            </CardFooter>
          </Card>
        </section>
      </Container>
    </main>
  );
}
