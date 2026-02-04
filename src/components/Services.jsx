import ServiceCard from "./ServiceCard";
import { services } from "../data/services";

const Services = () => {

  return (
    <section className="py-20 bg-gradient-to-b from-black to-gray-900 text-white">
      <div className="max-w-6xl mx-auto px-6">
        
        <h2 className="text-4xl font-extrabold text-center mb-4 tracking-wide">
          <span className="text-red-500">Our</span> Services
        </h2>
        <p className="text-center text-gray-400 mb-14 max-w-xl mx-auto">
          Everything you need to transform your body, boost confidence, and stay fit.
        </p>

        <div className="grid gap-10 md:grid-cols-3">
          {services.map((service, index) => (
            <div
              key={index}
              className="transform transition duration-300 hover:-translate-y-2 hover:scale-105"
            >
              <ServiceCard service={service} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
