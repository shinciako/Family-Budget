import { Fragment } from "react";
import classes from "./Header.module.css";
import budgetImage from "../../assets/familybudget.jpeg";
import Categories from "../Categories/Categories";
import Logout from "../../Login/Logout";
import FixedTransaction from "../NewTransaction/FixedTransaction";
import Reflink from "../Reflink/Reflink";

const Header = (props) => {
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>Family Budget</h1>
        <Reflink/>
        <FixedTransaction
          categories={props.categories}
          currencies={props.currencies}
          onAddTransaction={props.onAddTransaction}
        />
        <Categories
          onAddCategory={props.onAddCategory}
          onStartShowingHandler={props.onStartShowingHandler}
        />
        <Logout />
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
