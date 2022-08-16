import Axios from "axios";

export const INIT_GUIDE = "INIT_GUIDE";
export const SET_BLANK_WAVE = "SET_BLANK_WAVE";
export const ADD_WAVE = "ADD_WAVE";
export const EDIT_WAVE = "EDIT_WAVE";
export const NEW_GUIDE = "NEW_GUIDE";
export const CHANGE_GUIDE = "CHANGE_GUIDE";
export const EDIT_GUIDE_NAME = "EDIT_GUIDE_NAME";
export const EDIT_GUIDE_IMAGE = "EDIT_GUIDE_IMAGE";
export const EDIT_GUIDE_WIKI = "EDIT_GUIDE_WIKI";
export const SET_WAVE_INFO = "SET_WAVE_INFO";
export const SET_TROOP_INFO = "SET_TROOP_INFO";
export const LOAD_GUIDE = "LOAD_GUIDE";
export const SET_GUIDE_LIST = "SET_GUIDE_LIST";
export const EDIT_GUIDE_INFO = "EDIT_GUIDE_INFO";
export const SET_PREVIOUS_GUIDE = "SET_PREVIOUS_GUIDE";
export const SET_SHARED = "SET_SHARED";


export const blankGuide = {  
    id: null, 
    name: "blank guide",
    image: "blank image",
    wiki_link: "blank wiki",
    shared: false,
    editMode: true,
    waves: [],
}

export const blankWave = {   
    camp: 1,
    wave: 1,
    id: null,
    camp_notes: "camp notes here",
    wave_notes: "wave notes here",
    general: "Bob",
    generals_id: null,
    troops: [
        {troopType:"", troopQty:0, troopLoss:0},
        {troopType:"", troopQty:0, troopLoss:0},
        {troopType:"", troopQty:0, troopLoss:0},
        {troopType:"", troopQty:0, troopLoss:0},
        {troopType:"", troopQty:0, troopLoss:0},
    ]
}

export const customGuideState = {
    selectedGuide: 4,                   // ID of the guide
    previousGuideId: null,
    currentGuide: blankGuide,
    editWave: {...blankWave},
    guideList: [],
    sharedGuideList: [],
}

export const customGuideReducer = (state, action) => {
    let bob;
    console.log(action);
    switch(action.type) {
        case "g" : 
            console.log("ggggggggg");
            return state;

        case INIT_GUIDE :
            return {...state, currentGuide:{...blankGuide}};

        case SET_PREVIOUS_GUIDE : 
            return {...state, previousGuideId: action.payload};

        case SET_BLANK_WAVE :
            console.log("reducer setting blank wave", blankWave);
            return {...state, editWave: {   
                camp: 1,
                wave: 1,
                id: null,
                camp_notes: "camp notes here",
                wave_notes: "wave notes here",
                general: "Bob",
                generals_id: null,
                troops: [
                    {troopType:"", troopQty:0, troopLoss:0},
                    {troopType:"", troopQty:0, troopLoss:0},
                    {troopType:"", troopQty:0, troopLoss:0},
                    {troopType:"", troopQty:0, troopLoss:0},
                    {troopType:"", troopQty:0, troopLoss:0},
                ]
            }}
            
        case ADD_WAVE :
            console.log("add wave", action.payload);
            let newState = Object.assign({}, state);
            // console.log(state);
            newState.editWave = {...blankWave};
            console.log("blank wave is", newState)
            newState.currentGuide.waves.push(action.payload);
            return newState;

        case EDIT_WAVE : 
            console.log("edit wave ", state.currentGuide.waves[action.payload]);
            // return state;
            return {...state, editWave:state.currentGuide.waves[action.payload]};

        case SET_WAVE_INFO :
            // console.log("setting wave info");

            return {...state, editWave:action.payload};

            
        case SET_TROOP_INFO :
            // console.log("setting troop info");

            return {...state, editWave:action.payload};



        case NEW_GUIDE :
            console.log("attempting to start new guide");
            return {...state, currentGuide:blankGuide}


        case CHANGE_GUIDE :
            console.log("change addy");
            return {...state, currentGuide:action.payload}
        
        case EDIT_GUIDE_INFO :
            console.log("editing all guide info");
            return {...state, currentGuide:{...state.currentGuide, [action.toUpdate]:action.payload}}


        case LOAD_GUIDE :
            console.log("loading guide with id", action.payload);
            // fetchGuide()
            return state;

        case SET_GUIDE_LIST : 
            // console.log("setting guide list", action.type);
            if(action.guideType != "shared") {
                return {...state, guideList: action.payload, selectedGuide:action.selected};
            } else {
                return {...state, sharedGuideList: action.payload};
            }
            
        case SET_SHARED :
            const shared2 = state.currentGuide.shared ? 0 : 1; 
            return {...state, currentGuide:{...state.currentGuide, shared:shared2}};

        default:
            return state;      
    }
} 

export class saveHelper {

    static async save({url, data, saveDelay=2000, method='post', logResponse=true, loggedIn=false}) {
        if(this.saveTimer) {
            clearTimeout(this.saveTimer);
        }
        this.saveTimer = setTimeout(()=>{
            console.log("saving data", data);
            Axios[method](`${url}`, data)
                .then(response => {
                    console.log("saved data", response.data);
                })
        }, saveDelay)
    }
    
}
