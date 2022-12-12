import { useState } from "react";

import TransactionsFilter from "./TransactionsFilter";
import Card from "../UI/Card";
import TransactionsList from "./TransactionsList";
import "./Transactions.css";

const Transactions = (props) => {
  const [dateStart, setDateStart] = useState("");
  const [dateEnd, setDateEnd] = useState("");
  const [filteredCategory, setFilteredCategory] = useState({id: 0, name: "All"});

  const options = [{id: 0, name: "All"},...props.categories]

  const dateStartChangeHandler = (selectedStart) => {
    setDateStart(selectedStart);
  };

  const dateEndChangeHandler = (selectedEnd) => {
    setDateEnd(selectedEnd);
  };

  const filterCategoryChangeHandler = (selectedCategory) => {
    setFilteredCategory(selectedCategory);
  };

  const dateFilter = (date) =>{
    if(dateStart==="" && dateEnd==="") return date
    if(dateEnd==="") return (date >=new Date(dateStart));
    if(dateStart==="") return (date <=new Date(dateEnd));
    return (date >=new Date(dateStart) && date<=new Date(dateEnd));

  }

  const filteredTransactions = props.items.filter((transaction) => {
    if (filteredCategory.name === "All")
      return(dateFilter(transaction.date));
    return (
      dateFilter(transaction.date) &&
      transaction.category === filteredCategory?.name
    );
  });

  return (
    <div>
      <Card className="transaction">
        <TransactionsFilter
          selectedDateStart={dateStart}
          selectedCategory={filteredCategory}
          onChangeDateStartFilter={dateStartChangeHandler}
          onChangeDateEndFilter={dateEndChangeHandler}
          onCategoryChangeFilter={filterCategoryChangeHandler}
          categories={options}
        />
        <TransactionsList items={filteredTransactions} />
      </Card>
    </div>
  );
};

export default Transactions;
