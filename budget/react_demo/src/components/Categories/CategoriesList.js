import { useState } from "react";
import classes from "./CategoriesList.module.css";
import Modal from "../UI/Modal";
import CategoryUpdateForm from "./CategoryUpdateForm";

const CategoriesList = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [currentItem, setCurrentItem] = useState("");

  const showModalHandler = () => {
    setShowModal(true);
  };

  const hideModalHandler = () => {
    setShowModal(false);
  };

  const setCurrentItemHandler = (item) => {
    setCurrentItem(item);
  };

  const updateCategoryDataHandler = (enteredCategoryData) => {
    props.onUpdateCategoryHandler(enteredCategoryData);
    console.log(enteredCategoryData.id);
    hideModalHandler();
  };

  const deleteCategoryDataHandler = () => {
    props.onDeleteCategoryHandler(currentItem.id);
    hideModalHandler();
  };

  return (
    <div>
      {props.isShowing === true && (
        <div className={classes.dropdown}>
          <ul>
            {props.categories.map((item) => (
              <li
                key={item.id}
                onClick={(event) => {
                  showModalHandler(event);
                  setCurrentItemHandler(item);
                }}
              >
                {item.name}
              </li>
            ))}
          </ul>
          {showModal === true && (
            <Modal onClose={hideModalHandler}>
              <div className={classes.actions}>
                <p className={classes["big-title"]}>{currentItem.name}</p>
                <CategoryUpdateForm
                  onUpdateCategoryDataHandler={updateCategoryDataHandler}
                  currentItem={currentItem}
                />
                <button
                  className={classes["button--alt"]}
                  onClick={hideModalHandler}
                >
                  Close
                </button>
                <button
                  type="button"
                  className={classes.button}
                  onClick={deleteCategoryDataHandler}
                >
                  Delete
                </button>
              </div>
            </Modal>
          )}
        </div>
      )}
    </div>
  );
};

export default CategoriesList;
