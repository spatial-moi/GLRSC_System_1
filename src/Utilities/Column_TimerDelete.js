import React from "react";
import {useDispatch} from 'react-redux'
import { Column_useCountdown } from "./Column_useCountdown";
import DateTimeDisplay from "./DateTimeDisplay"
import {resetRequests} from "../redux/incomingRequestSlice";
import axios from "axios";
import {messageAdded} from "../redux/geMessageListSlice";

const ShowCounter = ({ minutes, seconds }) => {
    return (
        <div className="requests-show-counter">
            <DateTimeDisplay value={minutes} type={'Mins'} isDanger={false} />
            <p>:</p>
            <DateTimeDisplay value={seconds} type={'Seconds'} isDanger={false} />
        </div>
    );
};

const Column_TimerDelete = ({ targetDate, usefulKey }) => {
    const targetInfo = new Date(targetDate).getTime()
    const [ minutes, seconds] = Column_useCountdown(targetInfo);
    const dispatch = useDispatch()

    if (minutes + seconds <= 0) {
        dispatch(resetRequests())

        var request_info = {
            meeting_request_id: usefulKey
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

                },
                (error) => {
                    dispatch(messageAdded("An error occurred"))
                });

        // eslint-disable-next-line no-restricted-globals
        event.preventDefault()
    } else {
        return (
            <ShowCounter
                minutes={minutes}
                seconds={seconds}
            />
        );
    }
};

export default Column_TimerDelete;