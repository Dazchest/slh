import React from "react";


export const Generals = ({navigation}) => {

    console.log("navi = ", navigation)

    return(
        <div>
            Generals
            <button onClick={() => navigation.navigate("CustomGuides")}>custom</button>
            <button onClick={() => navigation.back()}>Back</button>
        </div>
    )
}