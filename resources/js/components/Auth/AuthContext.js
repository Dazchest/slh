import React, { useContext, createContext, useReducer, useEffect } from "react";
// import { retrieveToken, removeToken } dfrom "../auth/token";
import axios from "axios";
import Axios from "axios";


export const AuthContext = createContext();

const intiialState = {
    isAuthenticated: false,
    user: "no user",
    token: "no token",
    cat: "Cheshire",
}    



const reducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            // console.log(action.payload);
            return {            // Returning a new state
                ...state,
                isAuthenticated: true,
                user: action.user,
                // token: action.token,
            }
            break;
        case "LOGOUT":
            // removeToken(); 
            console.log("action = ", action.type);
            return {            // Returning a new state
                ...state,
                isAuthenticated: false,
                user: "not logged in",
                // token: null,
            }
            break;
        
        default:
            return state;
            break;
    }
}

export const AuthController = (props) => {
    const [authState, authDispatch] = useReducer(reducer, intiialState);
    
    useEffect(() => {
        console.log("AuthController startup, with state of ", authState);
        Axios('./checklogin')
            .then(response => {
                console.log(response.data);
                if(response.data) {
                    authDispatch({type:"LOGIN", user: response.data})
                } else {
                    authDispatch({type:"LOGOUT"})
                }
            })
        // AsyncStorage.getItem("token")
        //     .then((token) => {
        //         console.log("token, if its there = ", token);
        //         if(token) {
        //             console.log("connecting to apilogin on server", token);
        //             axios.get(`http://192.168.1.192:8000/apilogin?token=${token}`)
        //                 .then(res => {
        //                     console.log(res.data);
        //                     dispatch({type:"LOGIN", username: res.data.username, token: token})
        //                 })
        //                 .catch(err => {
        //                     console.log(err);
        //                 })
        //         } else {
        //             console.log("no token");
        //         }
        //         }
        //     )
        //     .catch(err => {
        //         console.log(err);
        // })
    },[])

    return (
        <AuthContext.Provider value={{authState, authDispatch}}>
            {props.children}
        </AuthContext.Provider>
    )
}