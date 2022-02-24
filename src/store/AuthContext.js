import React, { useState } from "react";

const AuthContext = React.createContext({
  isLoggedIn: false,
  email: "",
  password: "",
  login: () => {},
  logout: () => {},
  localStorage: () => {},
});

export const AuthContextProvider = (props) => {
  const [logIn, setIsLogIn] = useState(null);
  const [email, setIsEmail] = useState("");
  const [password, setIsPassword] = useState("");

  const loginHandler = (data) => {
    localStorage.setItem("loggedin", data.isLoggedIn);
    localStorage.setItem("email", data.email);
    localStorage.setItem("password", data.password);
    setIsLogIn(data.isLoggedIn);
    setIsEmail(data.email);
    setIsPassword(data.password);
  };

  const localStorageHandler = () => {
    const ll = localStorage.getItem("loggedin");
    const email = localStorage.getItem("email");
    const pass = localStorage.getItem("password");
    console.log("working");
    console.log(ll);
    setIsLogIn(ll);
    setIsEmail(email);
    setIsPassword(pass);
  };

  const logoutHandler = () => {
    localStorage.setItem("loggedin", false);
    localStorage.setItem("email", "");
    localStorage.setItem("password", "");
    localStorageHandler();
  };
  const contextValue = {
    isLoggedIn: logIn,
    email: email,
    password: password,
    login: loginHandler,
    logout: logoutHandler,
    localStorage: localStorageHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
