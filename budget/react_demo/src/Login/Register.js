import { Link } from "react-router-dom";
import classes from "./Register.module.css";

const Register = () => {

  const submitHandler = (event) => {
    event.preventDefault();
  };

  return (
    <div className={classes.body}>
      <div className={classes.main}>
      <Link to={"/login"} className={classes.sign}>Login</Link>
        <div className={classes.signup}>
          <form onSubmit={submitHandler}>
            <label className={classes.title}>
              Sign up
            </label>
            <input type="text" placeholder="User name" required="" />
            <input type="email" placeholder="Email" required="" />
            <input
              type="password"
              placeholder="Password"
              required=""
            />
            <button type="submit">Sign up</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
