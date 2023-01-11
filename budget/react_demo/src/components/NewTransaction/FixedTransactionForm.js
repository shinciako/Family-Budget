import { useState } from "react";
import DateInput from "./DateInput";

const FixedTransactionForm = (props) => {
  const [enteredName, setEnteredName] = useState(props.prev.name);
  const [enteredPrice, setEnteredPrice] = useState(props.prev.price);
  const [selectedCategory, setSelectedCategory] = useState(props.prev.category);
  const [enteredCategory, setEnteredCategory] = useState(props.categories[0]);
  const [selectedCurrency, setSelectedCurrency] = useState();
  const [enteredCurrency, setEnteredCurrency] = useState(props.currencies[0]);
  const [enteredFromDate, setEnteredFromDate] = useState(props.prev.date);
  const [enteredToDate, setEnteredToDate] = useState(props.prev.date);
  const [enteredDays, setEnteredDays] = useState(1);

  const nameChangeHandler = (event) => {
    setEnteredName(event.target.value);
  };

  const priceChangeHandler = (event) => {
    setEnteredPrice(event.target.value);
  };

  const dateFromChangeHandler = (event) => {
    setEnteredFromDate(event.target.value);
  };

  const dateToChangeHandler = (event) => {
    setEnteredToDate(event.target.value);
  };

  const daysChangeHandler = (event) => {
    setEnteredDays(event.target.value);
  };

  const categoryChangeHandler = (event) => {
    setSelectedCategory(event.target.value);
    setEnteredCategory(JSON.parse(event.target.value));
  };

  const currencyChangeHandler = (event) => {
    setSelectedCurrency(event.target.value);
    setEnteredCurrency(JSON.parse(event.target.value));
    console.log("event " + event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const transactionData = {
      name: enteredName,
      price: +enteredPrice,
      category: enteredCategory,
      currency: enteredCurrency,
    };
    const transactionDateData = {
      fromDate: new Date(enteredFromDate),
      toDate: new Date(enteredToDate),
      days: enteredDays,
    };
    // props.onSaveTransactionDateData(transactionDateData);
    props.onSaveTransactionData(transactionData, transactionDateData);
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
            step="0.01"
            value={enteredPrice}
            onChange={priceChangeHandler}
          />
        </div>
        <div className="new-transaction__control_up">
          <div className="new-transaction__control">
            <label>Category</label>
            <select value={selectedCategory} onChange={categoryChangeHandler}>
              {props.categories.map((category) => (
                <option key={category.id} value={JSON.stringify(category)}>
                  {category.name}
                </option>
              ))}
            </select>
            <label>Currency</label>
            <select value={selectedCurrency} onChange={currencyChangeHandler}>
              {props.currencies.map((currency) => (
                <option key={currency.id} value={JSON.stringify(currency)}>
                  {currency.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className="new-transaction__control">
        <DateInput
          label="From"
          min="2019-01-01"
          max="2023-12-31"
          enteredDate={enteredFromDate}
          dateChangeHandler={dateFromChangeHandler}
        />
      </div>
      <div className="new-transaction__control">
        <DateInput
          label="To"
          min="2019-01-01"
          max="2023-12-31"
          enteredDate={enteredToDate}
          dateChangeHandler={dateToChangeHandler}
        />
      </div>
      <br />
      <div className="new-transaction__control">
        <label>Transaction's frequency in days</label>
        <input
          type="number"
          min="0"
          step="1"
          value={enteredDays}
          onChange={daysChangeHandler}
        />
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

export default FixedTransactionForm;
