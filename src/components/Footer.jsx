import { NavLink } from "react-router-dom";

const quickLinks = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Plans", to: "/plans" },
  { label: "Contact", to: "/contact" },
];

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-black via-gray-950 to-black text-gray-300 border-t border-gray-800 mt-8">
      <div className="max-w-7xl mx-auto px-6 py-12 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-2 space-y-4">
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white">
            <span className="text-yellow-400">Power</span>Fit Gym
          </h2>
          <p className="text-sm md:text-base text-gray-400 max-w-md leading-relaxed">
            A performance-driven gym focused on helping you build strength,
            confidence, and long-term health with expert coaching and
            modern equipment.
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-[0.15em] text-gray-400">
            Quick Links
          </h3>
          <nav className="flex flex-col space-y-2 text-sm md:text-base">
            {quickLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className="hover:text-yellow-400 transition-colors"
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-[0.15em] text-gray-400">
            Visit Us
          </h3>
          <p className="text-sm md:text-base">
            Chhatrapati Sambhajinagar, Maharashtra
          </p>
          <p className="text-sm md:text-base">
            Phone: <span className="text-gray-100">+91 98765 43210</span>
          </p>
          <p className="text-sm md:text-base">
            Email: <span className="text-gray-100">powerfitgym@gmail.com</span>
          </p>
        </div>
      </div>

      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs md:text-sm text-gray-500">
          <p>
            &copy; {year} PowerFit Gym. All rights reserved.
          </p>
          <p className="flex items-center gap-2">
            Built for performance
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-red-500" />
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
