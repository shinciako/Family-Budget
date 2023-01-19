import { useState, useEffect } from "react";
import Transactions from "../components/Transactions/Transactions";
import NewTransaction from "../components/NewTransaction/NewTransaction";
import Header from "../components/Layout/Header";
import CategoriesList from "../components/Categories/CategoriesList";
import Calendar from 'color-calendar';
import 'color-calendar/dist/css/theme-basic.css';
import 'color-calendar/dist/css/theme-glass.css';
import Report from "../components/ReportGenerator/Report";
import ReactDOM from 'react-dom';


const Home = () => {
  const [transactions, setTransactions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isShowing, setIsShowing] = useState(false);
  const [currencies, setCurrencies] = useState([]);

  let token = localStorage.getItem("token");

  const startShowingHandler = () => {
    if (isShowing === false) setIsShowing(true);
    else setIsShowing(false);
  };

  async function addTransactionHandler(transaction) {
    await fetch("http://localhost:8080/transactions/new", {
      method: "POST",
      body: JSON.stringify(transaction),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    fetchTransactionsHandler(token);
  }

  function fetchTransactionsHandler(token) {
    fetch("http://localhost:8080/transactions/", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
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
          Authorization: `Bearer ${token}`,
        },
      }
    );
    fetchTransactionsHandler(token);
  }

  async function deleteTransactionsHandler(id) {
    await fetch(
      "http://localhost:8080/transactions/bin/" + JSON.stringify(id),
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    fetchTransactionsHandler(token);
  }

  async function addCategoryHandler(category) {
    await fetch("http://localhost:8080/categories/new", {
      method: "POST",
      body: JSON.stringify(category),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    fetchCategoriesHandler(token);
  }

  function fetchCategoriesHandler(token) {
    fetch("http://localhost:8080/categories/", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
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
        body: JSON.stringify(category),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    fetchTransactionsHandler(token);
    fetchCategoriesHandler(token);
    fetchCurrenciesHandler();
  }

  async function deleteCategoryHandler(id) {
    await fetch("http://localhost:8080/categories/bin/" + JSON.stringify(id), {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    fetchTransactionsHandler(token);
    fetchCategoriesHandler(token);
  }
  new Calendar({
    id: '#color-calendar'
  });
  function generateReport() {
    ReactDOM.render(<ReportDoc />, document.getElementById('root'));
  }

  const ReportDoc = () => (
      <Report
          transactions={transactions}
          currencies={currencies}
          categories={categories}
      />
  );

  function shareButtonHandler() {
    if (navigator.share) {
      navigator.share({
        title: 'Family Budget',
        url: 'http://localhost:3000/'
      }).then(() => {
        console.log('Thanks for sharing!');
      })
          .catch(console.error);
    } else {
      window.alert("Your browser is not supported..")
    }

  }

  useEffect(() => {
    fetchTransactionsHandler(token);
    fetchCategoriesHandler(token);
    fetchCurrenciesHandler();
  }, [token]);


  return (
    <div>
      <Header
        onAddTransaction={addTransactionHandler}
        onAddCategory={addCategoryHandler}
        onStartShowingHandler={startShowingHandler}
        categories={categories}
        currencies={currencies}
        onGenerateReport={generateReport}
        onShareButton={shareButtonHandler}
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
      <div id="color-calendar"></div>
    </div>
  );
};

export default Home;
