import { Fragment } from "react";
import classes from "./Header.module.css";
import budgetImage from "../../assets/familybudget.jpeg";
import Categories from "../Categories/Categories";
import GenerateReport from "../ReportGenerator/GenerateReport";
import ShareButton from "../Share/ShareButton";
const Header = (props) => {
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>Family Budget</h1>
        <Categories
          onAddCategory={props.onAddCategory}
          onStartShowingHandler={props.onStartShowingHandler}
        />
        <GenerateReport
            onGenerateReport={props.onGenerateReport}
        />
        <ShareButton
            onShareButton={props.onShareButton}
        />
      </header>
      <div className={classes["main-image"]}>
        <img src={budgetImage} alt="Gold bars" />
      </div>
    </Fragment>
  );
};

export default Header;
