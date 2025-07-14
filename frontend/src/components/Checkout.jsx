import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [productsData, setProductsData] = useState([]);
  const [badgesData, setBadgesData] = useState([]);
  const [greenPointsEarned, setGreenPointsEarned] = useState(0);
  const [availablePoints, setAvailablePoints] = useState(0);
  const [usePoints, setUsePoints] = useState(false);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(cart);

    Promise.all([
      fetch("/data/products.json").then(res => res.json()),
      fetch("/data/badges.json").then(res => res.json())
    ]).then(([products, badges]) => {
      setProductsData(products);
      setBadgesData(badges);

      let total = 0;
      for (let item of cart) {
        const match = products.find(p => p.name.trim() === item.name.trim());
        const score = match?.green_score || 0;
        total += Math.round((score / 10) * item.quantity);
      }
      setGreenPointsEarned(total);
    });

    const points = parseInt(localStorage.getItem("greenPoints") || "0");
    setAvailablePoints(points);
  }, []);

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = subtotal >= 499 ? 0 : 40;
  const tax = parseFloat((subtotal * 0.05).toFixed(2));

  const discountInRupees = usePoints ? Math.floor(availablePoints / 10) : 0;
  const pointsUsed = discountInRupees * 10;

  const total = Math.max(0, subtotal + deliveryFee + tax - discountInRupees);

  const updatedTotalPoints = availablePoints - (usePoints ? pointsUsed : 0) + greenPointsEarned;
  const unlockedBadges = badgesData.filter(b => updatedTotalPoints >= b.points_required);

  const handlePlaceOrder = () => {
  const storedPoints = parseInt(localStorage.getItem("greenPoints") || "0");
  const newTotalPoints = storedPoints - (usePoints ? pointsUsed : 0) + greenPointsEarned;

  // ✅ Save accumulated points back
  localStorage.setItem("greenPoints", newTotalPoints);
  localStorage.removeItem("cart");

  const summary = {
    items: cartItems,
    subtotal,
    greenPointsEarned,
    discountUsed: discountInRupees,
    deliveryFee,
    tax,
    total,
    badgesUnlocked: unlockedBadges,
    timestamp: new Date().toLocaleString()
  };

  localStorage.setItem("orderSummary", JSON.stringify(summary));
  navigate("/order-summary");
};


  return (
    <div className="max-w-4xl mx-auto p-6 bg-green-50 rounded-lg shadow-lg mt-6">
      <h1 className="text-3xl font-bold text-green-800 mb-6">🧾 Checkout</h1>

      {cartItems.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {/* Cart Items */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-green-700">Your Items</h2>
            {cartItems.map((item, i) => (
              <div key={i} className="bg-white p-4 rounded-lg border shadow-sm">
                <div className="flex justify-between">
                  <div>
                    <h3 className="text-green-800 font-medium">{item.name}</h3>
                    <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                  </div>
                  <span className="text-green-700 font-semibold">
                    ₹{(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="bg-white p-6 rounded-lg shadow-md border space-y-5">
            <h2 className="text-xl font-semibold text-green-700">Order Summary</h2>

            <div className="text-sm space-y-1">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Fee</span>
                <span>{deliveryFee === 0 ? "Free" : `₹${deliveryFee}`}</span>
              </div>
              <div className="flex justify-between">
                <span>GST (5%)</span>
                <span>₹{tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center">
                <label htmlFor="usePoints" className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    id="usePoints"
                    checked={usePoints}
                    onChange={() => setUsePoints(!usePoints)}
                  />
                  <span>Use Green Points</span>
                </label>
                <span className="text-green-700">
                  {usePoints ? `− ₹${discountInRupees}` : "—"}
                </span>
              </div>
            </div>

            <div className="border-t border-dashed pt-4 flex justify-between text-lg font-bold">
              <span>Total Payable</span>
              <span>₹{total.toFixed(2)}</span>
            </div>

            <div className="bg-green-50 p-4 rounded text-sm mt-4">
              <h3 className="text-green-800 font-semibold mb-1">💚 Green Points</h3>
              <p>You’ll earn <strong>{greenPointsEarned}</strong> points for this order.</p>
            </div>

            <button
              onClick={handlePlaceOrder}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-full text-lg"
            >
              🛍️ Place Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
