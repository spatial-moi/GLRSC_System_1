import React from "react";
import {useDispatch, useSelector} from 'react-redux'
import { MR_useCountdown } from "./MR_useCountdown";
import DateTimeDisplay from "./DateTimeDisplay"
import MeetingRequest from "../Meetings/MeetingRequest";
import { updateRequest } from "../redux/requestOutSlice";
import {messageAdded} from "../redux/geMessageListSlice";
import axios from "axios";
import {ucAdd, ucReset} from "../redux/userConsoleMessageSlice";
import {updateMidpointReturned} from "../redux/midpointReturnedSlice";
import {addCoord} from "../redux/routeInfoListSlice";

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

            const path = process.env.REACT_APP_API_URL

            const config2 = {
                method: 'patch',
                url: path + '/getOwnerMidpoint',
                timeout: 50000,
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': "Bearer " + localStorage.getItem('access_token')
                }
            }

            axios(config2)
                .then((response) => {
                        let result = response.data.userMessage
                        let route_info = response.data.route_info
                        const user_location = route_info[0]
                        const midpoint_location = route_info[1]

                        // latitude, longitude, latitude, longitude
                        dispatch(addCoord(user_location[0]))
                        dispatch(addCoord(user_location[1]))
                        dispatch(addCoord(midpoint_location[0]))
                        dispatch(addCoord(midpoint_location[1]))
                        dispatch(ucReset())
                        dispatch(ucAdd(result))
                    },
                    (error) => {
                        dispatch(messageAdded("An error has occurred"))
                    })
                .finally(() => {
                    dispatch(updateMidpointReturned())
                });

            const config = {
                method: 'delete',
                url: path + '/delete_request',
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