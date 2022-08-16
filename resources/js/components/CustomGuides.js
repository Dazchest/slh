import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "./Auth/AuthContext";

const customGuideState = {
    selectedGuide: 1,                   // ID of the guide
    
}

const ADD_WAVE = "ADD_WAVE";
const NEW_GUIDE = "NEW_GUIDE";

const customGuideReducer = (state, action) => {
    switch(action.type) {
        case ADD_WAVE :
            return state;

        case NEW_GUIDE :
            return state;

        default:
            return state;      
    }
} 


const blankGuide = {  
    id: null, 
    name: "",
    image: "",
    wikiLink: "",
    editMode: true,
    wave: {   
        camp: 1,
        wave: 1,
        id: 0,
        notes: "",
        general: "",
        troops: [
            {troopType:"hello", qty:1, loss:0},
            {troopType:"", qty:0, loss:0},
            {troopType:"", qty:0, loss:0},
            {troopType:"", qty:0, loss:0},
            {troopType:"", qty:0, loss:0},
        ]
    }
}


export const CustomGuides = () => {

    const {currentGuide, setCurrentGuide} = useState("vlt");
    const {currentWave, setCurrentWave} = useState(0)

    const [authState, authDispatch] = useContext(AuthContext);
    console.log("authsate in customguides = ", authState);

    const handleEditClick = (e, wave) => {
        console.log("clicking edit");
        let ew = guide.waves[wave];    
        setEditGuide({...guide, wave: ew })
        console.log(ew);
        guide.editMode = true;
    }

    const [editGuide, setEditGuide] = useState(blankGuide);

    useEffect(() => {
        console.log("even doing anything")
        setEditGuide(blankGuide)
    },[])


    const guide = {
        id: 1,
        name: "VLT",
        image: "https://blahblah",
        wikiLink: "https://wikiblahblah",
        editMode: true,
        waves: [
            {   camp: 1,
                wave: 1,
                id: 75,
                notes: "this is a tough camp",
                general: "YGG",
                troops: [
                    {troopType:"Recruits", qty:100, loss:95},
                    {troopType:"Cavalry", qty:150, loss:0},
                ]
            },
            {   camp: 1,
                wave: 2,
                id: 76,
                notes: "this is a tough camp",
                general: "Doris",
                troops: [
                    {troopType:"Recruits", qty:100, loss:45},
                    {troopType:"Bowman", qty:50, loss:20},
                ]
            },
            {   camp: 2,
                wave: 1,
                id: 79,
                notes: "no notes here",
                general: "Steady",
                troops: [
                    {troopType:"Crossbow", qty:10, loss:5},
                    {troopType:"Cannon", qty:150, loss:23},
                ]
            }
        ]
    }



    
    return(
        <div>
            <button>Create new guide</button>
            Inside Custom Guides
            {guide.name}<br/>
            {guide.image}<br/>
            {guide.wikiLink}<br/>
            <table className="table">
                <thead>
                    <th>Camp</th>
                    <th>Wave</th>
                    <th>General</th>
                    <th>Troops</th>
                    <th>Losses</th>
                </thead>
                <tbody>
                    {guide.waves.map((wave, index) => {
                        return(
                            <tr key={index}>
                                <td>{wave.camp}</td>
                                <td>{wave.wave}</td>  
                                <td>{wave.general}</td>
                                <td>
                                    {wave.troops.map((troop, index) => {
                                        return(
                                            <span key={index}>
                                            ({troop.troopType} - {troop.qty}) , 
                                            </span>
                                        )
                                    })}
                                </td>
                                <td>
                                    {wave.troops.map((troop, index) => {
                                        return(
                                            <span key={index}>
                                            ({troop.troopType} - {troop.loss}) , 
                                            </span>
                                        )
                                    })}
                                </td>
                                <td><button onClick={(e)=>handleEditClick(e, index)}>Edit</button></td>
                                <td><button>Delete</button></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>

            <NewGuide guide={editGuide} wave={editGuide.wave} eg={editGuide} seg={setEditGuide}/>
        </div>
    )
}

export const NewGuide = (props) => {

    const guide = props.guide;
    const wave = props.wave;
    console.log("wave to edit = ", wave);
    // return(
    //     <div></div>
    // )
    const GuideName = () => {
        if(guide.editMode) {
            let name = guide.name;
            return(
                name
            )
        } 
    }

    const changeTroopInfo = (e, troopindex) => {
        console.log("wave = ", wave);
        const input = e.target.name;
        const value = e.target.value;
        let newState = Object.assign({}, wave);
        
        newState.troops[troopindex][input] = value;
        props.seg({...props.eg, wave:{...wave, newState}});
        // props.seg({...props.eg, 
        //     wave:{...wave
        //         , 
        //         troops:[...wave.troops, wave.troops[props2.troopIndex].qty=e.target.value]}})
        
    }


    const handleCampChange = (input) => {
        const a = "camp";
        console.log(input.target.value);
        props.seg({...props.eg, wave:{...props.eg.wave, [a]:input.target.value}})
    }

    return(
        <div>
            <h2>Create a new Guide</h2>
            <button>Save Guide</button><br></br>
            <label>Adventure Name</label>
            <input type="text" value={guide.name}/>

            <div className="row">
                <div>
                    <label>Camp</label>
                    <input type="number" value={wave.camp} onChange={(e)=>handleCampChange(e)}/>
                </div>
                <div>
                    <label>Wave</label>
                    <input type="number" value={wave.wave}/>
                </div>
                <div>
                    <label>General</label>
                    <input type="text" value={wave.general}/>
                </div>
            </div>

            <div className="row">
                <TroopInfo troopIndex={0} wave={wave} changeTroopInfo={changeTroopInfo}/>
                <TroopInfo troopIndex={1} wave={wave} changeTroopInfo={changeTroopInfo}/>

            </div>

            <button>Add</button>

        </div>
    )
}


const TroopInfo = (props) => {
    const wave = props.wave;
    const changeTroopInfo = props.changeTroopInfo;
    const troopIndex = props.troopIndex;
    return(
        <div key={troopIndex}>
            <div>
                <label>Troop Type {troopIndex+1}</label>
                <input type="text" name="troopType" value={wave.troops[troopIndex].troopType}
                    onChange={(e)=>{
                        changeTroopInfo(e, troopIndex);
                    }}
                />
            </div>
            <div>
                <label>Quantity {troopIndex+1}</label>
                <input type="number" name="qty" value={wave.troops[troopIndex].qty}
                    onChange={(e)=>{
                        changeTroopInfo(e, troopIndex);
                    }}
                />
            </div>
            <div>
                <label>Losses {troopIndex+1}</label>
                <input type="number" name="loss" value={wave.troops[troopIndex].loss}
                    onChange={(e)=>{
                        changeTroopInfo(e, troopIndex);
                    }}
                />
            </div>
        </div>
    )
}
