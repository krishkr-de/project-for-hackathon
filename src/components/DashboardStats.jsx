import "../styles/dashboardStats.css";

const DashboardStats = ({ habits }) => {
  const totalHabits = habits.length;

  const totalGoal = habits.reduce((sum, habit) => sum + Number(habit.goal), 0);

  const totalDone = habits.reduce(
    (sum, habit) => sum + Number(habit.today || 0),
    0,
  );

  const progress =
    totalGoal === 0 ? 0 : Math.round((totalDone / totalGoal) * 100);

  const bestStreak = habits.length
    ? Math.max(...habits.map((h) => h.streak))
    : 0;

  return (
    <div className="stats-grid">
      <div className="stat-card">
        <h3>Today's Progress</h3>

        <h1>{progress}%</h1>
      </div>

      <div className="stat-card">
        <h3>Done Today</h3>

        <h1>{totalDone}</h1>
      </div>

      <div className="stat-card">
        <h3>Active Habits</h3>

        <h1>{totalHabits}</h1>
      </div>

      <div className="stat-card">
        <h3>Best Streak</h3>

        <h1>🔥 {bestStreak}</h1>
      </div>
    </div>
  );
};

export default DashboardStats;
