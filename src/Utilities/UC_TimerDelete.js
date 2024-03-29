import React from "react";
import {useDispatch, useSelector} from 'react-redux'
import { Column_useCountdown } from "./Column_useCountdown";
import axios from "axios";
import {messageAdded} from "../redux/geMessageListSlice";
import {ucAdd, ucReset} from "../redux/userConsoleMessageSlice";
import {updateMidpointReturned} from "../redux/midpointReturnedSlice";
import {incrementRefresh} from "../redux/refreshCounterSlice";
import {addCoord} from "../redux/routeInfoListSlice";

const ShowCounter = ({ minutes, seconds }) => {
    return (
        <p className="console-show-counter">
            {minutes} : {seconds}
        </p>
    );
};

const UC_TimerDelete = ({targetInfo, usefulKey}) => {
    const refreshCounter = useSelector(state => state.refreshCounter)
    const [minutes, seconds] = Column_useCountdown(targetInfo);
    const dispatch = useDispatch()
    if (minutes + seconds === 0 && refreshCounter == 0) {
        dispatch(incrementRefresh())
        dispatch(ucReset())
        const request_info = {
            meeting_request_id: usefulKey
        };

        const path = process.env.REACT_APP_API_URL

        const config = {
            method: 'post',
            url: path + '/getMidpoint',
            data: request_info,
            timeout: 25000,
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': "Bearer " + localStorage.getItem('access_token')
            }
        };


        axios(config)
            .then((response) => {
                    const route_info = response.data.route_info;
                    const user_location = route_info[0]
                    const midpoint_location = route_info[1]

                    // latitude, longitude, latitude, longitude
                    dispatch(addCoord(user_location[0]))
                    dispatch(addCoord(user_location[1]))
                    dispatch(addCoord(midpoint_location[0]))
                    dispatch(addCoord(midpoint_location[1]))
                    const userMessage = response.data.userMessage;
                    dispatch(ucAdd(userMessage))
                },
                (error) => {
                    console.log(error)
                    dispatch(messageAdded("An error occurred"))
                })
            .finally(() => {
                dispatch(updateMidpointReturned())
            });

        // eslint-disable-next-line no-restricted-globals
        event.preventDefault()

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