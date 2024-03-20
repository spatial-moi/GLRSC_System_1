import { createSlice } from '@reduxjs/toolkit'

const initialState = []

const incomingRequestSlice = createSlice({
    name: 'requestList',
    initialState,
    reducers: {
        addRequests(state, action) {
               if (action.payload !== undefined) {
                   return action.payload
            } else {
                   return initialState
               }

        },
        resetRequests(state) {
            return state = initialState
        }
    }
})


export const { addRequests } = incomingRequestSlice.actions
export const { resetRequests } = incomingRequestSlice.actions
export default incomingRequestSlice.reducer