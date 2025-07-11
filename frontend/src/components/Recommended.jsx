import ProductCard from './ProductCard';
import appleImg from '../assets/products/apple.jpg';
import milkImg from '../assets/products/almond-milk.jpg';
import breadImg from '../assets/products/bread.jpg';
import crackerImg from '../assets/products/crackers.jpg';

export default function Recommended() {
const products = [
{ _id: "1", name: "Organic Apples", price: 120, tags: ["eco"], img: appleImg },
{ _id: "2", name: "Almond Milk", price: 90, tags: ["vegan"], img: milkImg },
{ _id: "3", name: "Whole Wheat Bread", price: 60, tags: ["healthy"], img: breadImg },
{ _id: "4", name: "Gluten Free Crackers", price: 120, tags: ["gluten free"], img: crackerImg }
];

return (
<section className="bg-green-50 py-12 px-6">
<h2 className="text-2xl sm:text-3xl font-bold text-green-800 mb-6">Recommended For You</h2>
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
{products.map((prod) => (
<ProductCard key={prod._id} product={prod} />
))}
</div>
</section>
);
}
