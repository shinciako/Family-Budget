import React from 'react';
import {PDFViewer, StyleSheet} from "@react-pdf/renderer";
import Table from "./Table";

const styles = StyleSheet.create({
    viewer: {
        width: window.innerWidth,
        height: window.innerHeight,
    }
});

const Report = (props) => (

    <PDFViewer style={styles.viewer}>
        <Table data={createTransactionData(props.transactions)}
               sum={createTransactionSumData(props.transactions, props.currencies, props.categories)}></Table>
    </PDFViewer>
);

function createTransactionData(transactions) {
    let transactionData = {
        items: []
    };
    transactions.forEach((transaction) => {
        let _transactionData;
        _transactionData = {
            name: transaction.name,
            price: transaction.price,
            currency: transaction.currency,
            category: transaction.category,
        }
        transactionData.items.push(_transactionData)
    })

    return transactionData;
}

function createTransactionSumData(transactions, currencies, categories) {
    let transactionSumData = {
        items: []
    };
    categories.forEach((category) => {
        let _categoryData = {
            name: category.name
        };
        let currencyIdx = 0;
        currencies.forEach((currency) => {
            let currencySum = 0;
            transactions.forEach((transaction) => {
                if(transaction.currency === currency.code && transaction.category === category.name)
                {
                    currencySum += transaction.price
                }
            })
            _categoryData[`currency${currencyIdx}`] = currencySum + " " + currency.code;
            currencyIdx ++;
        })
        transactionSumData.items.push(_categoryData);
    })
    return transactionSumData;
}

export default Report;