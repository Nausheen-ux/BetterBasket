import React, { useState, useEffect } from "react";

// Badge logic
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
    label: "📦 Local Seeker",
    condition: (res) => res[8],
  },
];

export default function Profile() {
  const [greenPoints, setGreenPoints] = useState(0);

  const responses = JSON.parse(localStorage.getItem("quizResponses")) || {};
  const earned = badges.filter((b) => b.condition(responses));

 useEffect(() => {
  const storedPoints = localStorage.getItem("greenPoints");
  setGreenPoints(storedPoints ? parseInt(storedPoints) : 0);
}, []);

  const beginnerBadge = earned.find((b) => b.id === "green-beginner");
  const persona = beginnerBadge ? beginnerBadge.label : "🌿 Eco Conscious";

  return (
    <div className="max-w-3xl mx-auto p-6 bg-green-50 rounded-lg shadow-md mt-6">
      <h1 className="text-3xl font-bold text-green-800 mb-2">👤 Profile</h1>
      <p className="text-green-600 text-lg mb-6">Welcome back, Eco Shopper!</p>

      {/* Eco Persona */}
      <div className="bg-white rounded-xl p-4 mb-6 shadow-sm">
        <h2 className="text-xl font-semibold text-green-700 mb-2">🌿 Eco Persona</h2>
        <p className="text-gray-700 text-lg">{persona}</p>
      </div>

      {/* Green Score */}
      <div className="bg-white rounded-xl p-4 mb-6 shadow-sm">
        <h2 className="text-xl font-semibold text-green-700 mb-2">🧮 Last Green Points</h2>
        <div className="flex items-center justify-between">
          <span className="text-gray-700 text-2xl font-bold">{greenPoints}/100</span>
          <div className="w-full ml-4 bg-green-100 rounded-full h-4">
            <div
              className="bg-green-500 h-4 rounded-full transition-all"
              style={{ width: `${greenPoints}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Earned Badges */}
      <div className="bg-white rounded-xl p-4 shadow-sm">
        <h2 className="text-xl font-semibold text-green-700 mb-4">🏅 Earned Badges</h2>
        {earned.length > 0 ? (
          <ul className="space-y-3">
            {earned.map((badge) => (
              <li
                key={badge.id}
                className="flex items-center gap-3 px-4 py-2 border border-green-200 rounded-lg bg-green-100 shadow-sm"
              >
                <span className="text-2xl">{badge.label.split(" ")[0]}</span>
                <span className="text-green-800 font-medium">{badge.label}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No badges earned yet. Take the quiz!</p>
        )}
      </div>
    </div>
  );
}



        