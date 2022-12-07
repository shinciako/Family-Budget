import TransactionItem from "./TransactionItem";
import "./TransactionsList.css";

const TransactionsList = (props) => {
  if (props.items.length === 0) {
    return <h2 className="transactions-list__fallback">No transactions found</h2>;
  }

  return (
    <ul className="transactions-list">
      {props.items.map((transaction) => (
        <TransactionItem
          key={transaction.id}
          name={transaction.name}
          amount={transaction.amount}
          category={transaction.category}
          date={transaction.date}
        />
      ))}
    </ul>
  );
};

export default TransactionsList;