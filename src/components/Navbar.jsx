import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

const navItems = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Plans", path: "/plans" },

  { name: "Services", path: "/services" },
];

const containerVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      staggerChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0 },
};

const Navbar = () => {
  return (
    <motion.nav
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="sticky top-0 z-50 bg-black/90 backdrop-blur-md text-white shadow-[0_8px_30px_rgba(0,0,0,0.7)]"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center">

        {/* LEFT LOGO */}
        <motion.div
          variants={itemVariants}
          className="flex-1"
          whileHover={{ scale: 1.05 }}
        >
          <motion.h1
            className="text-2xl md:text-3xl font-extrabold tracking-tight whitespace-nowrap"
            initial={{ letterSpacing: "0.02em" }}
            whileHover={{ letterSpacing: "0.12em" }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <span className="text-red-500">Power</span>
            <span className="text-white">Fit</span>{" "}
            <span className="text-red-500">Gym</span>
          </motion.h1>
        </motion.div>

        {/* CENTER MENU */}
        <motion.div
          variants={containerVariants}
          className="flex gap-10 justify-center flex-1 text-base md:text-lg font-medium"
        >
          {navItems.map((item) => (
            <NavLink key={item.name} to={item.path}>
              {({ isActive }) => (
                <motion.div
                  variants={itemVariants}
                  className="relative cursor-pointer"
                  whileHover={{ y: -4, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <motion.span
                    animate={{
                      color: isActive ? "#ef4444" : "#ffffff",
                    }}
                    whileHover={{ color: "#f87171" }}
                    className="transition"
                  >
                    {item.name}
                  </motion.span>

                  {/* Animated underline */}
                  {isActive && (
                    <motion.div
                      layoutId="underline"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.4 }}
                      className="absolute left-0 right-0 -bottom-1 h-[2px] bg-red-500 rounded origin-left"
                    />
                  )}
                </motion.div>
              )}
            </NavLink>
          ))}
        </motion.div>

        {/* RIGHT JOIN NOW BUTTON */}
        <motion.div
          variants={itemVariants}
          className="flex-1 flex justify-end"
        >
          <NavLink to="/contact">
            <motion.button
              whileHover={{
                scale: 1.15,
                boxShadow: "0px 0px 25px rgba(255,0,0,0.8)",
              }}
              whileTap={{ scale: 0.9 }}
              animate={{
                boxShadow: [
                  "0px 0px 0px rgba(255,0,0,0)",
                  "0px 0px 18px rgba(255,0,0,0.6)",
                  "0px 0px 0px rgba(255,0,0,0)",
                ],
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                repeat: Infinity,
                repeatDelay: 2.5,
              }}
              className="relative overflow-hidden px-6 py-2 rounded-full bg-red-600 hover:bg-red-700 font-semibold tracking-wide"
            >
              <span className="relative z-10">Join Now</span>
              <motion.span
                className="absolute inset-0 bg-white/20"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              />
            </motion.button>
          </NavLink>
        </motion.div>

      </div>
    </motion.nav>
  );
};

export default Navbar;