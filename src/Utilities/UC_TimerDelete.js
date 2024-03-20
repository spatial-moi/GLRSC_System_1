import React from "react";
import {useDispatch, useSelector} from 'react-redux'
import { Column_useCountdown } from "./Column_useCountdown";
import axios from "axios";
import {messageAdded} from "../redux/geMessageListSlice";
import {ucAdd, ucReset} from "../redux/userConsoleMessageSlice";
import {updateMidpointReturned} from "../redux/midpointReturnedSlice";
import {incrementRefresh} from "../redux/refreshCounterSlice";

const ShowCounter = ({ minutes, seconds }) => {
    return (
        <p className="console-show-counter">
            {minutes} : {seconds}
        </p>
    );
};

// eslint-disable-next-line react-hooks/rules-of-hooks
const UC_TimerDelete = ({targetInfo, usefulKey}) => {
    const refreshCounter = useSelector(state => state.refreshCounter)
    console.log(targetInfo)
    console.log(usefulKey)
    const [minutes, seconds] = Column_useCountdown(targetInfo);
    console.log(minutes)
    console.log(seconds)
    const dispatch = useDispatch()
    if (minutes + seconds === 0 && refreshCounter == 0) {
        dispatch(incrementRefresh())
        dispatch(ucReset())
        console.log("enter execution midpoint")
        const request_info = {
            meeting_request_id: usefulKey
        };
        console.log(request_info)

        const path = process.env.REACT_APP_API_URL

        const config = {
            method: 'post',
            url: path + '/getMidpoint',
            data: request_info,
            timeout: 15000,
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': "Bearer " + localStorage.getItem('access_token')
            }
        };


        axios(config)
            .then((response) => {
                    const route_info = response.data.route_info;
                    const userMessage = response.data.userMessage;
                    console.log(route_info)
                    dispatch(ucAdd(userMessage))
                },
                (error) => {
                    console.log(error)
                    dispatch(messageAdded("An error occurred"))
                });

        // eslint-disable-next-line no-restricted-globals
        event.preventDefault()
        dispatch(updateMidpointReturned())

        return <p></p>

    } else if (minutes + seconds < 0) {
        return <p></p>

    } else {
        return (
            <ShowCounter
                minutes={minutes}
                seconds={seconds}
            />
        );
    }
};

export default UC_TimerDelete;