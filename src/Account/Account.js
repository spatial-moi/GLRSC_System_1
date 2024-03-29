import React from 'react'
import axios from "axios";
import {messageAdded} from "../redux/geMessageListSlice";
import {useDispatch, useSelector} from 'react-redux'
import { useState, useEffect } from "react";
import { locate } from "../redux/isLocatedSlice";
import { ucReset } from "../redux/userConsoleMessageSlice";


function Account() {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [userName, setUserName] = useState('')
    const [dob, setDob] = useState(null)
    const [city, setCity] = useState('')
    const [sex, setSex] = useState('')
    const dispatch = useDispatch();
    const [lat, setLat] = useState(null);
    const [long, setLong] = useState(null);

    const requestOut = useSelector(state => state.requestOut)
    const requestAccepted = useSelector(state => state.requestAccepted)


    // useEffect used to get account details
    useEffect(() => {

        // call api or anything
        const path = process.env.REACT_APP_API_URL
        const config = {
            method: 'get',
            url: path + '/account',
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': "Bearer " + localStorage.getItem('access_token')
            }
        };

        // add Message part of useEffect, triggered in same scope, adds message to Geoprocessing Engine via Redux

        // Axios Manager rol, sets variables from response, calls add Message, captures errors in axios request
        axios(config)
            .then((response) => {
                    // eslint-disable-next-line react/no-direct-mutation-state
                    setFirstName(response.data.firstname)
                    // eslint-disable-next-line react/no-direct-mutation-state
                    setLastName(response.data.lastname)
                    // eslint-disable-next-line react/no-direct-mutation-state
                    setUserName(response.data.username)
                    setDob(response.data.dob)
                    setCity(response.data.city)
                    setSex(response.data.sex)
                },
                (error) => {
                    console.log(error.response.data.error)
                });

        // eslint-disable-next-line no-restricted-globals
        event.preventDefault()

    });

    // seperate from useEffect get account, account details, add Message functions.
    // grab Location stores users location

    function storelocation() {
        if (requestOut === true || requestAccepted === true) {
            dispatch(messageAdded("Action cannot be done while a request is out"))
        }
        else if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(success, error);
        } else {
        }
    }
    function success(position) {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const coords = {
            latitude: latitude,
            longitude: longitude
        };

        const path = process.env.REACT_APP_API_URL
        const config = {
            method: 'patch',
            url: path + '/store_location',
            data: coords,
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': "Bearer " + localStorage.getItem('access_token')
            }
        };
        axios(config)
            .then((response) => {
                    let result = response.data.userMessage
                    dispatch(messageAdded(result))
                    setLat(response.data.latitude)
                    // eslint-disable-next-line react/no-direct-mutation-state
                    setLong(response.data.longitude)
                    // eslint-disable-next-line no-restricted-globals
                    dispatch(locate())
                    dispatch(ucReset())
                }
            );

        // eslint-disable-next-line no-restricted-globals
    }

    function error(error) {
        console.log("Error occured")
        dispatch(messageAdded(error.response.data.error))
    }

        return(
            <div className="account-profile">
                <div className="account-profile-picture">

                </div>
                <div className="account-details">
                    <p className="account-detail-components"> <b> Name: </b> {firstName}  {lastName}</p>
                    <p className="account-detail-components"> <b> Sex: </b> {sex} </p>
                    <p className="account-detail-components"> <b> Username: </b> {userName}</p>
                    <p className="account-detail-components"> <b> DOB: </b> {dob}</p>
                    <p className="account-detail-components"> <b> City: </b> {city}</p>
                    <p className="account-detail-components"> <button onClick={storelocation} className={"store-location-button"}> Location </button> : {lat}, {long}</p>
                </div>
            </div>
        )
    }


export default Account