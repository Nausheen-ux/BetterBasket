import React, { useState, useEffect } from "react";
import RecommendationCard from "./RecommendationCard";
import { Link } from "react-router-dom";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [productsData, setProductsData] = useState([]);
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);

    fetch("/data/products.json")
      .then((res) => res.json())
      .then((data) => setProductsData(data));
  }, []);

  useEffect(() => {
    if (!productsData.length || !cartItems.length) return;

    const newRecs = cartItems.flatMap((item) => {
      const currentProduct = productsData.find(
        (p) => p.name.trim() === item.name.trim()
      );
      if (!currentProduct || currentProduct.green_score >= 60) return [];

      const itemTerms = currentProduct.search_terms || [];

      const alternatives = productsData
        .filter((p) => {
          if (p.name === currentProduct.name) return false;
          if (p.green_score <= currentProduct.green_score) return false;
          const productTerms = p.search_terms || [];
          return itemTerms.some((term) => productTerms.includes(term));
        })
        .sort((a, b) => b.green_score - a.green_score)
        .slice(0, 2);

      return alternatives.map((alt) => ({
        from: currentProduct,
        to: alt,
      }));
    });

    setRecommendations(newRecs);
  }, [productsData, cartItems]);

  const updateCart = (updatedCart) => {
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCartItems(updatedCart);
  };

  const increaseQty = (index) => {
    const updated = [...cartItems];
    updated[index].quantity += 1;
    updateCart(updated);
  };

  const decreaseQty = (index) => {
    const updated = [...cartItems];
    if (updated[index].quantity > 1) {
      updated[index].quantity -= 1;
      updateCart(updated);
    }
  };

  const removeItem = (index) => {
    const updated = [...cartItems];
    updated.splice(index, 1);
    updateCart(updated);
  };

  const clearCart = () => {
    localStorage.removeItem("cart");
    setCartItems([]);
  };

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="bg-green-50 rounded-lg shadow-md p-6">
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
                <p className="text-sm text-gray-500">Price: ₹{item.price}</p>

                <div className="flex items-center mt-2 gap-2">
                  <button
                    onClick={() => decreaseQty(index)}
                    className="px-2 py-1 bg-green-200 rounded"
                  >
                    −
                  </button>
                  <span className="px-3">{item.quantity}</span>
                  <button
                    onClick={() => increaseQty(index)}
                    className="px-2 py-1 bg-green-200 rounded"
                  >
                    +
                  </button>
                  <button
                    onClick={() => removeItem(index)}
                    className="ml-auto bg-red-500 text-white px-2 py-1 rounded"
                  >
                    🗑 Remove
                  </button>
                </div>

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

            <div className="border-t pt-4 mt-4 flex justify-between text-lg font-semibold">
              <span>Total:</span>
              <span>₹{totalPrice.toFixed(2)}</span>
            </div>

            <button
              onClick={clearCart}
              className="mt-6 w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded"
            >
              🧹 Clear Cart
            </button>
          </div>
        )}
      </div>

      {/* Recommendations */}
      {cartItems.length > 0 && (
        <div className="mt-10">
          <h2 className="text-xl font-bold text-green-800 mb-4">
            ♻️ Greener Alternatives Recommended
          </h2>

          {recommendations.length === 0 ? (
            <p className="text-sm italic text-gray-500">
              No greener alternatives found.
            </p>
          ) : (
            <div className="grid gap-4">
              {recommendations.map((rec, i) => (
                <RecommendationCard key={i} from={rec.from} to={rec.to} updateCart={updateCart} />
              ))}
            </div>
          )}
        </div>
      )}

      {cartItems.length > 0 && (
        <div className="mt-12 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-green-800 mb-4">✅ Checkout</h2>

          <div className="flex justify-between items-center text-green-800 font-semibold text-lg mb-4">
            <span>Total Amount:</span>
            <span>₹{totalPrice.toFixed(2)}</span>
          </div>

          <Link
            to="/checkout"
            className="w-full block bg-green-600 hover:bg-green-700 text-white py-2 rounded-full font-semibold text-center"
          >
            🧾 Proceed to Checkout
          </Link>
        </div>
      )}
    </div>
  );
}
