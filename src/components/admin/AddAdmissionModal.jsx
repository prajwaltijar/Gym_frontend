import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import api from "../../api/axios";

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

const initialState = {
  customerName: "",
  mobile: "",
  plan: "",
  planPrice: "",
  amountPaid: "",
  remainingAmount: "",
  paymentMode: "Cash",
  admittedAt: "",
  endDate: "",
  note: "",
  serviceName: "",
};

const AddAdmissionModal = ({
  isOpen,
  onClose,
  onAdded,
  plans,
  editData,
}) => {
  const [form, setForm] = useState(initialState);

  // =========================
  // 🔥 PLAN SELECT EFFECT
  // =========================
  useEffect(() => {
    if (!form.plan) return;

    const selectedPlan = plans.find(
      (p) => p._id.toString() === form.plan.toString()
    );

    if (!selectedPlan) return;

    setForm((prev) => ({
      ...prev,
      planPrice: selectedPlan.price,
      serviceName: selectedPlan.service?.title || "No Service",
    }));
  }, [form.plan, plans]);

  // =========================
  // 🔥 AUTO CALCULATE REMAINING
  // =========================
  useEffect(() => {
    const remaining =
      Number(form.planPrice || 0) - Number(form.amountPaid || 0);

    setForm((prev) => ({
      ...prev,
      remainingAmount: remaining < 0 ? 0 : remaining,
    }));
  }, [form.planPrice, form.amountPaid]);

  // =========================
  // 🔥 EDIT MODE FILL DATA
  // =========================
  useEffect(() => {
    if (!editData || plans.length === 0) return;

    const selectedPlan = plans.find(
      (p) => p._id.toString() === editData.plan?._id?.toString()
    );

    setForm({
      customerName: editData.customerName || "",
      mobile: editData.mobile || "",
      plan: selectedPlan?._id || "",
      planPrice: selectedPlan?.price || "",
      amountPaid: editData.amountPaid || "",
      remainingAmount:
        (selectedPlan?.price || 0) - (editData.amountPaid || 0),
      paymentMode: editData.paymentMode || "Cash",
      admittedAt: editData.admittedAt
        ? editData.admittedAt.split("T")[0]
        : "",
      endDate: editData.endDate
        ? editData.endDate.split("T")[0]
        : "",
      note: editData.note || "",
      serviceName: selectedPlan?.service?.title || "",
    });
  }, [editData, plans]);

  // =========================
  // 🔥 SUBMIT
  // =========================
    const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const payload = {
        customerName: form.customerName,
        mobile: form.mobile,
        plan: form.plan,
        amountPaid: Number(form.amountPaid),
        paymentMode: form.paymentMode,
        note: form.note,
        admittedAt: form.admittedAt,
        endDate: form.endDate,
      };

      if (editData) {
        await api.put(`/admission/update/${editData._id}`, payload);
      } else {
        await api.post("/admission/create", payload);
      }

      onAdded();
      handleClose();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Something went wrong");
    }
    };

    // =========================
    // 🔥 CLOSE & RESET
    // =========================
    const handleClose = () => {
      setForm(initialState);
      onClose();
    };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4"
        >
          <motion.form
            onSubmit={handleSubmit}
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative w-full max-w-lg bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl max-h-[92vh] overflow-y-auto p-6 space-y-5 text-white"
          >
            <h2 className="text-2xl font-bold text-center bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
              {editData ? "Edit Admission" : "New Admission"}
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <input
                placeholder="Customer Name"
                className="col-span-2 input-pro"
                value={form.customerName}
                onChange={(e) =>
                  setForm({ ...form, customerName: e.target.value })
                }
                required
              />
              <input
                placeholder="Mobile Number"
                className="col-span-2 input-pro"
                value={form.mobile}
                onChange={(e) =>
                  setForm({ ...form, mobile: e.target.value })
                }
                required
              />
               <select
                className="col-span-2 bg-gray-900 input-pro"
                value={form.plan}
                onChange={(e) =>
                  setForm({ ...form, plan: e.target.value })
                }
                required
              >
                <option value="">Select Plan</option>
                {plans.map((plan) => (
                  <option key={plan._id} value={plan._id}>
                    {plan.name} - ₹{plan.price}
                  </option>
                ))}
              </select>

              <input
                type="text"
                value={form.serviceName}
                className="col-span-2 input-pro bg-gray-800/70"
                placeholder="Service"
                readOnly
              />

              <input
              placeholder=" Amount"
                type="number"
                value={form.planPrice}
                className="input-pro bg-gray-800/70"
                readOnly
              />

              <input
                type="number"
                placeholder="Paid Amount"
                className="input-pro"
                value={form.amountPaid}
                onChange={(e) =>
                  setForm({ ...form, amountPaid: e.target.value })
                }
                required
              />

              <input
                type="number"
                value={form.remainingAmount}
                className="input-pro bg-gray-800/70"
                readOnly
              />

              <select
                className="input-pro bg-gray-900"
                value={form.paymentMode}
                onChange={(e) =>
                  setForm({ ...form, paymentMode: e.target.value })
                }
              >
                <option>Cash</option>
                <option>UPI</option>
                <option>Card</option>
                <option>Online</option>
              </select>

              <input
                type="date"
                className="input-pro bg-gray-900"
                value={form.admittedAt}
                onChange={(e) =>
                  setForm({ ...form, admittedAt: e.target.value })
                }
                required
              />

              <input
                type="date"
                className="input-pro bg-gray-900"
                value={form.endDate}
                onChange={(e) =>
                  setForm({ ...form, endDate: e.target.value })
                }
                required
              />

              <textarea
                placeholder="Additional Notes"
                className="col-span-2 input-pro resize-none"
                rows="3"
                value={form.note}
                onChange={(e) =>
                  setForm({ ...form, note: e.target.value })
                }
              />
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={handleClose}
                className="flex-1 border border-gray-600 hover:bg-gray-700/60 py-3 rounded-xl font-semibold transition"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="flex-1 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 py-3 rounded-xl font-semibold shadow-lg transition"
              >
                {editData ? "Update Admission" : "Save Admission"}
              </button>
            </div>
          </motion.form>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AddAdmissionModal;