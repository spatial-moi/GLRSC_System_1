import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { messageAdded } from "../redux/geMessageListSlice";
import axios from "axios";
import { invertLogIn } from "../redux/isLoggedInSlice";


function deleteProfile() {

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const dispatch = useDispatch()
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const requestOut = useSelector(state => state.requestOut)
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const requestAccepted = useSelector(state => state.requestAccepted)

    function deleteProfile_(event) {

        const path = process.env.REACT_APP_API_URL

        if (requestOut === true || requestAccepted === true) {
            dispatch(messageAdded("Action cannot be done while a request is out"))
        } else {
            const config = {
                method: 'delete',
                url: path + '/delete',
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': "Bearer " + localStorage.getItem('access_token')
                }
            };

            function addMessage(result) {
                dispatch(messageAdded(result))
            }

            axios(config)
                .then((response) => {
                        let result = response.data.userMessage
                        addMessage(result)
                        localStorage.removeItem('access_token')
                        dispatch(invertLogIn())
                    },
                    (error) => {
                        addMessage(error.response.data.error)
                    });
            // hide sign up, log in, and intro, change state, is isLoggedIn = true, import state, from app.js
            // navigate (/account) that returns </Account> in position of Sign up and Log In
            // direct to /account
            // eslint-disable-next-line no-restricted-globals
            event.preventDefault()
        }
    }

    return (
        <div className={"delete-button-box"}>
            <button onClick={deleteProfile_} className={"delete-button"}> Delete Profile </button>
        </div>
    )
}
export default deleteProfile;