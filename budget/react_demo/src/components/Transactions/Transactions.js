import { useState } from "react";

import TransactionsFilter from "./TransactionsFilter";
import Card from "../UI/Card";
import TransactionsList from "./TransactionsList";
import "./Transactions.css";

const Transactions = (props) => {
  const [filteredYear, setFilteredYear] = useState("2022");
  const [filteredCategory, setFilteredCategory] = useState({id: 0, name: "All"});

  const options = [{id: 0, name: "All"},...props.categories]

  const filterChangeHandler = (selectedYear) => {
    setFilteredYear(selectedYear);
  };

  const filterCategoryChangeHandler = (selectedCategory) => {
    setFilteredCategory(selectedCategory);
  };

  const filteredTransactions = props.items.filter((transaction) => {
    // console.log("filtered1 "+ transaction.category);
    // console.log("filtered2 "+ filteredCategory?.name);
    if (filteredCategory.name === "All")
      return(transaction.date.getFullYear().toString() === filteredYear)
    return (
      transaction.date.getFullYear().toString() === filteredYear &&
      transaction.category === filteredCategory?.name
    );
  });

  return (
    <div>
      <Card className="transaction">
        <TransactionsFilter
          selected={filteredYear}
          selectedCategory={filteredCategory}
          onChangeFilter={filterChangeHandler}
          onCategoryChangeFilter={filterCategoryChangeHandler}
          categories={options}
        />
        <TransactionsList items={filteredTransactions} />
      </Card>
    </div>
  );
};

export default Transactions;
