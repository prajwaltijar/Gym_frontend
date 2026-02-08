import { useState } from "react";

const PlanForm = ({ service, setPlans, closeModal }) => {
  const [oneMonth, setOneMonth] = useState("");
  const [threeMonth, setThreeMonth] = useState("");
  const [sixMonth, setSixMonth] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const newPlan = {
      service,
      oneMonth,
      threeMonth,
      sixMonth,
    };

    setPlans(prev => [...prev, newPlan]);
    closeModal(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">

      <h3 className="text-lg font-semibold mb-2">
        {service} Plan
      </h3>

      <input
        type="number"
        placeholder="1 Month Price"
        value={oneMonth}
        onChange={(e)=>setOneMonth(e.target.value)}
        className="w-full p-2 bg-black border"
      />

      <input
        type="number"
        placeholder="3 Month Price"
        value={threeMonth}
        onChange={(e)=>setThreeMonth(e.target.value)}
        className="w-full p-2 bg-black border"
      />

      <input
        type="number"
        placeholder="6 Month Price"
        value={sixMonth}
        onChange={(e)=>setSixMonth(e.target.value)}
        className="w-full p-2 bg-black border"
      />

      <button className="bg-red-600 w-full py-2 rounded-lg">
        Save Plan
      </button>
    </form>
  );
};

export default PlanForm;
