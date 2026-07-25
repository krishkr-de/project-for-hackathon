import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;
const model = apiKey && genAI ? genAI.getGenerativeModel({ model: "gemini-2.0-flash" }) : null;

const reviewCache = new Map();
const inFlightRequests = new Map();

function buildFallbackReview(habits) {
  const total = habits.length || 1;
  const completed = habits.filter((habit) => habit.today >= habit.goal).length;
  const score = Math.max(0, Math.min(100, Math.round((completed / total) * 100)));

  const strengths = habits
    .filter((habit) => habit.today >= habit.goal)
    .slice(0, 2)
    .map((habit) => habit.name);

  const improvements = habits
    .filter((habit) => habit.today < habit.goal)
    .slice(0, 2)
    .map((habit) => habit.name);

  const strengthText = strengths.length
    ? `You kept up ${strengths.join(", ")}.`
    : "You stayed consistent today.";

  const improvementText = improvements.length
    ? `Focus on ${improvements.join(", ")}.`
    : "Keep the momentum going.";

  return `# Today's Score (${score}/100)

# Strength
${strengthText}

# Improvement
${improvementText}

# Motivation
Small wins still count. Keep going.`;
}

export async function generateReview(habits) {
  const summary = habits
    .map(
      (habit) =>
        `${habit.name}: ${habit.today}/${habit.goal} ${habit.unit}`
    )
    .join("\n");

  const cacheKey = summary;

  if (reviewCache.has(cacheKey)) {
    return reviewCache.get(cacheKey);
  }

  if (inFlightRequests.has(cacheKey)) {
    return inFlightRequests.get(cacheKey);
  }

  if (!apiKey || !model) {
    const fallback = buildFallbackReview(habits);
    reviewCache.set(cacheKey, fallback);
    return fallback;
  }

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

  const requestPromise = (async () => {
    try {
      const result = await model.generateContent(prompt);
      return result.response.text();
    } catch (error) {
      const message = error?.message || "";
      const isRateLimitError =
        error?.status === 429 || /429|quota|rate limit/i.test(message);

      if (isRateLimitError) {
        const fallback = buildFallbackReview(habits);
        reviewCache.set(cacheKey, fallback);
        return fallback;
      }

      throw error;
    }
  })();

  inFlightRequests.set(cacheKey, requestPromise);

  try {
    const text = await requestPromise;
    reviewCache.set(cacheKey, text);
    return text;
  } finally {
    inFlightRequests.delete(cacheKey);
  }
}