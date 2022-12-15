import { useState } from "react";
import DateInput from "../NewTransaction/DateInput";

import "./TransactionsFilter.css";

const TransactionsFilter = (props) => {
  const [selectedCategory, setSelectedCategory] = useState(props.categories[0]);

  const dateStartChangeHandler = (event) => {
    props.onChangeDateStartFilter(event.target.value);
  };

  const dateEndChangeHandler = (event) => {
    props.onChangeDateEndFilter(event.target.value);
  };

  const dropdownCategoryChangeHandler = (event) => {
    setSelectedCategory(event.target.value);
    props.onCategoryChangeFilter(JSON.parse(event.target.value));
    console.log(JSON.parse(event.target.value));
  };

  return (
    <div className="transactions-filter">
      <div className="transactions-filter__control">
        <label>Category</label>
        <select
          value={selectedCategory}
          onChange={dropdownCategoryChangeHandler}
        >
          {props.categories.map((category) => (
            <option key={category.id} value={JSON.stringify(category)}>
              {category.name}
            </option>
          ))}
        </select>
        <DateInput
          label="From"
          min="2019-01-01"
          max="2023-12-31"
          enteredDate={props.selectedDateStart}
          dateChangeHandler={dateStartChangeHandler}
        />
        <DateInput
          label="To"
          min="2019-01-01"
          max="2023-12-31"
          dateChangeHandler={dateEndChangeHandler}
        />
      </div>
    </div>
  );
};

export default TransactionsFilter;
