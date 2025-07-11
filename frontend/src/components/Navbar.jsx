import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [hasTakenQuiz, setHasTakenQuiz] = useState(false);

  useEffect(() => {
    const quizStatus = localStorage.getItem("ecoQuizTaken");
    if (quizStatus === "true") {
      setHasTakenQuiz(true);
    }
  }, []);

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

      <div className="flex items-center space-x-6 text-sm sm:text-base">
        <Link to="/" className="hover:text-green-600">Home</Link>

        {/* Only show if user has NOT taken quiz */}
        {!hasTakenQuiz ? (
          <Link to="/challenge" className="hover:text-green-600">Eco Quiz</Link>
        ) : (
          // Show leaf icon or badge if quiz taken
          <span className="text-green-700 text-xl">🌿</span>
        )}

        <Link to="/cart" className="hover:text-green-600 flex items-center gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
            strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M2.25 3h1.386c.51 0 .955.343 1.087.835L5.79 6.75M9.75 6.75h10.086c.7 0 1.19.683.985 1.352l-1.5 5A1.125 1.125 0 0118.25 14.25H7.005m0 0l-.82 3.278a.75.75 0 00.728.972h11.337m-12.065-4.25L5.79 6.75M5.79 6.75L5.1 4.267A1.125 1.125 0 004.027 3H2.25" />
          </svg>
          <span>Cart</span>
        </Link>

        <Link to="/profile" className="hover:text-green-600">Profile</Link>
      </div>
    </nav>
  );
}
