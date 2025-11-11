import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/container";
import { useSession } from "@/lib/auth-client";

function Header() {
  const { data } = useSession();

  return (
    <header className="border-b h-16">
      <Container className="flex items-center h-full">
        <div className="flex items-center">
          <span className="font-medium">Video App</span>
          <nav className="ml-24">
            <ul className="flex space-x-2">
              <li>
                <Link
                  to="/"
                  className="[&.active]:font-medium [&.active]:underline hover:underline"
                >
                  Home
                </Link>{" "}
              </li>
              <li>
                <Link
                  to="/meeting/create"
                  className="[&.active]:font-medium [&.active]:underline hover:underline"
                >
                  Create meeting
                </Link>{" "}
              </li>
            </ul>
          </nav>
        </div>
        <div className="ml-auto">
          {!data?.user ? <Button>Login</Button> : <Button>Logout</Button>}
        </div>
      </Container>
    </header>
  );
}

export { Header };
