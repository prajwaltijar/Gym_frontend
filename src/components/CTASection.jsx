import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";

const CTASection = () => {
    const ctaRef = useRef(null);
    const isInView = useInView(ctaRef, { once: true, amount: 0.3 });

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
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: [0.6, 0.05, 0.01, 0.9] }
        }
    };

    return (
        <section
            ref={ctaRef}
            className="relative py-24 md:py-32 overflow-hidden"
            style={{
                backgroundColor: "#0f1419",
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundAttachment: "fixed"
            }}
        >
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/50" />

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="relative z-10 max-w-5xl mx-auto px-6 text-center"
            >
                {/* Heading */}
                <motion.h2
                    variants={itemVariants}
                    className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight"
                >
                    <span className="text-white">READY TO </span>
                    <span
                        className="bg-gradient-to-r from-red-400 to-red-600 bg-clip-text text-transparent"
                        style={{
                            fontStyle: "italic",
                            textShadow: "0 0 30px rgba(239, 68, 68, 0.5)"
                        }}
                    >
                        TRANSCEND
                    </span>
                    <br />
                    <span className="text-white">YOUR LIMITS?</span>
                </motion.h2>

                {/* Subtitle */}
                <motion.p
                    variants={itemVariants}
                    className="text-gray-300 text-lg md:text-xl mb-10 max-w-2xl mx-auto"
                >
                    Join the elite rank. Your transformation starts with a single decision.
                </motion.p>

                {/* Buttons */}
                <motion.div
                    variants={itemVariants}
                    className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                >
                    {/* Primary Button */}
                    <motion.a
                        href="/contact"
                        whileHover={{
                            scale: 1.05,
                            boxShadow: "0px 0px 30px rgba(239, 68, 68, 0.8)"
                        }}
                        whileTap={{ scale: 0.95 }}
                        className="px-8 py-4 bg-red-500 hover:bg-red-600 text-white font-bold text-sm md:text-base uppercase tracking-widest rounded-lg transition-all duration-300 shadow-lg"
                        style={{
                            boxShadow: "0 4px 20px rgba(239, 68, 68, 0.4)"
                        }}
                    >
                        Start Your Trial
                    </motion.a>

                    {/* Secondary Button */}
                    <motion.a
                        href="/membership"
                        whileHover={{
                            scale: 1.05,
                            backgroundColor: "rgba(255, 255, 255, 0.1)"
                        }}
                        whileTap={{ scale: 0.95 }}
                        className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold text-sm md:text-base uppercase tracking-widest rounded-lg transition-all duration-300"
                    >
                        View Membership
                    </motion.a>
                </motion.div>
            </motion.div>

            {/* Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3]
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="absolute -top-20 -right-20 w-96 h-96 bg-red-500/20 rounded-full blur-3xl"
                />
                <motion.div
                    animate={{
                        scale: [1.2, 1, 1.2],
                        opacity: [0.3, 0.5, 0.3]
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="absolute -bottom-20 -left-20 w-96 h-96 bg-red-500/20 rounded-full blur-3xl"
                />
            </div>
        </section>
    );
};

export default CTASection;
