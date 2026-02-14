import { useEffect, useState } from "react";
import api from "../../api/aixos";
import { motion, AnimatePresence } from "framer-motion";

const ManageServices = () => {
  const [services, setServices] = useState([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const [form, setForm] = useState({
    title: "",
    description: "",
  });

  // ================= FETCH =================
  const fetchServices = async () => {
    try {
      const res = await api.get("/services/getservices");
      setServices(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  // ================= FORM CHANGE =================
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // ================= ADD / UPDATE =================
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await api.put(`/services/update/${editing._id}`, form);
      } else {
        await api.post("/services/create", form);
      }

      setOpen(false);
      setEditing(null);
      setForm({ title: "", description: "" });
      fetchServices();
    } catch (err) {
      console.log("Save failed", err);
    }
  };

  // ================= DELETE =================
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this service?")) return;
    await api.delete(`/services/delete/${id}`);
    fetchServices();
  };

  // ================= EDIT =================
  const handleEdit = (service) => {
    setEditing(service);
    setForm({ title: service.title, description: service.description });
    setOpen(true);
  };

  return (
    <div className="  border-gray-800 rounded-2xl p-6 shadow-xl">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-5">
        <h3 className="text-xl text-green-900 font-semibold">Services</h3>

        <motion.button
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.05 }}
          onClick={() => {
            setEditing(null);
            setForm({ title: "", description: "" });
            setOpen(true);
          }}
          className="bg-red-600 px-5 py-2 rounded-full"
        >
          + Add Service
        </motion.button>
      </div>

      {/* LIST */}
      <div className="grid grid-cols-1 sm:grid-cols-2  gap-4">
        {services.length === 0 && (
          <p className="text-gray-400">No services available</p>
        )}

        {services.map((s) => (
          <div
            key={s._id}
className="border border-gray-700 rounded-xl p-4 bg-[#37463f] flex flex-col justify-between min-h-[130px]"
          >
            <div>
              <p className="font-semibold text-white">{s.title}</p>
              <p className="text-gray-400 text-sm">{s.description}</p>
            </div>

            <div className="flex gap-3">
              <button
            onClick={() => handleEdit(s)}
            className="px-4 py-1.5 rounded-lg font-semibold text-blue-700 bg-blue-50 border border-blue-200 hover:bg-blue-100 active:scale-95 transition-all duration-200 shadow-sm hover:shadow"
          >
            Edit
          </button>

          <button
            onClick={() => handleDelete(s._id)}
            className="px-4 py-1.5 rounded-lg font-semibold text-red-600 bg-red-100 border border-red-200 hover:bg-red-100 active:scale-95 transition-all duration-200 shadow-sm hover:shadow"
          >
            Delete
          </button>

            </div>
          </div>
        ))}
      </div>

      {/* POPUP MODAL */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.form
              onSubmit={handleSubmit}
              className="bg-gray-900 border border-gray-700 p-6 rounded-2xl w-[420px] space-y-4"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            >
              <h2 className="text-xl font-bold">
                {editing ? "Edit Service" : "Add Service"}
              </h2>

              <input
                name="title"
                placeholder="Service Title"
                value={form.title}
                onChange={handleChange}
                className="w-full p-2 rounded bg-black border border-gray-700"
                required
              />

              <textarea
                name="description"
                placeholder="Description"
                value={form.description}
                onChange={handleChange}
                className="w-full p-2 rounded bg-black border border-gray-700"
                required
              />

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="px-4 py-2 border rounded"
                >
                  Cancel
                </button>

                <button className="px-4 py-2 bg-red-600 rounded">
                  Save
                </button>
              </div>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ManageServices;
