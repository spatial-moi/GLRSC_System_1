import React, {useState } from "react";
import axios from "axios";
import { useDispatch } from 'react-redux'
import { messageAdded } from "../redux/geMessageListSlice";
import { invertLogIn } from "../redux/isLoggedInSlice";



function LogInModal( {toggleClose} ) {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch()
   // const navigate = useNavigate();
    function logIn(event) {

        var account = {
            username: username,
            password: password
        }

        const path = process.env.REACT_APP_API_URL;

        const config = {
            method: 'post',
            url: path + '/login_token',
            data: account,
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        };

        function addMessage(result) {
            dispatch(messageAdded(result))
        }

        axios(config)
            .then((response) => {
                    let result = response.data.userMessage
                    addMessage(result)
                    localStorage.setItem('access_token', response.data.access_token)
                    localStorage.setItem('username', username)
                    dispatch(invertLogIn(true))
                 //   navigate('./account');
                // set Authorization heading bear jwt
                },
                (error) => {
                    addMessage(error.response.data.error)
                });
        // hide sign up, log in, and intro, change state, is isLoggedIn = true, import state, from app.js
        // navigate (/account) that returns </Account> in position of Sign up and Log In
        // direct to /account
        event.preventDefault()
        toggleClose()
     }


     return (
        <div className="modalBackground">
         <button onClick={() => toggleClose()}> X </button>
         <h2 className="modalTitle">Log In</h2>
         <div className="modalContainer">
             <form id="accountForm" onSubmit={logIn}>
                   <label>
                     Username:
                        <input className="accountInput" type="text" value={username} name="username" text="username" onChange={e => setUsername(e.target.value)}/>
                 </label>
                 <label>
                      Password:
                      <input className="accountInput" type="text" value={password} name="password" onChange={e => setPassword(e.target.value)}/>
                    </label>
                    <button id="login-button" type="submit" onClick={logIn}> Log In</button>
             </form>
         </div>
       </div>
        )
    }
export default LogInModal;