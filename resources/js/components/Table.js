import React, { useState } from "react";


export const Table = (props) => {
    console.log(props);
    // const columns = props.columns;
    const {columns, data} = props;

    const [tableData, setTableData] = useState(data);

    const autoWidth = 100 / 3;
    console.log("tablecells = ", tableCells);

    const handleSort = (e, column) => {
        console.log("sorting");
        // console.log(e.target.getAttribute("sort"));
        let sortOrder = e.target.getAttribute("sort") == "asc" ? "desc" : "asc";    // Toggle sort order
        // console.log(sortOrder);
        e.target.setAttribute("sort", sortOrder);
        // data.sort(mySort(column, sortOrder));
        let newState = [...tableData];
        newState.sort(mySort(column, sortOrder));
        console.log("tableData = ", newState);
        setTableData(newState);
    }

    return(
        <div>
            <div>
                <TableHeader 
                    columns = {tableColumns}
                    autoWidth = {autoWidth}
                    handleSort = {handleSort}
                >
                </TableHeader>
            </div>
            <div>
                <TableBody
                    columns = {tableColumns}
                    data = {tableData}
                    autoWidth = {autoWidth}
                >
                </TableBody>
            </div>
            <div>
                <TableFooter
                    columns = {tableColumns}
                    showTotals = {true}
                >

                </TableFooter>
            </div>
        </div>
    )
}

const TableRowNumbers = ({style, rowIndex}) => {
    // console.log("rowind", typeof rowIndex);
    let rowIndex2 = rowIndex == undefined ? "" : rowIndex+111;
    return(
        <td style={{...style, padding:"1px", verticalAlign:"middle", textAlign:"center", width:"3%"}}>{rowIndex2}</td>
    )

}

const TableHeader = (props) => {
    let columns = props.columns;
    // let columnWidth = props.autoWidth;
    // columnWidth = 
    // const style = {backgroundColor:'#000'};

    if(!columns) {
        return(
            <>
            </>
        )
    }

    const TableColumnLetters = () => {
        // if(tableColValues) {
            return(
                <tr>
                    <TableRowNumbers style={{display:"table-cell"}}/>
                        {Object.entries(columns).map(([key, column], colIndex) => {
                            let disp =  "table-cell";
                            'show' in column && column.show == false ? disp = "none" : disp = "table-cell"

                            return(
                                <th style={{display:disp, textAlign:"center", padding:"1px"}} key={colIndex}>{String.fromCharCode(65+colIndex)}</th>
                            )
                        })
                        }
                </tr>
            )
        // }
    }
    const handleSort = props.handleSort;
    return(
        <div>
            <table className="table">
                <thead>
                    {<TableColumnLetters/>}
                    <tr>
                        <TableRowNumbers style={{display:"table-cell"}}/>

                        {Object.entries(columns).map(([key, column], index) => {
                            const columnWidth = column.width;
                            let style = column.style;
                            style.width = columnWidth;  // Build up the stylesheet
                            // column.style.width = columnWidth;  // Build up the stylesheet
                            // Check if we want to display the column
                            'show' in column && column.show == false ? style.display = "none" : style.display = "table-cell"
                            // console.log("key = ", key);
                            // if(tableRowValues) {
                            //     return(
                            //         <th>{rowIndex+1}</th>
                            //     )
                            // }
                            return(
                                // <th style={{width:columnWidth}} key={index}>{columns[key].title}</th>
                                <th 
                                    style={style} 
                                    key={index}
                                    onClick={(e)=>handleSort(e, key)}
                                >
                                    {column.title}
                                </th>
                            )
                        })}
                    </tr>
                </thead>
            </table>
        </div>
    )
}

const TableBody = ( props ) => {
    const columns = props.columns;
    const data = props.data;
    return(
        <div>
            <table className="table">
                <tbody>
                    
                        {data.map((row, rowIndex) => {
                            return(
                                <tr key={rowIndex}>                        
                                
                                    <TableRowNumbers style={{display:"table-cell"}} rowIndex={rowIndex}/>

                                    {Object.entries(columns).map(([key, value], colIndex) => {
                                        // const columnWidth = columns[key].width;
                                        let styleBody = {...columns[key].style};   // ? columns[key].style : {}
                                        // columns[key].style has been changed in the header
                                        // so no need to make any changes here - YET!!!
                                        // console.log("sylebod = ", styleBody);
                                        // styleBody.widthe = "columnWidth";      // Build up the stylesheet

                                        // Check if tableRows has any style properties
                                        if(tableRows && tableRows[rowIndex] && tableRows[rowIndex].style) {
                                            let trs = tableRows[rowIndex].style;
                                            styleBody = {...styleBody, ...trs};
                                            // console.log("sylebod = ", styleBody);
                                        }
                                        const colRefUpper = String.fromCharCode(65+colIndex);
                                        const gridPosUpper = colRefUpper + (rowIndex+1);
                                        const colRefLower = String.fromCharCode(97+colIndex);
                                        const gridPosLower = colRefLower + (rowIndex+1);

                                        if(tableCells && (tableCells[gridPosUpper] || tableCells[gridPosLower])) {
                                            // let trs = tableRows[rowIndex].style;
                                            // styleBody = {...styleBody, ...trs};
                                            console.log("found a cell = ", gridPosUpper);
                                            styleBody = {...styleBody, backgroundColor:'#0ff'};
                                        }

                                        return(
                                            <td style={styleBody} key={colIndex}>{row[key]}</td>
                                        )
                                    })}
                                </tr>
                            )
                        })}
                    
                </tbody>
            </table>
        </div>
    )
}

const TableFooter = (props) => {
    const columns = props.columns;
    
    return(
        <div>
            <table className="table">
                <thead>
                    <tr>
                        <TableRowNumbers style={{display:"table-cell"}}/>
                        {Object.entries(columns).map(([key, value], colIndex) => {
                            // const columnWidth = columns[key].width;
                            const style = columns[key].style;
                            // style.width = columnWidth;  // Build up the stylesheet
                            // console.log(style);
                            return(
                                // <th style={{width:columnWidth}} key={index}>{columns[key].title}</th>
                                <th style={style} key={colIndex}>footer</th>
                            )
                        })}
                    </tr>
                </thead>
            </table>
        </div>
    )
}

const tableData2 = [
    {item: "Wheat", qty: 45, error: "yes"},
    {item: "Bronze", qty: 56, cat: "dog"},
    {item: "Brew", qty: 26, cat: "dodssg"},
    {item: "Iron Swords", qty: 168, cat: "doffg"},
]

const tableColValues = true;        // Show numbered columns (A, B, C etc)
const tableRowValues = true;        // Show numbered rows (1,2,3 etc)



// width - auto / "20px" / "5%"
// auto will need to take the viewort width and divide by the auto column count, and convert to a %
// other columns that are maybe "10%" or "50px" will need subtracting from the auto calc
let tableColumns = {
    item: {
        title: "Column 1",                  // Default = object value ("item")
        show: true,                         // Defualt = true
        width: "30%",                      // Default = "auto"
        style: {backgroundColor:'#f00'},    // Default = ???
        editable: false,
    },
    qty: {
        title: "Column 2",
        show: true,
        width: "20%",
        style: {backgroundColor:'#0f0'},    // Default = ???
        editable: true,
    },
    error: {
        title: "hello",
        width: "20%",
        style: {backgroundColor:'#00f'},    // Default = ???
    }

}

const tableRows = {
    2:{
        style: {backgroundColor:'#ff0'},
    }
}

const tableCells = {
    B2:{backgroundColor:'#0ff'},
    a3:{backgroundColor:'#0ff'},
}



// const TestTable = () => {
//     return(
//         <Table>
//                 <TableHeader />
                
//                 <TableBody />
                
//                 <TableFooter />
//         </Table>
//     )
// }

/**
 * 
 * @param {*} column column to sort
 * @param {*} order order = "asc" for ascending, or anything else for descending
 */
let sortOrder;
const mySort = (column, order) => {
    sortOrder = order=="asc" ? 1 : -1
    
    return function (a, b) {
        // const colType = typeof blankData[column];
        // console.log(colType);
        let result;
        // if(colType == "object") {
        //     result = a[column].value < b[column].value ? -1 : a[column].value > b[column].value ? 1 : 0;
        // } else {
            result = a[column] < b[column] ? -1 : a[column] > b[column] ? 1 : 0;
        // }
        return result * sortOrder;
    }
}
// data.sort(mySort("item", "asc"));


