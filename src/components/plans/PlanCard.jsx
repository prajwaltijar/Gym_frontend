import api from "../../api/axios";

const PlanCard = ({ plan, refreshPlans, isAdmin = false, onEdit }) => {

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this plan?"))
      return;

    try {
      await api.delete(`/plans/deleteplan/${plan._id}`);
      refreshPlans && refreshPlans();
    } catch (err) {
      console.error(err);
      alert("Failed to delete plan");
    }
  };

  // ✅ Active / Inactive Logic (Date Based)
  const today = new Date();

  const isActive =
    plan.startDate && plan.endDate
      ? new Date(plan.startDate) <= today &&
        new Date(plan.endDate) >= today
      : false;

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6 shadow-lg hover:shadow-red-500/20 hover:scale-105 transition-all duration-300">

      {/* Plan Name + Status */}
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-2xl font-bold text-white">
          {plan.name}
        </h2>

        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            isActive
              ? "bg-green-600 text-white"
              : "bg-red-600 text-white"
          }`}
        >
          {isActive ? "Active" : "Inactive"}
        </span>
      </div>

      {/* Service */}
      {plan.service && (
        <p className="text-yellow-400 text-sm mb-2">
          Service: {plan.service?.title}
        </p>
      )}

      {/* Description */}
      {plan.description && plan.description.trim() !== "" && (
        <p className="text-gray-400 text-sm mb-4">
          {plan.description}
        </p>
      )}

      {/* Price */}
      <p className="text-red-500 text-xl font-bold mb-4">
        ₹{plan.price}
      </p>

      {/* Admin Buttons */}
      {isAdmin && (
        <div className="flex gap-3">
          <button
            onClick={() => onEdit(plan)}
            className="flex-1 px-4 py-2 rounded-xl text-sm font-medium bg-blue-500/20 text-blue-300 hover:bg-blue-500/30 transition"
          >
            Edit
          </button>

          <button
            onClick={handleDelete}
            className="flex-1 px-4 py-2 rounded-xl text-sm font-medium bg-red-500/20 text-red-300 hover:bg-red-500/30 transition"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default PlanCard;