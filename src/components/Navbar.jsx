import { NavLink, useNavigate } from "react-router-dom";
import { useAdminAuth } from "../context/AdminAuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAdminAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="sticky top-0 z-50 bg-black/90 backdrop-blur-md text-white shadow-[0_8px_30px_rgba(0,0,0,0.7)]">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
          <span className="text-red-500">Power</span>
          <span className="text-white">Fit</span>{" "}
          <span className="text-red-500">Gym</span>
        </h1>

        {/* Links */}
        <div className="flex items-center space-x-8 text-base md:text-lg font-medium">

          <NavLink to="/" className={({ isActive }) => isActive ? "text-red-500 font-semibold" : "hover:text-red-400"}>
            Home
          </NavLink>

          <NavLink to="/about" className={({ isActive }) => isActive ? "text-red-500 font-semibold" : "hover:text-red-400"}>
            About
          </NavLink>

          <NavLink to="/plans" className={({ isActive }) => isActive ? "text-red-500 font-semibold" : "hover:text-red-400"}>
            Plans
          </NavLink>

          <NavLink to="/contact" className={({ isActive }) => isActive ? "text-red-500 font-semibold" : "hover:text-red-400"}>
            Join Now
          </NavLink>

          <NavLink
            to="/equipment"
            className={({ isActive }) =>
              isActive ? "text-red-500 font-semibold" : "hover:text-red-400"
            }
          >
            Equipment
          </NavLink>


          {/* 🔐 AUTH BUTTONS */}
          {!isAuthenticated ? (
            <button
              onClick={() => navigate("/admin/login")}
              className="ml-4 px-4 py-2 rounded-full bg-red-600 hover:bg-red-500 transition font-semibold text-sm"
            >
              Login
            </button>
          ) : (
            <>
              <button
                onClick={() => navigate("/admin")}
                className="ml-4 px-4 py-2 rounded-full bg-green-600 hover:bg-green-500 transition font-semibold text-sm"
              >
                Dashboard
              </button>

              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-full bg-gray-700 hover:bg-gray-600 transition font-semibold text-sm"
              >
                Logout
              </button>
            </>
          )}

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
