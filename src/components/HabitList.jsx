const HabitList = ({ habits }) => {

  if (habits.length === 0)
    return (
      <h2
        style={{
          textAlign: "center",
          marginTop: "60px",
          color: "#8df8ff",
        }}
      >
        No habits yet.
      </h2>
    );

  return (
    <div
      style={{
        width: "90%",
        margin: "50px auto",
      }}
    >
      {habits.map((habit) => (
        <div
          key={habit.id}
          style={{
            padding: "20px",
            marginBottom: "20px",
            borderRadius: "12px",
            background: "#07384f",
          }}
        >
          <h2>{habit.name}</h2>

          <p>

            Goal : {habit.goal} {habit.unit}

          </p>

          <p>

            🔥 {habit.streak} Day Streak

          </p>
        </div>
      ))}
    </div>
  );
};

export default HabitList;