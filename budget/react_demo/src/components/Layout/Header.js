import { Fragment } from "react";
import classes from "./Header.module.css";
import budgetImage from "../../assets/familybudget.jpeg";
import Categories from "../Categories/Categories";
const Header = (props) => {
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>FamilyBudget</h1>
        <Categories
          onAddCategory={props.onAddCategory}
          onStartShowingHandler={props.onStartShowingHandler}
        />
      </header>

      <div className={classes["main-image"]}>
        <img src={budgetImage} alt="Gold bars" />
      </div>
    </Fragment>
  );
};

export default Header;
