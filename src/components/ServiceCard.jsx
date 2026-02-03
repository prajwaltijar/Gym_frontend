import { useState } from "react";

const ServiceCard = ({ service }) => {
  const [open, setOpen] = useState(false);

  return (
    <div
      onClick={() => setOpen(!open)}
      className="cursor-pointer bg-gray-900 border border-gray-800 p-6 rounded-2xl shadow-lg
                 transition-all duration-300 hover:shadow-red-500/20 hover:border-red-500
                 hover:-translate-y-1"
    >
      <h3 className="text-xl font-bold mb-2 text-white">
        {service.title}
      </h3>

      <p className="text-gray-400">
        {service.short}
      </p>

      {open && (
        <p className="mt-4 text-gray-300 text-sm leading-relaxed border-t border-gray-700 pt-4">
          {service.description}
        </p>
      )}
    </div>
  );
};

export default ServiceCard;
