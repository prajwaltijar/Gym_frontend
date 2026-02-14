import { NavLink } from "react-router-dom";
import { useState } from "react";

const navItems = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Plans", path: "/plans" },
  { name: "Services", path: "/services" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-gray-900 text-black border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">

        {/* LOGO */}
        <h1 className="font-extrabold tracking-wider text-xl sm:text-2xl md:text-3xl uppercase">
          <span className="text-white">Power</span>
          <span className="text-yellow-400">Fit</span>
        </h1>

        {/* HAMBURGER (MOBILE ONLY) */}
        <button
          className="md:hidden text-white text-2xl"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex flex-1 justify-center gap-10 md:gap-14 text-sm md:text-base uppercase tracking-widest font-semibold">
          {navItems.map((item) => (
            <NavLink key={item.name} to={item.path}>
              {({ isActive }) => (
                <span
                  className={`transition duration-200 hover:text-yellow-400 ${
                    isActive ? "text-yellow-400" : "text-white/80"
                  }`}
                >
                  {item.name}
                </span>
              )}
            </NavLink>
          ))}
        </div>

        {/* CONTACT BUTTON DESKTOP */}
        <div className="hidden md:flex flex-1 justify-end">
          <NavLink to="/contact">
            <button className="bg-yellow-400 text-black font-bold px-6 py-3 uppercase tracking-wider hover:bg-yellow-300 transition">
              Contact
            </button>
          </NavLink>
        </div>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden bg-gray-900 border-t border-white/10 px-6 py-5 space-y-5 text-center uppercase tracking-widest font-semibold">

          {navItems.map((item) => (
            <NavLink key={item.name} to={item.path} onClick={() => setOpen(false)}>
              {({ isActive }) => (
                <div
                  className={`transition duration-200 hover:text-yellow-400 ${
                    isActive ? "text-yellow-400" : "text-white/80"
                  }`}
                >
                  {item.name}
                </div>
              )}
            </NavLink>
          ))}

          <NavLink to="/contact" onClick={() => setOpen(false)}>
            <button className="w-full bg-yellow-400 text-black font-bold px-6 py-3 uppercase tracking-wider hover:bg-yellow-300 transition">
              Contact
            </button>
          </NavLink>

        </div>
      )}
    </nav>
  );
};

export default Navbar;
