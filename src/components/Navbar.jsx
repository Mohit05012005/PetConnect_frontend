// import { Link } from "react-router-dom";
// import { useContext } from "react";
// import { AuthContext } from "../context/AuthContext";

// const Navbar = () => {
//   const { user, logout } = useContext(AuthContext);

//   return (
//     <nav className="p-4 bg-teal-600 text-white flex justify-between items-center">
//       <h1 className="text-xl font-bold">🐾 PetConnect</h1>
//       <div>
//         <Link className="mx-2" to="/">Home</Link>
//         {!user && <Link className="mx-2" to="/login">Login</Link>}
//         {!user && <Link className="mx-2" to="/signup">Signup</Link>}
//         {user && <Link className="mx-2" to="/pets-sell">Sell Pet</Link>}
//         {user && <Link className="mx-2" to="/dashboard">Dashboard</Link>}
//         {user && <button onClick={logout} className="ml-2">Logout</button>}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

// Optional: nice icons (you can remove if you don't want them)
import { Menu, X, Home, PlusCircle, User, LogOut, PawPrint } from "lucide-react";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  // This controls whether the mobile menu is open or closed
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      {/* Main Navbar - Fixed at the top */}
      <div className="bg-teal-600 text-white shadow-lg fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            
            {/* Logo - Left Side */}
            <Link to="/" className="flex items-center gap-2 text-2xl font-bold">
              <PawPrint size={30} />
              PetConnect
            </Link>

            {/* Big Screen Links (hidden on mobile) */}
            <div className="hidden md:flex items-center gap-6">
              <Link to="/" className="hover:bg-teal-700 px-3 py-2 rounded">Home</Link>
              
              {/* If user is NOT logged in → show Login & Signup */}
              {!user && (
                <>
                  <Link to="/login" className="hover:bg-teal-700 px-3 py-2 rounded">Login</Link>
                  <Link to="/signup" className="hover:bg-teal-700 px-3 py-2 rounded">Signup</Link>
                </>
              )}

              {/* If user IS logged in → show these */}
              {user && (
                <>
                  <Link to="/pets-sell" className="hover:bg-teal-700 px-3 py-2 rounded flex items-center gap-1">
                    <PlusCircle size={20} /> Sell Pet
                  </Link>
                  <Link to="/dashboard" className="hover:bg-teal-700 px-3 py-2 rounded flex items-center gap-1">
                    <User size={20} /> Dashboard
                  </Link>
                  <button
                    onClick={logout}
                    className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded flex items-center gap-1"
                  >
                    <LogOut size={20} /> Logout
                  </button>
                </>
              )}
            </div>

            {/* Hamburger Button - Only shows on mobile */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-white"
            >
              {isMenuOpen ? <X size={30} /> : <Menu size={30} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu - Shows only when hamburger is clicked */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" onClick={() => setIsMenuOpen(false)}>
          <div className="bg-teal-700 text-white mt-16 p-6 space-y-4" onClick={(e) => e.stopPropagation()}>
            <Link to="/" className="block py-3 text-xl hover:bg-teal-800 rounded px-4" onClick={() => setIsMenuOpen(false)}>
              <Home className="inline mr-2" size={20} /> Home
            </Link>

            {!user ? (
              <>
                <Link to="/login" className="block py-3 text-xl hover:bg-teal-800 rounded px-4" onClick={() => setIsMenuOpen(false)}>
                  Login
                </Link>
                <Link to="/signup" className="block py-3 text-xl hover:bg-teal-800 rounded px-4" onClick={() => setIsMenuOpen(false)}>
                  Signup
                </Link>
              </>
            ) : (
              <>
                <Link to="/pets-sell" className="block py-3 text-xl hover:bg-teal-800 rounded px-4" onClick={() => setIsMenuOpen(false)}>
                  <PlusCircle className="inline mr-2" size={20} /> Sell Pet
                </Link>
                <Link to="/dashboard" className="block py-3 text-xl hover:bg-teal-800 rounded px-4" onClick={() => setIsMenuOpen(false)}>
                  <User className="inline mr-2" size={20} /> Dashboard
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setIsMenuOpen(false);
                  }}
                  className="w-full text-left py-3 text-xl bg-red-600 hover:bg-red-700 rounded px-4"
                >
                  <LogOut className="inline mr-2" size={20} /> Logout
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* This empty div pushes your page content down so it's not hidden under the navbar */}
      <div className="h-16"></div>
    </>
  );
};

export default Navbar;
