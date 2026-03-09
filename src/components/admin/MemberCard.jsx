import { motion } from "framer-motion";
import api from "../../api/axios";

const MemberCard = ({ member, refresh, onEdit }) => {

  const calculateDaysLeft = () => {
    if (!member.endDate) return null;

    const today = new Date();
    const expiry = new Date(member.endDate);

    return Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));
  };

  const daysLeft = calculateDaysLeft();

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this member?")) return;
    await api.delete(`/admission/delete/${member._id}`);
    refresh();
  };

  const status = daysLeft > 0 ? "Active" : "Expired";

  return (
    <motion.div
      className="w-full flex items-center justify-between
      bg-[#1c2533] border border-gray-800
      rounded-xl px-5 py-3 hover:bg-[#243047] transition"
    >

      {/* MEMBER INFO */}
      <div className="flex items-center gap-3 w-[25%]">
        <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-white">
          {member.customerName?.charAt(0)}
        </div>

        <div>
          <p className="text-white text-sm font-semibold">
            {member.customerName}
          </p>
          <p className="text-gray-400 text-xs">{member.mobile}</p>
        </div>
      </div>

      {/* PLAN */}
      <div className="w-[15%] text-gray-300 text-sm">
        {member.plan?.name || "No Plan"}
      </div>

      {/* GOAL / SERVICE */}
      <div className="w-[20%] text-gray-400 text-sm">
        {member.plan?.service?.title || "No Service"}
      </div>

      {/* STATUS */}
      <div className="w-[10%]">
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold
          ${
            status === "Active"
              ? "bg-emerald-500/20 text-emerald-400"
              : "bg-red-500/20 text-red-400"
          }`}
        >
          {status}
        </span>
      </div>

      {/* JOINED */}
      <div className="w-[15%] text-gray-400 text-sm">
        {new Date(member.admittedAt).toLocaleDateString("en-IN")}
      </div>

      {/* ACTIONS */}
      <div className="w-[10%] flex gap-3 justify-end">

        <button
          onClick={() => onEdit(member)}
          className="text-blue-400 hover:text-blue-300"
        >
          ✏️
        </button>

        <button
          onClick={handleDelete}
          className="text-red-400 hover:text-red-300"
        >
          🗑
        </button>

      </div>

    </motion.div>
  );
};

export default MemberCard;