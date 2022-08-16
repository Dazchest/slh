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
        user_id: 18,
        name: "iron Mine 1",
        sector: "s3",
        qty: 7154,
        level: 6,
        hours: 0,
        minutes: 3,
        seconds: 40,
        buff: 2,                            // Calc how much it should produce
        update_time: 1634846352000,
        qty_left: 1000,
        time_left: '3h 25m',
    },
    ]

const blankMine = {
    id: null,
    user_id: null,
    name: "",
    sector: "",
    position: 0,
    qty: 0,
    level: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    buff: 0,                            // Calc how much it should produce
    output: 0,
    update_time: 0,
    qty_left: 0, 
    time_left: '',
}
var newState;
export const UPDATE_MINES = "Update Mines";

export const initialState = {
    selectedMine: 0,                   // ID of the mine ? ? ?
    mines: [],
    currentMine: [],
    newMine: []
}

const doCalc = (mine) => {
    const secondsElapsed = ((Date.now() - mine.update_time) / 1000).toFixed(0);
    const usePerSecond = mine.level / (((mine.hours * 60 * 60) + (mine.minutes * 60) + Number(mine.seconds))) 
    mine.qty_left = (mine.qty - (secondsElapsed * usePerSecond)).toFixed(0);
    mine.output = mine.buff ? ((mine.buff / 100 + 1) * mine.qty_left).toFixed(0) : mine.qty_left;
    const seconds = mine.qty_left / usePerSecond;
    const daysLeft =  Math.floor((seconds / (24*60*60)))
    const hoursLeft = Math.floor(seconds / (60*60)) - (daysLeft * 24);
    const minutesLeft = Math.floor(seconds / 60) - (daysLeft*24*60) - (hoursLeft *60);
    const secondsLeft = (seconds % 60).toFixed(0);
    mine.time_left = daysLeft + "d " + hoursLeft + "h " + minutesLeft + "m " + secondsLeft + "s";
    return;
}

export const calcMineReducer = (state, action) => {
    switch (action.type) {
        case "setMineList" :
            console.log("setting list");

            return {...state, mines:action.payload};

        case "setData":
            let newState = Object.assign({}, state);
            newState.currentMine[action.payload.name] = action.payload.value;
            newState.currentMine.update_time = Date.now();
            return newState;

        case UPDATE_MINES :
            let newState3 = Object.assign({}, state);
            newState3 = action.payload;
            return newState3;

        case 'calc_mines' :
            newState = Object.assign({}, state);
            newState.mines.forEach((mine, mineIndex) => {
                doCalc(mine);
            });
            return state;


        case 'changeMine' :
            console.log(state.mines[action.payload]);
            let newState2 = Object.assign({}, state);
            newState2.selectedMine = action.payload;
            newState2.currentMine = state.mines[action.payload]
            return newState2;
    
        case 'newMine' :
            newState = Object.assign({}, state);
            newState.currentMine = {...blankMine};
            newState.newMine = {...blankMine}
            newState.newMine.user_id = action.payload.userId;
            return newState;

        case 'savedNewMine' :
            // return {...state, newMine:{...state.newMine, user_id:0}};  // This work as well
            return {...state, newMine: {...blankMine}};

        case 'deletedMine' :
            // return {...state, newMine:{...state.newMine, user_id:0}};  // This work as well
            return {...state, currentMine: []};
            
        case 'cancelNewMine' :
            console.log("cancelling???")
            return {...state, newMine: {...blankMine}};

        case 'update_minelist' :
            console.log("even doing this???")
            // return state;
            newState = Object.assign({}, state);
            newState.mines = action.payload;
            // newState.currentMine.update_time = Date.now();
            return newState;
            return {...state, mines: action.payload};

        
        default:
            return state;
    }
}