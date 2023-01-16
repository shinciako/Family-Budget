import React from "react";
import { View, StyleSheet, Text } from "@react-pdf/renderer";
import TableRowSum from "./TableRowSum";
import Table from "./Table";

const styles = StyleSheet.create({
    tableContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
    },
});

const ItemsTableSum = ({ sum }) => (
    <View style={styles.tableContainer}>
        <TableRowSum items={sum.items}/>
    </View>
);

export default ItemsTableSum;