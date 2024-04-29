import { configureStore } from '@reduxjs/toolkit'
import geMessagesReducer from './geMessageListSlice'
import loggedInReducer from './isLoggedInSlice'
import isLocatedSlice from "./isLocatedSlice";
import ucMessageReducer from "./userConsoleMessageSlice"
import requestOutSlice from "./requestOutSlice";
import refreshCounterSlice from "./refreshCounterSlice";
import incomingRequestSlice from "./incomingRequestSlice";
import requestAcceptedSlice from "./requestAcceptedSlice";
import midpointReturnedSlice from "./midpointReturnedSlice";
import routeInfoListSlice from "./routeInfoListSlice";
export default configureStore({
    reducer: {
        geMessages: geMessagesReducer,
        loggedIn: loggedInReducer,
        isLocated: isLocatedSlice,
        ucMessage: ucMessageReducer,
        requestOut: requestOutSlice,
        refreshCounter: refreshCounterSlice,
        requestList: incomingRequestSlice,
        requestAccepted: requestAcceptedSlice,
        midpointReturned: midpointReturnedSlice,
        routeInfo: routeInfoListSlice
    },
})

