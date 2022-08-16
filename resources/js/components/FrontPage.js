import React from "react";

import { MyLink } from "./MyNavigation";
// import { Generals } from "./Generals";

export const FrontPage = (props) => {
    console.log("front page props", props);
    return(
        <div>
            This is the front page
            <MyLink to={"Generals"}>Generals</MyLink>

        </div>
    )
}