import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="p-4 bg-teal-600 text-white flex justify-between items-center">
      <h1 className="text-xl font-bold">🐾 PetConnect</h1>
      <div>
        <Link className="mx-2" to="/">Home</Link>
        {!user && <Link className="mx-2" to="/login">Login</Link>}
        {!user && <Link className="mx-2" to="/signup">Signup</Link>}
        {user && <button onClick={logout} className="ml-2">Logout</button>}
        {user && <Link className="mx-2" to="/pets-sell">Sell Pet</Link>}
        {user && <Link className="mx-2" to="/dashboard">Dashboard</Link>}
      </div>
    </nav>
  );
};

export default Navbar;

