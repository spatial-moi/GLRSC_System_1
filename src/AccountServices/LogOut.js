import React from "react";
import { useDispatch } from "react-redux";
import {messagesReset} from "../redux/geMessageListSlice";
import axios from "axios";
import { invertLogIn } from "../redux/isLoggedInSlice";


function logOut() {

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const dispatch = useDispatch()

    const path = process.env.REACT_APP_API_URL;
    function logOut_(event) {
        const config = {
                 method: 'post',
                   url: path + '/logout',
               headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization': "Bearer " + localStorage.getItem('access_token')
          }
      };

     function removeMessages() {
          dispatch(messagesReset())
      }

      axios(config)
          .then((response) => {
                   removeMessages()
                   localStorage.removeItem('access_token')
                   dispatch(invertLogIn())
             },
             (error) => {
                    console.log(error.response.data.error)
             });
    // hide sign up, log in, and intro, change state, is isLoggedIn = true, import state, from app.js
    // navigate (/account) that returns </Account> in position of Sign up and Log In
    // direct to /account
    // eslint-disable-next-line no-restricted-globals
        event.preventDefault()
    }

        return (
            <div className={"logout-button-box"}>
                <button onClick={logOut_} className={"logOut-button"}> Log Out </button>
            </div>
        )
}
export default logOut;