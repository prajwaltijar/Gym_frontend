import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AddAdmissionModal from "../components/admin/AddAdmissionModal";
import { useAdminAuth } from "../context/AdminAuthContext";
import ManagePlans from "../components/admin/ManagePlans";
import MemberCard from "../components/admin/MemberCard";
import { motion } from "framer-motion";
import api from "../api/aixos";
import { useEffect } from "react";

  const formatDate = (date) => new Date(date).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });

  const badge = (status) => status === "Active"
    ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
    : "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30";

  const planColor = (plan) => ({
  Starter: "bg-blue-500/20 text-blue-300",
  Progress: "bg-purple-500/20 text-purple-300",
  "Elite Coaching": "bg-red-500/20 text-red-300",
  }[plan] || "bg-gray-500/20 text-gray-300");

  const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
   const [showAdmissionForm, setShowAdmissionForm] = useState(false);
  const [admissions, setAdmissions] = useState([]);
  const [plans, setPlans] = useState([]);
  const [search, setSearch] = useState("");
  const [newAdmission, setNewAdmission] = useState({ name: "", plan: "Starter", joinedOn: "", status: "Active" });
  const [newPlanName, setNewPlanName] = useState("");
  const [newPlanPrice, setNewPlanPrice] = useState("");

  const { logout } = useAdminAuth();
  const navigate = useNavigate();

  const handleLogout = () => { logout(); navigate("/admin/login", { replace: true }); };

  // ================= FETCH ADMISSIONS FROM DB =================
const fetchAdmissions = async () => {
  try {
    const res = await api.get("/admission/getadmissions");
    setAdmissions(res.data);
  } catch (err) {
    console.error("Failed to fetch admissions", err);
  }
};

useEffect(() => {
  fetchAdmissions();
  fetchPlans();
}, []);
// ============================================================

// ================= FETCH PLANS FROM DB =================
const fetchPlans = async () => {
  try {
    const res = await api.get("/plans/getplans");
    setPlans(res.data);
  } catch (err) {
    console.error("Failed to fetch plans", err);
  }
};


    const handleAddAdmission = (e) => {
    e.preventDefault();
    if (!newAdmission.name || !newAdmission.joinedOn) return;
    setAdmissions((prev) => [...prev, { id: Date.now(), ...newAdmission }]);
    setShowAdmissionForm(false);
    setNewAdmission({ name: "", plan: "Starter", joinedOn: "", status: "Active" });
  };

  const handleAddPlan = (e) => {
    e.preventDefault();
    if (!newPlanName || !newPlanPrice) return;
    setPlans((p) => [...p, { name: newPlanName, price: newPlanPrice }]);
    setNewPlanName("");
    setNewPlanPrice("");
  };

    const filtered = admissions.filter((a) =>
  String(a?.name ?? "")
  .toLowerCase()
  .includes(String(search ?? "").toLowerCase())
);


  return (
    <main className="min-h-screen bg-gradient-to-b from-black to-gray-950 text-white flex">

  <aside className="w-64 hidden md:flex flex-col border-r border-gray-800 bg-black/40">
        <div className="px-6 py-5 border-b border-gray-800">
          <h1 className="text-xl font-extrabold">PowerFit Admin</h1>
          <p className="text-xs text-gray-500">Admin Dashboard</p>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-1 text-sm">
          {["overview","admissions","plans"].map(tab => (
            <button key={tab} onClick={()=>setActiveTab(tab)}
              className={`w-full text-left rounded-lg px-3 py-2 ${activeTab===tab?"bg-red-600":"hover:bg-gray-800/70"}`}>
              {tab==="overview"&&"Overview"}
              {tab==="admissions"&&"Admission List"}
              {tab==="plans"&&"Manage Plans"}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-gray-800">
          <button onClick={handleLogout} className="w-full border py-2 rounded-full">Logout</button>
        </div>
    </aside>

      <section className="flex-1 p-6">
        <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>

        {activeTab==="overview" && (
          <div className="grid md:grid-cols-3 gap-6">
            <Card title="Total Members" value={admissions.length}/>
            <Card title="Active Plans" value={plans.length}/>
            <Card title="Pending Admissions" value={admissions.filter(a=>a.status==="Pending").length}/>
          </div>
        )}

        {activeTab==="admissions" && (
          <div className="bg-gray-900/60 border border-gray-800 rounded-2xl p-6 shadow-xl">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
              <h3 className="text-lg font-semibold">Members</h3>
              <div className="flex gap-3">
                <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search member..."
                  className="bg-black/40 border border-gray-700 rounded-lg px-3 py-2 text-sm"/>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowAdmissionForm(true)}
                  className="bg-red-600 px-5 py-2 rounded-full text-sm shadow-lg shadow-red-600/30"
                >
                  + Add Member
                </motion.button>

              </div>
            </div>

        <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-3"
            >
              {filtered.length === 0 && (
                <p className="text-center text-gray-500 py-10">
                  No members found
                </p>
              )}

              {filtered.map(member => (
          <MemberCard key={member._id} member={member} />
))}

        </motion.div>

           <AddAdmissionModal
            isOpen={showAdmissionForm}
            onClose={() => setShowAdmissionForm(false)}
            onAdded={fetchAdmissions}
            plans={plans}
          />

               </div>
                    )}
                  {activeTab === "plans" && (
          <ManagePlans plans={plans} setPlans={setPlans} />
            )}
      </section>
    </main>
  );
};

    const Card = ({title,value}) => (
  <div className="bg-gray-900 p-4 rounded-xl border border-gray-800">
    <p className="text-gray-400 text-sm">{title}</p>
    <p className="text-2xl font-bold">{value}</p>
  </div>
);

export default AdminDashboard;
