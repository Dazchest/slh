import Axios from "axios";
import React, { useState, useReducer, useEffect, useContext } from "react";
import {calcMineReducer, initialState, UPDATE_MINES} from "../CalcMines/calcMinesReducer";
import { AuthContext } from "../Auth/AuthContext";



let saveTimer = false;


export const CalcMines = () => {
    const [saved, setSaved] = useState(false);
    const [mineState, mineDispatch] = useReducer(calcMineReducer, initialState)
    const currentMine = mineState.currentMine;
    const {authState, authDispatch} = useContext(AuthContext);
    // console.log("authstate = ", authState);
    const loadMineList = () => {
        console.log("loading mine list");
        Axios.get(`./mines`)
            .then(response => {
                console.log("loaded mine list", response.data);
                mineDispatch({type: 'setMineList', payload: response.data})
            })
    }

    const saveNewMine = async (mine_id) => {
        console.log("saving mine", mineState);
        const data = {};
        data.mine = mineState.currentMine;
        await Axios.post(`./mines`, data)
            .then(response => {
                console.log("saved mine ", response.data);
                loadMineList();
                mineDispatch({type: 'savedNewMine'});
                setSaved(true);
                const savedText = setTimeout(() => {
                    console.log("setting saved 1")
                    setSaved(false);
                }, 4000);
                return () => clearInterval(saveTimer);
            })
    }

    const deleteMine = async (mine_id) => {
        console.log("selting mine");
        const data = {};
        data.mine_id = mineState.currentMine;
        // Axios(`./deletewave/${guideId}`)
        // await Axios.delete(`./mines/${mineState.currentMine.id}`)
        window.confirm(`are you sure you want to delete mine "${mineState.currentMine.name}"???`) &&
        await Axios.get(`./delmines/${mineState.currentMine.id}`)
            .then(response => {
                console.log("deleted mines ", response.data);
                loadMineList();
                mineDispatch({type: 'deletedMine'})
            })
    }

    useEffect(()=>{
        console.log("Component Loaded ");
        loadMineList();
    }, [])

    const saveinfo =  useEffect(() => {
        if(mineState.currentMine.id) {        // Check we have a guide loaded
            console.log("in saveinfo ...", );
            if(saveTimer) {
                clearTimeout(saveTimer);
            }
            saveTimer = setTimeout(()=>{
                const data = {};
                data.mine = mineState.currentMine;
                // console.log("saving after 2 seconds",  )
                 Axios.post("./mines", data)
                    .then(response => {
                        setSaved(true);
                        const savedText = setTimeout(() => {
                            setSaved(false);
                        }, 4000);                        
                        // console.log("savedddd data", response);
                        clearTimeout(saveTimer);
                    })
            }, 2000);
            return () => clearTimeout(saveTimer);
        }
    }, [mineState])

    const doCalc = (mine) => {
        const secondsElapsed = ((Date.now() - mine.update_time) / 1000).toFixed(0);
        const usePerSecond = mine.level / (((mine.hours * 60 * 60) + (mine.minutes * 60) + Number(mine.seconds))) 
        mine.qty_left = (mine.qty - (secondsElapsed * usePerSecond)).toFixed(0);

        const seconds = mine.qty+left / usePerSecond;
        const daysLeft =  Math.floor((seconds / (24*60*60)))
        const hoursLeft = Math.floor(seconds / (60*60)) - (daysLeft * 24);
        const minutesLeft = Math.floor(seconds / 60) - (daysLeft*24*60) - (hoursLeft *60);
        const secondsLeft = (seconds % 60).toFixed(0);
        return (daysLeft + "d " + hoursLeft + "h " + minutesLeft + "m " + secondsLeft + "s");
    }
    const calcMines2 = () => {
        // return;
        console.log("a");
        let newState = Object.assign({}, mineState);
        console.log(newState);
        newState.mines.forEach((mine, mineIndex) => {
            const secondsElapsed = ((Date.now() - mine.update_time) / 1000).toFixed(0);
            const usePerSecond = mine.level / (((mine.hours * 60 * 60) + (mine.minutes * 60) + Number(mine.seconds))) 
            mine.qty_left = (mine.qty - (secondsElapsed * usePerSecond)).toFixed(0);
            const seconds = mine.qty_left / usePerSecond;
            const daysLeft =  Math.floor((seconds / (24*60*60)))
            const hoursLeft = Math.floor(seconds / (60*60)) - (daysLeft * 24);
            const minutesLeft = Math.floor(seconds / 60) - (daysLeft*24*60) - (hoursLeft *60);
            const secondsLeft = (seconds % 60).toFixed(0);
            mine.time_left = doCalc(mine);
            console.log(mine.time_left)
            // mine.time_left = daysLeft + "d " + hoursLeft + "h " + minutesLeft + "m " + secondsLeft + "s";
        });
    }

    const [seconds, setSeconds] = useState(0);

    useEffect(()=>{
        const interval = setInterval(() => {
        // console.log(mineState)
            // calcMines2();
            mineDispatch({type: "calc_mines"});
            setSeconds(seconds => seconds + 1);

        },1000);
        return () => clearInterval(interval);
    },[])

    const createNewMine = () => {
        mineDispatch({type: "newMine", payload: {userId:authState.user.id}});
    }
    const viewState = () => {
        console.log("222",mineState);
    }
    const cancelNewMine = () => {
        console.log("cancelling new mine");
        mineDispatch({type: "cancelNewMine"});
    }

    var draggedItem;
    var items = {};
    const onDragStart = (e, index) => {
        // e.preventDefault();
        draggedItem = index;
        // e.dataTransfer.setData("text/html", e.target);
        e.dataTransfer.setDragImage(e.target, 100, 20);
        console.log("started draggin ", index);
    }

    const onDragOver = (e,index) => {
        e.preventDefault();
        // console.log(index)
        // const draggedOverItem = mineState.mines[index];
        console.log("drag over " + index + " and " + draggedItem);
        if (draggedItem == index) {
            console.log("it should get here")
            return;
          }        
          
        // items = mineState.mines.filter((item) => item !== draggedItem);
        // items.splice(index, 0, draggedItem);
        console.log("splicing ", index);
        
    }
    const onDragEnd = (e, index) => {
        // e.preventDefault();
        console.log("drag ended", index);
        // console.log("drag ended", items);
    }

    const moveItem = (e, index, direction) => {
        var mineList;
        switch (direction) {
            case 'up':
                if(index < 1) { 
                    break;
                }
                mineList = [...mineState.mines];
                console.log(mineList);
                let item = mineList[index];
                mineList.splice(index-1, 0, item);
                mineList.splice(index+1, 1);
                // console.log(mineList) 
                // console.log(mineState.mines);
                mineDispatch({type: 'update_minelist', payload: mineList});
                break;
        
            default:
                break;
        }
        console.log(direction)
    }

    return(
        <div className="mine_wrapper">
            <div className="mine_container">
                <div className="mine_list">
                    <div>
                        <button onClick={(e) => createNewMine()}>Create new mine</button>
                        <button onClick={(e) => viewState()}>view state</button>
                        <hr></hr>
                    </div>
                    <div className="field">
                        <button></button><span>qty_left</span><span>output</span><span>time_left</span>
                    </div>
                    {mineState.mines.map((mine, index) => {
                        return(
                            <div key={index} className="field"  
                                // draggable 
                                // onDragStart={(e) => onDragStart(e, index)}
                                // onDragEnd={(e)=>onDragEnd(e, index)} 
                                // onDragOver={(e) => onDragOver(e,index)}
                                >
                                {/* <span onClick={(e) => moveItem(e, index, 'up')}>up</span>
                                <span onClick={(e) => moveItem(e, index, 'down')}>down</span> */}
                                <button
                                    onClick={(e)=>mineDispatch({type:"changeMine", payload: index})}>{mine.name}</button>
                                <span>{mine.qty_left}</span>
                                <span>{mine.output}</span>
                                <span>{mine.time_left}</span>
                            </div>
                        )
                    })}
                </div>  

                <div className="mine_details">
                {(mineState.currentMine.id  || mineState.newMine.user_id) && 
                <div>
                    <label style={{fontSize:'34px'}}>{currentMine.name}{saved ? " - saved" : ""}</label>
                    <hr></hr>
                    <MineRow label="Name" name="name" dispatch={mineDispatch} value={currentMine.name ? currentMine.name : ""}/>
                    <MineRow label="Sector" name="sector" dispatch={mineDispatch} value={currentMine.sector ? currentMine.sector : ""}/>
                    <MineRow label="Position" name="position" dispatch={mineDispatch} value={currentMine.position ? currentMine.position : 99}/>
                    <MineRow label="Qty" name="qty" dispatch={mineDispatch} value={currentMine.qty ? currentMine.qty : 0}/>
                    <MineRow label="Level" name="level" dispatch={mineDispatch} value={currentMine.level ? currentMine.level : 0}/>
                    <MineRow label="Buff" name="buff" dispatch={mineDispatch} value={currentMine.buff ? currentMine.buff : 0}/>
                    <MineRow label="Output" name="output" dispatch={mineDispatch} value={currentMine.output ? currentMine.output : 0}/>
                    <MineRow label="Hours" name="hours" dispatch={mineDispatch} value={currentMine.hours ? currentMine.hours : 0}/>
                    <MineRow label="Minutes" name="minutes" dispatch={mineDispatch} value={currentMine.minutes ? currentMine.minutes : 0}/>
                    <MineRow label="Seconds" name="seconds" dispatch={mineDispatch} value={currentMine.seconds ? currentMine.seconds : 0}/>
                    <MineRow label="Qty Left" name="qtyLeft" dispatch={mineDispatch} value={currentMine.qty_left ? currentMine.qty_left : 0}/> 
                    <MineRow label="Time Left" name="timeLeft" dispatch={mineDispatch} value={currentMine.time_left ? currentMine.time_left : 0}/>
                    {!currentMine.id &&
                        <div>
                            <button onClick={(e)=> cancelNewMine()}>cancel</button>
                            <button onClick={(e)=> saveNewMine()}>save</button>
                        </div>
                    }
                    {currentMine.id &&
                        <div>
                            <button onClick={(e) => deleteMine()}>Delete</button>
                        </div>
                    }    
                    </div>            
                }
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