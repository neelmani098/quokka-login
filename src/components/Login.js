import styles from "./Login.module.css";
import { useState } from "react";
import { Route, useNavigate } from "react-router-dom";

import isEmail from "validator/es/lib/isEmail";

const LOGINCRED = {
  email: "task@gmail.com",
  password: "12345678",
};

const Login = (props) => {
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isEmailTouched, setIsEmailTouched] = useState(false);
  const [isPasswordTouched, setIsPasswordTouched] = useState(false);
  const [isFormValid, setIsFormValid] = useState(true);

  let navigate = useNavigate();

  const [formInput, setIsFormInput] = useState({
    email: "",
    password: "",
  });

  const onEmailChangeHandler = (event) => {
    event.preventDefault();
    setIsEmailTouched(true);
    setIsFormInput({
      ...formInput,
      email: event.target.value.toLowerCase(),
    });
    setIsEmailValid(isEmail(formInput.email));
    // setIsFormValid(isEmailValid && isPasswordValid);
  };

  const onPasswordChangeHandler = (event) => {
    setIsPasswordTouched(true);
    setIsFormInput({
      ...formInput,
      password: event.target.value,
    });

    setIsPasswordValid(formInput.password.trim().length >= 7);
    // setIsFormValid(isPasswordValid && isEmailValid);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    setIsFormValid(isEmailValid && isPasswordValid);

    if (!isFormValid) {
      return;
    }
    const isCredValid =
      formInput.email === LOGINCRED.email &&
      formInput.password === LOGINCRED.password;

    if (isCredValid) {
      localStorage.setItem("isLoggedIn", true);
      props.loginState(true);
      navigate("/dashboard", { replace: true });
    } else {
      localStorage.setItem("isLoggedIn", true);
    }
    console.log(isCredValid);
    console.log("Working");
  };

  return (
    <>
      <div className={styles.center_form}>
        <div className="w-full max-w-xs">
          <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            {/*{!isFormValid && (*/}
            {/*  <p className="text-red-500 text-xs italic">{props.message}</p>*/}
            {/*)}*/}

            <p className="text-red-500 text-xs italic">{props.message}</p>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="username"
              >
                Email
              </label>
              <input
                className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                placeholder="Email"
                value={formInput.email}
                onChange={onEmailChangeHandler}
                onBlur={onEmailChangeHandler}
              />
              {!isEmailValid && isEmailTouched && (
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
                onChange={onPasswordChangeHandler}
                onBlur={onPasswordChangeHandler}
                value={formInput.password}
              />
              {/*  border-red-500*/}
              {!isPasswordValid && isPasswordTouched && (
                <p className="text-red-500 text-xs italic">
                  Please choose a password of minimum 8 Length.
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
