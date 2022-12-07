import { useState } from "react";

import "./TransactionsFilter.css";

const TransactionsFilter = (props) => {
  const [selectedCategory, setSelectedCategory] = useState(props.categories[0]);

  const dropdownChangeHandler = (event) => {
    props.onChangeFilter(event.target.value);
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
          <select value={selectedCategory} onChange={dropdownCategoryChangeHandler}>
            {props.categories.map((category) => (
              <option key={category.id} value={JSON.stringify(category)}>
                {category.name}
              </option>
            ))}
          </select>
        <label>Filter by year</label>
        <select value={props.selected} onChange={dropdownChangeHandler}>
          <option value="2023">2023</option>
          <option value="2022">2022</option>
          <option value="2021">2021</option>
          <option value="2020">2020</option>
          <option value="2019">2019</option>
        </select>
      </div>
    </div>
  );
};

export default TransactionsFilter;
