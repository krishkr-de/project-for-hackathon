import { useState } from "react";
import AIReview from "../components/AIReview";
import Navbar from "../components/NAVBAR";
import AddHabit from "../components/AddHabit";
import HabitList from "../components/HabitList";
import PageTransition from "../components/PageTransition";
import DashboardStats from "../components/DashboardStats";
import { getCurrentUser, getHabits } from "../utils/localstorage";
import ProgressChart from "../components/ProgressChart";
const Home = () => {
  const user = getCurrentUser();
  const [habits, setHabits] = useState(getHabits());

  const refreshHabits = () => {
    setHabits(getHabits());
  };

  return (
    <PageTransition>
      <Navbar />

      <main className="home">
        <section className="dashboard-header">
          <h1>👋 Welcome, {user?.username}</h1>
          <p>Track your habits. Build your future.</p>
        </section>
        <DashboardStats habits={habits} />
        <AIReview habits={habits} />
        <ProgressChart habits={habits} />

        <AddHabit habits={habits} setHabits={setHabits} />

        <HabitList
          habits={habits}
          setHabits={setHabits}
          refresh={refreshHabits}
        />
      </main>
    </PageTransition>
  );
};

export default Home;
