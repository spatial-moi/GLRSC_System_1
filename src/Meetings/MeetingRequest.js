import React, {useState} from 'react'
import {messageAdded} from "../redux/geMessageListSlice";
import axios from "axios";
import { useDispatch } from 'react-redux'
import { ucAdd } from "../redux/userConsoleMessageSlice";
import { updateRequest } from "../redux/requestOutSlice";

function MeetingRequest() {

    const [accountMessage, setAccountMessage] = useState('');
    const dispatch = useDispatch()


    function sendRequest(event) {

        var request = {
            message: accountMessage
        }

        const path = process.env.REACT_APP_API_URL

        const config = {
            url: path + '/send_request',
            method: 'post',
            data: request,
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': "Bearer " + localStorage.getItem('access_token')
            },

        };

        function addMessage(result) {
            dispatch(messageAdded(result))
        }

        axios.defaults.timeout = 5000;
        axios(config)
            .then((response) => {
                    let result = response.data.userMessage
                    addMessage(result)
                    dispatch(ucAdd("Wait 15 min for user responses"))
                    dispatch(updateRequest())
                },
                (error) => {
                    console.log(error.response)
                    if (error.response === undefined) {
                        addMessage("Unknown Error")
                    } else
                        addMessage(error.response.data.error)
                });
        event.preventDefault()
    }
        return(
            <div className="MeetingRequest">
                <form>
                    <label>
                        <p className="accountMessage"> <b> Account Message: </b>  (75 Character Limit)</p>
                        <textarea className="messageInput" value={accountMessage} name="accountMessage"
                                  maxLength={75} minLength={2} placeholder={"Type the reason for the request." +
                            " Why do you want to meet?"} rows={8} cols={35} onChange={e =>
                            setAccountMessage(e.target.value)}/>
                    </label>
                    <br></br>
                    <div className={"send-request-button-box"}>
                    <button id="send-request-button" type="button" onClick={sendRequest}> Send Request </button>
                    </div>
                </form>
            </div>
        )
}


export default MeetingRequest;