import React, { useState } from "react";

const quizQuestions = [
  { id: 1, question: "Do you prefer vegan products?" },
  { id: 2, question: "Do you follow a vegetarian lifestyle?" },
  { id: 3, question: "Are you lactose intolerant or avoiding dairy?" },
  { id: 4, question: "Are you gluten free?" },
  { id: 5, question: "Do you prefer cruelty-free products?" },
  { id: 6, question: "Would you like recyclable or eco-friendly packaging?" },
  { id: 7, question: "Interested in recycled or upcycled materials?" },
  { id: 8, question: "Prefer locally made or regionally sourced products?" },
  { id: 9, question: "Open to new or lesser-known sustainable brands?" },
  { id: 10, question: "Willing to pay slightly more for eco-friendly products?" },
];



export default function Challenge() {
  const [responses, setResponses] = useState({});
  const [submitted, setSubmitted] = useState(false);


console.log("Challenge component loaded");


  const handleAnswer = (id, value) => {
    setResponses(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = () => {
    if (Object.keys(responses).length !== quizQuestions.length) {
      alert("Please answer all questions!");
      return;
    }
    setSubmitted(true);
    console.log("Quiz submitted:", responses);
   
  };

  return (
    <div className="p-8 max-w-3xl mx-auto bg-green-50 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-center text-green-800 mb-4">🌿 Eco Quiz</h1>
      <p className="text-center text-green-600 mb-8">Help us personalize your experience with greener choices.</p>

      {quizQuestions.map((q) => (
        <div key={q.id} className="bg-white rounded p-4 mb-4 shadow-sm">
          <p className="font-medium mb-2">{q.question}</p>
          <div className="space-x-4">
            <button
              className={`px-4 py-2 rounded-full ${
                responses[q.id] === true
                  ? "bg-green-600 text-white"
                  : "bg-green-100 text-green-700"
              }`}
              onClick={() => handleAnswer(q.id, true)}
            >
              Yes
            </button>
            <button
              className={`px-4 py-2 rounded-full ${
                responses[q.id] === false
                  ? "bg-red-400 text-white"
                  : "bg-gray-100 text-gray-700"
              }`}
              onClick={() => handleAnswer(q.id, false)}
            >
              No
            </button>
          </div>
        </div>
      ))}

      <button
        onClick={handleSubmit}
        className="mt-6 w-full bg-green-500 text-white py-2 rounded-full hover:bg-green-600"
      >
        Submit Quiz
      </button>

      {submitted && (
        <p className="mt-4 text-green-700 font-semibold text-center">
          🎉 Preferences saved! We’ll show you greener options.
        </p>
      )}
    </div>
  );
}
