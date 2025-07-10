import React from "react";

export default function GreenScoreDisplay({ cartItems }) {
  const getScore = () => {
    let totalPoints = 0;
    let maxPoints = 0;

    cartItems.forEach((item) => {
      let points = 0;
      if (item.is_vegan) points += 5;
      if (item.is_cruelty_free) points += 5;
      if (item.packaging === "compostable") points += 5;
      else if (item.packaging === "recyclable") points += 3;
      if (item.is_local) points += 2;

      totalPoints += points;
      maxPoints += 25; // 25 = max possible per item
    });

    const score = maxPoints === 0 ? 0 : Math.round((totalPoints / maxPoints) * 100);
    return score;
  };

  const score = getScore();

  const getCategory = () => {
    if (score <= 40) return "🌱 Green Newbie";
    if (score <= 70) return "🍃 Eco Learner";
    return "🌍 Sustainability Champion";
  };

  return (
    <div className="bg-green-100 border border-green-400 p-4 rounded-lg shadow-md mt-6">
      <h2 className="text-xl font-semibold text-green-800 mb-2">🔋 Green Score</h2>
      <div className="w-full bg-white h-4 rounded-full overflow-hidden mb-2">
        <div
          className="h-full bg-green-500"
          style={{ width: `${score}%` }}
        ></div>
      </div>
      <p className="text-green-900 font-bold text-lg">{score} / 100 – {getCategory()}</p>
    </div>
  );
}
