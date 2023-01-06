import { Link } from "react-router-dom";
import classes from "./Register.module.css";

const Login = () => {
  return (
    <div className={classes.body}>
      <div className={classes.main}>
        <Link to={"/register"} className={classes.sign}>Sign up</Link>
        <div className={classes.signup}>
          <form>
            <label className={classes.title}>
              Login
            </label>
            <input type="email" name="email" placeholder="Email" required="" />
            <input
              type="password"
              name="pswd"
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
