import "./App.css";
import Login from "./components/Login";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import { useState } from "react";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn")
  );

  const loginStateChanged = (value) => {
    setIsLoggedIn(value);
  };

  return (
    <Routes>
      <Route path="/" element={<Login loginState={loginStateChanged} />} />
      <Route
        path="/dashboard"
        element={
          isLoggedIn ? (
            <Dashboard />
          ) : (
            <Login message="Login to Continue" loginState={loginStateChanged} />
          )
        }
      />
      } />
    </Routes>
  );
}

export default App;
