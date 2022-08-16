import React, { useContext, createContext, useReducer, useEffect } from "react";


export const BasketContext = createContext();

const intiialState = {
    item: "fish",
    qty: 33,
    price: 4.56,
}    

const reducer = (state, action) => {
    // state.qty = 44;
    if(action.type == "add") {
        console.log(state)
        // state.qty++;
        return {...state, qty: state.qty+1};
        return {...state, qty: 88};
        return state;

    }
    return state;
}

export const BasketController = (props) => {
    const [basketState, basketDispatch] = useReducer(reducer, intiialState);
    
    // useEffect(() => {
    //     console.log("BasketController startup, with state of ", basketState);
    // },[])

    return (
        <BasketContext.Provider value={{basketState, basketDispatch}}>
            {props.children}
        </BasketContext.Provider>
    )
}