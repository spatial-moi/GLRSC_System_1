import { createSlice } from '@reduxjs/toolkit'

const initialState = false

const locatedSlice = createSlice({
    name: 'isLocated',
    initialState,
    reducers: {
        locate(state) {
            return !state
        }
    }
})


export const { locate } = locatedSlice.actions
export default locatedSlice.reducer