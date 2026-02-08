const About = () => {
  return (
    <section className="min-h-screen bg-black text-white">
      <div className="max-w-6xl mx-auto px-6 py-20">

        {/* Heading */}
        <div className="mb-14 text-center">
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
            <span className="text-red-500">About</span> PowerFit Gym
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            PowerFit Gym is dedicated to helping you become the strongest,
            healthiest version of yourself. We combine expert coaching,
            premium equipment and a motivating environment to help you stay
            consistent and achieve real results.
          </p>
        </div>

        {/* Mission + Vision */}
        <div className="grid md:grid-cols-2 gap-10 mb-16">
          <div className="bg-zinc-900 p-8 rounded-xl shadow-lg">
            <h3 className="text-2xl font-bold mb-4 text-red-500">Our Mission</h3>
            <p className="text-gray-300">
              Our mission is to make fitness simple and sustainable for everyone.
              Whether you're a beginner or athlete, we guide you with proper
              training techniques, diet support and motivation.
            </p>
          </div>

          <div className="bg-zinc-900 p-8 rounded-xl shadow-lg">
            <h3 className="text-2xl font-bold mb-4 text-red-500">Our Vision</h3>
            <p className="text-gray-300">
              We aim to build a strong fitness community where people train
              together, stay healthy and grow mentally & physically stronger
              every day.
            </p>
          </div>
        </div>

        {/* Facilities */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold mb-8 text-center">Why Choose Us</h3>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
            {[
              "Certified Trainers",
              "Modern Equipment",
              "Personal Training",
              "Diet Guidance",
              "Cardio Zone",
              "Strength Training Area",
              "Locker & Shower",
              "Affordable Plans",
              "Friendly Environment",
            ].map((item, index) => (
              <div
                key={index}
                className="bg-zinc-900 p-6 rounded-xl text-center hover:bg-red-500/10 transition"
              >
                <p className="text-lg font-semibold">{item}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Timings */}
        <div className="bg-zinc-900 p-10 rounded-xl text-center mb-16">
          <h3 className="text-3xl font-bold mb-4 text-red-500">Gym Timings</h3>
          <p className="text-lg text-gray-300">Monday – Saturday: 5:30 AM – 10:30 PM</p>
          <p className="text-lg text-gray-300">Sunday: 7:00 AM – 2:00 PM</p>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h3 className="text-3xl font-bold mb-4">
            Start Your Fitness Journey Today
          </h3>
          <p className="text-gray-300 mb-6">
            Join PowerFit Gym and transform your body with expert guidance.
          </p>
          <a
            href="/contact"
            className="bg-red-500 hover:bg-red-600 px-8 py-3 rounded-lg font-semibold transition"
          >
            Join Now
          </a>
        </div>

      </div>
    </section>
  );
};

export default About;
