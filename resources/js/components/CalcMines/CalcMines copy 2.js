import Axios from "axios";
import React, { useState, useReducer, useEffect } from "react";

const testMine = [
    {
        id: 1,
        userId: 18,
        name: "Gold Mine 1",
        sector: "s9",
        qty: 899,
        level: 1,
        hours: 0,
        minutes: 12,
        seconds: 52,
        buff: 2,                            // Calc how much it should produce
        updateTime: 1634846352000,
        qtyLeft: 1000, 
        timeLeft: '3h 25m',
    },
    {
        id: 2,
        userId: 18,
        name: "iron Mine 1",
        sector: "s3",
        qty: 7154,
        level: 6,
        hours: 0,
        minutes: 3,
        seconds: 40,
        buff: 2,                            // Calc how much it should produce
        updateTime: 1634846352000,
        qtyLeft: 1000,
        timeLeft: '3h 25m',
        }
    ]

let saveTimer = false;

export const UPDATE_MINES = "Update Mines";

export const customMineState = {
    selectedMine: 0,                   // ID of the mine ? ? ?
    mines: testMine,
    currentMine: testMine[0],
    // editWave: {...blankWave},
}

const mineReducer = (state, action) => {
    switch (action.type) {
        case "setData":
            // console.log("satttteeee ", state);
            let newState = Object.assign({}, state);
            console.log(newState.currentMine['name']);
            console.log("payload",action.payload)
            newState.currentMine[action.payload.name] = action.payload.value;
            newState.currentMine.updateTime = Date.now();
            // return [...state, state[action.payload.index].name=action.payload.value]
            return newState;

        case UPDATE_MINES :
            let newState3 = Object.assign({}, state);
            newState3.mines = action.payload;
            return newState3;

        case 'changeMine' :
            console.log(state.mines[action.payload]);
            let newState2 = Object.assign({}, state);
            // let mineState = [...state];
            // mineState.currentMine = state.mines[action.payload];
            // return state;
            // , selectedMine: action.payload
            newState2.selectedMine = action.payload;
            newState2.currentMine = testMine[action.payload]
            return newState2;
    
        default:
            break;
    }
}

export const CalcMines = () => {
    // return;
    // const [mineState, mineDispatch] = useReducer(mineReducer, testMine)
    const [mineState, mineDispatch] = useReducer(mineReducer, customMineState)
    const currentMine = mineState.currentMine;
    // console.log("currnet mine is ");
    // console.log(currentMine);

    const handleLoadMines = async (e, guideId) => {
        await Axios(`./fetchmines/${guideId}`)
            .then(response => {
                console.log(response.data)
                let guide = response.data;
                // guideDispatch({type: SET_PREVIOUS_GUIDE, payload: currentGuide.id})
                guideDispatch({type: CHANGE_GUIDE, payload: guide});
                return guide;
            })
    }
    // useEffect(()=>{
    //     setInterval(() => {
    //         calcMines();
    //     },1000)
    // },[])
    const handleSaveMine = async (e) => {
        await Axios(response => {

        })
    }
    const saveinfo = useEffect(() => {
        console.log("kejfkdf")
        if(mineState.currentMine.id) {        // Check we have a guide loaded
            console.log("checking current guide ", mineState.currentMine.id)
            console.log("checking previous guide ", mineState.previousGuideId)
            if(mineState.currentMine.id == mineState.previousGuideId) {  // Make sure we dont save if we have just loaded the guide
                console.log("in saveinfo ...", );
                if(saveTimer) {
                    clearTimeout(saveTimer);
                }
                saveTimer = setTimeout(()=>{
                    Axios.post("./savemines", mineState.currentMine)
                        .then(response => {
                            console.log("savedddd data", response.data);
                            // loadGuideList(5, "normal");
                            // loadGuideList(5, "shared");
                        })
                }, 2000)
            } else {
                console.log("setting previous guide ", mineState.currentMine.id)
                // guideDispatch({type: SET_PREVIOUS_GUIDE, payload: mineState.currentMine.id})
            }
        }
    }, [mineState.currentMine])

    
    const calcMines = () => {
        // console.log("inside calcMines");
        // let newState = [...mineState];
        let newState = Object.assign({}, mineState);
        newState.mines.forEach((mine, mineIndex) => {
            const secondsElapsed = ((Date.now() - mine.updateTime) / 1000).toFixed(0);
            const usePerSecond = mine.level / (((mine.hours * 60 * 60) + (mine.minutes * 60) + Number(mine.seconds))) 
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
        // console.log(newState);
        mineDispatch({type: UPDATE_MINES, payload: newState.mines});
    }

    useEffect(()=>{
        setInterval(() => {
            calcMines();
        },1000)
    },[])

    return(
        <div className="mine_wrapper">
            <div className="mine_container">
                <div className="mine_list">
                    {mineState.mines.map((mine, index) => {
                        return(
                            <div key={index}>
                                <button onClick={(e)=>mineDispatch({type:"changeMine", payload: index})}>{mine.name}</button>
                                <br></br>
                            </div>
                        )
                    })}
                </div>                
                
                <div className="mine_details">
                    <label style={{fontSize:'34px'}}>{currentMine.name}</label>
                    {Date.now()}
                    <hr></hr>
                    {mineState.currentMine.updateTime}
                    <hr></hr>
                    seconds {}
                    <MineRow label="Name" name="name" dispatch={mineDispatch} value={currentMine.name}/>
                    <MineRow label="Sector" name="sector" dispatch={mineDispatch} value={currentMine.sector}/>
                    <MineRow label="Qty" name="qty" dispatch={mineDispatch} value={currentMine.qty}/>
                    <MineRow label="Level" name="level" dispatch={mineDispatch} value={currentMine.level}/>
                    <MineRow label="Buff" name="buff" dispatch={mineDispatch} value={currentMine.buff}/>
                    <MineRow label="Hours" name="hours" dispatch={mineDispatch} value={currentMine.hours}/>
                    <MineRow label="Minutes" name="minutes" dispatch={mineDispatch} value={currentMine.minutes}/>
                    <MineRow label="Seconds" name="seconds" dispatch={mineDispatch} value={currentMine.seconds}/>
                    <MineRow label="Qty Left" name="qtyLeft" dispatch={mineDispatch} value={currentMine.qtyLeft}/>
                    <MineRow label="Time Left" name="timeLeft" dispatch={mineDispatch} value={currentMine.timeLeft}/>
                </div>


            </div>
        </div>
    )
}

export const MineRow = (props) => {
    // console.log("props", props)
    const name2 = props.name;
    const dispatch = props.dispatch;
     return(
        <div className="mine_field">
            <label>{props.label}</label>
            <input name={props.name} onChange={(e)=>dispatch({type:"setData", payload:{name:e.target.name, value:e.target.value}})} type="text" value={props.value}  />
        </div>    
    )
}