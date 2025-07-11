import { useEffect, useState } from 'react';

export default function Hero() {
  const [quizTaken, setQuizTaken] = useState(false);

  useEffect(() => {
    const taken = localStorage.getItem("ecoQuizTaken");
    setQuizTaken(taken === "true");
  }, []);

  return (
    <section className="bg-green-50 min-h-[80vh] flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-4xl sm:text-5xl font-bold text-green-800 leading-tight mb-4">
        Shop Smarter. Live Greener. 🌱
      </h1>
      <p className="text-green-700 text-lg max-w-xl mb-6">
        BetterBasket helps you make eco-friendly grocery choices. Take the Eco Quiz and earn rewards for choosing greener alternatives!
      </p>

      {!quizTaken && (
        <a href="/challenge">
          <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full shadow-md transition">
            Take the Eco Quiz
          </button>
        </a>
      )}
    </section>
  );
}
