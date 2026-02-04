import { useNavigate } from "react-router-dom";
import heroImg from "../assets/hero.jpg";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section
      className="min-h-screen flex items-center text-white bg-cover bg-center"
      style={{
        backgroundImage: `linear-gradient(
          rgba(0,0,0,0.75),
          rgba(0,0,0,0.75)
        ), url(${heroImg})`,
      }}
    >
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight drop-shadow-lg mb-6">
          PowerFit Gym
        </h1>

        <p className="text-2xl md:text-3xl text-gray-200 mb-8">
          Train hard. Build strength. Own your transformation.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate("/contact")}
            className="bg-red-600 hover:bg-red-700 px-10 py-3.5 rounded-full text-base md:text-lg font-semibold shadow-lg shadow-red-500/40 hover:shadow-red-500/70 transition-transform transition-shadow duration-300 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500/80"
          >
            Join Now
          </button>

          <button
            type="button"
            onClick={() => navigate("/plans")}
            className="border border-red-500/70 text-red-400 hover:bg-red-600/10 px-9 py-3.5 rounded-full text-base md:text-lg font-semibold transition-colors duration-300"
          >
            View Plans
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
