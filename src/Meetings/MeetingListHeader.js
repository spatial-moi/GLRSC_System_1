import React from 'react'
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import { messageAdded} from "../redux/geMessageListSlice";
import { updateAcceptance } from "../redux/requestAcceptedSlice"
import {resetRequests} from "../redux/incomingRequestSlice";
import { addRequests } from "../redux/incomingRequestSlice";
import { ucReset, ucAdd } from "../redux/userConsoleMessageSlice";
import Column_Timer from "../Utilities/Column_Timer";


function MeetingListHeader() {


    const dispatch = useDispatch()
    const requestList = useSelector(state => state.requestList)


    function getRequests() {

        const path = process.env.REACT_APP_API_URL

        const config = {
            method: 'get',
            url: path + '/requests',
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': "Bearer " + localStorage.getItem('access_token')
            }
        };

        axios(config)
            .then((response) => {
                    let result = response.data.userMessage
                    dispatch(messageAdded(result))
                    dispatch(ucReset())
                    dispatch(ucAdd("Check incoming requests"))
                    if (response.data.requiredData !== undefined) {
                        const json_requests = JSON.parse(response.data.requiredData)
                        dispatch(addRequests(json_requests))
                    }
                },
                (error) => {
                    console.log(error.response.data.error)
                });

        // eslint-disable-next-line no-restricted-globals
        event.preventDefault()
    }

    function declineRequest(id){

        var request_info = {
            meeting_request_id: id
        }

        const path = process.env.REACT_APP_API_URL

        const config = {
            method: 'delete',
            url: path + '/declineRequest',
            data: request_info,
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': "Bearer " + localStorage.getItem('access_token')
            }
        };

        axios(config)
            .then((response) => {
                    dispatch(resetRequests())
                    getRequests()
                },
                (error) => {
                    dispatch(messageAdded("An error occurred"))
                });

        // eslint-disable-next-line no-restricted-globals
        event.preventDefault()
    }

    function acceptRequest(id, THEN_IN_MS){

        console.log(id)
        console.log(THEN_IN_MS)
        const request_info = {
            meeting_request_id: id
        };

        const path = process.env.REACT_APP_API_URL

        const config = {
            method: 'post',
            url: path + '/acceptRequest',
            data: request_info,
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': "Bearer " + localStorage.getItem('access_token')
            }
        };

        axios(config)
            .then((response) => {
                    dispatch(resetRequests())
                    dispatch(ucReset())
                    dispatch(ucAdd(response.data.userMessage))
                    dispatch(updateAcceptance())
                    localStorage.setItem('usefulKey', id.toString())
                    localStorage.setItem('THEN_IN_MS', THEN_IN_MS)
                },
                (error) => {
                    dispatch(messageAdded("An error occurred"))
                });

        // eslint-disable-next-line no-restricted-globals
        event.preventDefault()
    }

        const requests = requestList.map(function (request) {
            const usefulKey = request.meeting_request_id
            const THEN_IN_MS = request.created
            return <div className="MeetingListRow">
                <div className="ColumnAccountPicture">
                </div>
                <div className="ColumnAccountInfo">
                    <div><b> Name: </b>{request.firstname} {request.lastname}</div>
                    <div><b> Sex: </b>{request.sex}</div>
                    <div><b> Age: </b> {request.age}</div>
                </div>
                <div className="ColumnAccountMessage">
                    <div><b>Account Message: </b></div>
                    <div>{request.accountmessage}</div>
                </div>
                <div className="ColumnRequestTimer">
                    <div><b>Time left to respond: </b></div>
                    {/* eslint-disable-next-line react/jsx-pascal-case */}
                    <Column_Timer targetDate={THEN_IN_MS} usefulKey={usefulKey}/>
                </div>
                <div className="ColumnDeclineRequest">
                    <div className="decline-div">
                        <button id="decline-request" type="button" onClick={() => declineRequest(usefulKey)}> Decline
                        </button>
                    </div>
                </div>
                <div className="ColumnAcceptRequest">
                    <div className="accept-div">
                        <button id="accept-request" type="button" onClick={() => acceptRequest(usefulKey, THEN_IN_MS)}> Accept
                        </button>
                    </div>
                </div>
            </div>
        });


    return(
            <div className="MeetingList">
                <div className="MeetingListHeader">
                     <div className = "Meetings-Title">
                         <b> Meeting Requests: </b>
                     </div>
                     <div className="Meeting-Refresh">
                         <button id="refresh-request-button" type="button" onClick={getRequests}> Refresh Requests </button>
                     </div>
                </div>
                <div className="MeetingListSub">
                    {requests}
                </div>
            </div>
        )
}



export default MeetingListHeader;