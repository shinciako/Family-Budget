import classes from "./Logout.module.css"

const Logout = () => {
    const buttonHandler = () =>{
        localStorage.removeItem("token");
        window.location = "/login";
    }
    return(<button className={classes.logout} onClick={buttonHandler}>Logout</button>)
}

export default Logout;