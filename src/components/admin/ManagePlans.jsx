import { useState, useEffect } from "react";
import AddPlanModal from "../plans/AddPlanModal";
import PlanCard from "../plans/PlanCard";
import api from "../../api/aixos";

const ManagePlans = ({ plans, setPlans }) => {

  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");
  const [filteredPlans, setFilteredPlans] = useState([]);

  // Load all plans initially
  useEffect(() => {
    fetchAllPlans();
  }, []);

  const fetchAllPlans = async () => {
    try {
      const res = await api.get("/plans/getplans");
      setPlans(res.data);
      setFilteredPlans(res.data); // initial filter data
    } catch (err) {
      console.error(err);
    }
  };

  // 🔍 Filter logic
  useEffect(() => {
    const result = plans.filter((plan) =>
      plan.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredPlans(result);
  }, [search, plans]);

  return (
    <div className="p-6 text-white">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Manage Plans</h2>

        <button
          onClick={() => setShowModal(true)}
          className="bg-yellow-600 px-4 py-2 rounded-lg hover:bg-red-700"
        >
          + Add Plan
        </button>
      </div>

      {/* 🔍 Search Bar */}
      <input
        type="text"
        placeholder="Search plan by name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className=" mb-6 px-4 py-2 rounded-lg bg-black border border-gray-700 focus:outline-none focus:border-yellow-500"
      />

      {/* Plans Grid */}
      <div className="grid md:grid-cols-3 gap-5">

        {/* Empty state */}
        {filteredPlans.length === 0 && (
          <p className="text-gray-300 text-3xl col-span-full text-center py-10">
            No plans found
          </p>
        )}

        {/* Plans List */}
        {filteredPlans.map((plan) => (
          <PlanCard key={plan._id} plan={plan} />
        ))}

      </div>

      {/* Modal */}
      {showModal && (
        <AddPlanModal
          setShowModal={setShowModal}
          refreshPlans={fetchAllPlans}
        />
      )}
    </div>
  );
};

export default ManagePlans;
