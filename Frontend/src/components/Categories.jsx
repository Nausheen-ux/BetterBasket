import fruitImg from '../assets/categories/fruits.jpg'
import dairyImg from '../assets/categories/dairy_pic.jpg'
import drinksImg from '../assets/categories/beverages.jpg'
import snacksImg from '../assets/categories/snacks.jpg'
import grainsImg from '../assets/categories/staples.jpg'
import instantImg from '../assets/categories/instant.jpg'
import chickenImg from '../assets/categories/chicken.jpg'
import masalaImg from '../assets/categories/Masala.jpg'

const categories = [
  { name: "Fruits and Vegetables", img: fruitImg },
  { name: "Dairy, Bread and Eggs", img: dairyImg },
  { name: "Beverages", img: drinksImg },
  { name: "Snacks", img: snacksImg },
  { name: "Grains", img: grainsImg },
  { name: "Instant Food", img: instantImg },
  { name: "Chicken, Meat and Fish", img: chickenImg },
  { name: "Masala, Oil and More", img: masalaImg },
]

export default function Categories() {
  return (
    <section className="bg-white py-12 px-4 sm:px-8">
      <h2 className="text-2xl sm:text-3xl font-bold text-green-800 mb-8 ">Shop by Category</h2>
      
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
        {categories.map((cat, index) => (
          <div
            key={index}
            className="bg-green-50 rounded-xl shadow-md hover:shadow-lg p-4 transition cursor-pointer"
          >
            <img
              src={cat.img}
              alt={cat.name}
              className="w-full h-32 object-cover rounded-lg mb-3"
            />
            <p className="text-center text-green-700 font-semibold text-base">{cat.name}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
