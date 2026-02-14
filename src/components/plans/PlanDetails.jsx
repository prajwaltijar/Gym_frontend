import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const PlanDetails = () => {
  const { planName } = useParams();
  const navigate = useNavigate();
  const formattedName = planName.replace(/-/g, " ");

  const plans = {
    Starter: {
      price: "₹1,499 / month",
      hero: "Start gym without confusion — learn basics safely",
      sections: [
        {
          title: "Gym Introduction",
          desc: "On your first days, the trainer personally walks you around the gym and explains every machine in a simple way. You learn what each equipment is used for and how to adjust it according to your body. This removes fear and confusion that most beginners feel. By the end, you feel comfortable entering the gym alone.",
        },
        {
          title: "Simple Workout Plan",
          desc: "You follow an easy full-body workout designed for beginners. Exercises focus on activating all muscles without overloading your body. The goal is to build stamina and basic strength gradually. This prepares your body safely for heavier training later.",
        },
        {
          title: "Form Correction",
          desc: "Trainer regularly checks your posture while you exercise. Small mistakes are corrected immediately to avoid pain or injury. Proper technique also helps muscles grow faster. You learn how to lift correctly from the beginning.",
        },
        {
          title: "Habit Building",
          desc: "The main goal is consistency, not heavy weight. You develop a regular gym routine that fits your daily life. Slowly your energy and discipline improve. Gym becomes a natural part of your schedule.",
        },
      ],
      training:
        "You train 3–4 days per week using simple exercises like pushups, assisted machines, and light squats. The focus is learning movement and building stamina, not lifting heavy weight. Trainer slowly increases reps so your body adapts safely. This stage prepares your joints and muscles for future workouts..",
      diet:
        "No strict diet is required in the beginning. You just start eating enough protein like eggs, dal,  milk, or paneer daily. Drinking more water and reducing junk food is the main goal. This helps your body recover and build healthy habits first.",
    },

    Progress: {
      price: "₹2,499 / month",
      hero: "Now your body is ready — time for real transformation",
      sections: [
        {
          title: "Monthly Trainer Check",
          desc: "Every month your strength and body measurements are reviewed. This shows clear progress and keeps you motivated. Trainer updates your workout based on results. You never feel stuck in the same routine. measurements and strength checked every month to track progress clearly.",
        },
        {
          title: "Workout Split",
          desc: "Different muscle groups are trained on different days. This allows better recovery and faster muscle growth. Your workouts become more focused and effective. Body shape changes become noticeable",
        },
        {
          title: "Progressive Overload",
          desc: "Weights Weights or repetitions gradually increase over weeks. This forces muscles to adapt and grow stronger. Training never becomes stagnant. You keep improving continuously. repetitions increase every 4‑6 weeks so muscles keep growing.",
        },
        {
          title: "Nutrition Structure",
          desc: "You get simple meal guidance according to your goal. Food choices become smarter, not restrictive. Helps fat loss or muscle gain happen properly. Easy to follow daily diet routine.",
        },
      ],
      training:
        "You train 5–6 days weekly using a proper muscle split like chest, back, legs, and shoulders. Compound exercises like squats, rows, and presses become regular. Weight or reps increase every few weeks to build strength. Your body shape and muscle tone start changing clearly.",
      diet:
        "BMeals are planned based on fat loss or muscle gain goal. You balance protein, carbs, and healthy fats properly. Portion control and meal timing become important now. Diet supports faster visible transformation.",
    },

    "Elite Coaching": {
      price: "₹4,499 / month",
      hero: "Personal coaching for maximum results",
      sections: [
        {
          title: "Weekly Personal Training",
          desc: "Trainer supervises your workouts personally and adjusts intensity safely. Your technique stays perfect in every exercise. This prevents injury and maximizes results. Progress becomes much faster.",
        },
        {
          title: "Custom Workout",
          desc: "Workout program is designed specifically for your body type and goal. No random exercises are included. Every session has a clear purpose. Results become predictable.",
        },
        {
          title: "Personal Diet Plan",
          desc: "You receive a proper structured meal plan. Calories and nutrients are planned according to progress. Diet changes when your body changes. Transformation becomes controlled and efficient.",
        },
        {
          title: "Continuous Support",
          desc: "You can ask doubts anytime regarding workout or diet. Trainer guides you whenever you feel stuck. Motivation stays high throughout your journey. You never feel lost during training.",
        },
      ],
      training:
        "You perform 3–4 coached sessions weekly with full supervision. Heavy compound lifts and advanced techniques are used safely. Trainer adjusts intensity every week according to progress. This produces maximum strength and physique improvement.",
      diet:
        "You get a personalized meal plan with exact calories and nutrients. Diet changes regularly depending on results. Supplements guidance may also be included if needed. This ensures fastest and most controlled transformation.",
    },
  };

  const plan = plans[formattedName];
  if (!plan) return <div className="p-10">Plan not found</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-slate-800">

      <div className="max-w-6xl mx-auto px-6 py-16">
        <motion.div initial="hidden" animate="show" variants={fadeUp} className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-3">{formattedName}</h1>
          <p className="text-gray-600 mb-2">{plan.hero}</p>
          <p className="text-2xl font-semibold text-yellow-600">{plan.price}</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {plan.sections.map((s) => (
            <motion.div
            key={s.title}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
          className="bg-gray-100 border border-yellow-300 text-amber-600 rounded-2xl p-7 shadow-sm hover:shadow-md transition transform hover:scale-105 duration-300 ease-out"
          >
              <h3 className="text-xl font-bold mb-2">{s.title}</h3>
              <p className="text-gray-800">{s.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div variants={fadeUp} initial="hidden" whileInView="show" className="bg-yellow-50 rounded-2xl p-8 mb-10">
          <h3 className="text-2xl text-black font-bold mb-3">Training Method</h3>
          <p className="text-gray-700">{plan.training}</p>
        </motion.div>

        <motion.div variants={fadeUp} initial="hidden" whileInView="show" className="bg-green-50 rounded-2xl p-8 mb-16">
          <h3 className="text-2xl text-black font-bold mb-3">Diet Guidance</h3>
          <p className="text-gray-700">{plan.diet}</p>
        </motion.div>

        <div className="text-center">
          
          <button  onClick={() => navigate("/contact")} className="bg-yellow-500 hover:bg-yellow-400 text-black px-10 py-4 rounded-xl font-semibold text-lg transition">
            Join {formattedName}
          </button>

          <p onClick={() => navigate(-1)} className="mt-6 text-gray-300 cursor-pointer hover:text-yellow-500">
            ← Back to Plans
          </p>
        </div>
      </div>
    </div>
  );
};

export default PlanDetails;
