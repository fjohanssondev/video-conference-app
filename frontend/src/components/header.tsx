import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/container";

function Header() {
  return (
    <header className="border-b">
      <Container className="flex items-center py-3">
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
          <Button>Logout</Button>
        </div>
      </Container>
    </header>
  );
}

export { Header };
