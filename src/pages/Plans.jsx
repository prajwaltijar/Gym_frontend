import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";


const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

const Plans = () => {
  const navigate = useNavigate();

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
        "Monthly trainer check-in",
        "Training split guidance",
        "Basic nutrition tips",
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
        "Weekly personal training",
        "Custom workout plan",
        "Personalized diet strategy",
      ],
    },
  ];

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gray-50 pt-14 pb-24"
    >
      <div className="max-w-6xl mx-auto px-6">

        {/* HEADER */}
        <div className="text-center mb-14">
          <p className="text-xs uppercase tracking-widest text-yellow-500 mb-2">
            Membership Plans
          </p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-black">
            Choose Your Fitness Plan
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Pick the plan that suits your fitness goals and start your journey today.
          </p>
        </div>

        {/* CARDS */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid gap-8 md:grid-cols-3"
        >
          {plans.map((plan) => (
            <motion.article
              key={plan.name}
              variants={cardVariants}
              className={`rounded-xl border p-7 bg-white shadow-sm hover:shadow-md transition ${
                plan.highlight
                  ? "border-yellow-400 scale-[1.03]"
                  : "border-gray-200"
              }`}
            >
              {plan.highlight && (
                <span className="inline-block mb-3 text-xs font-semibold uppercase text-yellow-600">
                  Most Popular
                </span>
              )}

              <h2 className="text-2xl font-bold text-black mb-1">
                {plan.name}
              </h2>
              <p className="text-sm text-gray-500 mb-4">{plan.tag}</p>

              <p className="text-3xl font-extrabold text-black mb-4">
                {plan.price}
              </p>

              <p className="text-gray-600 mb-5">{plan.description}</p>

              <ul className="space-y-2 text-gray-700 mb-7">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-yellow-500" />
                    {feature}
                  </li>
                ))}
              </ul>

              <button
  onClick={() => navigate(`/plans/${plan.name}`)}
  className="w-full bg-yellow-400 text-black py-2 rounded-md font-semibold hover:bg-yellow-300 transition"
>
  Join Plan
</button>

            </motion.article>
          ))}
        </motion.section>
      </div>
    </motion.main>
  );
};

export default Plans;
``