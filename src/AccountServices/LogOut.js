import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {messageAdded, messagesReset} from "../redux/geMessageListSlice";
import axios from "axios";
import { invertLogIn } from "../redux/isLoggedInSlice";
import { ucReset } from "../redux/userConsoleMessageSlice";
import { locate } from "../redux/isLocatedSlice";
import { updateRequest} from "../redux/requestOutSlice";


function logOut() {

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const dispatch = useDispatch()

    // eslint-disable-next-line react-hooks/rules-of-hooks
    // const requestOut = useSelector(state => state.requestOut)
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const requestAccepted = useSelector(state => state.requestAccepted)
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const requestOut = useSelector(state => state.requestAccepted)


    function logOut_(event) {
        if (requestAccepted === true || requestOut === true) {
            dispatch(messageAdded("Action cannot be done while a request is out"))
        } else {
            const config = {
                method: 'post',
                url: '/logout',
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': "Bearer " + localStorage.getItem('access_token')
                }
            };

            function removeMessages() {
                dispatch(messagesReset())
            }

            axios(config)
                .then((response) => {
                        removeMessages()
                        localStorage.removeItem('access_token')
                        dispatch(invertLogIn())
                        dispatch(ucReset())
                        dispatch(locate())
                    },
                    (error) => {
                        console.log(error.response.data.error)
                    });
            // hide sign up, log in, and intro, change state, is isLoggedIn = true, import state, from app.js
            // navigate (/account) that returns </Account> in position of Sign up and Log In
            // direct to /account
            // eslint-disable-next-line no-restricted-globals
            event.preventDefault()
        }
    }
        return (
            <div className={"logout-button-box"}>
                <button onClick={logOut_} className={"logOut-button"}> Log Out</button>
            </div>
        )
    }

export default logOut;