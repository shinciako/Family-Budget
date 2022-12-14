import {useState} from 'react';

import TransactionForm from "./TransactionForm";
import "./NewTransaction.css";

const NewTransaction = (props) => {
  const [isEditing, setIsEditing] = useState(false);

  const saveTransactionDataHandler = (enteredTransactionData) => {
    props.onAddTransaction(enteredTransactionData);
    console.log(enteredTransactionData);
    setIsEditing(false);
  };

  const startEditingHandler = () =>{
    setIsEditing(true);
  }

  const stopEditingHandler = () =>{
    setIsEditing(false);
  }

  return (
    <div className="new-transaction">
      {!isEditing && <button onClick={startEditingHandler}>Add new transaction</button>}
      {isEditing && <TransactionForm onSaveTransactionData={saveTransactionDataHandler} onCancel={stopEditingHandler} categories={props.categories} currencies={props.currencies}/>}
    </div>
  );
};

export default NewTransaction;
