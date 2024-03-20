import { createSlice } from '@reduxjs/toolkit'

const initialState = false

const requestOutSlice = createSlice({
    name: 'requestOut',
    initialState,
    reducers: {
        updateRequest(state) {
            return !state
        }
    }
})


export const { updateRequest } = requestOutSlice.actions
export default requestOutSlice.reducer