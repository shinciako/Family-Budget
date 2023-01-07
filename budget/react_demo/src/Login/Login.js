import { Link } from "react-router-dom";
import { useState } from "react";
import classes from "./Register.module.css";

const Login = () => {
  const [enteredEmail, setEnteredEmail] = useState();
  const [enteredPassword, setEnteredPassword] = useState();

  async function login(loginCredentials) {
    await fetch("http://localhost:8080/login", {
      method: "POST",
      body: JSON.stringify(loginCredentials),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (response.ok) {
        response.json().then((json) => {
          console.log(json);
        });
        window.location = '/';
      }
    });
  }
  const emailChangeHandler = (event) => {
    setEnteredEmail(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const loginData = {
      email: enteredEmail,
      password: enteredPassword,
    };
    login(loginData);
  };

  return (
    <div className={classes.body}>
      <div className={classes.main}>
        <Link to={"/register"} className={classes.sign}>
          Sign up
        </Link>
        <div className={classes.signup}>
          <form onSubmit={submitHandler}>
            <label className={classes.title}>Login</label>
            <input
              type="email"
              value={enteredEmail}
              onChange={emailChangeHandler}
              placeholder="Email"
              required=""
            />
            <input
              type="password"
              value={enteredPassword}
              onChange={passwordChangeHandler}
              placeholder="Password"
              required=""
            />
            <button>Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
