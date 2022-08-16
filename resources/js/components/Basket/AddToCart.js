import React, { useContext } from "react";
import ReactDOM from "react-dom";
import { BasketContext } from "./BasketContext";

export const AddToCart = (props) => {
    // const {authState, authDispatch} = useContext(AuthContext);
    const {basketState, basketDispatch} = useContext(BasketContext);

    console.log("in AddToCart = " + basketState.item)
    console.log(props);
    props.carrot;
    // basketDispatch({type: "cart1", payload: "mushroom"});    // DO NOT CALL IN MAIN FUNCTION

    const handlclick = () => {
        console.log("clicked");
        basketDispatch({type: "add", payload: 1});

    }

    return (
        <div>
            I am the Add To Cart {basketState.qty}
            <button onClick={handlclick}>Click me</button>
        </div>
    )
}


export const Poop = () => {
    if(document.getElementById('add_to_cart')) {
        ReactDOM.render(<AddToCart/>, document.getElementById('add_to_cart'));
    }
}