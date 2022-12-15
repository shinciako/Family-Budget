import { useState } from "react";
import TransactionItem from "./TransactionItem";
import Modal from "../UI/Modal";
import classes from "./TransactionsList.module.css";
import TransactionForm from "../NewTransaction/TransactionForm";

const TransactionsList = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [currentItem, setCurrentItem] = useState();

  const showModalHandler = () => {
    setShowModal(true);
  };

  const hideModalHandler = () => {
    setShowModal(false);
  };

  const setCurrentItemHandler = (item) => {
    setCurrentItem(item);
  };

  const updateTransactionDataHandler = (enteredTransactionData) => {
    enteredTransactionData.id = currentItem.id;
    props.onUpdateTransactionHandler(enteredTransactionData);
    console.log(enteredTransactionData);
    hideModalHandler();
  };

  const deleteTransactionsDataHandler = () => {
    props.onDeleteTransactionsHandler(currentItem.id);
    hideModalHandler();
  };

  if (props.items.length === 0) {
    return (
      <h2 className={classes["transactions-list__fallback"]}>
        No transactions found
      </h2>
    );
  }

  return (
    <div>
      <ul className={classes["transactions-list"]}>
        {props.items.map((transaction) => (
          <TransactionItem
            key={transaction.id}
            name={transaction.name}
            price={transaction.price}
            category={transaction.category}
            date={transaction.date}
            currency={transaction.currency}
            onClick={(event) => {
              showModalHandler(event);
              setCurrentItemHandler(transaction);
            }}
          />
        ))}
      </ul>
      {showModal === true && (
        <Modal onClose={hideModalHandler}>
          <p className={classes["transaction-title"]}>{currentItem.name}</p>
          <TransactionForm
            buttonName="Update transaction"
            onSaveTransactionData={updateTransactionDataHandler}
            onCancel={hideModalHandler}
            categories={props.categories}
            prev={currentItem}
            currencies={props.currencies}
          ></TransactionForm>
          <button
            className={classes["button--close"]}
            onClick={deleteTransactionsDataHandler}
          >
            Delete
          </button>
        </Modal>
      )}
    </div>
  );
};

export default TransactionsList;
