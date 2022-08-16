import React, { useReducer, useEffect, useState } from "react";
import { customGuideReducer, ADD_WAVE, blankWave } from "./customGuideReducer";
import { MySelect } from "../helpers";

export const EditWave = (props) => {
    const TEST = false;

    const guideState = props.guideState;
    const currentGuide = guideState.currentGuide;
    const guideDispatch = props.guideDispatch;
    const changeTroopInfo = props.changeTroopInfo;
    const wave = props.editWave;
    const handleWaveInfoChange = props.handleWaveInfoChange;
    // const [wave, setWave] = useState(props.editWave);
    // const [testState, guideDispatch] = useReducer(customGuideReducer);   // need to try and get this working with the correct state

    // console.log("props guide state in editwave", guideState);
    //console.log("wave to edit = ", wave);


    const bob = (e) => {
        console.log("pressed");
        guideDispatch({type:"g"});
    }

    //----------------------------------------
    if(TEST) {
        return(<div>Test Mode<button onClick={e=>bob(e)}>press</button></div>
        )
    }



    //--------------------------------------
    return(
        <div className="new-wave">
            <h2>Create a new Wave for Guide with id {currentGuide.id}</h2>
            <h4>Wave id = {wave.id}</h4>
            <div className="new-wave-info">
                <div>
                    <label>Camp </label>
                    <input type="number" name="camp" value={wave.camp} onChange={(e)=>handleWaveInfoChange(e)}/>
                </div>
                <div>
                    <label>Wave </label>
                    <input type="number" name="wave" value={wave.wave} onChange={(e)=>handleWaveInfoChange(e)}/>
                </div>
                <div>
                    <label>General </label>
                    <input type="text" name="general"  value={wave.general} onChange={(e)=>handleWaveInfoChange(e)}/>
                </div>
            </div>

            <div className="new-wave-troops">
                {/* {wave.troops.map((item, i) => {
                    return(
                        <TroopInfo troopIndex={i} wave={wave} changeTroopInfo={changeTroopInfo}/>
                    )
                })} */}
                <TroopInfo troopIndex={0} wave={wave} changeTroopInfo={changeTroopInfo}/>
                <TroopInfo troopIndex={1} wave={wave} changeTroopInfo={changeTroopInfo}/>
                <TroopInfo troopIndex={2} wave={wave} changeTroopInfo={changeTroopInfo}/>
                <TroopInfo troopIndex={3} wave={wave} changeTroopInfo={changeTroopInfo}/>
                <TroopInfo troopIndex={4} wave={wave} changeTroopInfo={changeTroopInfo}/>
            </div>

            <div>
                <MySelect list={[{name:"h", id:34}]}/>
            </div>
            <AddButton id={wave.id} wave={wave} addWave={props.addWave}/>
        </div>
    )
}

const AddButton = (props) => {
    // console.log("button wave id = ", props.id)
    if(props.id) {
        return(
            <button className="button" onClick={()=>props.addWave(props.wave)}>Update Wave</button>
        )
    } else {
        return (
            <button className="button" onClick={()=>props.addWave(props.wave)}>Add Wave</button>
        )
    }
}

const troopList = [
    "Recruits", "Militia", "Bowman", "Cavalry"
]

const TroopSelect = (props) => {

    // console.log("props list = ", props.list);

    return (
        <div>
            <select id={props.id} onChange={props.onChangeTroop}>
                {props.list.map((item, index) => {
                    return (
                        // <option key={index} value={item.id}>{item.name}</option>
                        <option key={index} value={item}>{item}</option>
                    )
                })}

            </select>
        </div>
    )
}

const TroopInfo = (props) => {
    const wave = props.wave;
    const changeTroopInfo = props.changeTroopInfo;
    const troopIndex = props.troopIndex;

    // console.log("troop info wave ", wave);

    return (
        <div className="troop" key={troopIndex}>
            <datalist id="troopList2">
                <option value="Recruit">Recruit</option>
                <option value="Bowman">Bowman</option>
                <option value="Militia">Militia</option>
                <option value="Cavalry">Cavalry</option>
                <option value="Longbowman">Longbowman</option>
                <option value="Soldier">Soldier</option>
                <option value="Crossbowman">Crossbowman</option>
                <option value="Elite Soldier">Elite Soldier</option>
                <option value="Cannoneer">Cannoneer</option>
                <option value="Swordsman">Swordsman</option>
                <option value="Mounted Swordsman">Mounted Swordsman</option>
                <option value="Knight">Knight</option>
                <option value="Marksman">Marksman</option>
                <option value="Armored Marksman">Armored Marksman</option>
                <option value="Mounted Marksman">Mounted Marksman</option>
                <option value="Besieger">Besieger</option>            
            </datalist>
            {/* <div className="troop-info">
                <label>Troop Type {troopIndex+1}</label><br/>
                <input type="text" name="troopType" value={wave.troops[troopIndex].troopType}
                    onChange={(e)=>{
                        changeTroopInfo(e, troopIndex);
                    }}
                />
            </div> */}

            <div className="troop-info">
                <label>Troop Type {troopIndex+1}</label><br/>
                <input list="troopList2" type="text" name="troopType" value={wave.troops[troopIndex].troopType}
                    onChange={(e)=>{
                        changeTroopInfo(e, troopIndex);
                    }}
                    onClick={(e)=>{
                        e.target.value="";
                        changeTroopInfo(e, troopIndex);
                    }}
                />
            </div>

            {/* <div className="troop-info">
                <label>Troop Type {troopIndex+1}</label><br/>
                <TroopSelect id={troopIndex} list={troopList} 
                    onChangeTroop={(e)=>{changeTroopInfo(e, troopIndex);}}
                />
            </div> */}

            <div className="troop-info">
                <label>Quantity {troopIndex+1}</label><br/>
                <input type="number" name="troopQty" value={wave.troops[troopIndex].troopQty}
                    onChange={(e)=>{
                        changeTroopInfo(e, troopIndex);
                    }}
                />
            </div>
            <div className="troop-info">
                <label>Losses {troopIndex+1}</label><br/>
                <input type="number" name="troopLoss" value={wave.troops[troopIndex].troopLoss}
                    onChange={(e)=>{
                        changeTroopInfo(e, troopIndex);
                    }}
                />
            </div>
        </div>
    )
}