import { useState } from "react";
import "./TransactionForm.css";

const CategoryForm = (props) => {
  const [enteredName, setEnteredName] = useState("");

  const nameChangeHandler = (event) => {
    setEnteredName(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const categoryData = {
      name: enteredName,
    };
    props.onSaveCategoryData(categoryData);
    setEnteredName("");
  };

  return (
    <form onSubmit={submitHandler}>
      <div>
        <div>
          <label>Name</label>
          <input type="text" value={enteredName} onChange={nameChangeHandler} />
        </div>
      </div>
      <div>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button type="submit">Add Category</button>
      </div>
    </form>
  );
};

export default CategoryForm;
