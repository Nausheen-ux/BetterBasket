export function addToCart(product, quantity = 1) {
  const existingCart = JSON.parse(localStorage.getItem("cart")) || [];

  if (!product._id) {
    console.error("Product must have a unique _id.");
    return;
  }

  const index = existingCart.findIndex((item) => item._id === product._id);

  if (index !== -1) {
    existingCart[index].quantity += quantity;
  } else {
    existingCart.push({
      _id: product._id,
      name: product.name,
      price: product.price,
      quantity,
      tags: Array.isArray(product.tags)
        ? product.tags
        : product.tag
        ? [product.tag]
        : [],
      img: product.img || "",
    });
  }

  localStorage.setItem("cart", JSON.stringify(existingCart));

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

  const toast = document.createElement("div");
  toast.textContent = `✅ Added ${quantity} x ${product.name} to cart!`;
  toast.className = `
    fixed bottom-6 left-1/2 transform -translate-x-1/2
    bg-green-600 text-white text-sm font-medium
    px-4 py-2 rounded shadow-lg z-50 animate-slide-in
  `;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.classList.add("opacity-0");
    setTimeout(() => toast.remove(), 300);
  }, 2000);
}
