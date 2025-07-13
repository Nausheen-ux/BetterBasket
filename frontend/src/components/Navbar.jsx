import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';

export default function Navbar({ query, setQuery }) {
  const navigate = useNavigate();

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      navigate('/search');
    }
  };

  return (
    <nav className="bg-green-100 text-green-900 shadow-md px-6 py-4 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold tracking-wide">
        Better<span className="text-green-600">Basket</span>
      </Link>

      <div className="w-full sm:w-1/3">
        <input
          type="text"
          placeholder="Search for products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full px-4 py-2 rounded-full border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      <div className="flex items-center space-x-6 text-sm sm:text-base">
        <Link to="/" className="hover:text-green-600">Home</Link>
        <Link to="/challenge" className="hover:text-green-600">Eco Quiz</Link>
        <Link to="/cart" className="hover:text-green-600 flex items-center gap-1">
          <ShoppingCartIcon className="w-5 h-5" />
          <span>Cart</span>
        </Link>
        <Link to="/profile" className="hover:text-green-600">Profile</Link>
      </div>
    </nav>
  );
}
