import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/login";
import Home from "./pages/Home";

import { getCurrentUser } from "./utils/localstorage";

function App() {

  const user = getCurrentUser();

  return (

    <Routes>

      <Route

        path="/"

        element={
          user
          ? <Navigate to="/home"/>
          : <Login/>
        }

      />

      <Route

        path="/home"

        element={
          user
          ? <Home/>
          : <Navigate to="/"/>
        }

      />

    </Routes>

  );

}

export default App;