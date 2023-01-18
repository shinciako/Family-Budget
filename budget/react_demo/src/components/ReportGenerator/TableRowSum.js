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
    transaction_small: {
        width: "100%",
        alignItems: "flex-end",
        fontSize: 15,
        left: 10,
    },

});

const TableRowSum = ({ items }) => {
    let categoryRow =
        items.map((category) => (
            <View style={styles.row}>
                <Text style={styles.transaction}>{category.name}</Text>
                <Text style={styles.transaction_small}>{category.currency0}</Text>
                <Text style={styles.transaction_small}>{category.currency1}</Text>
                <Text style={styles.transaction_small}>{category.currency2}</Text>
                <Text style={styles.transaction_small}>{category.currency3}</Text>
            </View>
        ))
    return <Fragment>{categoryRow}</Fragment>
};

export default TableRowSum;