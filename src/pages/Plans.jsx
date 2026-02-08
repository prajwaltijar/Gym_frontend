import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.25 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

const Plans = () => {
  const plans = [
    {
      name: "Starter",
      tag: "Best for beginners",
      price: "₹1,499 / month",
      description:
        "Build a consistent routine with all the essentials you need to get started.",
      features: [
        "Full gym floor access",
        "Cardio & strength equipment",
        "Locker and shower access",
        "Basic onboarding session",
      ],
    },
    {
      name: "Progress",
      tag: "Most popular",
      price: "₹2,499 / month",
      description:
        "Level up your training with guidance, structure, and more support.",
      features: [
        "Everything in Starter",
        "Monthly check-in with a trainer",
        "Suggested weekly training split",
        "Basic nutrition guidelines",
      ],
      highlight: true,
    },
    {
      name: "Elite Coaching",
      tag: "For serious results",
      price: "₹4,499 / month",
      description:
        "Work closely with a coach for custom training and nutrition support.",
      features: [
        "Everything in Progress",
        "Weekly 1:1 personal training session",
        "Fully customized training plan",
        "Personalized nutrition strategy and adjustments",
      ],
    },
  ];

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white pt-12 pb-24"
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* HEADER */}
        <motion.header
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <p className="text-xs uppercase tracking-[0.2em] text-red-400 mb-2">
            Membership Plans
          </p>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            Choose a plan that fits your journey
          </h1>
          <p className="text-gray-300 text-base md:text-lg max-w-2xl mx-auto">
            Start simple or go all in—each plan is designed to support you at a different stage of your fitness journey.
          </p>
        </motion.header>

        {/* CARDS */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid gap-10 md:grid-cols-3"
        >
          {plans.map((plan) => (
            <motion.article
              key={plan.name}
              variants={cardVariants}
              whileHover={{ y: -12, scale: 1.03 }}
              className={`relative rounded-2xl border bg-gray-900/70 p-7 md:p-8 shadow-xl ${{ true: "" }[true]} ${
                plan.highlight ? "border-red-600 shadow-red-500/30" : "border-gray-800"
              }`}
            >
              {plan.highlight && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="absolute -top-3 left-6 rounded-full bg-red-600 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide"
                >
                  Most Popular
                </motion.span>
              )}

              <h2 className="text-2xl font-bold mb-1">{plan.name}</h2>
              <p className="text-sm uppercase tracking-wide text-red-400 mb-4">
                {plan.tag}
              </p>

              <motion.p
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                className="text-3xl font-extrabold mb-3"
              >
                {plan.price}
              </motion.p>

              <p className="text-gray-300 text-base mb-5">{plan.description}</p>

              <ul className="space-y-2 text-gray-300 text-base mb-7">
                {plan.features.map((feature, i) => (
                  <motion.li
                    key={feature}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className="flex items-start gap-2"
                  >
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-red-500" />
                    <span>{feature}</span>
                  </motion.li>
                ))}
              </ul>

              <motion.button
                type="button"
                whileHover={{
                  scale: 1.1,
                  boxShadow: "0px 0px 25px rgba(239,68,68,0.7)",
                }}
                whileTap={{ scale: 0.95 }}
                className="w-full rounded-full bg-red-600 py-3 text-sm md:text-base font-semibold uppercase tracking-wide hover:bg-red-500 transition-colors shadow-lg shadow-red-500/30"
              >
                Join this plan
              </motion.button>
            </motion.article>
          ))}
        </motion.section>
      </div>
    </motion.main>
  );
};

export default Plans;