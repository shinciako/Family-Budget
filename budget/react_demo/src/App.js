import { useState, useEffect } from "react";
import Transactions from "./components/Transactions/Transactions";
import NewTransaction from "./components/NewTransaction/NewTransaction";
import Header from "./components/Layout/Header";
import CategoriesList from "./components/Categories/CategoriesList";
import Report from "./components/ReportGenerator/Report";

const App = () => {
  const [transactions, setTransactions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isShowing, setIsShowing] = useState(false);
  const [currencies, setCurrencies] = useState([]);

  const startShowingHandler = () => {
    if (isShowing === false) setIsShowing(true);
    else setIsShowing(false);
  };

  async function addTransactionHandler(transaction) {
    await fetch("http://localhost:8080/transactions/", {
      method: "POST",
      body: JSON.stringify(transaction),
      headers: {
        "Content-Type": "application/json",
      },
    });
    fetchTransactionsHandler();
  }

  function fetchTransactionsHandler() {
    fetch("http://localhost:8080/transactions/")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const transformedTransactions = data.map((transactionData) => {
          return {
            id: transactionData.id,
            name: transactionData.name,
            price: transactionData.price,
            category: transactionData.category.name,
            currency: transactionData.currency.code,
            date: new Date(transactionData.date),
          };
        });
        setTransactions(transformedTransactions);
      });
  }

  async function updateTransactionsHandler(transaction) {
    await fetch(
      "http://localhost:8080/transactions/" + JSON.stringify(transaction.id),
      {
        method: "PUT",
        body: JSON.stringify(transaction),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    fetchTransactionsHandler();
  }

  async function deleteTransactionsHandler(id) {
    await fetch(
      "http://localhost:8080/transactions/bin/" + JSON.stringify(id),
      {
        method: "DELETE",
      }
    );
    fetchTransactionsHandler();
  }

  async function addCategoryHandler(category) {
    await fetch("http://localhost:8080/categories/", {
      method: "POST",
      body: JSON.stringify(category),
      headers: {
        "Content-Type": "application/json",
      },
    });
    fetchCategoriesHandler();
  }

  function fetchCategoriesHandler() {
    fetch("http://localhost:8080/categories/")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const transformedCategories = data.map((categoryData) => {
          return {
            id: categoryData.id,
            name: categoryData.name,
          };
        });
        setCategories(transformedCategories);
      });
  }

  function fetchCurrenciesHandler() {
    fetch("http://localhost:8080/currencies/")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        const transformedCurrencies = data.map((currencyData) => {
          return {
            id: currencyData.id,
            name: currencyData.name,
            code: currencyData.code,
          };
        });
        setCurrencies(transformedCurrencies);
      });
  }

  async function updateCategoryHandler(category) {
    await fetch(
      "http://localhost:8080/categories/" + JSON.stringify(category.id),
      {
        method: "PUT",
        body: JSON.stringify(category.name),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    fetchTransactionsHandler();
    fetchCategoriesHandler();
    fetchCurrenciesHandler();
  }

  async function deleteCategoryHandler(id) {
    await fetch("http://localhost:8080/categories/bin/" + JSON.stringify(id), {
      method: "DELETE",
    });
    fetchTransactionsHandler();
    fetchCategoriesHandler();
  }

  function generateReport() {

  }

  useEffect(() => {
    fetchTransactionsHandler();
    fetchCategoriesHandler();
    fetchCurrenciesHandler();
  }, []);

  return (
    <div>
      <Header
        onAddCategory={addCategoryHandler}
        onStartShowingHandler={startShowingHandler}
        onGenerateReport={generateReport}
      />
      <Report
        transactions={transactions}
        currencies={currencies}
      />
      <CategoriesList
        isShowing={isShowing}
        categories={categories}
        onUpdateCategoryHandler={updateCategoryHandler}
        onDeleteCategoryHandler={deleteCategoryHandler}
      />
      <NewTransaction
        onAddTransaction={addTransactionHandler}
        categories={categories}
        onAddCategory={addCategoryHandler}
        currencies={currencies}
      />
      <Transactions
        items={transactions}
        categories={categories}
        onUpdateTransactionsHandler={updateTransactionsHandler}
        onDeleteTransactionsHandler={deleteTransactionsHandler}
        currencies={currencies}
      />
    </div>
  );
};

export default App;
