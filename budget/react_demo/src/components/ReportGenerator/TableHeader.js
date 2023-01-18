import React, { Fragment } from "react";
import { Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
    },
    header: {
        width: "100%",
        fontSize: 20,
        left: 10,
        fontFamily: "Helvetica-Bold",
        lineHeight: 1.1,
    }

});

const TableHeader = ({ items }) => {
    const rows = items.map((item) => (
        <View style={styles.row}>
            <Text style={styles.header}>{item.name}</Text>
            <Text style={styles.header}>{item.price}</Text>
            <Text style={styles.header}>{item.currency}</Text>
            <Text style={styles.header}>{item.category}</Text>
        </View>
    ));
    return <Fragment>{rows}</Fragment>;
};

export default TableHeader;