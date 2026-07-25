import { useState } from "react";

import "../styles/addHabit.css";

import { addHabit } from "../utils/localstorage";

const AddHabit = ({ habits, setHabits }) => {

  const [name, setName] = useState("");

  const [goal, setGoal] = useState("");

  const [unit, setUnit] = useState("Hours");

  const handleSubmit = (e) => {

    e.preventDefault();

    if (!name.trim()) return;

    if (!goal) return;

    const newHabit = addHabit({
      name,
      goal,
      unit,
    });

    setHabits([...habits, newHabit]);

    setName("");

    setGoal("");

    setUnit("Hours");
  };

  return (
    <section className="addHabit">

      <h2>Add New Habit</h2>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          placeholder="Habit Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="number"
          placeholder="Daily Goal"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
        />

        <select
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
        >
          <option>Hours</option>
          <option>Minutes</option>
          <option>Pages</option>
          <option>Kilometres</option>
          <option>Glasses</option>
        </select>

        <button>

          Add Habit

        </button>

      </form>

    </section>
  );
};

export default AddHabit;