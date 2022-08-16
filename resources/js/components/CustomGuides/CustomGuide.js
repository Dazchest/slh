import React, { useState, useEffect, useReducer, useContext, useCallback, useMemo } from "react";

import { customGuideReducer, customGuideState, CHANGE_GUIDE, NEW_GUIDE, LOAD_GUIDE, EDIT_GUIDE_NAME, EDIT_GUIDE_IMAGE, EDIT_GUIDE_WIKI, EDIT_WAVE, SET_WAVE_INFO, SET_TROOP_INFO, SET_BLANK_WAVE, ADD_WAVE, SET_GUIDE_LIST, EDIT_GUIDE_INFO, saveHelper, INIT_GUIDE, SET_PREVIOUS_GUIDE, SET_SHARED } from "./customGuideReducer";
import { testGuide } from "./testGuide";
import { EditWave } from "./EditWave";
import Axios from "axios";
import { AuthContext } from "../Auth/AuthContext";
import { inArray } from "jquery";
import { indexOf } from "lodash";

// import { cg3 } from "./cg3.json";


let saveTimer = false;



export const CustomGuides = () => {

    const [guideState, guideDispatch] = useReducer(customGuideReducer, customGuideState);
    // console.log(guideState);
    const currentGuide = guideState.currentGuide;
    const editWave = guideState.editWave;
    const guideList = guideState.guideList;
    // console.log("editWave",editWave);
    const {authState, authDispatch} = useContext(AuthContext);

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

    const addWave = async (wave) => {
        console.log("adding a wave", wave);
        const data = {};
        data.wave = wave;
        data.guideId = currentGuide.id;
        await Axios.post(`./addwave`, data)
            .then(response => {
                console.log(response.data);
                guideDispatch({type: SET_BLANK_WAVE, campNumber:44});
                handleLoadGuide('', currentGuide.id)
            })
    }

    const deleteWave = (e, waveIndex) => {
        const guideId = guideState.currentGuide.waves[waveIndex].id;
        console.log("deleting???", guideId)
        Axios(`./deletewave/${guideId}`)
            .then(response => {
                console.log(response.data);
                handleLoadGuide('', currentGuide.id)
            })
    }

    const createNewGuide = () => {
        Axios.get('./createnewguide')
            .then(response => {
                console.log("created new guide on server with id ", response.data.id);
                const newGuideId = response.data.id;
                handleLoadGuide('', newGuideId);
            })
    }

    const handleEditClick = (e, waveIndex) => {
        // console.log("clicking edit");
        guideDispatch({type: EDIT_WAVE, payload: waveIndex})
    }

    const loadGuideList = (selected, type) => {
        console.log("loading guide list", type);
        Axios(`./loadguidelist/${type}`)
            .then(response => {
                console.log("guide list", response.data);
                guideDispatch({type: SET_GUIDE_LIST, payload: response.data, selected:selected, guideType:type})
            })
    }

    useEffect(() => {
        console.log("in uesEffect ", authState.username);
        console.log("selected guide = ", guideState.selectedGuide);
        loadGuideList(5, "normal");
        loadGuideList(5, "shared");
        // guideDispatch({type: CHANGE_GUIDE, payload: testGuide});
        console.log("selected guide = ", guideState.selectedGuide);
    },[])

    //------------------------------------------------------------------------------
    const changeTroopInfo = (e, troopindex) => {
        // console.log("troopindex = ", troopindex);
        const input = e.target.name;
        const value = e.target.value;
        let newState = Object.assign({}, guideState.editWave);
        newState.troops[troopindex][input] = value;
        guideDispatch({type:SET_TROOP_INFO, payload:newState})
    }

    const handleWaveInfoChange = (input) => {
        // console.log(input.target.name);
        const toEdit = input.target.name;
        let newState = Object.assign({}, guideState.editWave);
        newState[toEdit] = input.target.value;
        guideDispatch({type:SET_WAVE_INFO, payload:newState})
    }


    // const saveinfo = useCallback((info) => {
    const saveinfo = useEffect(() => {
        if(guideState.currentGuide.id) {        // Check we have a guide loaded
            console.log("checking current guide ", guideState.currentGuide.id)
            console.log("checking previous guide ", guideState.previousGuideId)
            if(guideState.currentGuide.id == guideState.previousGuideId) {  // Make sure we dont save if we have just loaded the guide
                console.log("in saveinfo ...", );
                if(saveTimer) {
                    clearTimeout(saveTimer);
                }
                saveTimer = setTimeout(()=>{
                    Axios.post("./saveguideinfo", guideState.currentGuide)
                        .then(response => {
                            console.log("savedddd data", response.data);
                            loadGuideList(5, "normal");
                            loadGuideList(5, "shared");
                        })
                }, 2000)
            } else {
                console.log("setting previous guide ", guideState.currentGuide.id)
                guideDispatch({type: SET_PREVIOUS_GUIDE, payload: guideState.currentGuide.id})
            }
        }
    }, [guideState.currentGuide])

    const editGuideInfo = useCallback((e, toUpdate) => {
        console.log(authState.user.id, currentGuide.userid);
        if(authState.user.id == currentGuide.userid) {
            guideDispatch({type: EDIT_GUIDE_INFO, payload:e.target.value, toUpdate:toUpdate});
        }
        // saveinfo(guideState.currentGuide);
    }, [guideState.currentGuide])

    let currentCamp = 0;
    let bg = '#f00';

    const deleteGuide = () => {
        if(authState.user.id == currentGuide.userid) {
            window.confirm(`are you sure you want to delete guide "${currentGuide.name}"???`) &&
            Axios(`./deleteguide/${guideState.currentGuide.id}`)
                .then(response => {
                    console.log("guide deleted with response from server", response.data);
                    // loadGuideList();
                    guideDispatch({type:INIT_GUIDE}); 
                    loadGuideList(0);               
                })
        }
    }

    const toggleShareGuide = () => {
        if(authState.user.id == currentGuide.userid) {
            Axios(`./toggleshareguide/${guideState.currentGuide.id}`)
                .then(response => {
                    console.log("guide shared with response from server", response.data);
                    guideDispatch({type:SET_SHARED});
                
                    // loadGuideList(0);               
                })
        }
    }
    const realImageName = () => {
        console.log("getyting image");
        console.log("image = " + currentGuide.image_name)
        if(currentGuide.image_name) {
            return "./storage/app/" + currentGuide.image_name;
        } else {
            return null;
        }
    }
    //--------------------------------------------------------------------
    let colSpanCount = 0;
    let counts = {gens:[], used:{}, losses:{}};
    return(
        <div>
            {authState.isAuthenticated ? 
            <div style={{
                display: 'flex', flexDirection:'row', justifyContent:'space-around', marginBottom:'10px', marginTop:'10px'
            }}>
                <GuideSelect
                    list={guideList}
                    onChange = {(e)=>handleLoadGuide(e, e.target.selectedOptions[0].id)}
                    selectHeader = "Select Guide..."
                />
                <GuideSelect
                    list={guideState.sharedGuideList}
                    onChange = {(e)=>handleLoadGuide(e, e.target.selectedOptions[0].id)}
                    selectHeader = "Select Shared Guide..."
                />
                <button className="button" onClick={(e)=>createNewGuide(e)}>Create new guide</button>
            </div>
            : <h3>you need to log in to view your guides or create a new guide</h3>
            }

            <br/>{authState.user.name} - {authState.user.id}
            <br/>
            {guideState.currentGuide.id &&
                <div className="row justify-content-around p-3 mb-3">
                    <button className="button" onClick={()=>deleteGuide()}>Delete this guide</button>
                    <button className="button" onClick={()=>toggleShareGuide()}>
                        {currentGuide.shared ? "unShare" : "Share"}
                    </button>
                    <input value={currentGuide.name} onChange={(e)=>editGuideInfo(e, 'name')} placeholder="Guide name"></input>
                    <input value={currentGuide.image} onChange={(e)=>editGuideInfo(e, 'image')} placeholder="Image link..."></input>
                    <input value={currentGuide.wiki_link} onChange={(e)=>editGuideInfo(e, 'wiki_link')} placeholder="Wiki or other link..."></input>
                    {currentGuide.wiki_link ? 
                        <a href={currentGuide.wiki_link} target="_blank">Go to link</a>
                        : <span>no link</span>
                    }
                    <br/>
                    {currentGuide.image_name &&
                        <img src={realImageName()} style={{width:'90%', marginLeft:'20px', marginTop:'5px'}}></img>
                    }
                    <table className="table">
                        <thead>
                            <tr>
                                <td>Camp</td>
                                <td>Wave</td>
                                <td>General</td>
                                <td>Troops</td>
                                <td>Losses</td>
                            </tr>
                        </thead>
                        <tbody>
                            {currentGuide.waves.map((wave, waveIndex) => {
                                // ------- Set background color on camp change
                                if(currentCamp != wave.camp) {
                                    bg = bg=='#fdc' ? '#cdf' : '#fdc';
                                }
                                currentCamp = wave.camp;
                                //-------------------------------------------
                                // Calc row span
                                let colSpan = 1;
                                for(let x=waveIndex; x<waveIndex+5-1; x++) {
                                    if(currentGuide.waves[x+1]) {
                                        // console.log("colspan inc 1")
                                        if(wave.camp == currentGuide.waves[x+1].camp) {
                                            colSpan++;
                                            // console.log("colspan inc 2")
                                        }
                                    }
                                }
                                // console.log(colSpan);
                                // colSpan = 1;
                                const Colspan = (props) => {
                                    console.log("----------------");
                                    console.log("colSpan = ", colSpan);
                                    console.log("colcount = ", colSpanCount);
                                    console.log("wave camp = ", wave.camp);
                                    console.log("wave wave = ", wave.wave);
                                    console.log("----------------");
                                    if(props.colSpan == 1) {
                                        return(
                                            <td >{colSpanCount} - {wave.camp}</td>
                                        )
                                    } else 
                                    if(colSpanCount == 0) {
                                        colSpanCount++;
                                        return(
                                            <td rowSpan={props.colSpan}>{colSpanCount} - {wave.camp}</td>
                                        )
                                    } else {
                                        colSpanCount++;
                                        if(colSpanCount == colSpan) colSpanCount = 0;
                                        return(
                                            <></>
                                        )
                                    }
                                }
                                    //-------------------------------------------

                                if(indexOf(counts.gens, wave.general) == -1) {
                                    console.log(wave.general + " not in array of ", counts.gens)
                                    counts.gens.push(wave.general);
                                } else {
                                    // counts.gens.push(wave.general);
                                }

                                return(
                                    <tr key={waveIndex} style={{backgroundColor:bg}}>
                                        <td>{wave.camp}</td>
                                        {/* <Colspan colSpan={colSpan} /> */}
                                        <td>{wave.wave}</td>  
                                        <td>{wave.general}</td>
                                        <td>
                                            {wave.troops.map((troop, index) => {
                                                if(troop.troopType) {
                                                    if(counts.used[troop.troopType]) {
                                                        counts.used[troop.troopType] += Number(troop.troopQty);
                                                    } else {
                                                        counts.used[troop.troopType] = Number(troop.troopQty);
                                                    }
                                                    return(
                                                        <span key={index}>
                                                        ({troop.troopQty} - {troop.troopType}) , 
                                                        </span>
                                                    )
                                                }
                                            })}
                                        </td>
                                        <td>
                                            {wave.troops.map((troop, index) => {
                                                if(troop.troopType && Number(troop.troopLoss)>0) {
                                                    if(counts.losses[troop.troopType]) {
                                                        counts.losses[troop.troopType] += Number(troop.troopLoss);
                                                    } else {
                                                        counts.losses[troop.troopType] = Number(troop.troopLoss);
                                                    }
                                                    
                                                    return(
                                                        <span key={index}>
                                                        ({troop.troopLoss} - {troop.troopType}) , 
                                                        </span>
                                                    )
                                                }
                                            })}
                                        </td>
                                        {authState.user.id == currentGuide.userid &&    // Dont show if its a shared guide
                                            <td><button style={{marginRight:'5px'}} onClick={(e)=>handleEditClick(e, waveIndex)}>Edit</button>
                                            <button onClick={(e)=>deleteWave(e, waveIndex)}>Delete</button></td>
                                        }
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                    {console.log(counts.gens)}
                    {counts.gens.map((gen, index) => {
                        return(
                            <span key={index}>
                                {gen} - 
                            </span>
                        )
                    })}
                    <table className="table">
                        <tbody>
                            <tr>
                                <td>Troop Type</td><td>Used</td><td>Losses</td>
                            </tr>
                            {Object.entries(counts.used).map(([troop, qty], index) => {
                                return(
                                    <tr key={index}>
                                        <td>{troop}</td>
                                        <td>{qty}</td>
                                        <td>{counts.losses[troop]}</td>
                                    </tr>
                                )
                            })}
                            {/* <tr> 
                                <td rowSpan="2">Least Favorite</td> 
                                <td>Yellow</td> 
                                <td>Pink</td> 
                            </tr> 
                            <tr> 
                                <td>Mint</td> 
                                <td>Walnut</td> 
                            </tr> */}
                        </tbody>
                    </table>

                    <EditWave addWave={addWave} handleWaveInfoChange={handleWaveInfoChange} guideState={guideState} editWave={editWave} guideDispatch={guideDispatch} changeTroopInfo={changeTroopInfo}/>
                </div>
            }
        </div>
    )
}

export const GuideSelect = (props) => {
    const selectHeader = props.selectHeader ? props.selectHeader : "Select...";
    const list = props.list ? props.list : [];
    const onChange = props.onChange ? props.onChange : ()=>{};
    return(
        <select style={{backgroundColor:'#fed', borderTopRightRadius:'15px', borderTopLeftRadius:'15px'}} value={0} onChange={onChange}>
            <option value={0} >{selectHeader}</option>
            {list.map((guide, guideIndex) => {
                return(
                    <option style={{backgroundColor:'#fed', border:'#f00 5px solid', }} value={guideIndex+1} key={guideIndex} id={guide.id}>{guide.name}</option>
                )
            })}
        </select>
    )
}


