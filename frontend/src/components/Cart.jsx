

//import React, {useState, useEffect } from "react";








 /*export function addToCart(product, quantity = 1) {
const existingCart = JSON.parse(localStorage.getItem("cart")) || [];

// If _id is missing, return early
if (!product._id) {
console.error("Product must have a unique _id.");
return;
}

// Find existing item by _id
const index = existingCart.findIndex((item) => item._id === product._id);

if (index !== -1) {
// If product already exists, update quantity
existingCart[index].quantity += quantity;
} else {
// Add new product with quantity
existingCart.push({
_id: product._id,
name: product.name,
price: product.price,
quantity,
tags: Array.isArray(product.tags)
? product.tags
: product.tag
? [product.tag]
: [], // handles both tag and tags
img: product.img || "", // optional: include image
});
}

// Save to localStorage
localStorage.setItem("cart", JSON.stringify(existingCart));

// ✅ Also send the new item to backend MongoDB
const backendItem = {
productId: product._id,
name: product.name,
price: product.price,
quantity,
tags: Array.isArray(product.tags)
? product.tags
: product.tag
? [product.tag]
: [],
};

fetch("http://localhost:5000/api/cart", {
method: "POST",
headers: {
"Content-Type": "application/json",
},
body: JSON.stringify(backendItem),
})
.then((res) => res.json())
.then((data) => {
console.log("✅ Cart item saved to DB:", data);
})
.catch((err) => {
console.error("❌ Error saving cart to DB:", err);
});

alert(`Added ${quantity} x ${product.name} to cart!`);
}*/



import React, { useEffect, useState } from "react";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(items);

    const sum = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setTotal(sum);
  }, []);

  const increase = (id) => {
    const updated = cartItems.map((item) =>
      item._id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCartItems(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
    updateTotal(updated);
  };

  const decrease = (id) => {
    const updated = cartItems.map((item) =>
      item._id === id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    setCartItems(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
    updateTotal(updated);
  };

  const removeItem = (id) => {
    const updated = cartItems.filter((item) => item._id !== id);
    setCartItems(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
    updateTotal(updated);
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("cart");
    setTotal(0);
  };

  const updateTotal = (updatedCart) => {
    const sum = updatedCart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setTotal(sum);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-green-50 rounded-lg shadow-md mt-6">
      <h1 className="text-2xl font-bold text-green-800 mb-4">🛒 Your Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div key={item._id} className="bg-white p-4 rounded-lg border border-green-200 shadow-sm mb-4 flex justify-between items-center">
              <div>
                <h2 className="font-semibold text-lg text-green-700">{item.name}</h2>
                <p className="text-sm text-gray-500">
                  Price: ₹{item.price}
                </p>
                <div className="mt-1 flex gap-2 text-xs">
                  {item.tags?.map((tag, i) => (
                    <span key={i} className="bg-green-100 text-green-700 px-2 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center gap-2">
                <button onClick={() => decrease(item._id)} className="bg-green-100 px-2 py-1 rounded text-green-700 text-lg">−</button>
                <span className="px-3 py-1 border rounded text-green-800 font-medium">{item.quantity}</span>
                <button onClick={() => increase(item._id)} className="bg-green-100 px-2 py-1 rounded text-green-700 text-lg">+</button>
              </div>

              {/* Remove */}
              <button
                onClick={() => removeItem(item._id)}
                className="bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1 rounded"
              >
                Remove
              </button>
            </div>
          ))}

          {/* Total + Clear Cart */}
          <div className="border-t pt-4 mt-4 flex justify-between items-center text-lg font-semibold">
            <span>Total:</span>
            <span>₹{total.toFixed(2)}</span>
          </div>
          <button
            onClick={clearCart}
            className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
          >
            Clear Cart
          </button>
        </>
      )}
    </div>
  );
}