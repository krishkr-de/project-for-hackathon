import Navbar from "../components/NAVBAR";
import { getCurrentUser } from "../utils/localStorage";
import PageTransition from "../components/PageTransition";

const Home = () => {
  const user = getCurrentUser();

  return (
    <PageTransition>
      <Navbar />

      <main
        style={{
          paddingTop: "110px",
          paddingInline: "40px",
          minHeight: "100vh",
          background: "#021b2b",
          color: "white",
        }}
      >
        <h1>Welcome, {user?.username} 👋</h1>

        <p>Ready to build great habits today?</p>
      </main>
    </PageTransition>
  );
};

export default Home;
