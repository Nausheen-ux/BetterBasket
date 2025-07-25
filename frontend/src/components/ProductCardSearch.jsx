import { useState } from "react";
import { addToCart } from "../utils/cartUtils";
import { StarIcon } from "@heroicons/react/20/solid";

export default function ProductCard({ product }) {
  const [quantity, setQuantity] = useState(1);

  const increaseQty = () => setQuantity(prev => prev + 1);
  const decreaseQty = () => {
    if (quantity > 1) setQuantity(prev => prev - 1);
  };

  const handleAddToCart = () => {
    addToCart(product, quantity); // ✅ alert is handled inside addToCart
  };

  const satisfiedTags = Object.entries(product)
    .filter(([key, value]) =>
      [
        "vegan", "cruelty_free", "organic", "recyclable_packaging",
        "carbon_neutral", "non_gmo", "fair_trade",
        "sustainably_sourced", "biodegradable", "plastic_free"
      ].includes(key) && value
    )
    .map(([key]) => key.replace(/_/g, " "));

  const getGreenColor = (score) => {
    if (score >= 75) return "#15803d";
    if (score >= 50) return "#65a30d";
    return "#facc15";
  };

  return (
    <div className="bg-white rounded-xl shadow hover:shadow-lg p-4 flex flex-col">
      {/* Image */}
      <div className="bg-white rounded-lg w-full h-52 flex items-center justify-center mb-3 overflow-hidden border border-gray-100">
        <img
          src={product.image || product.img}
          alt={product.name}
          className="max-h-full max-w-full object-contain"
        />
      </div>

      {/* Title & Badge */}
      <div className="flex items-start justify-between">
        <h3 className="text-lg font-semibold text-green-800 w-4/5 leading-tight">
          {product.name}
        </h3>
        {product.badge && (
          <span className="text-xs font-semibold bg-green-100 text-green-700 px-2 py-1 rounded-full">
            {product.badge}
          </span>
        )}
      </div>

      {/* Rating + Price + Green Score */}
      <div className="flex justify-between items-center mt-2">
        <div className="flex flex-col">
          <div className="flex text-yellow-500">
            {Array.from({ length: 5 }, (_, i) => (
              <StarIcon
                key={i}
                className={`h-4 w-4 ${i < Math.round(product.rating) ? "fill-current" : "text-gray-300"}`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-500">({product.review_count})</span>
          <div className="mt-1">
            <span className="text-green-700 font-bold">${product.price.toFixed(2)}</span>
            {product.discount && (
              <>
                <span className="ml-2 text-sm text-gray-500 line-through">
                  ${product.original_price.toFixed(2)}
                </span>
                <span className="ml-2 text-sm text-red-600">{product.discount}</span>
              </>
            )}
          </div>
        </div>

        {/* Green Score Circle */}
        <div className="w-16 h-16 relative shrink-0">
          <svg className="transform -rotate-90" width="64" height="64">
            <circle
              cx="32"
              cy="32"
              r="28"
              stroke="#e5e7eb"
              strokeWidth="4"
              fill="none"
            />
            <circle
              cx="32"
              cy="32"
              r="28"
              stroke={product.green_score ? getGreenColor(product.green_score) : "#f87171"}
              strokeWidth="4"
              strokeDasharray={product.green_score ? `${(product.green_score / 100) * 175.93} 175.93` : "0 175.93"}
              strokeLinecap="round"
              fill="none"
            />
          </svg>
        </div>
      </div>

      {/* Tags */}
      <div className="mt-4 text-xs text-green-800 min-h-[40px]">
        <div className="flex flex-wrap gap-1">
          {satisfiedTags.slice(0, 2).map((tag, i) => (
            <span
              key={i}
              className="bg-green-100 px-2 py-0.5 rounded-full text-[11px] font-medium leading-tight capitalize"
            >
              {tag}
            </span>
          ))}
          {satisfiedTags.length > 2 && (
            <details className="ml-1 cursor-pointer">
              <summary className="text-green-600 font-medium hover:underline">+ more</summary>
              <div className="flex flex-wrap gap-1 mt-2">
                {satisfiedTags.slice(2).map((tag, i) => (
                  <span
                    key={i}
                    className="bg-green-50 border border-green-300 px-3 py-1 rounded-full text-green-700 font-medium capitalize"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </details>
          )}
        </div>
      </div>

      {/* Quantity Selector */}
      <div className="flex items-center mt-4 space-x-2">
        <button onClick={decreaseQty} className="bg-green-100 px-2 py-1 rounded text-green-700 text-xl">−</button>
        <span className="px-3 py-1 border rounded text-green-800 font-medium">{quantity}</span>
        <button onClick={increaseQty} className="bg-green-100 px-2 py-1 rounded text-green-700 text-xl">+</button>
      </div>

      {/* Add to Cart */}
      <button
        onClick={handleAddToCart}
        className="mt-4 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded"
      >
        Add to Cart
      </button>
    </div>
  );
}
