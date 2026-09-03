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
    <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6 shadow-lg hover:shadow-yellow-500/20 hover:scale-105 transition-all duration-300">

      {/* Member Name + Status */}
      <div className="flex justify-between items-start mb-3">
        <div>
          <h2 className="text-2xl font-bold text-white">
            {member.customerName}
          </h2>
          <p className="text-gray-400 text-sm">{member.mobile}</p>
        </div>

        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            status === "Active"
              ? "bg-emerald-500/20 text-emerald-400"
              : "bg-red-500/20 text-red-400"
          }`}
        >
          {status}
        </span>
      </div>

      {/* Plan */}
      {member.plan && (
        <p className="text-yellow-400 text-sm mb-2">
          Plan: {member.plan?.name}
        </p>
      )}

      {/* Service */}
      {member.plan?.service && (
        <p className="text-blue-400 text-sm mb-4">
          Service: {member.plan?.service?.title}
        </p>
      )}

      {/* Dates */}
      <div className="text-gray-400 text-sm mb-4 space-y-1">
        <p>Joined: {new Date(member.admittedAt).toLocaleDateString("en-IN")}</p>
        <p>Expires: {new Date(member.endDate).toLocaleDateString("en-IN")}</p>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <button
          onClick={() => onEdit(member)}
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

    </div>
  );
};

export default MemberCard;