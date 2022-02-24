import "./App.css";
import Login from "./components/Login";
import { Routes, Route } from "react-router-dom";
import { useLocalStorage } from "react-use";
import Dashboard from "./components/Dashboard";

function App() {
  const [loggedIn, setLoggedIn, remove] = useLocalStorage("isLogged", false);

  const loginHandler = (value) => {
    setLoggedIn(value);
    console.log(loggedIn);
    console.log("You Logged In");
  };

  const logoutHandler = (value) => {
    setLoggedIn(value);
  };

  return (
    <Routes>
      <Route path="/" element={<Login login={loginHandler} />} />
      {loggedIn && (
        <Route
          path="/dashboard"
          element={<Dashboard logout={logoutHandler} />}
        />
      )}
      {!loggedIn && (
        <Route path="/dashboard" element={<Login login={loginHandler} />} />
      )}
    </Routes>
  );
}

export default App;
