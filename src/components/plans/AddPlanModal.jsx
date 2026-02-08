import { useState } from "react";
import api from "../../api/aixos";

const AddPlanModal = ({ setShowModal, refreshPlans }) => {

  const [form, setForm] = useState({
    name: "",
    durationindays: "",
    price: "",
    description: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/plans/createplan", {
        name: form.name,
        durationindays: Number(form.durationindays),
        price: Number(form.price),
        description: form.description
      });

      refreshPlans();     // reload plans from DB
      setShowModal(false);

    } catch (err) {
      alert(err.response?.data?.message || "Failed to create plan");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex justify-center items-center">
      <form onSubmit={handleSubmit} className="bg-gray-900 p-6 rounded-xl w-96 space-y-3">

        <h2 className="text-lg font-bold">Add Plan</h2>

        <input name="name" placeholder="Plan Name"
          className="w-full p-2 bg-black border border-gray-700 rounded"
          onChange={handleChange} required />

        <input name="durationindays" type="number" placeholder="Duration (days)"
          className="w-full p-2 bg-black border border-gray-700 rounded"
          onChange={handleChange} required />

        <input name="price" type="number" placeholder="Price"
          className="w-full p-2 bg-black border border-gray-700 rounded"
          onChange={handleChange} required />

        <textarea name="description" placeholder="Description"
          className="w-full p-2 bg-black border border-gray-700 rounded"
          onChange={handleChange} />

        <div className="flex justify-end gap-3">
          <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 bg-gray-700 rounded">
            Cancel
          </button>
          <button className="px-4 py-2 bg-red-600 rounded">
            Save
          </button>
        </div>

      </form>
    </div>
  );
};

export default AddPlanModal;
