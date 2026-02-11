import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { GiWeightLiftingUp, GiRunningShoe, GiWhistle } from "react-icons/gi";

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

const headerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.6, 0.05, 0.01, 0.9] }
    }
};

const cardVariants = {
    hidden: { opacity: 0, y: 60, scale: 0.9 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.7,
            ease: [0.6, 0.05, 0.01, 0.9]
        }
    }
};

const ServicesSection = () => {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

    const services = [
        {
            id: 1,
            title: "POWERLIFTING",
            description: "Master the big three with specialized coaching and competition-grade equipment.",
            image: "https://images.unsplash.com/photo-1534258936925-c58bed479fcb?q=80&w=1000&auto=format&fit=crop",
            icon: GiWeightLiftingUp,
            link: "/services/powerlifting"
        },
        {
            id: 2,
            title: "DYNAMIC HIIT",
            description: "Ignite your metabolism and build elite cardiovascular endurance with our high-energy classes.",
            image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1000&auto=format&fit=crop",
            icon: GiRunningShoe,
            link: "/services/hiit"
        },
        {
            id: 3,
            title: "ELITE COACHING",
            description: "One-on-one custom programming designed specifically for your unique goals and physiology.",
            image: null, // Will use custom teal gradient background
            icon: GiWhistle,
            link: "/services/coaching"
        }
    ];

    return (
        <section ref={sectionRef} className="py-16 md:py-24 bg-gradient-to-b from-gray-900 to-black text-white">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                {/* Header Section */}
                <motion.div
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    variants={containerVariants}
                    className="mb-16"
                >
                    <motion.p
                        variants={headerVariants}
                        className="text-red-500 text-sm md:text-base font-bold uppercase tracking-wider mb-4"
                    >
                        ELITE TRAINING
                    </motion.p>

                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                        <motion.h2
                            variants={headerVariants}
                            className="text-4xl md:text-5xl lg:text-6xl font-bold italic tracking-tight max-w-2xl"
                        >
                            CHOOSE YOUR <br className="hidden md:block" />
                            DISCIPLINE.
                        </motion.h2>

                        <motion.p
                            variants={headerVariants}
                            className="text-gray-400 text-base md:text-lg max-w-md lg:text-right"
                        >
                            From raw powerlifting to explosive metabolic conditioning, our programs are engineered to shatter your personal plateaus.
                        </motion.p>
                    </div>
                </motion.div>

                {/* Services Grid */}
                <motion.div
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    variants={containerVariants}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {services.map((service, index) => (
                        <motion.div
                            key={service.id}
                            variants={cardVariants}
                            whileHover={{
                                y: -12,
                                scale: 1.02,
                                transition: { duration: 0.3, ease: "easeOut" }
                            }}
                            className="group relative bg-gray-950 border border-gray-800 rounded-lg overflow-hidden 
                         hover:border-red-500 transition-colors duration-300"
                        >
                            {/* Service Image */}
                            <div className="relative h-64 overflow-hidden">
                                {service.image ? (
                                    <motion.img
                                        src={service.image}
                                        alt={service.title}
                                        whileHover={{ scale: 1.15 }}
                                        transition={{ duration: 0.6, ease: "easeOut" }}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    // Custom Elite Coaching Card Design
                                    <div className="w-full h-full bg-gradient-to-br from-teal-400 to-cyan-500 flex flex-col items-center justify-center">
                                        <div className="flex gap-8 mb-4">
                                            {/* Simple Person Icons */}
                                            <svg className="w-12 h-12 text-white" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M12 2C10.9 2 10 2.9 10 4s.9 2 2 2 2-.9 2-2-.9-2-2-2zm4 7h-3V8c0-1.1-.9-2-2-2h-2c-1.1 0-2 .9-2 2v1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1s1-.45 1-1v-9h2v9c0 .55.45 1 1 1s1-.45 1-1v-4h2v4c0 .55.45 1 1 1s1-.45 1-1v-9h2v9c0 .55.45 1 1 1s1-.45 1-1V10c0-.55-.45-1-1-1z" />
                                            </svg>
                                            <svg className="w-12 h-12 text-white" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M12 2C10.9 2 10 2.9 10 4s.9 2 2 2 2-.9 2-2-.9-2-2-2zm4 7h-3V8c0-1.1-.9-2-2-2h-2c-1.1 0-2 .9-2 2v1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1s1-.45 1-1v-9h2v9c0 .55.45 1 1 1s1-.45 1-1v-4h2v4c0 .55.45 1 1 1s1-.45 1-1v-9h2v9c0 .55.45 1 1 1s1-.45 1-1V10c0-.55-.45-1-1-1z" />
                                            </svg>
                                        </div>
                                        <h3 className="text-3xl font-bold text-white tracking-widest">NET SIDAY</h3>
                                        <p className="text-white text-sm mt-1">Personal Training</p>
                                    </div>
                                )}

                                {/* Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent opacity-60"></div>
                            </div>

                            {/* Service Content */}
                            <div className="p-6">
                                {/* Icon */}
                                <motion.div
                                    className="mb-4"
                                    whileHover={{
                                        rotate: [0, -10, 10, -10, 0],
                                        scale: 1.15,
                                        transition: { duration: 0.5 }
                                    }}
                                >
                                    <service.icon className="w-12 h-12 text-red-500" />
                                </motion.div>

                                <h3 className="text-xl md:text-2xl font-bold mb-3 tracking-wide">
                                    {service.title}
                                </h3>

                                <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-6">
                                    {service.description}
                                </p>

                                {/* CTA Link */}
                                <Link to={service.link}>
                                    <motion.div
                                        className="inline-flex items-center gap-2 text-red-500 font-semibold text-sm uppercase tracking-wide"
                                        whileHover={{ gap: "0.75rem" }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        EXPLORE PROGRAM
                                        <motion.span
                                            whileHover={{ x: 4 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            →
                                        </motion.span>
                                    </motion.div>
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default ServicesSection;
