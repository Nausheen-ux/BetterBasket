import React from "react";


const badges = [
    {
  id: "green-beginner",
  label: "🌾 Green Beginner",
  condition: (res) => Object.values(res).every((val) => val === false),
},

  {

    
    id: "eco-starter",
    label: "🌱 Eco Starter",
    condition: (res) => Object.values(res).some((val) => val === true),
  },
  {
    id: "vegan-voter",
    label: "🥬 Vegan Voter",
    condition: (res) => res[1] || res[2],
  },
  {
    id: "recycler-ready",
    label: "🔁 Recycler Ready",
    condition: (res) => res[6],
  },
  {
    id: "local-seeker",
    label: "🛍️ Local Seeker",
    condition: (res) => res[8],
  },
];

export default function QuizBadgeDisplay() {
  const responses = JSON.parse(localStorage.getItem("quizResponses")) || {};
  const earned = badges.filter((b) => b.condition(responses));

  return (
  <div className="bg-green-100 border-2 border-green-400 p-6 rounded-2xl shadow-lg mt-8">
    <h3 className="text-green-900 text-xl font-bold mb-4 flex items-center gap-2">
      🏅 <span>Your Badges</span>
    </h3>
    <ul className="space-y-4 text-base">
      {earned.map((b) => (
        <li
          key={b.id}
          className="flex items-center gap-4 bg-white px-6 py-4 rounded-2xl border-2 border-green-300 shadow-md hover:shadow-lg transition-all duration-200"
        >
          <span className="text-4xl">
  {b.id === "green-beginner"}
  {b.id === "eco-starter" }
  {b.id === "vegan-voter" }
  {b.id === "recycler-ready" }
  {b.id === "local-seeker" }
</span>
          <span className="text-green-800 font-medium">{b.label}</span>
        </li>
      ))}
      {earned.length === 0 && (
        <li className="text-gray-500">No badges earned yet. Keep going!</li>
      )}
    </ul>
  </div>
);

}
