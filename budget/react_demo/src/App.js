import { useState, useEffect } from "react";
import Transactions from "./components/Transactions/Transactions";
import NewTransaction from "./components/NewTransaction/NewTransaction";
import Header from './components/Layout/Header'

const App = () => {
  const [transactions, setTransactions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [currencies, setCurrencies] = useState([]);

  function fetchTransactionsHandler() {
    fetch("http://localhost:8080/transactions/")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        const transformedTransactions = data.map((transactionData) => {
          return {
            id: transactionData.id,
            name: transactionData.name,
            amount: transactionData.price,
            category: transactionData.category.name,
            currency: transactionData.currency.code,
            date: new Date(transactionData.date),
          };
        });
        setTransactions(transformedTransactions);
      });
  }

  function fetchCategoriesHandler() {
    fetch("http://localhost:8080/categories/")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        const transformedCategories = data.map((categoryData) => {
            return {
              id: categoryData.id,
              name: categoryData.name
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
              name: currencyData.name
            };
          });
          setCurrencies(transformedCurrencies);
        });
  }

  useEffect(() => {
    fetchTransactionsHandler();
    fetchCategoriesHandler();
    fetchCurrenciesHandler();
  }, []);

  async function addTransactionHandler(transaction) {
    const response = await fetch("http://localhost:8080/transactions/", {
      method: "POST",
      body: JSON.stringify(transaction),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    fetchTransactionsHandler();
    console.log(data);
  }



  return (
    <div>
      <Header>
        
      </Header>
      <NewTransaction onAddTransaction={addTransactionHandler} categories={categories} currencies={currencies}/>
      <Transactions items={transactions} categories={categories} currencies={currencies}/>
    </div>
  );
};

export default App;
