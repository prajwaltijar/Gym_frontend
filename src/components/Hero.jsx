import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import heroImg from "../assets/hero.jpg";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.25 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const Hero = () => {
  const navigate = useNavigate();

  return (
    <motion.section
      initial={{ scale: 1.05 }}
      animate={{ scale: 1 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      className="min-h-screen flex items-center text-white bg-cover bg-center"
      style={{
        backgroundImage: `linear-gradient(
          rgba(0,0,0,0.75),
          rgba(0,0,0,0.75)
        ), url(${heroImg})`,
      }}
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-6xl mx-auto px-6 text-center"
      >
        {/* TITLE */}
        <motion.h1
          variants={itemVariants}
          className="text-4xl md:text-7xl font-extrabold tracking-tight drop-shadow-lg mb-6"
          //whileHover={{ letterSpacing: "0.15em" }}
          transition={{ type: "spring", stiffness: 120 }}
        >
          PowerFit Gym
        </motion.h1>

        {/* SUBTITLE */}
        <motion.p
          variants={itemVariants}
          className="text-2xl md:text-3xl text-gray-200 mb-10"
        >
          Train hard. Build strength. Own your transformation.
        </motion.p>

        {/* BUTTONS */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-5 justify-center"
        >
          <motion.button
            onClick={() => navigate("/contact")}
            whileHover={{
              scale: 1.15,
              boxShadow: "0px 0px 30px rgba(255,0,0,0.8)",
            }}
            whileTap={{ scale: 0.9 }}
            animate={{
              boxShadow: [
                "0px 0px 0px rgba(255,0,0,0)",
                "0px 0px 22px rgba(255,0,0,0.6)",
                "0px 0px 0px rgba(255,0,0,0)",
              ],
            }}
            transition={{ repeat: Infinity, repeatDelay: 2.8 }}
            className="relative overflow-hidden bg-red-600 hover:bg-red-700 px-10 py-3.5 rounded-full text-base md:text-lg font-semibold shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500/80"
          >
            <span className="relative z-10">Join Now</span>
            <motion.span
              className="absolute inset-0 bg-white/20"
              initial={{ x: "-100%" }}
              whileHover={{ x: "100%" }}
              transition={{ duration: 0.6 }}
            />
          </motion.button>

          <motion.button
            type="button"
            onClick={() => navigate("/plans")}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            className="border border-red-500/70 text-red-400 hover:text-white hover:bg-red-600/20 px-9 py-3.5 rounded-full text-base md:text-lg font-semibold transition-colors duration-300"
          >
            View Plans
          </motion.button>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default Hero;