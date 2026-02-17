import { useState } from "react";
import api from "../../api/aixos";
import { motion } from "framer-motion";

const ManageTrainer = ({ trainers, refresh }) => {
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const [form, setForm] = useState({
    name: "",
    specialty: "",
    experience: "",
    bio: ""
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    try {
      if (editing) {
        await api.put(`/trainers/update/${editing._id}`, form);
      } else {
        await api.post("/trainers/create", form);
      }
      setOpen(false);
      setEditing(null);
      setForm({ name: "", specialty: "", experience: "", bio: "" });
      refresh();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (trainer) => {
    setEditing(trainer);
    setForm(trainer);
    setOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete trainer?")) return;
    await api.delete(`/trainers/delete/${id}`);
    refresh();
  };

  return (
    <div className="space-y-6">

      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-bold text-green-900">Trainers</h3>
        <button
          onClick={() => setOpen(true)}
          className="bg-yellow-600 px-5 py-2 rounded-full text-sm"
        >
          + Add Trainer
        </button>
      </div>

      {/* Cards */}
      <div className="grid md:grid-cols-3 gap-4">
        {trainers.map((t) => (
          <motion.div
            key={t._id}
            whileHover={{ scale: 1.03 }}
            className="bg-gray-800 text-white p-5 rounded-2xl space-y-2"
          >
            <h4 className="text-lg font-bold">{t.name}</h4>
            <p className="text-yellow-400">{t.specialty}</p>
            <p className="text-sm">Experience: {t.experience} yrs</p>
            <p className="text-xs text-gray-300">{t.bio}</p>

            <div className="flex gap-2 pt-3">
              <button
                onClick={() => handleEdit(t)}
                className="bg-blue-600 px-3 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(t._id)}
                className="bg-red-600 px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
          <div className="bg-gray-900 p-6 rounded-xl w-96 space-y-3">
            <h2 className="text-lg font-bold">
              {editing ? "Edit Trainer" : "Add Trainer"}
            </h2>

            <input name="name" value={form.name} onChange={handleChange} placeholder="Name" className="w-full p-2 bg-gray-800 rounded"/>
            <input name="specialty" value={form.specialty} onChange={handleChange} placeholder="Specialty" className="w-full p-2 bg-gray-800 rounded"/>
            <input name="experience" value={form.experience} onChange={handleChange} placeholder="Experience" className="w-full p-2 bg-gray-800 rounded"/>
            <textarea name="bio" value={form.bio} onChange={handleChange} placeholder="Bio" className="w-full p-2 bg-gray-800 rounded"/>

            <div className="flex justify-end gap-2">
              <button onClick={() => setOpen(false)} className="px-3 py-1 bg-gray-600 rounded">Cancel</button>
              <button onClick={handleSubmit} className="px-3 py-1 bg-green-600 rounded">
                {editing ? "Update" : "Create"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageTrainer;
