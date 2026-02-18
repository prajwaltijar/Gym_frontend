import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import api from "../api/aixos";

// animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.1 } }
};

const headerVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6 } }
};

const TrainersSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });

  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(true);

  // fetch trainers from backend
  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        const res = await api.get("/trainers/getalltrainers");
        setTrainers(res.data);
      } catch (err) {
        console.error("Failed to load trainers", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTrainers();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-black text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.h2 variants={headerVariants}
            className="text-4xl md:text-5xl lg:text-6xl font-bold italic tracking-tight mb-4">
            MEET OUR <span className="border-b-4 border-yellow-500">ELITE TRAINERS</span>
          </motion.h2>

          <motion.p variants={headerVariants}
            className="text-gray-400 text-sm md:text-base uppercase tracking-widest">
            TRAIN WITH PROFESSIONAL COACHES
          </motion.p>
        </motion.div>

        {/* Loading */}
        {loading && (
          <p className="text-center text-gray-400">Loading trainers...</p>
        )}

        {/* Trainers Grid */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {trainers.map((trainer) => (
            <motion.div
              key={trainer._id}
              variants={cardVariants}
              whileHover={{ y: -10, scale: 1.03 }}
              className="group bg-gray-950 border border-gray-800 rounded-lg overflow-hidden hover:border-yellow-500 transition-colors duration-300"
            >
              {/* Image */}
              <div className="relative h-72 overflow-hidden">
                <motion.img
                  src={
                    trainer.image
                      ? `http://localhost:5000/uploads/trainers/${trainer.image}`
                      : "https://via.placeholder.com/400x500?text=Trainer"
                  }
                  alt={trainer.name}
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                  className="w-full h-full object-cover"
                />

                {/* overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent opacity-40"></div>
              </div>

              {/* Info */}
              <div className="p-5">
                <h3 className="text-xl font-bold mb-2 tracking-wide">
                  {trainer.name}
                </h3>

                <p className="text-gray-400 text-sm mb-2">
                  Specialty: {trainer.specialty}
                </p>

                <p className="text-gray-500 text-xs mb-3">
                  Experience: {trainer.experience} years
                </p>

                <p className="text-gray-400 text-xs line-clamp-3">
                  {trainer.bio}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default TrainersSection;
