import { useEffect, useState } from "react";
import api from "../../api/aixos";

const AddPlanModal = ({ setShowModal, refreshPlans }) => {

  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    service: "",
    name: "",
    durationindays: "",
    price: "",
    description: ""
  });

  // ================= FETCH SERVICES =================
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await api.get("/services/getservices");
        setServices(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchServices();
  }, []);

  // ================= HANDLE INPUT =================
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ================= SUBMIT =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.service) {
      alert("Please select a service");
      return;
    }

    try {
      setLoading(true);

      await api.post("/plans/createplan", {
        ...form,
        durationindays: Number(form.durationindays),
        price: Number(form.price)
      });

      await refreshPlans();
      setShowModal(false);

    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to create plan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">

      <form
        onSubmit={handleSubmit}
        className="bg-gray-900 p-6 rounded-xl w-96 space-y-4 border border-gray-700"
      >

        <h2 className="text-xl font-bold text-center">Add Plan</h2>

        {/* SERVICE DROPDOWN */}
        <select
          name="service"
          value={form.service}
          onChange={handleChange}
          className="w-full p-2 bg-black border border-gray-700 rounded"
          required
        >
          <option value="">Select Service</option>
          {services.map((s) => (
            <option key={s._id} value={s._id}>
              {s.title}
            </option>
          ))}
        </select>

        {/* PLAN NAME */}
        <input
          name="name"
          placeholder="Plan Name"
          value={form.name}
          onChange={handleChange}
          className="w-full p-2 bg-black border border-gray-700 rounded"
          required
        />

        {/* DURATION */}
        <input
          name="durationindays"
          type="number"
          placeholder="Duration (days)"
          value={form.durationindays}
          onChange={handleChange}
          className="w-full p-2 bg-black border border-gray-700 rounded"
          required
        />

        {/* PRICE */}
        <input
          name="price"
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          className="w-full p-2 bg-black border border-gray-700 rounded"
          required
        />

        {/* DESCRIPTION */}
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="w-full p-2 bg-black border border-gray-700 rounded"
        />

        {/* BUTTONS */}
        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={() => setShowModal(false)}
            className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-red-600 rounded hover:bg-red-700 disabled:opacity-40"
          >
            {loading ? "Saving..." : "Save Plan"}
          </button>
        </div>

      </form>
    </div>
  );
};

export default AddPlanModal;
