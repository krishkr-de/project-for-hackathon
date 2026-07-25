import { useState } from "react";

import Navbar from "../components/NAVBAR";
import Hero from "../components/hero";
import AddHabit from "../components/AddHabit";
import HabitList from "../components/HabitList";
import PageTransition from "../components/PageTransition";

import { getHabits } from "../utils/localstorage";

const Home = () => {

  const [habits, setHabits] = useState(getHabits());

  return (
    <PageTransition>

      <Navbar />

      <main
        style={{
          paddingTop: "110px",
          minHeight: "100vh",
          background: "#021b2b",
          color: "white",
        }}
      >
        <Hero />

        <AddHabit
          habits={habits}
          setHabits={setHabits}
        />

        <HabitList habits={habits} />

      </main>

    </PageTransition>
  );
};

export default Home;