import { motion } from "framer-motion";
import api from "../../api/aixos";

const MemberCard = ({ member, refresh, onEdit }) => {

  // ===== DAYS REMAINING CALCULATION =====
  const calculateDaysLeft = () => {
    if (!member.plan || !member.admittedAt) return null;

    const start = new Date(member.admittedAt);
    const expiry = new Date(start);
    expiry.setDate(start.getDate() + member.plan.durationindays);

    const today = new Date();
    const diff = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));

    return diff;
  };

  const daysLeft = calculateDaysLeft();

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this member?")) return;
    await api.delete(`/admission/delete/${member._id}`);
    refresh();
  };

  const progress =
    daysLeft !== null && member.plan
      ? Math.max(0, Math.min(100, (daysLeft / member.plan.durationindays) * 100))
      : 0;

  return (
    <motion.div
      className="w-full h-full
      bg-[#223044] hover:scale-102
      border border-gray-800 backdrop-blur-xl
      rounded-2xl p-5 shadow-lg flex flex-col gap-6 h-full"
    >

      <div className="flex-1 space-y-2">

        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-white tracking-wide">
            {member.customerName}
          </h3>

          {daysLeft !== null && (
            <span
              className={`px-3 py-1 text-xs rounded-full font-semibold
              ${
                daysLeft > 0
                  ? "bg-emerald-500/20 text-emerald-400"
                  : "bg-red-500/20 text-red-400"
              }`}
            >
              {daysLeft > 0 ? "Active" : "Expired"}
            </span>
          )}
        </div>

        <p className="text-gray-400 text-sm">📱 {member.mobile}</p>

        <p className="text-sm">
          Plan:
          <span className="ml-2 text-white font-medium">
            {member.plan?.name || "No Plan"}
          </span>
        </p>

        <p className="text-gray-400 text-sm">
          Joined: {new Date(member.admittedAt).toLocaleDateString("en-IN")}
        </p>

        {daysLeft !== null && (
          <div className="pt-2">
            <div className="flex justify-between text-xs mb-1 text-gray-400">
              <span>Membership Progress</span>
              <span>
                {daysLeft > 0 ? `${daysLeft} days left` : "Expired"}
              </span>
            </div>

            <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
              <div
                className={`h-full ${
                  daysLeft > 5
                    ? "bg-emerald-400"
                    : daysLeft > 0
                    ? "bg-yellow-400"
                    : "bg-red-500"
                }`}
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        <div className="flex gap-4 pt-3 text-sm">
          <div className="bg-emerald-500/10 border border-emerald-500/20 px-3 py-2 rounded-lg">
            <p className="text-gray-400 text-xs">Paid</p>
            <p className="text-emerald-400 font-semibold">
              ₹{member.amountPaid}
            </p>
          </div>

          <div className="bg-yellow-500/10 border border-yellow-500/20 px-3 py-2 rounded-lg">
            <p className="text-gray-400 text-xs">Remaining</p>
            <p className="text-yellow-400 font-semibold">
              ₹{member.remainingAmount}
            </p>
          </div>
        </div>
      </div>

      {/* BUTTONS */}
      <div className="mt-auto flex gap-3 w-full">
        <button
          onClick={() => onEdit(member)}
          className="flex-1 px-4 py-2 rounded-xl text-sm font-medium
          bg-blue-500/20 text-blue-300 hover:bg-blue-500/30 transition"
        >
          Edit
        </button>

        <button
          onClick={handleDelete}
          className="flex-1 px-4 py-2 rounded-xl text-sm font-medium
          bg-red-500/20 text-red-300 hover:bg-red-500/30 transition"
        >
          Delete
        </button>
      </div>
    </motion.div>
  );
};

export default MemberCard;
