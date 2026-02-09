import { motion } from "framer-motion";
import api from "../../api/aixos";

const MemberCard = ({ member, refresh }) => {

  // ===== DAYS REMAINING CALCULATION =====
  const calculateDaysLeft = () => {
    if (!member.plan || !member.admittedAt) return null;

    const start = new Date(member.admittedAt);
    const expiry = new Date(start);
    expiry.setDate(start.getDate() + member.plan.durationindays);

    const today = new Date();
    const diff = Math.ceil(
      (expiry - today) / (1000 * 60 * 60 * 24)
    );

    return diff;
  };

  const daysLeft = calculateDaysLeft();

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this member?")) return;
    await api.delete(`/admission/delete/${member._id}`);
    refresh();
  };

  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      className="bg-gray-900/70 border border-gray-800 rounded-xl p-4 flex justify-between gap-4"
    >
      {/* LEFT INFO */}
      <div className="space-y-1 text-sm">

        <h3 className="text-lg font-semibold text-white">
          {member.customerName}
        </h3>

        <p className="text-gray-400">
          📱 {member.mobile}
        </p>

        <p>
          Plan:
          <span className="ml-1 text-gray-200 font-medium">
            {member.plan?.name || "No Plan"}
          </span>
        </p>

        <p className="text-gray-400">
          Joined: {new Date(member.admittedAt).toLocaleDateString("en-IN")}
        </p>

        {/* DAYS LEFT */}
        {daysLeft !== null && (
          <p
            className={`text-sm font-medium ${
              daysLeft > 5
                ? "text-emerald-400"
                : daysLeft > 0
                ? "text-yellow-400"
                : "text-red-400"
            }`}
          >
            {daysLeft > 0
              ? `⏳ ${daysLeft} days remaining`
              : "❌ Plan Expired"}
          </p>
        )}

        <p className="text-emerald-400">
          Paid: ₹{member.amountPaid}
        </p>

        <p className="text-yellow-400">
          Remaining: ₹{member.remainingAmount}
        </p>
      </div>

      {/* RIGHT BUTTONS */}
      <div className="flex flex-col gap-2 justify-center">
        <button
          className="px-3 py-1.5 rounded-lg text-sm
          bg-blue-500/20 text-blue-300 hover:bg-blue-500/30"
        >
          Edit
        </button>

        <button
          onClick={handleDelete}
          className="px-3 py-1.5 rounded-lg text-sm
          bg-red-500/20 text-red-300 hover:bg-red-500/30"
        >
          Delete
        </button>
      </div>
    </motion.div>
  );
};

export default MemberCard;
