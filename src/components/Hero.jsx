import { useNavigate } from "react-router-dom";
import heroImg from "../assets/hero.jpg";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section
      className="min-h-screen flex items-center text-white bg-cover bg-center"
      style={{
        backgroundImage: `linear-gradient(
          rgba(0,0,0,0.6),
          rgba(0,0,0,0.6)
        ), url(${heroImg})`,
      }}
    >
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          PowerFit Gym
        </h1>

        <p className="text-xl md:text-2xl mb-6">
          Train Hard. Stay Strong.
        </p>

        <button
          onClick={() => navigate("/contact")}
          className="bg-red-600 hover:bg-red-700 px-8 py-3 rounded-full text-lg font-semibold transition"
        >
          Join Now
        </button>
      </div>
    </section>
  );
};

export default Hero;
