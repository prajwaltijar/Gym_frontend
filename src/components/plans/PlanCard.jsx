const PlanCard = ({ plan }) => {
  return (
    <div className="bg-gray-900 p-5 rounded-xl border border-gray-800 hover:scale-105 transition">

      <h3 className="text-xl font-semibold mb-2 text-white">
        {plan.name}
      </h3>

      <p className="text-gray-400 text-sm">
        Duration : {plan.durationindays} Days
      </p>

      <p className="text-red-500 text-lg font-bold mt-2">
        ₹ {plan.price}
      </p>

      {plan.description && (
        <p className="text-gray-300 text-sm mt-2">
          {plan.description}
        </p>
      )}

    </div>
  );
};

export default PlanCard;
