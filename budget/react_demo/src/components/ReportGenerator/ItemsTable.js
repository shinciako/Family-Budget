import React from "react";
import { View, StyleSheet } from "@react-pdf/renderer";
import TableRow from "./TableRow";
import TableHeader from "./TableHeader";

const styles = StyleSheet.create({
    tableContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
    },
});

const ItemsTable = ({ data }) => (
    <View style={styles.tableContainer}>
        <TableHeader items={headersData.items}/>
        <TableRow items={data.items}/>
    </View>
);

const headersData = {
    items: [
        {
            name: "Name",
            price: "Price",
            currency: "Currency",
            category: "Category",
        }
    ]
}

export default ItemsTable;