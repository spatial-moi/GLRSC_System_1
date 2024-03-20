import { createSlice } from '@reduxjs/toolkit'

const initialState = false

const midpointReturnedSlice = createSlice({
    name: 'midpointReturned',
    initialState,
    reducers: {
        updateMidpointReturned(state) {
            return !state
        }
    }
})


export const { updateMidpointReturned } = midpointReturnedSlice.actions
export default midpointReturnedSlice.reducer