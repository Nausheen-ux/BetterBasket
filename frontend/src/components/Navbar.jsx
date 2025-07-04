import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className="bg-green-100 text-green-900 shadow-md px-6 py-4 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold tracking-wide">
        Better<span className="text-green-600">Basket</span>
      </Link>
      <div className="w-full sm:w-1/3">
        <input
          type="text"
          placeholder="Search for products..."
          className="w-full px-4 py-2 rounded-full border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>
      <div className="space-x-6 text-sm sm:text-base">
        <Link to="/" className="hover:text-green-600">Home</Link>
        <Link to="/quiz" className="hover:text-green-600">Eco Quiz</Link>
        <Link to="/cart" className="hover:text-green-600">Cart</Link>
        <Link to="/profile" className="hover:text-green-600">Profile</Link>
      </div>
    </nav>
  )
}
