import React, { useState, useEffect, useCallback, useMemo, useRef } from "react";

import MyLink from "./MyNavigation";
import { EditCell } from "./helpers";

export const AnnRounds = () => {

    const [data, setData] = useState([]);
    const [totalBalloons, setTotalBalloons] = useState(0);
    const [slotDays, setSlotDays] =  useState(0);
    const [minutesPerCycle, setMinutesPerCycle] = useState(60);     // How long per cycle
    const [buff, setBuff] = useState(100);      // 0%, 50% or 100% buff
    const [donatedBalloons, setDonatedBalloons] = useState(0);
    const [tableBodyHeight, setTableBodyHeight] = useState("400px");

    const tableHeader = useRef();
    const tableBody = useRef();

    const balloonGoals = [5000, 7500, 10000, 12000, 15000, 18000, 21000];

    const item = (name, balloonQty) => {
        return(
            {name:name, balloonQty: balloonQty}
        )
    }
    const items = ["Wheat", "Bronze Sword", "Brew", "Bow", "Bread", "Hardwood Plank",
    "Marble", "Water", "Iron Sword", "Sausage", "Horse", "Gold Bar", "Longbow", "Steel Sword",
    "Exotic Wood Plank", "Granite", "Gold Coin", "Titanium Bar", "Crossbow", "Demaseen Sword",
    "Wagon Wheel", "Gunpowder", "Mahogny Wood", "Platinum Sword", "Cloth", "War Horse",
    "Aqueebuster", "Mortar", "Bean Stalk"];
    const itemsBalloons = [8,10,10,10,10,10,8,8,12,10,10,10,10,12,10,8,12,10,12,12,12,10,8,12,8,12,10,14,8]
    const myQty = [4350,2450,5220,2790,11200,4350,1960,39100,364,2610,2660,154,980,176,1100,
    196,117,36,28,24,35,17,326,66,880,217,16,0,0];

    const displayCell = (value) => {
        return value ? "table-cell" : "none";
    }
    const [columns, setColumns] = useState({
        "item" : {
            title: "Item",
            display: displayCell(true),
            checked: true,
            width: "12%",
        },
        "qty" : {
            title: "Qty Per Slot",
            display: displayCell(true),
            checked: true,
        },
        "slots" : {
            title: "Slots to use",
            display: displayCell(true),
            checked: true,
        },
        "use Per Day" : {
            title: "Use Per Day",
            display: displayCell(true),
            checked: true,
        },
        "prod Per Day" : {
            title: "Your Production Per Day",
            display: displayCell(true),
            checked: true,
        },
        "In Stock" : {
            title: "In Stock",
            display: displayCell(true),
            checked: true,
        },
        "ratio" : {
            title: "Ratio (per day/in stock)",
            display: displayCell(true),
            checked: true,
        },
        "num Days" : {
            title: "Num of Days to Produce",
            display: displayCell(true),
            checked: true,
        },
        "Use Event" : {
            title: "Used during Event",
            display: displayCell(true),
            checked: true,
        },
        "balloons Per Slot" : {
            title: "Balloons Produced Per Slot",
            display: displayCell(true),
            checked: true,
        },
        "balloons Per Day Buffed" : {
            title: "Balloons Per Day Buffed",
            display: displayCell(true),
            checked: true,
        },
        "balloons Per Event Buffed" : {
            title: "Balloons Per Event Buffed",
            display: displayCell(true),
            checked: true,
        },
    })

    const [columnsChecked, setColumnsChecked] = useState({})

    const editable = (value) => {
        return {value:value, editable:true};
    }
    const BPD = "balloons Per Day";

    const blankData = {
            "item": "Bronze Sword",
            "qty": editable(50),              // how many used per hour in Festival Hall
            "slots": editable(0),               // How many slots to use with this resource
            "use Per Day": 0,                   // How many it uses per day - to be calculated
            "prod Per Day": editable(0),      // What your current production per day is
            "In Stock": editable(0),      // What you have in stock
            "ratio": 0,                         // Ratio between use and produce - lower the better - to be calculated
            "num Days": editable(0),            // Number of days to use this resource
            "Use Event": 0,                     // How much resource will be used for the whole event - based on days etc
            "balloons Per Slot": editable(12),   // How many balloons this resource produces per cycle
            // [BPD]: 0,                           // How many produced per day - to be calculated
            // "balloons Per Event": 0,            // How many produced for the whole event - to be calculated
            "balloons Per Day Buffed": 0,       // How many per day after buff
            "balloons Per Event Buffed": 0,     // How many per event after buff
    }

    useEffect(() => {
        // console.log("tableBody ", tableBody);
        // console.log("scrreen", window.innerHeight);
        setTableBodyHeight((window.innerHeight - tableBody.current.offsetTop) + "px");

        if(localStorage.hasOwnProperty("annData")) {
            let savedData = JSON.parse(localStorage.getItem("annData"));
            setMinutesPerCycle(savedData.minutesPerCycle);
            setBuff(savedData.buff);
            setDonatedBalloons(savedData.donatedBalloons);
            savedData = savedData.data
            console.log("loading saved data", savedData)
            
            // Check that all items are in the saved list... In case we have changed the main list
            items.forEach((item, index) => {
                let found = false;
                savedData.forEach((savedItem, sindex) => {
                    if(savedItem.item == item) {
                        found = true;
                    }
                });
                if(found == false) {
                    let copyBlank = Object.assign({}, blankData);
                    copyBlank.item = item;
                    savedData.push(copyBlank);
                }
            });

            setData(savedData);
            // calcBalloons();
        } else {
            console.log("no saved data");
            initBlankData();
        }

        //-----------------------------
        // Get Columns Checked
        if(localStorage.hasOwnProperty("columnsChecked")) {
            let c = JSON.parse(localStorage.getItem("columnsChecked"));
            console.log("getting columns checked ", c);
            Object.entries(c).map(([key, value], index) => {
                console.log("cc = ", key, value);
                let newState = Object.assign({}, columns);
                newState[key].checked = value;
                newState[key].display = displayCell(value);
                setColumns(newState);
                // setColumns({...columns, [key]:{...key, checked:value}});
            })
            setColumnsChecked(c);
        }
        //-----------------------------
    },[])



    const calcBalloons = useCallback( () => {
        let newState = [...data];
        let balloons = 0;
        let slotDays = 0;       // How many total slots vs days (21 days @ 3 slots = 63 max)

        newState.map((item, index) => {
            item["use Per Day"] = item.slots.value * item.qty.value * ((24*60) / minutesPerCycle);

            let r1 = (item["use Per Day"] / item["prod Per Day"].value).toFixed(1);
            if(r1 == "Infinity" || r1 == "NaN") {
                r1 = 0;
            }
            let r2 = (item["use Per Day"] / item["In Stock"].value).toFixed(1);
            if(r2 == "Infinity" || r2 == "NaN") {
                r2 = 0;
            }
            item.ratio = r1 + " / " + r2;

            item["Use Event"] = item["use Per Day"] * item["num Days"].value;
            // item[BPD] = (item["ballons Per Slot"].value * ((24*60) / minutesPerCycle) * item.slots.value).toFixed(0);
            // item["balloons Per Event"] = (item["numDays"].value * item[BPD]).toFixed(0);
            item["balloons Per Day Buffed"] = ((item["balloons Per Slot"].value * ((24*60) / minutesPerCycle) * item.slots.value) * (1+(buff/100))).toFixed(0);
            item["balloons Per Event Buffed"] = (item["balloons Per Day Buffed"] * item["num Days"].value).toFixed(0);
            balloons += Number(item["balloons Per Event Buffed"]);
            slotDays += Number(item.slots.value * item["num Days"].value);
        })
        setData(newState);
        setTotalBalloons(balloons);
        setSlotDays(slotDays);
    }, [buff, data])

    //----------------------------------------------
    const initBlankData = () => {
        let newState = [...data];

        items.forEach((item, index) => {
            console.log(item);
            let copyBlank = Object.assign({}, blankData);
            copyBlank.item = item;
            copyBlank["qty"] = editable(myQty[index]);
            copyBlank["balloons Per Slot"] = editable(itemsBalloons[index]);
            newState.push(copyBlank);
        })
        setData(newState);
    }
    //----------------------------------------------
    // useEffect(() => {
    //     console.log("data changed and savingggggg ", data);
    //     // localStorage.setItem("annData", JSON.stringify(data));
    //     saveData();
    // },[data])    
    //----------------------------------------------
    const saveData = useCallback(() => {
        console.log("data changed aaaaaaand saving ", data);
        let saveData = {
            data: data,
            minutesPerCycle: minutesPerCycle,
            buff: buff,
            donatedBalloons: donatedBalloons,
        }
        localStorage.setItem("annData", JSON.stringify(saveData));
    },[data, donatedBalloons, minutesPerCycle, buff])
    //----------------------------------------------

    const onEditChange = (e) => {
        let info = e.target.attributes;
        console.log("val = ", e.target.innerText);
        // // console.log("target ", e.target.attributes.formattedvalue.value);
        console.log("target att", info);
        console.log("row", info.row.value)
        console.log("col", info.col.value)
        // return;
        const row = info.row.value
        const col = info.col.value
        const value = e.target.getAttribute("type") == "number" ? Number(e.target.innerText) : e.target.innerText;

        let newState = [...data];
        if(typeof newState[row][col] == "object") {
            newState[row][col] = editable(value);
        } else {
            newState[row][col] = value;
        }
        setData(newState);
        calcBalloons();
        saveData();
    }

    // useEffect(()=>{
    //     console.log("buff change")
    //     calcBalloons();
    // }, [buff])

    // const setb = (e) => {
    //     console.log(e.target);
    //     setBuff(Number(e.target.innerText));
    //     console.log(buff);
    //     // calcBalloons();
    // }
    const setb = useCallback((e) => {
        console.log(e.target);
        setBuff(Number(e.target.innerText));
        console.log(buff);
        // calcBalloons();
    }, [buff])

    useMemo(calcBalloons, [buff, minutesPerCycle]);

    function checkEnter(e) {
        if(e.which === 13) {
            e.preventDefault();
            e.target.blur();
        }
    }

    const TableCell = ({value, colindex, rowIndex, columnKey, visiblility}) => {
        const width = colindex==0 ? columns[columnKey].width : "8%";

        let fontSize = "1.4vw";
        if(typeof value == "object") {
            return(
            <EditCell 
                key={rowIndex + "-" + colindex}
                value={value.value} 
                originalValue={value.value}
                row={rowIndex}
                col={columnKey}
                onEditChange={onEditChange}
                style={{fontSize:fontSize, display:visiblility, width:width, backgroundColor:"#f90", border:"1px solid black", paddingLeft:"3px", paddingRight:"3px"}}
            ></EditCell>
            )
        } else {
            if(colindex==0) {
                fontSize = "1.2vw"
            }
            return(
                // <td key={rowIndex + "-" + colindex} 
                // style={{fontSize:fontSize, display:visiblility, width:width, border:"1px solid black", paddingLeft:"3px", paddingRight:"3px"}}>{value}</td>
                <td key={rowIndex + "-" + colindex} 
                style={{fontSize:fontSize, display:visiblility, width:width, border:"1px solid black", paddingLeft:"3px", paddingRight:"3px"}}>
                    {value}
                    </td>
            )
        }
    }

    /**
     * 
     * @param {*} column column to sort
     * @param {*} order order = "asc" for ascending, or anything else for descending
     */
    let sortOrder;
    const mySort = (column, order) => {
        sortOrder = order=="asc" ? 1 : -1
        
        return function (a, b) {
            const colType = typeof blankData[column];
            console.log(colType);
            let result;
            if(colType == "object") {
                result = a[column].value < b[column].value ? -1 : a[column].value > b[column].value ? 1 : 0;
            } else {
                result = a[column] < b[column] ? -1 : a[column] > b[column] ? 1 : 0;
            }
            return result * sortOrder;
        }
    }
    // data.sort(mySort("item", "asc"));

    const handleSort = (e, column) => {
        // console.log(e.target.getAttribute("sort"));
        let sortOrder = e.target.getAttribute("sort") == "asc" ? "desc" : "asc";    // Toggle sort order
        // console.log(sortOrder);
        e.target.setAttribute("sort", sortOrder);
        // data.sort(mySort(column, sortOrder));
        let newState = [...data];
        newState.sort(mySort(column, sortOrder));
        console.log("newstate = ", newState);
        setData(newState);
    }

    const handleHideColumn = (e) => {
        const checked = e.target.checked;
        const column = e.target.name;
        // console.log(checked, column);
        let newState = Object.assign({}, columns);
        newState[column].display = displayCell(checked);
        newState[column].checked = checked;
        setColumns(newState);
        setColumnsChecked({...columnsChecked, [column]:checked});
        saveColumnsChecked();
    }

    useEffect(()=>{
        saveColumnsChecked()
    }, [columnsChecked])

    const saveColumnsChecked = useCallback(() => {
        console.log("saveColumnsChecked saving columns checked");
        let cc = columnsChecked;
        localStorage.setItem("columnsChecked", JSON.stringify(cc));
    }, [columnsChecked, columns])
    // useMemo(()=>{
    //     console.log("saving columnssssss checked");
    //     saveColumnsChecked()
    // }, [columnsChecked]);


    //---------------------------------------------
    return(
        <div className="m0" style={{display:"flex", flexDirection:"column", height:"100%"}}>
            Total balloons {totalBalloons}

            <div style={{display:"flex", flex:"0 1 auto", justifyContent:"space-around"}}>
                <span>
                    <label>Minutes per cycle </label>
                    <input value={minutesPerCycle} onKeyPress={checkEnter} onBlur={saveData} onChange={(e)=>setMinutesPerCycle(Number(e.target.value))}/>
                </span>
                <span>
                    <label>Buff </label>
                    <input value={buff} onKeyPress={checkEnter} onBlur={saveData} onChange={(e)=>setBuff(Number(e.target.value))}/>
                </span>
                
                <div>
                    <button className="selectbox" type="button" data-toggle="dropdown">
                        Show/Hide Columns
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dLabel">
                        {/* {columns.forEach((column, index) => { */}
                        {Object.entries(columns).map(([key, value], index) => {
                            return(
                                <li key={index} className="checkbox form-group">
                                    <input onChange={(e)=>handleHideColumn(e)} type="checkbox" checked={columns[key].checked} value="Value Pot" name={key} />
                                    <label htmlFor={key}>{columns[key].title}</label>
                                </li>                    
                            )
                        })}
                    </ul>
                </div>
            </div>

            <div ref={tableHeader} style={{overflowY:"scroll", display:"flex", backgroundColor:'#9d9'}}>
            <table className="table">
                <thead>
                <tr>
                    {Object.entries(blankData).map(([key, value], index) => {
                        const width = index==0 ? columns[key].width : "8%";
                        const columnTitle = columns[key] ? columns[key].title : key;
                        const visiblility = columns[key] ? columns[key].display : "table-cell";
                        return(
                            <td 
                                sort={"asc"} 
                                onClick={(e)=>handleSort(e, key)} 
                                key={index} 
                                style={{fontSize:"1.5vw", display:visiblility, width:width, border:"1px solid black", padding:"3px", paddingLeft:"3px", paddingRight:"3px"}}
                            >
                                {columnTitle}
                            </td>
                        )
                    })}
                </tr>
                {/* <tr>
                    {columns.map((col, index) => {
                        if(col.display) {
                            return(
                                <td>{col.title}</td>
                            )
                        }
                    })}
                </tr> */}
                </thead>
            </table>
            </div>

            <div ref={tableBody} style={{overflowY:"scroll", display:"flex", height:tableBodyHeight, backgroundColor:'#dfd'}}>
            <table className="table">
                <tbody>
                {data.map((resource, rowIndex) => {
                    return(
                        <tr key={rowIndex}>
                            {Object.entries(resource).map(([key, value], colindex) => {
                                const visiblility = columns[key] ? columns[key].display : "table-cell";
                                return(
                                    <TableCell visiblility={visiblility} key={rowIndex + "-" + colindex} value={value} rowIndex={rowIndex} colindex={colindex} columnKey={key}/>
                                )
                            })}
                            
                        </tr>
                    )
                })}
                </tbody>
            </table>
            </div>
            
            <div style={{display:"flex", flexDirection:"column", flex:"0 1 40px"}}>
                total ballons = {totalBalloons} <br></br>
                <label>Donated balloons</label>
                <input 
                    value={donatedBalloons} 
                    onKeyPress = {checkEnter}
                    onChange={(e)=>setDonatedBalloons(Number(e.target.value))}
                    onBlur={saveData}
                />
                {balloonGoals.map((goal,index) => {
                    return(
                        <span key={index}>
                            Target {index+1} = {goal} 
                            {donatedBalloons>=goal ? " - Reached" : totalBalloons+donatedBalloons>=goal ? " - Should Reach" : " - Keep Going" } <br></br>
                        </span>
                    )
                })}
            </div>

            {/* {Object.entries(data[0]).map(([key, value], index) => {
                    return(
                        <span>{key} - {value}</span>
                    )
    
            })} */}
        </div>
    )
}

