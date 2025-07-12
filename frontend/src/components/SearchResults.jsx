import { useState } from "react";
import ProductCardSearch from './ProductCardSearch';

export default function SearchResults({ products }) {
  const [sortBy, setSortBy] = useState("default");
  const [selectedTags, setSelectedTags] = useState([]);

  const allTags = [
    "vegan", "cruelty free", "organic", "recyclable packaging", "carbon neutral",
    "non gmo", "fair trade", "sustainably sourced", "biodegradable", "plastic free"
  ];

  const handleTagToggle = (tag) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const filteredProducts = products.filter(product => {
    const satisfied = Object.entries(product)
      .filter(([key, val]) => val === true)
      .map(([key]) => key.replace(/_/g, ' '));
    return selectedTags.every(tag => satisfied.includes(tag));
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "price-asc") return a.price - b.price;
    if (sortBy === "price-desc") return b.price - a.price;
    if (sortBy === "rating") return b.rating - a.rating;
    if (sortBy === "popularity") return b.review_count - a.review_count;
    return 0;
  });

  return (
    <div className="p-6">
      <h2 className="text-2xl mb-4 font-bold">Search Results</h2>

      {/* Filter and Sort Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <div className="flex flex-wrap gap-2">
          {allTags.map(tag => (
            <button
              key={tag}
              onClick={() => handleTagToggle(tag)}
              className={`px-3 py-1 text-sm rounded-full border ${
                selectedTags.includes(tag)
                  ? "bg-green-600 text-white border-green-600"
                  : "bg-white text-green-700 border-green-300"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border border-green-300 rounded px-3 py-1 text-sm focus:outline-none focus:ring focus:ring-green-300"
        >
          <option value="default">Sort By</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating">Rating</option>
          <option value="popularity">Popularity</option>
        </select>
      </div>

      {sortedProducts.length === 0 ? (
        <p className="text-gray-600">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedProducts.map((product, index) => (
            <ProductCardSearch key={index} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
