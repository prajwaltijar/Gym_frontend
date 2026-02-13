import { useNavigate } from "react-router-dom";
import heroImg from "../assets/hero.jpg";

const HeroJourney = () => {
  const navigate = useNavigate();

  return (
    <section
      className="relative min-h-screen flex items-center text-white"
      style={{
        backgroundImage: `url(${heroImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/55 backdrop-brightness-180"></div>

      {/* LEFT CONTENT */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-20">
        <div className="max-w-2xl">

          <h1 className="uppercase font-extrabold leading-tight tracking-wide text-left">
            <span className="block text-4xl md:text-7xl text-gray-200">
              The Only
            </span>

            <span className="block text-4xl md:text-7xl text-yellow-400">
              Impossible
            </span>

            <span className="block text-4xl md:text-7xl text-yellow-400">
              Journey Is
            </span>

            <span className="block text-4xl md:text-7xl text-gray-200">
              The One You
            </span>

            <span className="block text-4xl md:text-7xl text-yellow-400">
              Never Begin.
            </span>
          </h1>

          <button
            onClick={() => navigate("/contact")}
            className="mt-10 bg-yellow-400 text-black font-bold px-8 py-3 hover:bg-yellow-300 transition"
          >
            BEGIN YOUR JOURNEY
          </button>

        </div>
      </div>
    </section>
  );
};

export default HeroJourney;
