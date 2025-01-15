import { MessageSquare } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore"
import { Link } from "react-router-dom";

const NavBar = () => {

  const { authUser, logout } = useAuthStore;

  return (
    <header className="bg-base-100 border-b border-base-300 fixed w-full top-0 z-40 
    backdrop-blur-lg bg-base-100/80">
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          <Link to="/" className="flex items-center gap-2.5 hover:opacity-80 transition-all">
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-primary" />
                </div>
                <h1 className="text-lg font-bold">Chatty</h1>
          </Link>
        </div>
      </div>
    </header>
  )
}

export default NavBar