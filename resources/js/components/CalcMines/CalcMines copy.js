import React, { useState, useReducer, useEffect } from "react";


const testMine = [
    {
        id: 1,
        userId: 2,
        name: "Gold Mine 1",
        sector: "s9",
        qty: 10000,
        level: 1,
        hours: 1,
        minutes: 0,
        seconds: 1,
        buff: 2,                            // Calc how much it should produce
        updateTime: 1600531658716,
        qtyLeft: 1000,
        timeLeft: '3h 25m',
    },
    {
        name: "iron Mine 1",
        sector: "s3",
        qty: 7154,
        level: 6,
        hours: 0,
        minutes: 3,
        seconds: 40,
        buff: 2,                            // Calc how much it should produce
        updateTime: 1600531658716,
        qtyLeft: 1000,
        timeLeft: '3h 25m',
        }
    ]

export const UPDATE_MINES = "Update Mines";

const mineReducer = (state, action) => {
    switch (action.type) {
        case "setData":
            // console.log("satttteeee ", state);
            let newState = [...state];
            newState[action.payload.index][action.payload.name] = action.payload.value;
            newState[action.payload.index].updateTime = Date.now();
            // return [...state, state[action.payload.index].name=action.payload.value]
            return newState;

        case UPDATE_MINES :
            return action.payload;

        case 'changeMine' :
            return {...state, currentMine:action.payload};
    
        default:
            break;
    }
}
const customMineState = {
    selectedGuide: 4,                   // ID of the guide
    previousGuideId: null,
    currentMine: testMine,
    editWave: {...blankWave},
    guideList: [],
    sharedGuideList: [],
}
export const CalcMines = () => {

    const [mineState, mineDispatch] = useReducer(mineReducer, customMineState)
    const currentMine = mineState.currentMine;

    const handleLoadGuide = async (e, guideId) => {
        await Axios(`./fetchguide/${guideId}`)
            .then(response => {
                console.log(response.data)
                let guide = response.data;
                // guideDispatch({type: SET_PREVIOUS_GUIDE, payload: currentGuide.id})
                guideDispatch({type: CHANGE_GUIDE, payload: guide});
                return guide;
            })
    }

    const calcMines = () => {
        // console.log("inside calcMines");
        let newState = [...mineState];
        newState.forEach((mine, mindeIndex) => {
            const secondsElapsed = ((Date.now() - mine.updateTime) / 1000).toFixed(0);
            const usePerSecond = mine.level / (((mine.minutes * 60) + Number(mine.seconds))) 
            // console.log("seconds elpsed = ", secondsElapsed);
            // console.log("usePerSecond = ", usePerSecond);
            mine.qtyLeft = (mine.qty - (secondsElapsed * usePerSecond)).toFixed(0);

            const seconds = mine.qtyLeft / usePerSecond;
            const daysLeft =  Math.floor((seconds / (24*60*60)))
            const hoursLeft = Math.floor(seconds / (60*60)) - (daysLeft * 24);
            const minutesLeft = Math.floor(seconds / 60) - (daysLeft*24*60) - (hoursLeft *60);
            const secondsLeft = (seconds % 60).toFixed(0);
            mine.timeLeft = daysLeft + "d " + hoursLeft + "h " + minutesLeft + "m " + secondsLeft + "s";
        });

        mineDispatch({type: UPDATE_MINES, payload: newState});
    }

    useEffect(()=>{
        setInterval(() => {
            calcMines();
        },1000)
    },[])

    return(
        <div>
            inside calc mines
            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Sector</th>
                            <th>Qty</th>
                            <th>Level</th>
                            <th>Buff</th>
                            <th>Minutes</th>
                            <th>Seconds</th>
                            <th>Qty Left</th>
                            <th>Time Left</th>
                        </tr>
                    </thead>
                    <tbody>                
                        {mineState.map((mine, index) => {
                            return(
                                <MineRow
                                    index = {index}
                                    mine = {mine}
                                    dispatch = {mineDispatch}
                                />
                            )
                        })
                        }
                    </tbody>
                    </table>
                </div>

                <div>
                    {mineState.map((mine, index) => {
                        return(
                            <div>
                                <button>{mine.name}</button>
                                <br></br>
                            </div>
                        )
                    })}
                </div>
            </div>
    )
}

export const MineRow = (props) => {

    const mine = props.mine;
    const dispatch = props.dispatch;
    // console.log(mine);
    return(
        <tr>
            <td><input name="name" value={mine.name} onChange={(e)=>dispatch({type:"setData", payload:{name:e.target.name, value:e.target.value, index:props.index}})}></input></td>
            <td><input name="sector" value={mine.sector} onChange={(e)=>dispatch({type:"setData", payload:{name:e.target.name, value:e.target.value, index:props.index}})}></input></td>
            <td><input name="qty" type="number" value={mine.qty} onChange={(e)=>dispatch({type:"setData", payload:{name:e.target.name, value:e.target.value, index:props.index}})}></input></td>
            <td><input name="level" type="number" value={mine.level} onChange={(e)=>dispatch({type:"setData", payload:{name:e.target.name, value:e.target.value, index:props.index}})}></input></td>
            <td><input name="buff" type="number" value={mine.buff} onChange={(e)=>dispatch({type:"setData", payload:{name:e.target.name, value:e.target.value, index:props.index}})}></input></td>
            <td><input name="minutes" type="number" min={0} value={mine.minutes} onChange={(e)=>dispatch({type:"setData", payload:{name:e.target.name, value:e.target.value, index:props.index}})}></input></td>
            <td><input name="seconds" type="number" min={0} max={59} value={mine.seconds} onChange={(e)=>dispatch({type:"setData", payload:{name:e.target.name, value:e.target.value, index:props.index}})}></input></td>
            <td><input name="qtyLeft" type="number" value={mine.qtyLeft} onChange={(e)=>dispatch({type:"setData", payload:{name:e.target.name, value:e.target.value, index:props.index}})}></input></td>
            <td><input name="timeLeft" value={mine.timeLeft} onChange={(e)=>dispatch({type:"setData", payload:{name:e.target.name, value:e.target.value, index:props.index}})}></input></td>
            <td><button>Delete</button></td>
        </tr>
    )
} 