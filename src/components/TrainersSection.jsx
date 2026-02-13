import { motion, useInView } from "framer-motion";
import { useRef } from "react";

// Animation variants
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.1
        }
    }
};

const headerVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.6, 0.05, 0.01, 0.9] }
    }
};

const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.6,
            ease: [0.6, 0.05, 0.01, 0.9]
        }
    }
};

const TrainersSection = () => {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, amount: 0.15 });

    const trainers = [
        {
            id: 1,
            name: "MARCUS THORNE",
            specialty: "Powerlifting & Strength",
            specialtyTag: "HEAD PERFORMANCE",
            certification: "CSCS CERTIFIED",
            image: "https://images.unsplash.com/photo-1566753323558-f4e0952af115?q=80&w=800&auto=format&fit=crop",
        },
        {
            id: 2,
            name: "ELENA VOSS",
            specialty: "Hypertrophy & Fat Loss",
            specialtyTag: "NUTRITION LEAD",
            certification: "M.S NUTRITION",
            image: "https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=800&auto=format&fit=crop",
        },
        {
            id: 3,
            name: "JACKSON RYE",
            specialty: "Metabolic Conditioning",
            specialtyTag: "CONDITIONING SPECIALIST",
            certification: "ASCA L3",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop",
        },
        {
            id: 4,
            name: "SARAH CHEN",
            specialty: "Rehab & Mobility",
            specialtyTag: "MOBILITY EXPERT",
            certification: "FRC SPECIALIST",
            image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=800&auto=format&fit=crop",
        },
    ];

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
                    <motion.h2
                        variants={headerVariants}
                        className="text-4xl md:text-5xl lg:text-6xl font-bold italic tracking-tight mb-4"
                    >
                        MEET OUR <span className="border-b-4 border-yellow-500">ELITE TRAINERS</span>
                    </motion.h2>
                    <motion.p
                        variants={headerVariants}
                        className="text-gray-400 text-sm md:text-base uppercase tracking-widest"
                    >
                        THE HIGHEST STANDARD OF COACHING IN THE INDUSTRY.
                    </motion.p>
                </motion.div>

                {/* Trainers Grid */}
                <motion.div
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    variants={containerVariants}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                >
                    {trainers.map((trainer) => (
                        <motion.div
                            key={trainer.id}
                            variants={cardVariants}
                            whileHover={{
                                y: -10,
                                scale: 1.03,
                                transition: { duration: 0.3, ease: "easeOut" }
                            }}
                            className="group bg-gray-950 border border-gray-800 rounded-lg overflow-hidden 
                         hover:border-yellow-500 transition-colors duration-300"
                        >
                            {/* Trainer Image */}
                            <div className="relative h-72 overflow-hidden">
                                <motion.img
                                    src={trainer.image}
                                    alt={trainer.name}
                                    whileHover={{ scale: 1.1 }}
                                    transition={{ duration: 0.5, ease: "easeOut" }}
                                    className="w-full h-full object-cover"
                                />

                                {/* Specialty Tag */}
                                <motion.div
                                    initial={{ x: -100, opacity: 0 }}
                                    animate={isInView ? { x: 0, opacity: 1 } : { x: -100, opacity: 0 }}
                                    transition={{ delay: 0.5, duration: 0.5 }}
                                    className="absolute bottom-4 left-4 bg-yellow-500 px-3 py-1 rounded"
                                >
                                    <p className="text-white text-xs font-bold uppercase tracking-wide">
                                        {trainer.specialtyTag}
                                    </p>
                                </motion.div>

                                {/* Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent opacity-40"></div>
                            </div>

                            {/* Trainer Info */}
                            <div className="p-5">
                                <h3 className="text-xl font-bold mb-2 tracking-wide">
                                    {trainer.name}
                                </h3>

                                <p className="text-gray-400 text-sm mb-4">
                                    Specialty: {trainer.specialty}
                                </p>

                                {/* Certification & Arrow */}
                                <div className="flex items-center justify-between">
                                    <motion.div
                                        className="flex items-center gap-2"
                                        whileHover={{ scale: 1.05 }}
                                    >
                                        <motion.div
                                            className="w-2 h-2 bg-yellow-500 rounded-full"
                                            animate={{
                                                scale: [1, 1.3, 1],
                                                opacity: [1, 0.7, 1]
                                            }}
                                            transition={{
                                                duration: 2,
                                                repeat: Infinity,
                                                ease: "easeInOut"
                                            }}
                                        ></motion.div>
                                        <span className="text-xs text-gray-500 uppercase tracking-wide">
                                            {trainer.certification}
                                        </span>
                                    </motion.div>

                                    <motion.button
                                        whileHover={{ x: 5, scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        className="text-yellow-500 hover:text-yellow-400 transition-colors"
                                        aria-label={`View ${trainer.name}'s profile`}
                                    >
                                        <svg
                                            className="w-5 h-5"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M9 5l7 7-7 7"
                                            />
                                        </svg>
                                    </motion.button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default TrainersSection;
