import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AddAdmissionModal from "../components/admin/AddAdmissionModal";
import { useAdminAuth } from "../context/AdminAuthContext";
import ManagePlans from "../components/admin/ManagePlans";
import MemberCard from "../components/admin/MemberCard";
import ManageServices from "../components/admin/ManageServices";
import { motion } from "framer-motion";
import api from "../api/aixos";
import ManageTrainer from "../components/admin/ManageTrainer";


const Card = ({ title, value }) => (
  <div className="bg-gray-800 p-4 rounded-xl border border-gray-800">
    <p className="text-white text-xl">{title}</p>
    <p className="text-2xl font-bold">{value}</p>
  </div>
);

const AdminDashboard = () => {
  const [trainers, setTrainers] = useState([]);
  const [leads, setLeads] = useState([]);
  const [activeTab, setActiveTab] = useState("overview");
  const [showAdmissionForm, setShowAdmissionForm] = useState(false);
  const [admissions, setAdmissions] = useState([]);
  const [plans, setPlans] = useState([]);
  const [services, setServices] = useState([]);
  const [search, setSearch] = useState("");
const [editingMember, setEditingMember] = useState(null);

  const { logout, isAuthenticated } = useAdminAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) navigate("/admin/login", { replace: true });
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  const fetchAdmissions = async () => {
    try {
      const res = await api.get("/admission/getadmissions");
      setAdmissions(res.data);
    } catch (err) {
      console.error("Failed to fetch admissions", err);
    }
  };

  const fetchPlans = async () => {
    try {
      const res = await api.get("/plans/getplans");
      setPlans(res.data);
    } catch (err) {
      console.error("Failed to fetch plans", err);
    }
  };

  const fetchLeads = async () => {
    try {
      const res = await api.get("/leads/getleads");
      setLeads(res.data);
    } catch (err) {
      console.error("Failed to fetch leads", err);
    }
  };

  const fetchServices = async () => {
    try {
      const res = await api.get("/services/getservices");
      setServices(res.data);
    } catch (err) {
      console.error("Failed to fetch services", err);
    }
  };

  const fetchTrainers = async () => {
  try {
    const res = await api.get("/trainers/getalltrainers");
    setTrainers(res.data);
  } catch (err) {
    console.error("Failed to fetch trainers", err);
  }
};


  useEffect(() => {
    fetchAdmissions();
    fetchPlans();
    fetchLeads();
    fetchServices();
    fetchTrainers(); 
  }, []);

  const filtered = admissions.filter((a) => {
  const keyword = search.toLowerCase();

  return (
    String(a?.customerName || "").toLowerCase().includes(keyword) ||
    String(a?.mobile || "").toLowerCase().includes(keyword) ||
    String(a?.paymentMode || "").toLowerCase().includes(keyword) ||
    String(a?.note || "").toLowerCase().includes(keyword)
  );
});

  return (
   <main className="min-h-screen bg-[#0B192C]  flex">

     <aside className="w-64 hidden md:flex flex-col border-r border-white bg-[#223044]">

        <div className="px-6 py-5 border-b border-white">
  <h1 className="text-xl font-extrabold">POWER<span  className="text-yellow-500">FIT</span> Admin</h1>
  <p className="text text-yellow-300">Admin Dashboard</p>
</div>

        <nav className="flex-1 px-4 py-4 space-y-1 text-sm">
          {["overview", "admissions", "plans", "services","trainers"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`w-full text-left rounded-lg px-3 py-2 ${activeTab === tab ? "bg-red-600" : "hover:bg-gray-800/70"}`}

            >
              {tab === "overview" && "Overview"}
              {tab === "admissions" && "Admission List"}
              {tab === "plans" && "Manage Plans"}
              {tab === "services" && "Services"}
              {tab === "trainers" && "Manage Trainers"}

            </button>
          ))}
        </nav>

        <div className="absolute top-6 right-6">
  <button
    onClick={handleLogout}
    className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-full shadow-lg"
  >
    Logout
  </button>
</div>

      </aside>

      <section className="flex-1 p-6">
        <h2 className="text-3xl md:text-4xl  text-white   font-bold mb-6 tracking-tight">
  Admin Dashboard
</h2>


        {activeTab === "overview" && (
          <div className="grid md:grid-cols-3 gap-6">
            <Card title="Total Members" value={admissions.length} />
            <Card title="Active Plans" value={plans.length} />
            <Card title="New Leads" value={leads.filter((l) => l.status === "new").length} />
          </div>
        )}

        {activeTab === "admissions" && (
          <div className=" rounded-2xl p-6 shadow-xl">
            <div className=" border-gray-800 rounded-2xl p-6 shadow-xl">
              <h3 className="text-2xl -mt-7 text-white font-semibold">Members</h3>
              <div className="flex gap-3">
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search member..."
                  className="bg-black/40 mt-2 border border-gray-700 text-gray-100 rounded-lg px-3 py-2 text-sm"

                

                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowAdmissionForm(true)}
                  className="bg-yellow-600 px-5 py-2 md:ml-auto rounded-full text-sm shadow-lg shadow-red-600/30"

                >
                  + Add Member
                </motion.button>
              </div>

              
            </div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
              {filtered.length === 0 && (
                <p className="text-center text-3xl text-gray-300 py-10">No members found</p>
              )}

        <div className="grid grid-cols-1 bg-[#0B192C] md:grid-cols-2 gap-3">
           {filtered.map((member) => (
  <MemberCard
    key={member._id}
    member={member}
    refresh={fetchAdmissions}
    onEdit={setEditingMember}
  />
))}

</div>
            </motion.div>

            <AddAdmissionModal
              isOpen={showAdmissionForm}
              onClose={() => setShowAdmissionForm(false)}
              onAdded={fetchAdmissions}
              plans={plans}
            />

            {editingMember && (
  <AddAdmissionModal
    isOpen={true}
    editData={editingMember}
    onClose={() => setEditingMember(null)}
    onAdded={() => {
      fetchAdmissions();
      setEditingMember(null);
    }}
    plans={plans}
  />
)}

          </div>
        )}


        {activeTab === "plans" && <ManagePlans plans={plans} setPlans={setPlans} />}

        {activeTab === "services" && (
          <ManageServices services={services} refresh={fetchServices} />
        )}

        {activeTab === "trainers" && (
  <ManageTrainer trainers={trainers} refresh={fetchTrainers} />
)}



      </section>
    </main>
  );
};

export default AdminDashboard;