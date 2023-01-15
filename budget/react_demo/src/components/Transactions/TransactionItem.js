import "./TransactionItem.css";
import TransactionDate from "./TransactionDate";
import Card from "../UI/Card";

const TransactionItem = (props) => {
  return (
    <li onClick={props.onClick}>
      <Card className="transaction-item">
        <TransactionDate date={props.date} />
        <div className="transaction-item__description">
          <h2>{props.name}</h2>
          <div className="transaction-item__category">{props.category}</div>
          <div className="transaction-item__price">{props.price} {props.currency}</div>
        </div>
      </Card>
    </li>
  );
};

export default TransactionItem;
