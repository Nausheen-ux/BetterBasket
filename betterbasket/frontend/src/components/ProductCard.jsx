import { useState } from "react";
import { addToCart } from "../utils/cartUtils"; // ✅ Import utility

export default function ProductCard({ product }) {
const [quantity, setQuantity] = useState(1);

const increaseQty = () => setQuantity(prev => prev + 1);
const decreaseQty = () => {
if (quantity > 1) setQuantity(prev => prev - 1);
};

const handleAddToCart = () => {
addToCart(product, quantity);
alert(`Added ${quantity} x ${product.name} to cart!`);
};

return (
<div className="bg-white rounded-xl shadow hover:shadow-lg p-4 flex flex-col">
<img src={product.img} alt={product.name} className="rounded-lg w-full h-40 object-cover mb-3" />


  <h3 className="text-lg font-semibold text-green-800">{product.name}</h3>
  <p className="text-green-600 font-medium mt-1">₹{product.price}</p>
  <span className="text-xs inline-block bg-green-200 text-green-800 px-2 py-1 rounded mt-2 w-fit">
    {product.tag}
  </span>

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

  </button>
</div>
);
}
