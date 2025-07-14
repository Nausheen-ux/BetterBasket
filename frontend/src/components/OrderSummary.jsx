import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as MD from "react-icons/md";

export default function OrderSummary() {
  const navigate = useNavigate();
  const [summary, setSummary] = useState(null);
  const [badges, setBadges] = useState([]);

  useEffect(() => {
    const raw = localStorage.getItem("orderSummary");
    if (!raw) return;

    const parsed = JSON.parse(raw);
    setSummary(parsed);

    fetch("/data/badges.json")
      .then((res) => res.json())
      .then((badgeList) => {
        const unlocked = badgeList.filter(
          (b) =>
            parsed.greenPointsEarned + (parsed.discountUsed * 10 || 0) >=
            b.points_required
        );
        setBadges(unlocked);
      })
      .catch((err) => console.error("❌ Failed to load badges:", err));
  }, []);

  if (!summary) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">No recent order found.</p>
        <button
          onClick={() => navigate("/")}
          className="mt-4 bg-green-600 hover:bg-green-700 text-white py-2 px-5 rounded-full font-medium"
        >
          🏠 Go Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6 bg-green-50 rounded-lg shadow-md mt-6">
      <h1 className="text-3xl font-bold text-green-800 mb-6">📦 Order Summary</h1>

      {/* Items */}
      <div className="bg-white rounded-lg p-5 shadow mb-6">
        <h2 className="text-xl font-semibold text-green-700 mb-3">Your Items</h2>
        <div className="divide-y">
          {summary.items?.map((item, i) => (
            <div key={i} className="py-3 flex justify-between items-center text-sm">
              <div>
                <h3 className="text-green-800 font-medium">{item.name}</h3>
                <p className="text-gray-500">Qty: {item.quantity}</p>
              </div>
              <span className="font-semibold text-green-700">
                ₹{(item.price * item.quantity).toFixed(2)}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Price Breakdown */}
      <div className="bg-white rounded-lg p-5 shadow mb-6">
        <h2 className="text-xl font-semibold text-green-700 mb-3">🧾 Price Breakdown</h2>
        <div className="text-sm text-gray-700 space-y-2">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>₹{summary.subtotal?.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Delivery Fee</span>
            <span>
              {summary.deliveryFee === 0 ? (
                <span className="text-green-600 font-medium">Free</span>
              ) : (
                `₹${summary.deliveryFee.toFixed(2)}`
              )}
            </span>
          </div>
          <div className="flex justify-between">
            <span>GST (5%)</span>
            <span>₹{summary.tax?.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-green-700">
            <span>Green Points Discount</span>
            <span>{summary.discountUsed ? `− ₹${summary.discountUsed}` : "—"}</span>
          </div>

          <div className="flex justify-between border-t pt-4 mt-3 font-bold text-lg">
            <span>Total Paid</span>
            <span className="text-green-800">₹{summary.total?.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Delivery and Green Points */}
<div className="bg-white rounded-lg p-5 shadow mb-6">
  <h2 className="text-xl font-semibold text-green-700 mb-4">🎁 Delivery & Rewards</h2>

  <div className="bg-green-100 p-4 rounded-lg shadow-inner mb-4 flex items-center justify-between">
    <div>
      <h3 className="text-xl text-green-800 font-bold">💚 Green Points Earned</h3>
      <p className="text-sm text-green-700 mt-1">Thanks for your eco-friendly purchase!</p>
    </div>
    <div className="text-4xl font-extrabold text-green-600">
      +{summary.greenPointsEarned}
    </div>
  </div>

  <div className="text-sm text-gray-700 space-y-1">
    <p>
      Estimated Delivery: <strong className="text-gray-800">2–4 business days</strong>
    </p>
    <p>Order Date: {summary.timestamp}</p>
  </div>
</div>


      {/* Badges Earned */}
      <div className="bg-white rounded-lg p-5 shadow">
        <h2 className="text-xl font-semibold text-green-700 mb-3">🏅 Badges Earned</h2>
        {badges.length === 0 ? (
          <p className="text-sm text-gray-500">No badges unlocked in this order.</p>
        ) : (
          <div className="flex flex-wrap gap-3">
            {badges.map((badge, i) => {
              const Icon = MD[badge.icon] || MD.MdEmojiEvents;
              return (
                <div
                  key={i}
                  className="flex items-center gap-2 bg-green-100 px-4 py-2 rounded-full shadow-sm"
                >
                  <Icon className="text-green-700 text-xl" />
                  <span className="text-green-800 font-medium text-sm">{badge.label}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
