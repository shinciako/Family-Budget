import { useState } from "react";
import classes from "./CategoryUpdateForm.module.css";

const CategoryUpdateForm = (props) => {
  const [enteredName, setEnteredName] = useState(props.currentItem.name);

  const nameChangeHandler = (event) => {
    setEnteredName(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onUpdateCategoryDataHandler({
      id: props.currentItem.id,
      name: enteredName,
    });
    setEnteredName("");
  };

  return (
    <form onSubmit={submitHandler} className={classes["form-cat"]}>
      <div>
        <div>
          <label>Name: </label>
          <input type="text" value={enteredName} onChange={nameChangeHandler} />
        </div>
      </div>
      <div>
        <button type="submit">UpdateCategory</button>
      </div>
    </form>
  );
};
export default CategoryUpdateForm;
