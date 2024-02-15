import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from 'react-redux'
import { messageAdded } from "../redux/geMessageListSlice";


function ChangePasswordModal( {toggleClose} ) {

    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const dispatch = useDispatch()
    // const navigate = useNavigate();
    function changePassword(event) {

        var passwords = {
            password: password,
            new_password: newPassword
        }

        const config = {
            method: 'patch',
            url: '/password',
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


    return (
        <div className="modalBackground">
            <button onClick={() => toggleClose()}> X </button>
            <h2 className="modalTitle">Log In</h2>
            <div className="modalContainer">
                <form id="accountForm" onSubmit={changePassword}>
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