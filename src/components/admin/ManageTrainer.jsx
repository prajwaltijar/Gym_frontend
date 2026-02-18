import { useState } from "react";
import api from "../../api/aixos";
import { motion } from "framer-motion";

const ManageTrainer = ({ trainers, refresh }) => {
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [search, setSearch] = useState("");


  const [form, setForm] = useState({
    name: "",
    specialty: "",
    experience: "",
    bio: ""
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("specialty", form.specialty);
      formData.append("experience", form.experience);
      formData.append("bio", form.bio);
      if (image) formData.append("image", image);

      if (editing) {
        await api.put(`/trainers/update/${editing._id}`, formData);
      } else {
        await api.post("/trainers/create", formData);
      }

      setOpen(false);
      setEditing(null);
      setImage(null);
      setPreview(null);
      setForm({ name: "", specialty: "", experience: "", bio: "" });
      refresh();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (trainer) => {
    setEditing(trainer);
    setForm({
      name: trainer.name,
      specialty: trainer.specialty,
      experience: trainer.experience,
      bio: trainer.bio
    });
    setPreview(`http://localhost:5000/uploads/trainers/${trainer.image}`);
    setOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete trainer?")) return;
    await api.delete(`/trainers/delete/${id}`);
    refresh();
  };

  const filteredTrainers = trainers.filter((t) =>
  `${t.name} ${t.specialty}`
    .toLowerCase()
    .includes(search.toLowerCase())
);


  return (
    <div className="space-y-6">
     <div className="mb-6 space-y-3 px-5">

  <h2 className="text-2xl mt-13 font-bold text-white">Manage Trainers</h2>

  <div className="flex items-center justify-between">

    <input
      type="text"
      placeholder="Search trainer..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="
        bg-black/40
        border border-gray-700
        text-gray-100
        rounded-lg
        px-3 py-2
        text-sm
        w-64
        focus:outline-none
        focus:border-yellow-500
      "
    />

    <button
      onClick={() => {
        setEditing(null);
        setImage(null);
        setPreview(null);
        setForm({ name: "", specialty: "", experience: "", bio: "" });
        setOpen(true);
      }}
      className="
        bg-yellow-600 hover:bg-yellow-700
        px-5 py-2 rounded-full text-sm text-white
        shadow-lg shadow-red-600/30 transition
      "
    >
      + Add Trainer
    </button>

  </div>
</div>


      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 px-5">
        {filteredTrainers.length === 0 && (
  <p className="text-center text-3xl text-gray-300 py-10 col-span-full">
    No trainers found
  </p>
)}

        {filteredTrainers.map((t) => (

          <motion.div
            key={t._id}
            whileHover={{ scale: 1.03 }}
            className="bg-gray-800 text-white rounded-2xl overflow-hidden flex flex-col h-full"
          >
            <div className="w-full aspect-[4/3] bg-gray-700">
              <img
                src={`http://localhost:5000/uploads/trainers/${t.image}`}
                alt="trainer"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-5 flex flex-col flex-1 space-y-2">
              <h4 className="text-lg font-bold">{t.name}</h4>
              <p className="text-yellow-400">{t.specialty}</p>
              <p className="text-sm">Experience: {t.experience} yrs</p>
              <p className="text-xs text-gray-300 line-clamp-3">{t.bio}</p>

              <div className="flex gap-2 pt-4 mt-auto">
                <button
                  onClick={() => handleEdit(t)}
                  className="flex-1 px-4 py-2 rounded-xl text-sm font-medium bg-blue-500/20 text-blue-300 hover:bg-blue-500/30 transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(t._id)}
                  className="flex-1 px-4 py-2 rounded-xl text-sm font-medium bg-red-500/20 text-red-300 hover:bg-red-500/30 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {open && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
          <div className="bg-gray-900 p-6 rounded-xl w-96 space-y-3 text-white">
            <h2 className="text-lg font-bold">{editing ? "Edit Trainer" : "Add Trainer"}</h2>

            <input name="name" value={form.name} onChange={handleChange} placeholder="Name" className="w-full p-2 bg-gray-800 rounded" />
            <input name="specialty" value={form.specialty} onChange={handleChange} placeholder="Specialty" className="w-full p-2 bg-gray-800 rounded" />
            <input name="experience" value={form.experience} onChange={handleChange} placeholder="Experience" className="w-full p-2 bg-gray-800 rounded" />
            <textarea name="bio" value={form.bio} onChange={handleChange} placeholder="Bio" className="w-full p-2 bg-gray-800 rounded" />

            <input type="file" accept="image/*" onChange={handleImage} />

            {preview && (
              <img src={preview} alt="preview" className="w-full h-40 object-cover rounded-lg" />
            )}

            <div className="flex justify-end gap-2 pt-2">
              <button onClick={() => setOpen(false)} className="px-3 py-1 bg-gray-600 rounded">Cancel</button>
              <button onClick={handleSubmit} className="px-3 py-1 bg-green-600 rounded">{editing ? "Update" : "Create"}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageTrainer;