import { createSlice } from '@reduxjs/toolkit'

const lightModeSlice = createSlice({
    name: "lightMode",
    initialState: false,
    reducers: {
        setLightMode: (state, action) => {
            return action.payload;
        }
    }
})

export const { setLightMode } = lightModeSlice.actions;
export default lightModeSlice.reducer;

export const changeLightMode = (boolean) => {
    return async (dispatch) => {
        dispatch(setLightMode(boolean));
    }
}