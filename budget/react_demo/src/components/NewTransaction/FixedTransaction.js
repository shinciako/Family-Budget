import { useState } from "react";
import classes from "./FixedTransaction.module.css";
import FixedTransactionForm from "./FixedTransactionForm";
import Modal from "../UI/Modal";

const FixedTransaction = (props) => {
  const [showModal, setShowModal] = useState(false);

  const showModalHandler = () => {
    setShowModal(true);
  };

  const hideModalHandler = () => {
    setShowModal(false);
  };

  const addDays = (date, days) => {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  };

  const addFixedTransactionDataHandler = (
    enteredTransactionData,
    enteredTransactionDate
  ) => {
    let fromDate = enteredTransactionDate.fromDate;
    const toDate = enteredTransactionDate.toDate;
    const days = parseInt(enteredTransactionDate.days);
    do {
      enteredTransactionData["date"] = fromDate;
      props.onAddTransaction(enteredTransactionData);
      fromDate = addDays(fromDate, days);
    } while (fromDate < toDate);
    hideModalHandler();
  };

  const dummyInput = {
    name: "",
    price: 0,
    date: new Date(),
    category: props.categories[2],
  };

  return (
    <div className={classes.container}>
      <button
        onClick={showModalHandler}
        type="button"
        className={classes["category-button"]}
      >
        Add fixed transaction
      </button>
      {showModal === true && (
        <Modal onClose={hideModalHandler}>
          <div className={classes.actions}>
            <FixedTransactionForm
              buttonName="Add transactions"
              onCancel={hideModalHandler}
              onSaveTransactionData={addFixedTransactionDataHandler}
              categories={props.categories}
              currencies={props.currencies}
              prev={dummyInput}
            />
          </div>
        </Modal>
      )}
    </div>
  );
};

export default FixedTransaction;
