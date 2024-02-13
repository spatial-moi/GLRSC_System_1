import { createSlice } from '@reduxjs/toolkit'

const initialState = false

const loggedInSlice = createSlice({
    name: 'isLoggedIn',
    initialState,
    reducers: {
        invertLogIn(state) {
            return !state
        }
    }
})


export const { invertLogIn } = loggedInSlice.actions
export default loggedInSlice.reducer