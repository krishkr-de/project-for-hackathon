import HabitCard from "./HabitCard";

const HabitList = ({ habits, refresh }) => {
  if (!habits.length) {
    return <h2>No habits yet.</h2>;
  }

  return (
    <>
      {habits.map((habit) => (
        <HabitCard
          key={habit.id}
          habit={habit}
          refresh={refresh}
        />
      ))}
    </>
  );
};

export default HabitList;