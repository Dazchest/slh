import React, { useState } from "react";

// import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import { Generals } from "./Generals";
import { FrontPage } from "./FrontPage";

export const Index = () => {

    const [page, setPage] = useState('FrontPage');

    console.log("page = ", page);

    switch (page) {
        case 'FrontPage':
        return(<FrontPage/>);
        break;

        default:
            return(<div>default</div>);

        
    
    }
}