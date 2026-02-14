const PlanCard = ({ plan, hidePrice = false }) => {
  return (
    <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6 shadow-xl hover:scale-105 transition-transform">

      <h2 className="text-2xl font-bold mb-2">
        {plan.name}
      </h2>

      <p className="text-gray-400 text-sm mb-4">
        {plan.description}
      </p>

      {/* PRICE — only when allowed */}
      {!hidePrice && (
        <p className="text-red-500 text-xl font-bold mt-3">
          ₹{plan.price}
        </p>
      )}

    </div>
  );
};

export default PlanCard;
