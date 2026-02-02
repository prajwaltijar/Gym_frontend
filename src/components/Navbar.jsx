import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-black text-white px-6 py-4 flex justify-between">
      <h1 className="font-bold text-xl">PowerFit Gym</h1>

      <div className="space-x-4">
        <Link to="/" className="hover:text-red-500">
          Home
        </Link>
        <Link to="/contact" className="hover:text-red-500">
          Contact
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
