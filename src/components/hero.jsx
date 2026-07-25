import "../styles/hero.css";
import { getCurrentUser } from "../utils/localstorage";
import "../styles/hero.css";

const Hero = () => {
  const user = getCurrentUser();

  const hour = new Date().getHours();

  let greeting = "Good Evening";

  if (hour < 12) greeting = "Good Morning";

  else if (hour < 18) greeting = "Good Afternoon";

  return (
    <section className="hero">

      <div className="hero-content">

        <p className="greeting">

          👋 {greeting},

        </p>

        <h1>

          {user?.username}

        </h1>

        <h2>

          Track your habits.

          <br />

          Build your future.

        </h2>

        <button>

          + Add Habit

        </button>

      </div>

    </section>
  );
};

export default Hero;