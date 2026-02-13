import { useEffect, useState } from "react";
import api from "../api/aixos";
import { useNavigate } from "react-router-dom";
import ServiceCard from "./ServiceCard";

const Services = () => {

  const [services, setServices] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/services/getservices")
      .then(res => setServices(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <section className="py-24 bg-gradient-to-b from-black to-gray-900 text-white">
      <div className="max-w-6xl mx-auto px-6">

        <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-5 tracking-wide">
          <span className="text-yellow-500">Our</span> Services
        </h2>

        <p className="text-center text-gray-300 text-lg md:text-xl mb-16 max-w-2xl mx-auto">
          Choose a service to see available plans
        </p>

        <div className="grid gap-10 lg:gap-12 md:grid-cols-3">

          {services.map((service) => (
            <div
              key={service._id}
              onClick={() => navigate(`/plans/${service._id}`)}
              className="cursor-pointer transform transition duration-300 hover:-translate-y-2 hover:scale-105"
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
