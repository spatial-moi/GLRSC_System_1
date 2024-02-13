import { configureStore } from '@reduxjs/toolkit'
import geMessagesReducer from './geMessageListSlice'
import loggedInReducer from './isLoggedInSlice'
export default configureStore({
    reducer: {
        geMessages: geMessagesReducer,
        loggedIn: loggedInReducer
    },
})