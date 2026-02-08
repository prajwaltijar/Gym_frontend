const PlanCard = ({ plan }) => {
  return (
    <div className="bg-gray-900 p-5 rounded-xl border border-gray-800 hover:scale-105 transition">
      <h3 className="text-xl font-semibold mb-2">{plan.service}</h3>

      <div className="text-gray-300 text-sm space-y-1">
        <p>1 Month : ₹{plan.oneMonth}</p>
        <p>3 Month : ₹{plan.threeMonth}</p>
        <p>6 Month : ₹{plan.sixMonth}</p>
      </div>
    </div>
  );
};

export default PlanCard;
