import React from "react";
import {Page, Document, StyleSheet, Text, Font, View} from "@react-pdf/renderer";
import ItemsTable from "./ItemsTable";
import ItemsTableSum from "./ItemsTableSum";

const styles = StyleSheet.create({
    page: {
        fontSize: 15,
        flexDirection: "column",
    },
    title: {
        fontSize: 35,
        left: 10,
    },
    semi_title: {
        fontSize: 25,
        left: 10,
        lineHeight: 1.5,
    },
    transaction: {
        width: "100%",
        alignItems: "flex-end",
        fontSize: 20,
        left: 10,
    },
});

const Table = ({data, sum}) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <Text style={styles.title}>Budget Report</Text>
            <Text> </Text>
            <Text style={styles.semi_title}>Transactions List:</Text>
            <ItemsTable data={data} />
            <Text> </Text>
            <Text style={styles.semi_title}>Transactions Summary:</Text>
            <ItemsTableSum sum={sum} />
        </Page>
    </Document>
);

export default Table;