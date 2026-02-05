import { useState } from "react";

const equipmentData = [
  {
    id: 1,
    name: "Treadmill",
    quantity: 6,
    charge: 500,
    image: "https://images.pexels.com/photos/1954524/pexels-photo-1954524.jpeg?cs=srgb&dl=pexels-willpicturethis-1954524.jpg&fm=jpg",
    description: "Cardio machine for running & walking workouts"
  },
  {
    id: 2,
    name: "Bench Press",
    quantity: 7,
    charge: 400,
    image: "https://hips.hearstapps.com/hmg-prod/images/766/articles/2017/10/benchpress-1508589156.jpg?resize=640:*",
    description: "Chest strength training equipment"
  },
  {
    id: 3,
    name: "Dumbbells Set",
    quantity: 20,
    charge: 300,
    image: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=800",
    description: "Free weights for full body workout"
  },
  {
    id: 4,
    name: "Lat Pulldown",
    quantity: 3,
    charge: 450,
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800",
    description: "Back muscle training machine"
  },
  {
    id: 5,
    name: "Exercise Bike",
    quantity: 5,
    charge: 350,
    image: "https://media.istockphoto.com/id/1320185461/photo/man-exercise-by-bike-at-the-gym-make-their-thighs-strong-and-healthy.jpg?s=612x612&w=0&k=20&c=mvl-OCvNxT8mnV7_En-QAVl2G_o4YsMOPJP6SCU3f-g=",
    description: "Indoor cycling cardio equipment"
  },
  {
  id: 6,
  name: "Squat Rack",
  quantity: 2,
  charge: 600,
  image: "https://images.unsplash.com/photo-1594737625785-a6cbdabd333c?w=800",
  description: "Heavy compound leg workouts"
  },
  {
  id: 7,
  name: "Leg Press Machine",
  quantity: 3,
  charge: 550,
  image: "https://images.unsplash.com/photo-1605296867424-35fc25c9212a?w=800",
  description: "Lower body strength training"
  },
  {
  id: 8,
  name: "Cable Crossover",
  quantity: 2,
  charge: 650,
  image: "https://images.unsplash.com/photo-1574680178050-55c6a6a96e0a?w=800",
  description: "Functional muscle isolation workouts"
  },
  {
  id: 9,
  name: "Smith Machine",
  quantity: 2,
  charge: 700,
  image: "https://thumbs.dreamstime.com/b/generative-ai-image-smith-machine-gym-equipment-black-background-303805224.jpg",
  description: "Guided barbell strength training"
  },
  {
  id: 10,
  name: "Rowing Machine",
  quantity: 4,
  charge: 450,
  image: "https://thumbs.dreamstime.com/b/sport-hard-weight-exercise-sporting-bodybuilding-workout-gym-pulling-rowing-machine-sitting-lift-low-row-motivation-sport-hard-310211432.jpg",
  description: "Full body cardio workout"
  },
  ,{
  id: 11,
  name: "Chest Fly Machine",
  quantity: 3,
  charge: 500,
  image: "https://media.gettyimages.com/id/1156762319/photo/young-man-doing-chest-exercise-with-cross-machine.jpg?s=612x612&w=gi&k=20&c=KfI2GSIrVwm9TnYjO6kPAb6LMm7g5xggPa51bj4sgow=",
  description: "Chest isolation workout"
  },
  {
  id: 12,
  name: "Preacher Curl Bench",
  quantity: 2,
  charge: 350,
  image: "https://www.shutterstock.com/image-photo/tattooed-athlete-black-sport-gloves-260nw-2364801431.jpg",
  description: "Biceps focused training"
  },

  {
  id: 13,
  name: "Kettlebell Set",
  quantity: 15,
  charge: 250,
  image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800",
  description: "Functional strength & conditioning"
  },
  {
  id: 14,
  name: "Leg Curl Machine",
  quantity: 3,
  charge: 400,
  image: "https://images.unsplash.com/photo-1605296867424-35fc25c9212a?w=800",
  description: "Hamstring isolation"
  },
  {
  id: 15,
  name: "Elliptical Trainer",
  quantity: 4,
  charge: 500,
  image: "https://media.istockphoto.com/id/1135897825/photo/lifestyle-gym-and-fitness-barcelona-people-on-elliptical-trainer.jpg?s=612x612&w=0&k=20&c=itMMHi7f7Xr-OVbgytyaWhwenkD5gqdAFe7XeHOkM-c=",
  description: "Low impact cardio machine"
  }
  ];

export default function GymEquipment() {
  const [search, setSearch] = useState("");

  const filtered = equipmentData.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white px-6 py-12">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center mb-3">
          Gym <span className="text-red-500">Equipment</span>
        </h1>
        <p className="text-center text-gray-400 mb-8">
          Available equipment, quantity and usage charges
        </p>

        <div className="flex justify-center mb-10">
          <input
            type="text"
            placeholder="Search equipment..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-md px-4 py-2 rounded-xl bg-black/40 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden shadow-xl hover:scale-105 transition-transform"
            >
              <img
                src={item.image}
                alt={item.name}
                className="h-56 w-full object-cover"
              />

              <div className="p-5">
                <h2 className="text-2xl font-bold mb-1">{item.name}</h2>
                <p className="text-gray-400 text-sm mb-4">{item.description}</p>

                <div className="flex justify-between items-center mb-3">
                  <span className="text-gray-300">Available:</span>
                  <span className="font-semibold text-green-400">
                    {item.quantity} Units
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Usage Charge:</span>
                  <span className="text-red-500 font-bold">
                    ₹{item.charge} / month
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
