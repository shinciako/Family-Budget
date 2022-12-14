import { useState } from "react";

import TransactionForm from "./TransactionForm";
import CategoryForm from "./CategoryForm";
import "./NewTransaction.css";

const NewTransaction = (props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isCategoryEditing, setIsCategoryEditing] = useState(false);

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
          onSaveTransactionData={saveTransactionDataHandler}
          onCancel={stopEditingHandler}
          categories={props.categories}
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
