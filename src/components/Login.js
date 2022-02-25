import styles from "./Login.module.css";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Styles from "./Styles";

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
          <form className={Styles.form}>
            {!isValidCred && (
              <p className={Styles.error}>Incorrect Email Password</p>
            )}
            <div className="mb-4">
              <label className={Styles.email_label} htmlFor="email">
                Email
              </label>
              <input
                className={Styles.email_input}
                id="email"
                type="text"
                placeholder="Email"
                ref={emailInputRef}
              />
              {!formInputValidity.email && (
                <p className={Styles.error}>
                  Please enter valid Email Address.
                </p>
              )}
            </div>
            <div className="mb-6">
              <label className={Styles.password_label} htmlFor="password">
                Password
              </label>
              <input
                className={Styles.password_input}
                id="password"
                type="password"
                placeholder="******************"
                ref={passwordInputRef}
              />
              {!formInputValidity.password && (
                <p className={Styles.error}>
                  Please enter valid Password of 8 Characters or more.
                </p>
              )}
            </div>
            <div className={Styles.button_div}>
              <button
                className={Styles.button}
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
