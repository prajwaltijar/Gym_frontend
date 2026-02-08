import { useState } from "react";

const services = [
  {
    id: 1,
    title: "Personal Training",
    description: "One to one coaching with certified trainer for faster results.",
    price: 2500
  },
  {
    id: 2,
    title: "Weight Loss Program",
    description: "Structured fat loss workout and diet guidance program.",
    price: 1800
  },
  {
    id: 3,
    title: "Muscle Gain Program",
    description: "Hypertrophy based workout split for size & strength.",
    price: 2200
  },
  {
    id: 4,
    title: "Zumba Classes",
    description: "Fun dance cardio sessions for fitness and stamina.",
    price: 1500
  },
  {
    id: 5,
    title: "Yoga Sessions",
    description: "Flexibility, mobility and mental wellness training.",
    price: 1200
  },
  {
    id: 6,
    title: "Diet Consultation",
    description: "Custom meal plan based on your body goal.",
    price: 1000
  }
];

export default function ServicesPage() {
  const [search, setSearch] = useState("");

  const filtered = services.filter((service) =>
    service.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white px-6 py-12">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center mb-3">
          Our <span className="text-red-500">Services</span>
        </h1>
        <p className="text-center text-gray-400 mb-8">
          Choose the service that fits your fitness goal
        </p>

        <div className="flex justify-center mb-10">
          <input
            type="text"
            placeholder="Search services..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-md px-4 py-2 rounded-xl bg-black/40 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((service) => (
            <div
              key={service.id}
              className="bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-xl hover:scale-105 transition-transform"
            >
              <h2 className="text-2xl font-bold mb-2">{service.title}</h2>
              <p className="text-gray-400 text-sm mb-5">{service.description}</p>

              <div className="flex justify-between items-center">
                <span className="text-gray-300">Price:</span>
                <span className="text-red-500 text-xl font-bold">₹{service.price} / month</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
