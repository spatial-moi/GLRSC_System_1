import { createSlice } from '@reduxjs/toolkit'

const initialState = []

const routeInfoListSlice = createSlice({
    name: 'routeInfo',
    initialState,
    reducers: {
        addCoord(state, action) {
            state.push(action.payload)
        },
        resetCoord(state){
            return state = initialState
        }
    }
})


export const { addCoord } = routeInfoListSlice.actions
export const { resetCoord } = routeInfoListSlice.actions
export default routeInfoListSlice.reducer