import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import api from "../../api/axios";

const ManageLeads = () => {
  const [leads, setLeads] = useState([]);
  const [search, setSearch] = useState("");
  const [editingLead, setEditingLead] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    status: "new",
  });

  const fetchLeads = async () => {
    try {
      const res = await api.get("/leads/getleads");
      setLeads(res.data);
    } catch (err) {
      console.error("Failed to fetch leads", err);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const deleteLead = async (id) => {
    if (!window.confirm("Delete this lead?")) return;
    await api.delete(`/leads/deletelead/${id}`);
    fetchLeads();
  };

  const updateStatus = async (id, status) => {
    await api.put(`/leads/updateleadstatus/${id}`, { status });
    fetchLeads();
  };

  const openEditModal = (lead) => {
    setEditingLead(lead);
    setFormData({
      name: lead.name,
      email: lead.email,
      phone: lead.phone,
      message: lead.message,
      status: lead.status,
    });
  };

  const handleUpdate = async () => {
    await api.put(`/leads/updatelead/${editingLead._id}`, formData);
    setEditingLead(null);
    fetchLeads();
  };

  const filtered = leads.filter(
    (l) =>
      l.name.toLowerCase().includes(search.toLowerCase()) ||
      l.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-[#0B192C] p-4 md:p-6 rounded-2xl shadow-xl">
      <h2 className="text-2xl font-bold text-white mb-4">Manage Leads</h2>

      <input
        placeholder="Search lead..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-6  bg-black/40 border border-gray-700 text-white px-3 py-2 rounded-lg"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 sm:grid-cols-3 gap-4">
        {filtered.map((lead) => (
          <motion.div
            key={lead._id}
            whileHover={{ scale: 1.02 }}
            className="bg-gray-800 p-4 rounded-xl border border-gray-700 flex flex-col justify-between"
          >
            <div>
              <h3 className="text-lg font-semibold text-yellow-400">
                {lead.name}
              </h3>
              <p className="text-gray-300 text-sm break-words">
                {lead.email}
              </p>
              <p className="text-gray-300 text-sm">{lead.phone}</p>
              <p className="text-gray-400 text-xs mt-1">
                {lead.message}
              </p>
            </div>

            <div className="mt-4 flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-between">
              <select
                value={lead.status}
                onChange={(e) =>
                  updateStatus(lead._id, e.target.value)
                }
                className="bg-black text-white px-2 py-1 rounded"
              >
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="lost">Lost</option>
                <option value="converted">Converted</option>
              </select>

              <div className="flex gap-2">
                <button
                  onClick={() => openEditModal(lead)}
                  className="flex-1 px-4 py-2 rounded-xl text-sm font-medium bg-blue-500/20 text-blue-300 hover:bg-blue-500/30 transition"
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteLead(lead._id)}
                  className="flex-1 px-4 py-2 rounded-xl text-sm font-medium bg-red-500/20 text-red-300 hover:bg-red-500/30 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Edit Modal */}
      {editingLead && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center p-4 z-50">
          <div className="bg-[#1F2937] w-full max-w-md p-6 rounded-xl">
            <h3 className="text-xl font-bold text-white mb-4">
              Edit Lead
            </h3>

            <input
              className="w-full mb-3 px-3 py-2 rounded bg-black/40 text-white"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="Name"
            />

            <input
              className="w-full mb-3 px-3 py-2 rounded bg-black/40 text-white"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              placeholder="Email"
            />

            <input
              className="w-full mb-3 px-3 py-2 rounded bg-black/40 text-white"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              placeholder="Phone"
            />

            <textarea
              className="w-full mb-3 px-3 py-2 rounded bg-black/40 text-white"
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              placeholder="Message"
            />

            <select
              className="w-full mb-4 px-3 py-2 rounded bg-black text-white"
              value={formData.status}
              onChange={(e) =>
                setFormData({ ...formData, status: e.target.value })
              }
            >
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="lost">Lost</option>
              <option value="converted">Converted</option>
            </select>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setEditingLead(null)}
                className="px-4 py-2 bg-gray-600 rounded"
              >
                Cancel
              </button>

              <button
                onClick={handleUpdate}
                className="px-4 py-2 bg-yellow-500 rounded"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageLeads;