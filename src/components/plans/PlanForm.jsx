import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/aixos";
import PlanCard from "../components/plans/PlanCard";

const PlansPage = () => {

  const { id } = useParams(); // serviceId
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    api.get(`/plans/service/${id}`)
      .then(res => setPlans(res.data))
      .catch(err => console.log(err));
  }, [id]);

  return (
    <div className="min-h-screen bg-black text-white py-20 px-6">

      <h1 className="text-3xl font-bold mb-10 text-center">
        Available Plans
      </h1>

      {plans.length === 0 ? (
        <p className="text-center text-gray-400">
          No plans available for this service
        </p>
      ) : (
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map(plan => (
            <PlanCard key={plan._id} plan={plan} />
          ))}
        </div>
      )}

    </div>
  );
};

export default PlansPage;
