import { createSlice } from '@reduxjs/toolkit'

const initialState = 0

const refreshCounterSlice = createSlice({
    name: 'refreshCounter',
    initialState,
    reducers: {
        incrementRefresh(state) {
            return state += 1;
        }
    }
})


export const { incrementRefresh } = refreshCounterSlice.actions
export default refreshCounterSlice.reducer