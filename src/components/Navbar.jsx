import { NavLink } from "react-router-dom";

const navItems = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Plans", path: "/plans" },
  { name: "Services", path: "/services" },
];

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 bg-gray-900 text-black border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center">

        {/* LOGO */}
        <div className="flex-1">
          <h1 className="font-extrabold tracking-wider text-2xl md:text-3xl uppercase">
            <span className="text-white">Power</span>
            <span className="text-yellow-400">Fit</span>
          </h1>
        </div>

        {/* MENU */}
        <div className="flex-1 flex justify-center gap-10 md:gap-14  text-sm md:text-base uppercase tracking-widest font-semibold">
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

        {/* CONTACT BUTTON */}
        <div className="flex-1 flex justify-end">
          <NavLink to="/contact">
            <button className="bg-yellow-400 text-black font-bold px-6 py-3 uppercase tracking-wider hover:bg-yellow-300 transition">
              Contact
            </button>
          </NavLink>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
