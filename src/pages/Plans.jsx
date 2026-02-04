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
    <main className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white pt-12 pb-24">
      <div className="max-w-6xl mx-auto px-6">
        <header className="text-center mb-12">
          <p className="text-xs uppercase tracking-[0.2em] text-red-400 mb-2">
            Membership Plans
          </p>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            Choose a plan that fits your journey
          </h1>
          <p className="text-gray-300 text-base md:text-lg max-w-2xl mx-auto">
            Start simple or go all in—each plan is designed to support you at a different stage of your fitness journey.
          </p>
        </header>

        <section className="grid gap-10 md:grid-cols-3">
          {plans.map((plan) => (
            <article
              key={plan.name}
              className={`relative rounded-2xl border bg-gray-900/70 p-7 md:p-8 shadow-xl transition-transform duration-300 hover:-translate-y-2 hover:shadow-red-500/20 ${
                plan.highlight ? "border-red-600" : "border-gray-800"
              }`}
            >
              {plan.highlight && (
                <span className="absolute -top-3 left-6 rounded-full bg-red-600 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide">
                  Most Popular
                </span>
              )}

              <h2 className="text-2xl font-bold mb-1">{plan.name}</h2>
              <p className="text-sm uppercase tracking-wide text-red-400 mb-4">
                {plan.tag}
              </p>

              <p className="text-3xl font-extrabold mb-3">{plan.price}</p>
              <p className="text-gray-300 text-base mb-5">{plan.description}</p>

              <ul className="space-y-2 text-gray-300 text-base mb-7">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-red-500" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                type="button"
                className="w-full rounded-full bg-red-600 py-3 text-sm md:text-base font-semibold uppercase tracking-wide hover:bg-red-500 transition-colors shadow-lg shadow-red-500/30 hover:shadow-red-500/60"
              >
                Join this plan
              </button>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
};

export default Plans;
