import { useState, useEffect } from "react";
import api from "../api/aixos"; // tumhara axios instance
import ServiceCard from "../components/ServiceCard";

export default function ServicesPage() {
  const [services, setServices] = useState([]);
  const [search, setSearch] = useState("");

  // DB se services fetch
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await api.get("/services/getservices");
        setServices(res.data);
      } catch (err) {
        console.error("Failed to load services", err);
      }
    };

    fetchServices();
  }, []);

  // search filter
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

        {/* Search */}
        <div className="flex justify-center mb-10">
          <input
            type="text"
            placeholder="Search services..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-md px-4 py-2 rounded-xl bg-black/40 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.length > 0 ? (
            filtered.map((service) => (
              <ServiceCard key={service._id} service={service} />
            ))
          ) : (
            <p className="text-center col-span-full text-gray-400">
              No services found
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
