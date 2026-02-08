const MemberCard = ({ member }) => {

  if (!member) return null;

  const name = member.customerName || member.name || "No Name";
  const planName = member?.plan?.name || member.plan || "No Plan";
  const joinedOn = member.admittedAt
    ? new Date(member.admittedAt).toLocaleDateString()
    : member.joinedOn || "-";

  const paid = Number(member.amountPaid || 0);
  const price = Number(member?.plan?.price || member.planPrice || 0);
  const remainingAmount = Math.max(price - paid, 0);

  return (
    <div className="bg-gray-900 border border-gray-700 rounded-xl p-4 space-y-2">
      <h3 className="text-lg font-semibold">{name}</h3>

      <p className="text-sm text-gray-400">
        Plan: <span className="text-white">{planName}</span>
      </p>

      <p className="text-sm text-gray-400">
        Joined: <span className="text-white">{joinedOn}</span>
      </p>

      <p className="text-sm text-gray-400">
        Paid: ₹{paid}
      </p>

      <p className="text-sm text-red-400">
        Remaining: ₹{remainingAmount}
      </p>
    </div>
  );
};

export default MemberCard;
