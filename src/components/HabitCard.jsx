import "../styles/habitcard.css";

import {
  deleteHabit,
  updateHabitProgress,
} from "../utils/localstorage";

const HabitCard = ({ habit, refresh }) => {
  const today = habit.today || 0;

  const progress =
    habit.goal > 0
      ? Math.min((today / habit.goal) * 100, 100)
      : 0;

  const increase = () => {
    updateHabitProgress(habit.id, today + 0.5);
    refresh();
  };

  const decrease = () => {
    if (today <= 0) return;

    updateHabitProgress(habit.id, today - 0.5);
    refresh();
  };

  const remove = () => {
    deleteHabit(habit.id);
    refresh();
  };

  return (
    <div className="habit-card">
      <div className="habit-header">
        <div>
          <h2>{habit.name}</h2>

          <p className="goal">
            Goal: {habit.goal} {habit.unit}
          </p>
        </div>

        <span className="streak">
          🔥 {habit.streak} Days
        </span>
      </div>

      <div className="counter">
        <button
          onClick={decrease}
          disabled={today <= 0}
        >
          −
        </button>

        <h3>
          {today} {habit.unit}
        </h3>

        <button onClick={increase}>
          +
        </button>
      </div>

      <div className="progress">
        <div
          className="progress-fill"
          style={{
            width: `${progress}%`,
          }}
        />
      </div>

      <p className="percent">
        {progress.toFixed(0)}%
      </p>

      <div className="card-footer">
        <button
          className="delete-btn"
          onClick={remove}
        >
          🗑 Delete
        </button>
      </div>
    </div>
  );
};

export default HabitCard;