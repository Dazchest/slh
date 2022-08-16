import React, { useState } from "react";
import ReactDOM from "react-dom"; 

import { MyNavigation, MyLink, MySwitch } from "./MyNavigation";

import { FrontPage } from "./FrontPage";
import { Generals } from "./Generals";
import { CustomGuides } from "./CustomGuides/CustomGuide";
import { NavBar } from "./NavBar";
import { AnnRounds } from "./AnnRounds";
import { TestTable } from "./TestTable";
import { ReducerTest } from "./ReducerTest";
import { AuthController } from "./Auth/AuthContext";
import { Test } from "./Test";
import { CalcMines } from "./CalcMines/CalcMines";

export const App = () => {

    return(
        <AuthController>
            <MyNavigation>  
                <NavBar />

                <div className=" align-content-center row justify-content-around m-5">
                    <MyLink to={"FrontPage"} type={"button"}>Front Page</MyLink>
                    <MyLink to={"TestTable"} type={"button"}>Test Table</MyLink>
                    <MyLink to={"ReducerTest"} type={"button"}>Test Reducer</MyLink>
                    <MyLink to={"Generals"} type={"button"}>Generals</MyLink>
                    <MyLink to={"CustomGuides"} type={"button"}>Custom Guides</MyLink>
                    <MyLink to={"AnnRounds"} type={"button"}>Anniversary Rounds</MyLink>
                    <MyLink to={"Test"} type={"button"}>Test</MyLink>
                    <MyLink to={"CalcMines"} type={"button"}>Mines</MyLink>
                </div>

                <MySwitch
                    defaultPage = {"CalcMines"}
                    pages = {[FrontPage, TestTable, ReducerTest, Generals, CustomGuides,
                         AnnRounds, Test, CalcMines]}
                />

            </MyNavigation>
        </AuthController>
    )

} 

if(document.getElementById('app_main')) {
    ReactDOM.render(<App/>, document.getElementById('app_main'));
}

