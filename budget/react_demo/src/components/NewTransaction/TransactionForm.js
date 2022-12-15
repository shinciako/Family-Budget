import { useState } from "react";
import DateInput from "./DateInput";
import "./TransactionForm.css";

const TransactionForm = (props) => {
  const [enteredName, setEnteredName] = useState(props.prev.name);
  const [enteredPrice, setEnteredPrice] = useState(props.prev.price);
  const [enteredDate, setEnteredDate] = useState(props.prev.date);
  const [selectedCategory, setSelectedCategory] = useState(props.prev.category);
  const [enteredCategory, setEnteredCategory] = useState(props.categories[0]);

  const nameChangeHandler = (event) => {
    setEnteredName(event.target.value);
  };

  const priceChangeHandler = (event) => {
    setEnteredPrice(event.target.value);
  };

  const dateChangeHandler = (event) => {
    setEnteredDate(event.target.value);
  };

  const categoryChangeHandler = (event) => {
    setSelectedCategory(event.target.value);
    setEnteredCategory(JSON.parse(event.target.value));
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const transactionData = {
      name: enteredName,
      price: +enteredPrice,
      date: new Date(enteredDate),
      category: enteredCategory,
    };
    props.onSaveTransactionData(transactionData);
    setEnteredName("");
    setEnteredPrice("");
    setEnteredDate("");
  };

  return (
    <form onSubmit={submitHandler}>
      <div className="new-transaction__controls">
        <div className="new-transaction__control">
          <label>Name</label>
          <input type="text" value={enteredName} onChange={nameChangeHandler} />
        </div>
        <div className="new-transaction__control">
          <label>Price</label>
          <input
            type="number"
            min="0.01"
            step="0.01"
            value={enteredPrice}
            onChange={priceChangeHandler}
          />
        </div>
        <div className="new-transaction__control">
          <DateInput
            label="Date"
            min="2019-01-01"
            max="2023-12-31"
            enteredDate={enteredDate}
            dateChangeHandler={dateChangeHandler}
          />
        </div>
        <div className="new-transaction__control">
          <label>Category</label>
          <select value={selectedCategory} onChange={categoryChangeHandler}>
            {props.categories.map((category) => (
              <option key={category.id} value={JSON.stringify(category)}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="new-transaction__actions">
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button type="submit">{props.buttonName}</button>
      </div>
    </form>
  );
};

export default TransactionForm;
