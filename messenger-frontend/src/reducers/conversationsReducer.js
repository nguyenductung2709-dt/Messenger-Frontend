import { createSlice } from "@reduxjs/toolkit";

const conversationsSlice = createSlice({
    name: "conversations",
    initialState: [],
    reducers: {
        setConversations: (state, action) => {
            return action.payload
        }
    }
})

export const { setConversations } = conversationsSlice.actions;
export default conversationsSlice.reducer;

export const changeConversations = (conversations) => {
    return async (dispatch) => {
        dispatch(setConversations(conversations))
    }
}