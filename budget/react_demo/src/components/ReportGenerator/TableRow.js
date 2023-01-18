import React, { Fragment } from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
    },
    transaction: {
        width: "100%",
        alignItems: "flex-end",
        fontSize: 20,
        left: 10,
    },

});

const TableRow = ({ items }) => {
    const rows = items.map((item) => (
        <View style={styles.row}>
            <Text style={styles.transaction}>{item.name}</Text>
            <Text style={styles.transaction}>{item.price}</Text>
            <Text style={styles.transaction}>{item.currency}</Text>
            <Text style={styles.transaction}>{item.category}</Text>
        </View>
    ));
    return <Fragment>{rows}</Fragment>;
};

export default TableRow;