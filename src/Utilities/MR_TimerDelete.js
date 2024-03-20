import React, {useState} from "react";
import {useDispatch, useSelector} from 'react-redux'
import { MR_useCountdown } from "./MR_useCountdown";
import DateTimeDisplay from "./DateTimeDisplay"
import MeetingRequest from "../Meetings/MeetingRequest";
import { updateRequest } from "../redux/requestOutSlice";
import {messageAdded} from "../redux/geMessageListSlice";
import axios from "axios";
import {ucAdd, ucReset} from "../redux/userConsoleMessageSlice";
import Midpoint_Router from "../RoutingService/Midpoint_Router";


const ShowCounter = ({ minutes, seconds }) => {
    return (
        <div className="show-counter">
                <DateTimeDisplay value={minutes} type={'Mins'} isDanger={false} />
                <p>:</p>
                <DateTimeDisplay value={seconds} type={'Seconds'} isDanger={false} />
        </div>
    );
};

const MR_TimerDelete = ({ targetDate }) => {
        const [ minutes, seconds] = MR_useCountdown(targetDate);
        const requestOut = useSelector(state => state.requestOut)

        const dispatch = useDispatch()
        if (minutes + seconds <= 0 && requestOut === true) {
            dispatch(updateRequest())

            const config2 = {
                method: 'patch',
                url: '/getOwnerMidpoint',
                timeout: 15000,
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': "Bearer " + localStorage.getItem('access_token')
                }
            }

            axios(config2)
                .then((response) => {
                        let result = response.data.userMessage
                        let route_info = response.data.route_info
                        console.log(route_info)
                        dispatch(ucReset())
                        dispatch(ucAdd(result))
                    },
                    (error) => {
                        dispatch(messageAdded("An error has occured"))
                    });

            const config = {
                method: 'delete',
                url: '/delete_request',
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': "Bearer " + localStorage.getItem('access_token')
                }
            };

            axios(config)
                .then((response) => {
                        let result = response.data.userMessage
                    },
                    (error) => {
                        dispatch(messageAdded(error.response.data.error))
                    });

                return(
                    < MeetingRequest />
                );

        } else {
            return (
                <ShowCounter
                    minutes={minutes}
                    seconds={seconds}
                />
            );
        }
    };

export default MR_TimerDelete;