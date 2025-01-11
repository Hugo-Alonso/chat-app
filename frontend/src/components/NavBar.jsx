import { useAuthStore } from "../store/useAuthStore"

const NavBar = () => {

  const { authUser } = useAuthStore;

  return (
    <div>NavBar</div>
  )
}

export default NavBar