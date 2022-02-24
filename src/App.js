import "./App.css";
import Login from "./components/Login";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import { useState } from "react";

function App() {
  const userLoggedIn = localStorage.getItem("isLoggedIn");

  const [isLoggedIn, setIsLoggedIn] = useState(userLoggedIn);

  const loginStateChanged = () => {
    setIsLoggedIn(localStorage.getItem("isLoggedIn"));
    console.log("executed");
  };

  console.log(isLoggedIn);

  let dashboardPage = "";
  if (isLoggedIn === true) {
    dashboardPage = <Dashboard />;
  } else {
    dashboardPage = <Login />;
  }

  return (
    <Routes>
      <Route path="/" element={<Login loginState={loginStateChanged} />} />
      <Route path="/dashboard" element={dashboardPage} />
    </Routes>
  );
}

export default App;
