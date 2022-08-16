import React, { useState, useRef, useEffect, useContext } from "react";

import { MyNavigationContext, navigation2, navv } from "./MyNavigation";



export const Test = ({navigation}) => {

    // console.log("test navi = ", navigation2)
    const n = (new navigation2());
    // navigation2.navigate("frgfdg");
    // console.log("test navi = ", n);
    // console.log("test navi = ", n.navigate());
    return(
        <div>
            hello in test
            <button onClick={() => n.navigate("CustomGuides")}>custom</button>
            <button onClick={() => navv.back()}>Back</button>

            <MyButton/>

        </div>

    )
}

export const MyButton = (props) => {

    const {MyNavState, MyNavDispatch} = useContext(MyNavigationContext);

    // const [cl, setClassName] = useState("mybutton");
    const but = useRef();
    const setActive = () => {
        setClassName("mybutton");
        // but.current.classList.push("active")
    }

    const cl = props.active ? "mybutton active" : "mybutton"
    return(
        <div className={cl}>
            <button ref={but} onClick={props.onClick}>
                {props.children}
            </button>
            <div></div>
        </div>
    )

}