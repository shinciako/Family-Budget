import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import classes from "./Register.module.css";

const Register = () => {
  const [enteredUsername, setEnteredUsername] = useState("");
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");

  async function registerUser(registerCredentials) {
    try{
    await fetch("http://localhost:8080/registration", {
      method: "POST",
      body: JSON.stringify(registerCredentials),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (response.ok) {
        window.location = `/login?registered=${true}`;
      }
    })} catch(error){
      window.location = `/login?registered=${false}`;
    }
  }

  function checkLog() {
    fetch("http://localhost:8080/user", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((response) => {
      if (response.ok) {
        window.location = "/";
      }
    });
  }

  useEffect(() => {
    let token = localStorage.getItem("token");
    console.log(token);
    if(token!==undefined && token!==null)
      checkLog(token);
  }, []);

  const usernameChangeHandler = (event) => {
    setEnteredUsername(event.target.value);
  };

  const emailChangeHandler = (event) => {
    setEnteredEmail(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const registerData = {
      username: enteredUsername,
      email: enteredEmail,
      password: enteredPassword,
    };
    registerUser(registerData);
  };

  return (
    <div className={classes.body}>
      <div className={classes.main}>
        <Link to={"/login"} className={classes.sign}>
          Login
        </Link>
        <div className={classes.signup}>
          <form onSubmit={submitHandler}>
            <label className={classes.title}>Register</label>
            <input
              type="username"
              value={enteredUsername}
              onChange={usernameChangeHandler}
              placeholder="Username"
              required=""
            />
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
            <button>Sign up</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
