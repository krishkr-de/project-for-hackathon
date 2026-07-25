import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { generateReview } from "../utils/gemini";
import "../styles/aiReview.css"
const AIReview = ({ habits }) => {
  const [loading, setLoading] = useState(false);
  const [review, setReview] = useState("");

  const handleReview = async () => {
    if (loading) return;

    setLoading(true);

    try {
      const res = await generateReview(habits);
      setReview(res);
    } catch (err) {
      console.error(err);
      setReview("Failed to generate AI review.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="ai-card">
      <h2>🌊 TrackLess Coach</h2>

      <button disabled={loading} onClick={handleReview}>
        {loading ? "🌊 AI is Thinking..." : "✨ Generate AI Review"}
      </button>

      {review && (
        <div className="review">
          <ReactMarkdown>{review}</ReactMarkdown>
        </div>
      )}
    </section>
  );
};

export default AIReview;
