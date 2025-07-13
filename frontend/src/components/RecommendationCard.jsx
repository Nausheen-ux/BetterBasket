import { addToCart } from "../utils/cartUtils";

export default function RecommendationCard({ from, to }) {
  const handleAddRecommended = () => {
    addToCart(to, 1);
  };

  return (
    <div className="bg-white rounded-lg p-4 shadow-lg border-2 border-green-400 flex gap-4">
      <img
        src={to.image}
        alt={to.name}
        className="w-24 h-24 object-contain bg-white rounded"
      />

      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-semibold text-green-800 text-lg">{to.name}</h3>
          <p className="text-sm text-gray-600 italic">
            ♻️ Better Alternative to <strong>{from.name}</strong>
          </p>
          <p className="text-sm text-gray-500 mt-1">{to.description}</p>

          <div className="mt-2 text-sm">
            <span className="text-green-700 font-bold">
              ₹{to.price.toFixed(2)}
            </span>
            {to.original_price && to.original_price > to.price && (
              <>
                <span className="ml-2 text-gray-500 line-through text-xs">
                  ₹{to.original_price.toFixed(2)}
                </span>
                <span className="ml-2 text-xs text-red-600">{to.discount}</span>
              </>
            )}
          </div>
        </div>

        <div className="flex items-center mt-2 gap-2">
          <div className="flex flex-wrap gap-1 text-xs w-4/5">
            {Object.entries(to)
              .filter(([key, val]) =>
                [
                  "vegan",
                  "cruelty_free",
                  "organic",
                  "recyclable_packaging",
                  "carbon_neutral",
                  "non_gmo",
                  "fair_trade",
                  "sustainably_sourced",
                  "biodegradable",
                  "plastic_free"
                ].includes(key) && val
              )
              .map(([key], i) => (
                <span
                  key={i}
                  className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full capitalize"
                >
                  {key.replace(/_/g, " ")}
                </span>
              ))}
          </div>

          <div className="ml-auto w-12 h-12 shrink-0 relative">
            <svg className="transform -rotate-90" width="48" height="48">
              <circle
                cx="24"
                cy="24"
                r="20"
                stroke="#e5e7eb"
                strokeWidth="4"
                fill="none"
              />
              <circle
                cx="24"
                cy="24"
                r="20"
                stroke="#16a34a"
                strokeWidth="4"
                strokeDasharray={`${(to.green_score / 100) * 125.66} 125.66`}
                strokeLinecap="round"
                fill="none"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-green-700">
              {to.green_score}
            </div>
          </div>
        </div>

        <button
          onClick={handleAddRecommended}
          className="mt-4 bg-green-600 hover:bg-green-700 text-white text-sm py-1.5 px-4 rounded w-max"
        >
          ➕ Add to Cart
        </button>
      </div>
    </div>
  );
}
