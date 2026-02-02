const ServiceCard = ({ title, description, icon }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md text-center hover:shadow-xl transition">
      <div className="text-5xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default ServiceCard;
