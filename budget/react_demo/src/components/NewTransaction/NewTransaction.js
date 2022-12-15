import { useState } from "react";

import TransactionForm from "./TransactionForm";
import CategoryForm from "./CategoryForm";
import "./NewTransaction.css";

const NewTransaction = (props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isCategoryEditing, setIsCategoryEditing] = useState(false);

  const dummyInput = {
    name: "",
    price: 0,
    date: new Date(),
    category: props.categories[2],
  };

  const saveTransactionDataHandler = (enteredTransactionData) => {
    props.onAddTransaction(enteredTransactionData);
    console.log(enteredTransactionData);
    setIsEditing(false);
  };

  const saveCategoryDataHandler = (enteredCategoryData) => {
    props.onAddCategory(enteredCategoryData);
    console.log(enteredCategoryData);
    setIsCategoryEditing(false);
  };

  const startEditingHandler = () => {
    setIsEditing(true);
  };

  const stopEditingHandler = () => {
    setIsEditing(false);
  };

  const startCategoryEditingHandler = () => {
    setIsCategoryEditing(true);
  };

  const stopCategoryEditingHandler = () => {
    setIsCategoryEditing(false);
  };

  return (
    <div className="new-transaction">
      {!isEditing && !isCategoryEditing && (
        <button onClick={startEditingHandler}>Add new transaction</button>
      )}
      {!isEditing && !isCategoryEditing && (
        <button onClick={startCategoryEditingHandler}>Add new Category</button>
      )}
      {isEditing && (
        <TransactionForm
          buttonName="Add transaction"
          onSaveTransactionData={saveTransactionDataHandler}
          onCancel={stopEditingHandler}
          categories={props.categories}
          prev={dummyInput}
        />
      )}
      {isCategoryEditing && (
        <CategoryForm
          onSaveCategoryData={saveCategoryDataHandler}
          onCancel={stopCategoryEditingHandler}
        />
      )}
    </div>
  );
};

export default NewTransaction;
