import React, { useContext } from "react";
import ReactDOM from "react-dom";
import { AddToCart, Poop } from "./AddToCart";
import { BasketContext, BasketController } from "./BasketContext";
import { AuthContext } from "../Auth/AuthContext";
// import { createRoot } from "react-dom/client";

export const Basket = () => {

    // const [basketState, basketDispatch] = useContext(BasketContext);
    const {basketState, basketDispatch} = useContext(BasketContext);
    

    return (
        // <BasketController>
            <div>I am the baskets22
                I am the basket { basketState.qty}
            </div>
        // </BasketController>
    )
}

let bob = "Basket";

// if(document.getElementById('basket')) {
//    ReactDOM.render(
//            <BasketController>
//                <Basket/>
//            </BasketController>, document.getElementById('basket'));
//    }

let rootElement = document.getElementById('add_to_cart');
// const root = createRoot(rootElement)
    ReactDOM.unstable_createRoot();

if(document.getElementById('add_to_cart')) {
    ReactDOM.render(
        <BasketController>
            <AddToCart carrot={bob}/>
        </BasketController>, document.getElementById('add_to_cart'));
}


