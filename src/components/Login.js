import styles from "./Login.module.css";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

import isEmail from "validator/es/lib/isEmail";

const LOGINCRED = {
  email: "task@gmail.com",
  password: "12345678",
};

const Login = (props) => {
  const [formInputValidity, setFormInputValidity] = useState({
    email: true,
    password: true,
  });

  const [isValidCred, setIsValidCred] = useState(true);

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const navigate = useNavigate();

  const onSubmitHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    const enteredEmailIsValid = isEmail(enteredEmail);
    const enteredPasswordIsValid = enteredPassword.trim().length >= 7;

    setFormInputValidity({
      email: enteredEmailIsValid,
      password: enteredPasswordIsValid,
    });

    const formIsValid = enteredEmailIsValid && enteredPasswordIsValid;

    if (!formIsValid) {
      return;
    }

    if (
      LOGINCRED.email === enteredEmail &&
      LOGINCRED.password === enteredPassword
    ) {
      setIsValidCred(true);
      // localStorage.setItem("loggedIn", true);
      props.login(true);
      console.log("hey it should work");
      navigate("/dashboard", { replace: true });
    } else {
      // localStorage.setItem("loggedIn", false);
      props.login(false);
      setIsValidCred(false);
    }
  };

  return (
    <>
      <div className={styles.center_form}>
        <div className="w-full max-w-xs">
          <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            {!isValidCred && (
              <p className="text-red-500 text-xs italic">
                Incorrect Email Password
              </p>
            )}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="text"
                placeholder="Email"
                ref={emailInputRef}
              />
              {!formInputValidity.email && (
                <p className="text-red-500 text-xs italic">
                  Please enter valid Email Address.
                </p>
              )}
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="******************"
                ref={passwordInputRef}
              />
              {!formInputValidity.password && (
                <p className="text-red-500 text-xs italic">
                  Please enter valid Password of 8 Characters or more.
                </p>
              )}
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={onSubmitHandler}
              >
                Sign In
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
