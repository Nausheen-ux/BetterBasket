import React from "react";
import GreenScore from "../components/GreenScore";




export default function Cart() {
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="max-w-3xl mx-auto p-6 bg-green-50 rounded-lg shadow-md mt-6">
      <h1 className="text-2xl font-bold text-green-800 mb-4">🛒 Your Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cartItems.map((item, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-lg border border-green-200 shadow-sm"
            >
              <h2 className="font-semibold text-lg text-green-700">{item.name}</h2>
              <p className="text-sm text-gray-500">
                Quantity: {item.quantity} | Price: ₹{item.price}
              </p>
              <div className="mt-1 flex gap-2 flex-wrap text-xs">
                {item.tags?.map((tag, i) => (
                  <span
                    key={i}
                    className="bg-green-100 text-green-700 px-2 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}

          <GreenScoreDisplay cartItems={cartItems} />

          <div className="border-t pt-4 mt-4 flex justify-between text-lg font-semibold">
            <span>Total:</span>
            <span>₹{totalPrice.toFixed(2)}</span>
          </div>
        </div>
      )}
    </div>
  );
}
