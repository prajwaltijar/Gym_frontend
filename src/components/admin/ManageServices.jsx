import { useEffect, useState } from "react";
import api from "../../api/aixos";
import { motion, AnimatePresence } from "framer-motion";

const BASE = "http://localhost:5000"; // backend url

const getImageUrl = (img) => {
  if (!img) return null;
  if (img.startsWith("http")) return img; // already full url
  return `${BASE}${img}`; // add server path
};

export default function ManageServices() {
  const [services, setServices] = useState([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");


  const [form, setForm] = useState({
    title: "",
    description: "",
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  // ================= Fetch =================
  const fetchServices = async () => {
    try {
      const { data } = await api.get("/services/getservices");
      setServices(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  // ================= Form Change =================
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) setPreview(URL.createObjectURL(file));
  };

  const filteredServices = services.filter((s) => {
  const keyword = search.toLowerCase();

  return (
    String(s?.title || "").toLowerCase().includes(keyword) ||
    String(s?.description || "").toLowerCase().includes(keyword)
  );
});


  // ================= Create / Update =================
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("description", form.description);
      if (image) formData.append("image", image);

      if (editing) {
        await api.put(`/services/update/${editing._id}`, formData);
      } else {
        await api.post("/services/create", formData);
      }

      resetForm();
      fetchServices();
    } catch (err) {
      console.error("Save failed", err);
      alert("Save failed");
    } finally {
      setLoading(false);
    }
  };

  // ================= Edit =================
  const handleEdit = (service) => {
    setEditing(service);
    setForm({ title: service.title, description: service.description });
    setPreview(getImageUrl(service.image));
    setOpen(true);
  };

  // ================= Delete =================
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this service?")) return;
    try {
      await api.delete(`/services/delete/${id}`);
      fetchServices();
    } catch (err) {
      console.error(err);
    }
  };

  // ================= Reset =================
  const resetForm = () => {
    setForm({ title: "", description: "" });
    setImage(null);
    setPreview(null);
    setEditing(null);
    setOpen(false);
  };

  return (
    <div className="p-6 text-white">
      <div className="mb-6 space-y-3">

  {/* Title */}
  <h2 className="text-2xl font-bold text-white">Services</h2>

  {/* Row */}
  <div className="flex items-center justify-between">

    {/* Search */}
    <input
      type="text"
      placeholder="Search service..."
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

    {/* Button */}
    <button
      onClick={() => setOpen(true)}
      className="
        bg-yellow-600
        hover:bg-yellow-700
        text-white
        px-5 py-2
        rounded-full
        text-sm
        shadow-lg shadow-red-600/30
        transition
      "
    >
      + Add Service
    </button>

  </div>
</div>


      {/* ================= Modal ================= */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 bg-black/70 flex justify-center items-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.form
              onSubmit={handleSubmit}
              className="bg-zinc-900 p-6 rounded-xl w-[95%] max-w-md space-y-4"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            >
              <h3 className="text-xl font-semibold">
                {editing ? "Update" : "Create"} Service
              </h3>

              <input
                type="text"
                name="title"
                placeholder="Service title"
                value={form.title}
                onChange={handleChange}
                required
                className="w-full p-2 rounded bg-zinc-800"
              />

              <textarea
                name="description"
                placeholder="Description"
                value={form.description}
                onChange={handleChange}
                required
                className="w-full p-2 rounded bg-zinc-800"
              />

              {/* Image Upload */}
              <div className="space-y-2">
                <input
                  type="file"
                  accept="image/*"
                  capture="environment"
                  onChange={handleImageChange}
                  className="hidden"
                  id="serviceImage"
                />

                <label
                  htmlFor="serviceImage"
                  className="cursor-pointer block text-center bg-yellow-700 hover:scale-105 hover:bg-yellow-400 text-black py-2 rounded-lg font-semibold"
                >
                  Choose Image Gallery
                </label>

                {preview && (
                 <div className="w-full aspect-video bg-black rounded-lg border border-yellow-400 flex items-center justify-center overflow-hidden">
  <img
    src={preview}
    alt="preview"
    className="max-h-full max-w-full object-contain"
  />
</div>



                )}
              </div>

              <div className="flex gap-3">
                <button
                  disabled={loading}
                  className="flex-1 bg-green-900 py-2 hover:scale-105 hover:bg-green-400 rounded-lg font-semibold"
                >
                  {loading ? "Saving..." : "Save"}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex-1 bg-red-900 hover:scale-105 hover:bg-red-400 py-2 rounded-lg font-semibold"
                >
                  Cancel
                </button>
              </div>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ================= List ================= */}
      <div className="grid md:grid-cols-3 gap-6">

        {filteredServices.length === 0 && (
  <p className="text-center col-span-full text-3xl text-gray-300 py-10">
    No services found
  </p>
)}

        {filteredServices.map((s) => (

          <div key={s._id} className="bg-gray-800 rounded-xl overflow-hidden border border-zinc-700 hover:scale-105 transition">
            <div className="w-full aspect-[4/3]  flex items-center justify-center overflow-hidden">
  {getImageUrl(s.image) && (
    <img
      src={getImageUrl(s.image)}
      alt={s.title}
      className="max-h-full max-w-full object-contain"
    />
  )}
</div>

            <div className="p-4 space-y-2">
              <h4 className="text-lg font-bold">{s.title}</h4>
              <p className="text-sm text-zinc-300">{s.description}</p>
              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => handleEdit(s)}
                  className="flex-1 px-4 py-2 rounded-xl text-sm font-medium
          bg-blue-500/20 text-blue-300 hover:bg-blue-500/30 transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(s._id)}
                  className="flex-1 px-4 py-2 rounded-xl text-sm font-medium
          bg-red-500/20 text-red-300 hover:bg-red-500/30 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
