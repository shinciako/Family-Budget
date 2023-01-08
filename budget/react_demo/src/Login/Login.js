import { Link, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import classes from "./Register.module.css";
import Card from "../components/UI/Card";

const Login = () => {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [searchParams] = useSearchParams();

  const isRegistered = searchParams.get("registered");

  useEffect(() => {
    let token = localStorage.getItem("token");
    console.log(token);
    if (token !== undefined && token !== null) checkLog(token);
  }, []);

  function checkLog(token) {
    fetch("http://localhost:8080/user", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      if (response.ok) {
        window.location = "/";
      } else localStorage.removeItem("token");
    });
  }

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
          console.log(json.token);
          localStorage.setItem("token", json.token);
          console.log(localStorage.getItem("token"));
        });
        window.location = "/";
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
        {isRegistered === "true" && (
          <Card className={classes["register-success"]}>
            <p>Registered successfully!</p>
          </Card>
        )}
        {isRegistered === "false" && (
          <Card className={classes["register-fail"]}>
            <p>Server is offline</p>
          </Card>
        )}
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
