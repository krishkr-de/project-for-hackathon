import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(
  import.meta.env.VITE_GEMINI_API_KEY
);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
});

export async function generateReview(habits) {
  const summary = habits
    .map(
      (habit) =>
        `${habit.name}: ${habit.today}/${habit.goal} ${habit.unit}`
    )
    .join("\n");

  const prompt = `
You are TrackLess Coach.

The user tracked these habits today:

${summary}

Return markdown only.

Give:

# Today's Score (/100)

# Strength

# Improvement

# Motivation

Keep everything under 120 words.
`;

  const result = await model.generateContent(prompt);

  return result.response.text();
}