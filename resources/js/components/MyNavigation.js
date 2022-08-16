import React, { useContext, createContext, useReducer, useEffect, useMemo, useCallback } from "react";
import { MyButton } from "./Test";



export const MyNavigationContext = createContext();

const intialState = {
    pages: [],
    previousPage: "FrontPage",
    currentPage: "FrodntPage",
    targetPage: "FrontPage",
    defaultPage: "CustomGuides"         // Not used at the moment
}

const reducer = (state, action) => {
    switch (action.type) {
        case "setTargetPage":
            // console.log("setting target page as ", action.targetPage);
            return {...state, targetPage: action.targetPage};

        case "setCurrentPage":
            // console.log("settingcurrent page as ", action.currentPage);
            return {...state, currentPage: action.currentPage};
            
        case "setPreviousPage":
            // console.log("setting previous page as ", action.previousPage);
            return {...state, previousPage: action.previousPage};
                    
        case "setupPages":
            // console.log("pages = ", action.pages);
            return {...state, pages: action.pages};
                
        default:
            // console.log("something")
            return state;
    }
}

export const MyNavigation = (props) => {

    const [MyNavState, MyNavDispatch] = useReducer(reducer, intialState);

    return(
        <MyNavigationContext.Provider value={{MyNavState, MyNavDispatch}}>
            {props.children}
            {/* {props.children.map((item, index) => {
                let element = <MyLink/>;
                return React.cloneElement(item, {fishcake:"salmon"})
            })} */}
        </MyNavigationContext.Provider>
    )

}

export const setPage = (MyNavState, MyNavDispatch, targetPage) => {
    const pages = MyNavState.pages;
    // console.log("set this page ", targetPage)
    // console.log("set this page[0] ", pages)

    for(let x=0; x<pages.length; x++) {
        if(pages[x] == targetPage) {
            console.log("winner is ", pages[x]);
            MyNavDispatch({type: "setPreviousPage", previousPage: MyNavState.currentPage});
            MyNavDispatch({type: "setCurrentPage", currentPage: pages[x]});
            continue;
        }
    }
}

export const MyLink = (props) => {
    const {MyNavState, MyNavDispatch} = useContext(MyNavigationContext);

    const type = props.type;
    let active = false;

    if(type == "button") {
        if(props.to == MyNavState.currentPage) {
            console.log("on the page ", props.to);
            active = true;
        }
        return(
            <MyButton active={active} onClick={(e)=>setPage(MyNavState, MyNavDispatch, props.to)}>
                {props.children}
            </MyButton>
            // <button className={props.className} onClick={(e)=>setPage(MyNavState, MyNavDispatch, props.to)}>
            //     {props.children}
            // </button>
        )
    } else 
    if(type == "href") {
        return(
            <a 
                className={props.className}
                href={'#'} 
                onClick={(e)=>setPage(MyNavState, MyNavDispatch, props.to)}
            >
                {props.children}
            </a>
            )
    } else {
        return(
        <span className={props.className} onClick={(e)=>setPage(MyNavState, MyNavDispatch, props.to)}>
            {props.children}
        </span>
    )
    }
}

export const MySwitch = (props) => {
    const {MyNavState, MyNavDispatch} = useContext(MyNavigationContext);

    // const setDefault = useCallback(() => {
    //     console.log("in set default", MyNavState.defaultPage)
    //     setPage(MyNavState, MyNavDispatch, MyNavState.defaultPage)

    // },[MyNavState])

    useEffect(() => {
        let pagesList = [];
        props.pages.forEach(page => {
            pagesList.push(page.name);
        })
        MyNavDispatch({type: "setupPages", pages: pagesList})
        MyNavDispatch({type: "setCurrentPage", currentPage: props.defaultPage});
    }, []);

    const pages = props.pages;
    let Page = pages[0];        // First page in the list will be the default (atm)
    // console.log("page 4 ", pages[4].name)

    // for(let x=0; x<pages.length; x++) {
    //     if(pages[x].name == props.defaultPage) {
    //         Page = pages[x];
    //         console.log("Found our defaut page")
    //         continue;
    //     }
    // }

    let pageFound = false;
    for(let x=0; x<pages.length; x++) {
        if(pages[x].name == MyNavState.currentPage) {
            Page = pages[x];
            pageFound = true;
            // console.log("Found our page")
            continue;
        }
    }

    if(!pageFound && !pages[0].name) {
        Page = () => {return(
            <div>PAGE NOT FOUND</div>
        )}
    }
    

    return(
        <Page navigation={new navigation(MyNavState, MyNavDispatch)}/>
    )
}   

export class navigation {
    constructor(MyNavState, MyNavDispatch) {
        // console.log("in bob");
        this.MyNavState = MyNavState;
        this.MyNavDispatch = MyNavDispatch;
    }

    back() {
        // console.log("back please to ", this.MyNavState.previousPage)
        setPage(this.MyNavState, this.MyNavDispatch, this.MyNavState.previousPage);
    }

    navigate(targetPage) {
        // console.log("navigating to page ", this.MyNavState);
        setPage(this.MyNavState, this.MyNavDispatch, targetPage)
    }
}

export function navv () {
    return new navigation2();
}
export function navigation2 () {
    // console.log("calling navigation");
    // MyNavDispatch    
    const {MyNavState, MyNavDispatch} = useContext(MyNavigationContext);
    const ns = MyNavState;

    this.back = function() {
        console.log("back please to ", MyNavState.previousPage)
        setPage(MyNavState, MyNavDispatch, MyNavState.previousPage);
    }

    this.navigate = function(targetPage) {
        // console.log("Navigation . navigate ", MyNavState.currentPage)
        setPage(MyNavState, MyNavDispatch, targetPage)
        // return(console.log("in naviaget 222"));
        // return("in naviaget 222");
    }

    return;
}


// const navigation = {
//     navigate: () => {
//         const {MyNavState, MyNavDispatch} = useContext(MyNavigationContext);
//         console.log("Navigation . navigate ", MyNavState.currentPage)
//     },
//     back: "hello from navigation",
// }


