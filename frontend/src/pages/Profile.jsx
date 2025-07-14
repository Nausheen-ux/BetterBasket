import React, { useState, useEffect } from "react";
import * as MD from "react-icons/md";

export default function Profile() {
  const [greenPoints, setGreenPoints] = useState(0);
  const [quizBadges, setQuizBadges] = useState([]);
  const [earnedBadges, setEarnedBadges] = useState([]);
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    const pts = parseInt(localStorage.getItem("greenPoints") || "0");
    setGreenPoints(pts);

    const quizRes = JSON.parse(localStorage.getItem("quizResponses")) || {};
    const quizDefs = [
      { id: "green-beginner", label: "🌾 Green Beginner", cond: res => Object.values(res).every(v => !v) },
      { id: "eco-starter", label: "🌱 Eco Starter", cond: res => Object.values(res).some(v => v) },
      // ... add others
    ];
    setQuizBadges(quizDefs.filter(b => b.cond(quizRes)));

    fetch("/data/badges.json")
      .then(res => res.json())
      .then(list => setEarnedBadges(list.filter(b => pts >= b.points_required)));

    const rawOrders = JSON.parse(localStorage.getItem("orderHistory") || "[]");
    setOrders(rawOrders.reverse());
  }, []);

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "points", label: "Points" },
    { id: "badges", label: "Badges" },
    { id: "orders", label: "Orders" },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <div className="w-16 h-16 bg-green-200 rounded-full flex items-center justify-center text-4xl text-green-700">
          👤
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Eco Shopper</h1>
          <p className="text-gray-500">Member since Jan 2025</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b-2 border-gray-200 mb-6">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`pb-2 font-medium ${activeTab === tab.id ? "border-b-4 border-green-600 text-green-700" : "text-gray-500"}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div>
        {activeTab === "overview" && (
          <div className="grid md:grid-cols-2 gap-6">
            {/* Points Card */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-green-700 mb-3">💚 Your Green Points</h2>
              <div className="text-5xl font-bold text-green-600">{greenPoints}</div>
              <p className="mt-2 text-gray-500">10 pts = ₹1 redeemable</p>
            </div>
            
            {/* Quiz Badges */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-green-700 mb-3">📝 Quiz Badges</h2>
              {quizBadges.length ? (
                <div className="flex flex-wrap gap-2">
                  {quizBadges.map(b => (
                    <span key={b.id} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                      {b.label}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No quiz badges yet.</p>
              )}
            </div>
          </div>
        )}

        {activeTab === "points" && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-green-700 mb-4">💚 Points History</h2>
            <p className="text-gray-500">Feature coming soon...</p>
          </div>
        )}

        {activeTab === "badges" && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-green-700 mb-4">🏆 Earned Badges</h2>
            {earnedBadges.length ? (
              <div className="flex flex-wrap gap-3">
                {earnedBadges.map((b, i) => {
                  const Icon = MD[b.icon] || MD.MdEmojiEvents;
                  return (
                    <div key={i} className="flex items-center gap-2 bg-green-100 px-4 py-2 rounded-full">
                      <Icon className="text-green-800" />
                      <span className="text-green-800">{b.label}</span>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-gray-500">No badges earned yet. Start shopping greener!</p>
            )}
          </div>
        )}

        {activeTab === "orders" && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-green-700 mb-4">📦 Order History</h2>
            {orders.length ? orders.map((ord, i) => (
              <div key={i} className="border-b py-3">
                <div className="text-sm text-gray-700">📅 {ord.timestamp}</div>
                <div className="font-medium text-green-800">Paid ₹{ord.total.toFixed(2)}</div>
              </div>
            )) : (
              <p className="text-gray-500">No orders yet.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
