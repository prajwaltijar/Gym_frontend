const About = () => {
  return (
    <section className="min-h-screen bg-black text-white flex items-center">
      <div className="max-w-5xl mx-auto px-6 py-20 space-y-7">
        <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
          <span className="text-red-500">About</span> PowerFit Gym
        </h2>
        <p className="text-xl text-gray-300 leading-relaxed">
          PowerFit Gym is dedicated to helping you become the strongest,
          healthiest version of yourself. With expert trainers, modern
          equipment, and a motivating community, we support every step of
          your fitness journey.
        </p>
        <p className="text-xl text-gray-300 leading-relaxed">
          Whether you&apos;re just starting out or pushing for the next level,
          our personalized plans, group classes, and premium facilities are
          designed to help you train smart, stay consistent, and enjoy the
          process.
        </p>
      </div>
    </section>
  );
};

export default About;
