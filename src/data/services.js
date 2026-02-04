export const services = [
  {
    slug: "personal-training",
    title: "Personal Training 🏋️",
    short: "One-on-one coaching",
    tagline:
      "Dedicated 1:1 coaching, built fully around your lifestyle and goals.",
    overview:
      "Personal Training pairs you with a coach who learns your goals, current fitness level, and schedule, then builds a realistic but challenging plan just for you.",
    approach:
      "Sessions combine strength work, conditioning, and mobility so you move better, feel stronger, and avoid injuries. Every workout is planned in advance, so you walk into the gym knowing exactly what to do.",
    benefits: [
      "Fully personalized workout programming that adapts as you progress",
      "Real-time form correction to keep you safe and efficient",
      "Accountability and check-ins so you don’t fall off track",
      "Progress tracking with measurable milestones every few weeks",
    ],
    idealFor: [
      "Beginners who want to start with proper technique",
      "Busy professionals who need an efficient, structured plan",
      "Lifters stuck on a plateau who want expert eyes on their form",
    ],
  },
  {
    slug: "cardio-strength",
    title: "Cardio & Strength 🔥",
    short: "Build stamina & muscle",
    tagline:
      "Structured cardio and lifting sessions to burn fat and build lean muscle.",
    overview:
      "Our Cardio & Strength program gives you a clear plan for combining machines, free weights, and functional training so you stop guessing and start progressing.",
    approach:
      "You’ll rotate through focused days for strength, conditioning, and recovery. Each session is scalable, with options for beginners and advanced members, so you always feel challenged without being overwhelmed.",
    benefits: [
      "Programs designed to increase strength, stamina, and work capacity",
      "Access to treadmills, bikes, rowers, free weights, and more",
      "Guided strength splits and rep schemes for all levels",
      "Balanced weekly structure so you recover properly while still progressing",
    ],
    idealFor: [
      "Anyone who wants a clear gym routine instead of random workouts",
      "People focused on both fat loss and muscle gain",
      "Members preparing for sports, events, or simply better everyday fitness",
    ],
  },
  {
    slug: "nutrition-guidance",
    title: "Nutrition Guidance 🥗",
    short: "Eat smart",
    tagline:
      "Simple, sustainable nutrition coaching that actually fits real life.",
    overview:
      "Nutrition Guidance helps you turn food into a tool for better performance, fat loss, or muscle gain—without extreme diets or complicated rules.",
    approach:
      "We start from your current habits, schedule, and preferences, then layer in small, realistic changes. You’ll learn how to build balanced meals, understand portions, and navigate eating out or busy days without losing momentum.",
    benefits: [
      "Customized guidelines for fat loss, muscle gain, or maintenance",
      "Habit-based coaching instead of rigid meal plans",
      "Clear examples of breakfasts, lunches, dinners, and snacks",
      "Ongoing tweaks based on progress, feedback, and energy levels",
    ],
    idealFor: [
      "Members who train hard but aren’t seeing the results they want",
      "Anyone tired of yo-yo dieting and quick fixes",
      "People who want confidence about what and how much to eat",
    ],
  },
];

export const getServiceBySlug = (slug) =>
  services.find((service) => service.slug === slug);
