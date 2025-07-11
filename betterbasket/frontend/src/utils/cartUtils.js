export function addToCart(product, quantity = 1) {
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
}
