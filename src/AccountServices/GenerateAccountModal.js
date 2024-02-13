import React, { useState } from 'react'
import axios from "axios";
import { useDispatch } from 'react-redux'
import { messageAdded} from "../redux/geMessageListSlice";

function GenerateAccountModal ({toggleClose}) {

   const [username, setUsername] = useState('');
   const [password, setPassword] = useState('');
   const [dob, setDob] = useState('');
   const [city, setCity] = useState('');
   const [sex, setSex] = useState('');
   const [firstName, setFirstName] = useState('');
   const [lastName, setLastName] = useState('');
   const dispatch = useDispatch()

        function generateAccount(event) {
            var account = {
                username: username,
                password: password,
                dob: dob,
                city: city,
                sex: sex,
                firstname: firstName,
                lastname: lastName
            }

            const config = {
                url: '/generate',
                method: 'post',
                data: account,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },

            };

            function addMessage(result) {
                dispatch(messageAdded(result))
            }

            console.log(account)

            axios.defaults.timeout = 5000;
            axios(config)
                .then((response) => {
                        let result = response.data.userMessage
                        addMessage(result)
                    },
                    (error) => {
                        console.log(error.response)
                        if (error.response === undefined) {
                            addMessage("Unknown Error")
                        }
                            else
                                addMessage(error.response.data.error)
                    });

            event.preventDefault()
            toggleClose()
        }

     return (
            <div className="modalBackground">
                <button onClick={() => toggleClose()}> X </button>
                <h2 className="modalTitle">Create Account</h2>
                <div className="modalContainer">
                    <form id="accountForm" onSubmit={generateAccount}>
                        <label>
                            Username:
                            <input className="accountInput" type="text" value={username} name="username" text="username" onChange={e => setUsername(e.target.value)}/>
                        </label>
                        <label>
                            Password:
                            <input className="accountInput" type="text" value={password} name="password" onChange={e => setPassword(e.target.value)}/>
                        </label>
                        <label>
                            DOB:
                            <input className="accountInput" type="date" value={dob} name="dob" onChange={e => setDob(e.target.value)}/>
                        </label>
                        <label>
                            City:
                            <input className="accountInput" type="text" value={city} name="city" onChange={e => setCity(e.target.value)}/>
                        </label>
                        <label>
                            Sex:
                            <input className="accountInput" type="text" value={sex} name="sex" onChange={e => setSex(e.target.value)}/>
                        </label>
                        <label>
                            First Name:
                            <input className="accountInput" type="text" value={firstName} name="firstName" onChange={e => setFirstName(e.target.value)}/>
                        </label>
                        <label>
                            Last Name:
                            <input className="accountInput" type="text" value={lastName} name="lastName" onChange={e => setLastName(e.target.value)}/>
                        </label>
                            <button id="generate-account-button" type="submit" onClick={generateAccount}> Generate Account</button>
                    </form>
                </div>
            </div>
        )
}
export default GenerateAccountModal;