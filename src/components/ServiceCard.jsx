import { Link } from "react-router-dom";

const ServiceCard = ({ service }) => {
  return (
    <Link
      to={`/service/${service._id}`}
      className="block bg-gray-900 border border-gray-800 p-6 rounded-2xl shadow-lg
                 transition-all duration-300 hover:shadow-red-500/20 hover:border-yellow-300
                 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-yellow-500/60"
    >
      <h3 className="text-2xl font-bold mb-3 text-white">
        {service.title}
      </h3>

      <p className="text-gray-300 text-base leading-relaxed">
        {service.description}
      </p>

      <p className="mt-5 text-yellow-400 text-sm font-semibold uppercase tracking-wide">
        View Plans →
      </p>
    </Link>
  );
};

export default ServiceCard;
