import React from 'react';
import {PDFViewer} from "@react-pdf/renderer";
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import Table from "./Table";

const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
        backgroundColor: '#E4E4E4'
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1
    },
    title: {
        fontSize: 25,
    },
    headers: {
        fontSize:20
    },
    transactions: {
        fontSize: 15
    }
});

const Report = (props) => (

    <PDFViewer>
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.section}>
                    <Text style={styles.title}>Budget Report</Text>
                    <Text> </Text>
                    <Text style={styles.headers}>Transactions:</Text>
                    <Text> </Text>
                    <ul>
                        {props.transactions.map((transaction) => (
                            <li>
                                <Text style={styles.transactions}>
                                    {transaction.name} {transaction.price} {transaction.currency} {transaction.category}
                                </Text>
                            </li>
                        ))}
                    </ul>
                    <Text> </Text>
                    <Text style={styles.headers}>Total amount: </Text>
                    <Text> </Text>
                    <Text style={styles.transactions}>{sum(props.transactions, props.currencies)}</Text>
                    <Text> </Text>
                    <Table data={data} />
                </View>
            </Page>
        </Document>
    </PDFViewer>
);

const data = {
    id: "5df3180a09ea16dc4b95f910",
    items: [
        {
            sr: 1,
            desc: "desc1",
            xyz: 5,
        },
        {
            sr: 2,
            desc: "desc2",
            xyz: 6,
        },
    ],
};

function createTransactionData(transactions) {
    let transactionData = null;

}

function sum(transactions, currencies)
{
    let totalAmount = "";
    let currencyAmount = 0;
    currencies.forEach((currency) => {
        transactions.forEach((transaction) => {
            if(transaction.currency === currency.code)
            {
                currencyAmount += transaction.price
            }
        })
        totalAmount += currencyAmount + " " + currency.code + "\n"
        currencyAmount = 0
    })

    return totalAmount;
}
export default Report;