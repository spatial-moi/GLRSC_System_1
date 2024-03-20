import { createSlice } from '@reduxjs/toolkit'

const initialState = []

const ucMessageSlice = createSlice({
    name: 'ucMessage',
    initialState,
    reducers: {
        ucAdd(state, action) {
            state.push(action.payload)
        },
        ucReset(state){
            return state = initialState
        }
    }
})

export const { ucAdd } = ucMessageSlice.actions
export const { ucReset } = ucMessageSlice.actions
export default ucMessageSlice.reducer