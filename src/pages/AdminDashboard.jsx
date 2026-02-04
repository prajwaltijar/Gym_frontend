import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdminAuth } from "../context/AdminAuthContext";

const initialAdmissions = [
  {
    id: 1,
    name: "Rahul Sharma",
    plan: "Progress",
    joinedOn: "2026-01-10",
    status: "Active",
  },
  {
    id: 2,
    name: "Ananya Verma",
    plan: "Starter",
    joinedOn: "2026-01-20",
    status: "Active",
  },
  {
    id: 3,
    name: "Amit Patel",
    plan: "Elite Coaching",
    joinedOn: "2026-02-01",
    status: "Pending",
  },
];

const initialPlans = [
  {
    name: "Starter",
    price: "₹1,499 / month",
  },
  {
    name: "Progress",
    price: "₹2,499 / month",
  },
  {
    name: "Elite Coaching",
    price: "₹4,499 / month",
  },
];

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [admissions] = useState(initialAdmissions);
  const [plans, setPlans] = useState(initialPlans);
  const [newPlanName, setNewPlanName] = useState("");
  const [newPlanPrice, setNewPlanPrice] = useState("");

  const { logout } = useAdminAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/admin/login", { replace: true });
  };

  const handleAddPlan = (event) => {
    event.preventDefault();

    if (!newPlanName.trim() || !newPlanPrice.trim()) {
      return;
    }

    setPlans((prev) => [
      ...prev,
      { name: newPlanName.trim(), price: newPlanPrice.trim() },
    ]);

    setNewPlanName("");
    setNewPlanPrice("");
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-black to-gray-950 text-white flex">
      <aside className="w-64 hidden md:flex flex-col border-r border-gray-800 bg-black/40">
        <div className="px-6 py-5 border-b border-gray-800">
          <h1 className="text-xl font-extrabold">PowerFit Admin</h1>
          <p className="text-[11px] text-gray-500 mt-1">Dashboard</p>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-1 text-sm">
          <button
            type="button"
            onClick={() => setActiveTab("overview")}
            className={`w-full text-left rounded-lg px-3 py-2 transition-colors ${
              activeTab === "overview"
                ? "bg-red-600 text-white"
                : "text-gray-300 hover:bg-gray-800/70"
            }`}
          >
            Overview
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("admissions")}
            className={`w-full text-left rounded-lg px-3 py-2 transition-colors ${
              activeTab === "admissions"
                ? "bg-red-600 text-white"
                : "text-gray-300 hover:bg-gray-800/70"
            }`}
          >
            Admission List
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("plans")}
            className={`w-full text-left rounded-lg px-3 py-2 transition-colors ${
              activeTab === "plans"
                ? "bg-red-600 text-white"
                : "text-gray-300 hover:bg-gray-800/70"
            }`}
          >
            Manage Plans
          </button>
        </nav>

        <div className="px-4 py-4 border-t border-gray-800 text-xs text-gray-500">
          <button
            type="button"
            onClick={handleLogout}
            className="w-full rounded-full border border-gray-700 py-1.5 text-xs font-semibold uppercase tracking-wide hover:border-red-500 hover:text-red-400 transition-colors"
          >
            Logout
          </button>
        </div>
      </aside>

      <section className="flex-1 px-4 sm:px-8 py-6">
        <header className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-extrabold">Admin Dashboard</h2>
            <p className="text-xs text-gray-500 mt-1">
              Quick view of admissions and membership plans.
            </p>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="md:hidden rounded-full border border-gray-700 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wide hover:border-red-500 hover:text-red-400 transition-colors"
          >
            Logout
          </button>
        </header>

        <div className="mb-4 flex md:hidden gap-2">
          <button
            type="button"
            onClick={() => setActiveTab("overview")}
            className={`flex-1 rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-wide transition-colors ${
              activeTab === "overview"
                ? "bg-red-600 text-white"
                : "bg-gray-900 text-gray-300 border border-gray-700"
            }`}
          >
            Overview
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("admissions")}
            className={`flex-1 rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-wide transition-colors ${
              activeTab === "admissions"
                ? "bg-red-600 text-white"
                : "bg-gray-900 text-gray-300 border border-gray-700"
            }`}
          >
            Admissions
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("plans")}
            className={`flex-1 rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-wide transition-colors ${
              activeTab === "plans"
                ? "bg-red-600 text-white"
                : "bg-gray-900 text-gray-300 border border-gray-700"
            }`}
          >
            Plans
          </button>
        </div>

        {activeTab === "overview" && (
          <div className="grid gap-6 md:grid-cols-3 mb-6">
            <div className="rounded-2xl bg-gray-900/80 border border-gray-800 p-4 shadow-xl">
              <p className="text-xs text-gray-400 mb-1">Total Members</p>
              <p className="text-2xl font-extrabold">{admissions.length}</p>
            </div>

            <div className="rounded-2xl bg-gray-900/80 border border-gray-800 p-4 shadow-xl">
              <p className="text-xs text-gray-400 mb-1">Active Plans</p>
              <p className="text-2xl font-extrabold">{plans.length}</p>
            </div>

            <div className="rounded-2xl bg-gray-900/80 border border-gray-800 p-4 shadow-xl">
              <p className="text-xs text-gray-400 mb-1">Pending Admissions</p>
              <p className="text-2xl font-extrabold">
                {admissions.filter((entry) => entry.status === "Pending").length}
              </p>
            </div>
          </div>
        )}

        {activeTab === "admissions" && (
          <div className="bg-gray-900/70 border border-gray-800 rounded-2xl p-4 sm:p-6 shadow-xl overflow-x-auto">
            <h3 className="text-lg font-semibold mb-4">Latest Admissions</h3>
            <table className="min-w-full text-left text-sm">
              <thead className="text-gray-400 text-xs uppercase border-b border-gray-800">
                <tr>
                  <th className="py-2 pr-4">Member</th>
                  <th className="py-2 pr-4">Plan</th>
                  <th className="py-2 pr-4">Joined</th>
                  <th className="py-2 pr-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {admissions.map((entry) => (
                  <tr key={entry.id}>
                    <td className="py-2 pr-4 whitespace-nowrap">{entry.name}</td>
                    <td className="py-2 pr-4 whitespace-nowrap">{entry.plan}</td>
                    <td className="py-2 pr-4 whitespace-nowrap">{entry.joinedOn}</td>
                    <td className="py-2 pr-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${
                          entry.status === "Active"
                            ? "bg-emerald-600/20 text-emerald-300"
                            : "bg-yellow-500/20 text-yellow-300"
                        }`}
                      >
                        {entry.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === "plans" && (
          <div className="grid gap-6 md:grid-cols-[minmax(0,_2fr)_minmax(0,_3fr)]">
            <form
              onSubmit={handleAddPlan}
              className="bg-gray-900/70 border border-gray-800 rounded-2xl p-4 sm:p-6 shadow-xl space-y-4"
            >
              <h3 className="text-lg font-semibold">Add new plan</h3>
              <p className="text-xs text-gray-400 mb-2">
                This is a demo-only form. Added plans are kept only in this
                session.
              </p>

              <div>
                <label className="block text-xs font-medium mb-1" htmlFor="plan-name">
                  Plan name
                </label>
                <input
                  id="plan-name"
                  type="text"
                  value={newPlanName}
                  onChange={(event) => setNewPlanName(event.target.value)}
                  className="w-full rounded-lg bg-black/40 border border-gray-700 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/60"
                  placeholder="e.g. Weekend Warrior"
                />
              </div>

              <div>
                <label className="block text-xs font-medium mb-1" htmlFor="plan-price">
                  Price / billing
                </label>
                <input
                  id="plan-price"
                  type="text"
                  value={newPlanPrice}
                  onChange={(event) => setNewPlanPrice(event.target.value)}
                  className="w-full rounded-lg bg-black/40 border border-gray-700 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/60"
                  placeholder="e.g. ₹1,999 / month"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-full bg-red-600 py-2.5 text-sm font-semibold uppercase tracking-wide hover:bg-red-500 transition-colors"
              >
                Save plan
              </button>
            </form>

            <div className="bg-gray-900/70 border border-gray-800 rounded-2xl p-4 sm:p-6 shadow-xl">
              <h3 className="text-lg font-semibold mb-3">Current plans</h3>
              <ul className="space-y-3 text-sm text-gray-300">
                {plans.map((plan) => (
                  <li
                    key={plan.name}
                    className="flex items-center justify-between rounded-lg bg-black/30 border border-gray-800 px-3 py-2"
                  >
                    <div>
                      <p className="font-semibold">{plan.name}</p>
                      <p className="text-xs text-gray-400">{plan.price}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </section>
    </main>
  );
};

export default AdminDashboard;
