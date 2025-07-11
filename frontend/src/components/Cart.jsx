import React, {useState, useEffect } from "react";





export default function Cart() {
const [cartItems, setCartItems] = useState([]);

useEffect(() => {
const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
setCartItems(storedCart);
}, []);

// Helper to update cart in localStorage and state
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

             {/* <GreenScoreDisplay cartItems={cartItems} /> */}

         <div className="border-t pt-4 mt-4 flex justify-between text-lg font-semibold">
        <span>Total:</span>
        <span>₹{totalPrice.toFixed(2)}</span>
      </div>

      <button
        onClick={clearCart}
        className="mt-6 w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded"
      >

      </button>
    </div>
  )}
</div>
);
}




/* export function addToCart(product, quantity = 1) {
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