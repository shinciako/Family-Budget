import { Link } from "react-router-dom";
import classes from "./Register.module.css";

const Register = () => {
  return (
    <div className={classes.body}>
      <div className={classes.main}>
      <Link to={"/login"} className={classes.sign}>Login</Link>
        <div className={classes.signup}>
          <form>
            <label className={classes.title}>
              Sign up
            </label>
            <input type="text" name="txt" placeholder="User name" required="" />
            <input type="email" name="email" placeholder="Email" required="" />
            <input
              type="password"
              name="pswd"
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
