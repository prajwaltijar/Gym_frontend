import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef } from "react";
import TrainersSection from "../components/TrainersSection";
import CTASection from '../components/CTASection';


// Counter animation hook
const useCounter = (endValue, duration = 2) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => {
    if (typeof endValue === "string" && endValue.includes("k")) {
      return Math.round(latest) + "k";
    }
    if (typeof endValue === "string" && endValue.includes("/")) {
      return endValue; // Return as-is for "24/7"
    }
    return Math.round(latest) + (endValue.toString().includes("+") ? "+" : "");
  });

  useEffect(() => {
    const numericValue = typeof endValue === "string"
      ? parseInt(endValue.replace(/[^0-9]/g, ''))
      : endValue;

    const controls = animate(count, numericValue, { duration });
    return controls.stop;
  }, [endValue, duration]);

  return rounded;
};

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.6, 0.05, 0.01, 0.9] }
  }
};

const cardVariants = {
  hidden: { opacity: 0, rotateY: -15, y: 30 },
  visible: {
    opacity: 1,
    rotateY: 0,
    y: 0,
    transition: { duration: 0.7, ease: [0.6, 0.05, 0.01, 0.9] }
  }
};

const StatCard = ({ value, label, inView }) => {
  const displayValue = useCounter(value, 2);

  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ scale: 1.05, y: -5 }}
      className="text-center"
    >
      <motion.h3 className="text-5xl md:text-6xl font-bold text-yellow-200 mb-2">
        {inView ? displayValue : value}
      </motion.h3>
      <p className="text-gray-400 text-xs md:text-sm uppercase tracking-widest">
        {label}
      </p>
    </motion.div>
  );
};

const About = () => {
  const statsRef = useRef(null);
  const missionRef = useRef(null);
  const timingsRef = useRef(null);
  const ctaRef = useRef(null);

  const statsInView = useInView(statsRef, { once: true, amount: 0.3 });
  const missionInView = useInView(missionRef, { once: true, amount: 0.3 });
  const timingsInView = useInView(timingsRef, { once: true, amount: 0.5 });
  const ctaInView = useInView(ctaRef, { once: true, amount: 0.5 });

  return (
    <section className="min-h-screen mt-3 bg-black text-white">
      <div className=" mx-auto ">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center"
        >
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
            <span className="text-yellow-300">About</span> PowerFit Gym
          </h2>
        </motion.div>


        {/* Statistics Section */}
        <div ref={statsRef} className="mb-16 py-16  px-6">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={statsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold mb-4 text-center pb-10"
          >
            Why Choose Us?
          </motion.h1>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={statsInView ? "visible" : "hidden"}
            className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto"
          >
            <StatCard value="500+" label="Transformations" inView={statsInView} />
            <StatCard value="12k" label="Sq Ft Facility" inView={statsInView} />
            <StatCard value="15" label="Elite Trainers" inView={statsInView} />
            <StatCard value="24/7" label="Member Access" inView={statsInView} />
          </motion.div>
        </div>

      </div>

      {/* Elite Trainers Section */}
      <TrainersSection />

      <div className="mx-auto px-6 pb-20">
        <div className="max-w-6xl mx-auto">
          {/* Timings */}
          <motion.div
            ref={timingsRef}
            initial="hidden"
            animate={timingsInView ? "visible" : "hidden"}
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            className="bg-white/5 backdrop-blur-md border border-white/10 p-10 rounded-xl text-center mb-16 shadow-2xl"
          >
            <h3 className="text-3xl font-bold mb-4 text-yellow-300">Gym Timings</h3>
            <p className="text-lg text-gray-300">Monday – Saturday: 5:30 AM – 10:30 PM</p>
            <p className="text-lg text-gray-300">Sunday: 7:00 AM – 2:00 PM</p>
          </motion.div>

          {/* Mission + Vision */}
          <motion.div
            ref={missionRef}
            variants={containerVariants}
            initial="hidden"
            animate={missionInView ? "visible" : "hidden"}
            className="grid md:grid-cols-2 gap-10 mb-16"
          >
            <motion.div
              variants={cardVariants}
              whileHover={{ scale: 1.05, rotateY: 5 }}
              className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-xl shadow-2xl"
              style={{ perspective: 1000 }}
            >
              <h3 className="text-2xl font-bold mb-4 text-yellow-300">Our Mission</h3>
              <p className="text-gray-300">
                Our mission is to make fitness simple and sustainable for everyone.
                Whether you're a beginner or athlete, we guide you with proper
                training techniques, diet support and motivation.
              </p>
            </motion.div>

            <motion.div
              variants={cardVariants}
              whileHover={{ scale: 1.05, rotateY: -5 }}
              className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-xl shadow-2xl"
              style={{ perspective: 1000 }}
            >
              <h3 className="text-2xl font-bold mb-4 text-yellow-300">Our Vision</h3>
              <p className="text-gray-300">
                We aim to build a strong fitness community where people train
                together, stay healthy and grow mentally & physically stronger
                every day.
              </p>
            </motion.div>
          </motion.div>
        </div>



        {/* CTA */}
        <motion.div
          ref={ctaRef}
          initial="hidden"
          animate={ctaInView ? "visible" : "hidden"}
          variants={itemVariants}
          className="text-center"
        >
          <CTASection />

        </motion.div>

      </div>
    </section>
  );
};

export default About;

