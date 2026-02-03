import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 bg-black/90 backdrop-blur-md text-white shadow-xl">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        
        
        <h1 className="text-2xl font-extrabold tracking-wide">
          <span className="text-red-500">Power</span>
          <span className="text-white">Fit</span>{" "}
          <span className="text-red-500">Gym</span>
        </h1>

      
        <div className="flex space-x-8 text-lg">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `relative transition duration-300 ${
                isActive
                  ? "text-red-500 font-semibold"
                  : "text-white hover:text-red-400"
              } after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-red-500 after:w-0 hover:after:w-full after:transition-all after:duration-300`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `relative transition duration-300 ${
                isActive
                  ? "text-red-500 font-semibold"
                  : "text-white hover:text-red-400"
              } after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:bg-red-500 after:w-0 hover:after:w-full after:transition-all after:duration-300`
            }
          >
            Join Now
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
