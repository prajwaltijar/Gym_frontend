const services = [
  "Gym",
  "Cardio",
  "Yoga",
  "Zumba",
  "Personal Training",
];

const ServiceSelector = ({ setSelectedService }) => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Select Service</h3>

      <div className="space-y-2">
        {services.map((service) => (
          <button
            key={service}
            onClick={() => setSelectedService(service)}
            className="w-full bg-gray-800 p-3 rounded-lg hover:bg-red-600"
          >
            {service}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ServiceSelector;
