import { createSlice } from '@reduxjs/toolkit'

const initialState = []

const geMessagesSlice = createSlice({
    name: 'geMessageList',
    initialState,
    reducers: {
        messageAdded(state, action) {
            state.push(action.payload)
        },
        messagesReset(state){
            return state = initialState
        }
    }
})


export const { messageAdded } = geMessagesSlice.actions
export const { messagesReset } = geMessagesSlice.actions
export default geMessagesSlice.reducer