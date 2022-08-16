import React, { useReducer } from "react";

const myReducer = (state, action) => {
    switch (action.type) {
        case "changeCurrentName":
            return {...state, currentName: action.payload};

        case "addName":
            return {...state, addyNames: [...state.addyNames, action.payload]}
    }
}

const initialState = {
    addyNames: [1,2,3],
    currentName: "asd",
    addyXp: 50000,
}

export const ReducerTest = () => {

    const [{addyNames, currentName, addyXp}, dispatch] = useReducer(myReducer, initialState);


    return(
        <div>
            Reducer test <br/>
            {addyNames.map((name, index) => {
                return(
                    <span key={index}>{name}<br/></span>
                )
            })}
            <form id="f" onSubmit={(e)=>{
                e.preventDefault();
                dispatch({type:"addName", payload:currentName})}
                }/>
            <input form="f" type="text" value={currentName} onChange={(e)=>dispatch({type:"changeCurrentName", payload:e.target.value})}></input>
            <button form="f">Add</button>
        </div>
    )

}