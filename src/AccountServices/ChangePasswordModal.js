import React, { useState } from "react";
import axios from "axios";
import {useDispatch, useSelector} from 'react-redux'
import { messageAdded } from "../redux/geMessageListSlice";


function ChangePasswordModal( {toggleClose} ) {

    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const dispatch = useDispatch()
    const requestOut = useSelector(state => state.requestOut)
    const requestAccepted = useSelector(state => state.requestAccepted)
    function changePassword(event) {

        if (requestOut === true || requestAccepted === true) {
            dispatch(messageAdded("Action cannot be done while a request is out"))
            toggleClose()
        } else {
            var passwords = {
                password: password,
                new_password: newPassword
            }

            const path = process.env.REACT_APP_API_URL

            const config = {
                method: 'patch',
                url: path + '/password',
                data: passwords,
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
                    },
                    (error) => {
                        addMessage(error.response.data.error)
                    });
            event.preventDefault()
            toggleClose()
        }
    }


    return (
        <div className="modalBackground">
            <button onClick={() => toggleClose()}> X </button>
            <h2 className="modalTitle">Change Password</h2>
            <div className="modalContainer">
                <form id="accountForm">
                    <label>
                        Password:
                        <input className="accountInput" type="text" value={password} name="password" text="password" onChange={e => setPassword(e.target.value)}/>
                    </label>
                    <label>
                        New Password:
                        <input className="accountInput" type="text" value={newPassword} name="new-password" onChange={e => setNewPassword(e.target.value)}/>
                    </label>
                    <button id="change-password-button" type="submit" onClick={changePassword}> Change Password </button>
                </form>
            </div>
        </div>
    )
}

export default ChangePasswordModal;