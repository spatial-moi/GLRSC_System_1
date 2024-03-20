import { createSlice } from '@reduxjs/toolkit'

const initialState = false

const requestAcceptedSlice = createSlice({
    name: 'requestAccepted',
    initialState,
    reducers: {
        updateAcceptance(state) {
            return !state
        }
    }
})


export const { updateAcceptance } = requestAcceptedSlice.actions
export default requestAcceptedSlice.reducer