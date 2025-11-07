import { Link } from "@tanstack/react-router"

function Header(){
  return (
    <header>
      <div className="p-2 flex gap-2">
            <Link to="/" className="[&.active]:font-bold">
              Home
            </Link>{' '}
          </div>
          <hr />
    </header>
  )
}

export { Header }