import classes from "./Categories.module.css";

const Categories = (props) => {
  return (
    <div className={classes.container}>
      <button
        onClick={props.onStartShowingHandler}
        type="button"
        className={classes["category-button"]}
      >
        Categories
      </button>
    </div>
  );
};

export default Categories;
