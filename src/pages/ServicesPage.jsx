import { useState } from "react";
import { Link } from "react-router-dom";
import { services } from "../data/services";
import CTASection from '../components/CTASection';


export default function ServicesPage() {
  const [activeCategory, setActiveCategory] = useState("All Services");

  const categories = ["All Services", "Strength", "Conditioning", "Wellness", "Nutrition"];

  const filteredServices = activeCategory === "All Services"
    ? services
    : services.filter(service => service.category === activeCategory);

  return (
    <div className=" min-h-screen bg-gradient-to-b from-black to-gray-900 text-white px-6 p-12">
      <div className="max-w-7xl mx-auto pb-12">
        {/* Category Filter */}
        <div className="flex flex-wrap gap-3 justify-center mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${activeCategory === category
                ? "bg-red-500 text-white"
                : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="group relative bg-gray-950 border border-gray-800 rounded-xl overflow-hidden 
                         hover:border-red-500 transition-all duration-300 hover:-translate-y-2"
            >
              {/* Service Image/Background */}
              <div className="relative h-64 overflow-hidden">
                {service.image ? (
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                ) : (
                  // Placeholder for Personal Training
                  <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                    <div className="text-center">
                      <service.icon className="text-6xl mb-4 opacity-20 mx-auto" />
                      <p className="text-gray-500 text-sm uppercase tracking-widest">{service.title}</p>
                    </div>
                  </div>
                )}

                {/* Icon Badge */}
                <div className="absolute bottom-4 left-4 w-10 h-10 bg-red-500 rounded-full flex items-center justify-center text-white text-xl">
                  <service.icon className="w-6 h-6" />
                </div>

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent opacity-60"></div>
              </div>

              {/* Service Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 tracking-wide">
                  {service.title}
                </h3>

                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* CTA Link */}
                <Link
                  to={service.link}
                  className="inline-flex items-center gap-2 text-red-500 font-semibold text-xs uppercase tracking-wide
                             hover:gap-3 transition-all duration-300"
                >
                  {service.cta}
                  <span className="transform transition-transform">→</span>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredServices.length === 0 && (
          <p className="text-center text-gray-400 py-12">
            No services found in this category
          </p>
        )}
      </div>
      <CTASection />
    </div>
  );
}
