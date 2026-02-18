import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import api from "../../api/aixos";

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 40 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", stiffness: 260, damping: 22 },
  },
  exit: { opacity: 0, scale: 0.92, y: 40 },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

const AddAdmissionModal = ({ isOpen, onClose, onAdded, plans, editData  }) => {
  const [form, setForm] = useState({
    customerName: "",
    mobile: "",
    plan: "",
    planPrice: 0,
    amountPaid: "",
    remainingAmount: 0,
    paymentMode: "Cash",
    admittedAt: "",
    note: "",
  });

  // 🔹 jab plan select ho → price auto set
  useEffect(() => {
    if (!form.plan) return;

    const selectedPlan = plans.find(p => p._id === form.plan);
    if (!selectedPlan) return;

    setForm(prev => ({
      ...prev,
      planPrice: selectedPlan.price
    }));
  }, [form.plan, plans]);

  // 🔹 remaining calculate
  useEffect(() => {
    const remaining = Number(form.planPrice || 0) - Number(form.amountPaid || 0);
    setForm(prev => ({
      ...prev,
      remainingAmount: remaining < 0 ? 0 : remaining
    }));
  }, [form.planPrice, form.amountPaid]);

  useEffect(() => {
  if (!editData) return;

  setForm({
    customerName: editData.customerName || "",
    mobile: editData.mobile || "",
    plan: editData.plan?._id || "",
    planPrice: editData.plan?.price || 0,
    amountPaid: editData.amountPaid || "",
    remainingAmount: editData.remainingAmount || 0,
    paymentMode: editData.paymentMode || "Cash",
    admittedAt: editData.admittedAt?.split("T")[0] || "",
    note: editData.note || "",
  });
}, [editData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        customerName: form.customerName,
        mobile: form.mobile,
        plan: form.plan, // ObjectId
        amountPaid: Number(form.amountPaid),
        paymentMode: form.paymentMode,
        note: form.note,
        admittedAt: form.admittedAt
      };

      if (editData) {
  await api.put(`/admission/update/${editData._id}`, payload);
} else {
  await api.post("/admission/create", payload);
}


      onAdded(); // refresh list
      onClose();

      // reset form
      setForm({
        customerName: "",
        mobile: "",
        plan: "",
        planPrice: 0,
        amountPaid: "",
        remainingAmount: 0,
        paymentMode: "Cash",
        admittedAt: "",
        note: "",
      });

    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className="fixed inset-0 bg-black/70 b flex items-center justify-center z-50 p-3"
        >
          <motion.form
            onSubmit={handleSubmit}
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="bg-gray-900 w-full max-w-md rounded-xl border border-gray-700 max-h-[92vh] overflow-y-auto p-4 space-y-3"
          >
            <h2 className="text-lg font-semibold text-center">New Admission</h2>

            <div className="grid grid-cols-2 gap-2">

              <input
                placeholder="Customer Name"
                className="col-span-2 input"
                value={form.customerName}
                onChange={e => setForm({ ...form, customerName: e.target.value })}
                required
              />

              <input
                placeholder="Mobile Number"
                className="col-span-2 input"
                value={form.mobile}
                onChange={e => setForm({ ...form, mobile: e.target.value })}
                required
              />

              {/* PLAN SELECT */}
              <select
                className="col-span-2 input "
                value={form.plan}
                onChange={e => setForm({ ...form, plan: e.target.value })}
                required
              >
                <option value="">Select Plan</option>
                {plans.map(plan => (
                  <option key={plan._id} value={plan._id}>
                    {plan.name} - ₹{plan.price}
                  </option>
                ))}
              </select>

              <input
                type="number"
                className="input bg-gray-800"
                value={form.planPrice}
                readOnly
              />

              <input
                type="number"
                placeholder="Paid"
                className="input"
                value={form.amountPaid}
                onChange={e => setForm({ ...form, amountPaid: e.target.value })}
                required
              />

              <input
                type="number"
                className="input bg-gray-800"
                value={form.remainingAmount}
                readOnly
              />

              <select
                className="input"
                value={form.paymentMode}
                onChange={e => setForm({ ...form, paymentMode: e.target.value })}
              >
                <option>Cash</option>
                <option>UPI</option>
                <option>Card</option>
                <option>Online</option>
              </select>

              <input
                type="date"
                className="input"
                value={form.admittedAt}
                onChange={e => setForm({ ...form, admittedAt: e.target.value })}
                required
              />

              <textarea
                placeholder="Note"
                className="col-span-2 input resize-none"
                rows="2"
                value={form.note}
                onChange={e => setForm({ ...form, note: e.target.value })}
              />
            </div>

            <div className="flex gap-2 pt-2">
              <button type="button" onClick={onClose} className="flex-1 border hover:scale-105 hover:bg-gray-600 py-2 rounded">
                Cancel
              </button>
              <button className="flex-1 bg-red-800 hover:scale-105 hover:bg-red-400 py-2 rounded">
                Save
              </button>
            </div>
          </motion.form>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AddAdmissionModal;
