import { useState, useEffect } from "react";
import AddPlanModal from "../plans/AddPlanModal";
import PlanCard from "../plans/PlanCard";
import api from "../../api/aixos";

const ManagePlans = ({ plans, setPlans }) => {
  const [showModal, setShowModal] = useState(false);

  const fetchPlans = async () => {
    try {
      const res = await api.get("/plans/getplans");
      setPlans(res.data);
    } catch (err) {
      console.error("Failed to fetch plans", err);
    }
  };

//   useEffect(() => {
//     fetchPlans();
//   }, []);

//   useEffect(() => {
//   if (!selectedService) return;

//   const fetchServicePlans = async () => {
//     const res = await api.get(`/plans/service/${selectedService._id}`);
//     setPlans(res.data);
//   };

//   fetchServicePlans();
// }, [selectedService]);

const addPlan = async () => {
  await api.post("/plans/create", {
    name: newPlanName,
    price: newPlanPrice,
    service: selectedService._id
  });

  fetchServicePlans();
};

  return (
    <div className="p-6 text-white">

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Manage Plans</h2>

        <button
          onClick={() => setShowModal(true)}
          className="bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700"
        >
          + Add Plan
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-5">
        {plans.length === 0 && (
          <p className="text-gray-400">No plans added</p>
        )}

        {plans.map((plan) => (
          <PlanCard key={plan._id} plan={plan} />
        ))}
      </div>

      {showModal && (
        <AddPlanModal
          setShowModal={setShowModal}
          refreshPlans={fetchPlans}
        />
      )}
    </div>
  );
};

export default ManagePlans;
