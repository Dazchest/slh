import React from "react";

import {Table} from "./Table";

const testData = [
    {item: "Wheat", qty: 145, error: "yes"},
    {item: "Bronze", qty: 56, cat: "dog"},
    {item: "Brew", qty: 26, cat: "dodssg"},
    {item: "Iron Swords", qty: 168, cat: "doffg"},
]

export const TestTable = ({navigation}) => {

    console.log("navi = ", navigation)

    return(
        <Table
            data = {testData}
        >
            Test Table
        </Table>
    )
}