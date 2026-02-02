const Hero = () => {
  return (
    <section className="min-h-screen bg-gradient-to-r from-black via-gray-900 to-black text-white flex items-center">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          PowerFit Gym
        </h1>
        <p className="text-xl md:text-2xl mb-6">
          Train Hard. Stay Strong.
        </p>
        <button className="bg-red-600 hover:bg-red-700 px-8 py-3 rounded-full text-lg font-semibold transition">
          Join Now
        </button>
      </div>
    </section>
  );
};

export default Hero;
