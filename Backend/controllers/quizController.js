const User = require("../models/user");
const QuizResponse = require("../models/quizResponse");

// Helper to generate persona based on preferences
function generatePersona(preferences) {
  if (preferences.vegan) return "Plant-Based Hero";
  if (preferences.crueltyFree) return "Conscious Buyer";
  if (preferences.local) return "Local Legend";
  return "Eco Explorer";
}

exports.submitQuiz = async (req, res) => {
  try {
    const { answers } = req.body;
    if (!answers) {
      return res.status(400).json({ message: "Quiz answers missing" });
    }

    // Map answers to preferences (assume answers = { vegan: true, crueltyFree: false ... })
    const preferences = answers;

    const persona = generatePersona(preferences);

    // Create user or update (for demo, create new user)
    const newUser = new User({ preferences, persona });
    await newUser.save();

    // Save quiz response
    const quizResponse = new QuizResponse({
      userId: newUser._id,
      answers,
      preferences,
      persona,
    });
    await quizResponse.save();

    res.status(201).json({ userId: newUser._id, persona });
  } catch (error) {
    console.error("Quiz submission error:", error);
    res.status(500).json({ message: "Server error submitting quiz" });
  }
};
