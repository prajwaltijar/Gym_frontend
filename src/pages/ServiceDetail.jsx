import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/aixos";
import PlanCard from "../components/plans/PlanCard";

const ServiceDetail = () => {
  const { id } = useParams();

  const [service, setService] = useState(null);
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    // service details
    api.get(`/services/${id}`)
      .then(res => setService(res.data))
      .catch(err => console.log(err));

    // service plans
    api.get(`/plans/service/${id}`)
      .then(res => setPlans(res.data))
      .catch(err => console.log(err));

  }, [id]);

  if (!service) {
    return <div className="text-white text-center py-20">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-black text-white py-20 px-6">

      {/* SERVICE INFO */}
      <div className="max-w-4xl mx-auto mb-16">
        <h1 className="text-4xl font-bold mb-4 text-center">
          {service.title}
        </h1>

        <p className="text-gray-300 text-center max-w-2xl mx-auto">
          {service.description}
        </p>
      </div>

      {/* PLANS */}
      <h2 className="text-2xl font-semibold text-center mb-10">
        Available Plans
      </h2>

      {plans.length === 0 ? (
        <p className="text-center text-gray-400">
          No plans available
        </p>
      ) : (
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map(plan => (
            <PlanCard key={plan._id} plan={plan} hidePrice />
          ))}
        </div>
      )}

    </div>
  );
};

export default ServiceDetail;
