import { createSlice } from '@reduxjs/toolkit';

const conversationSlice = createSlice({
  name: 'selectedConversation',
  initialState: null,
  reducers: {
    setSelectedConversation: (state, action) => action.payload,
  },
});

export const { setSelectedConversation } = conversationSlice.actions;
export default conversationSlice.reducer;

export const changeSelectedConversation = (conversation) => async (dispatch) => {
  dispatch(setSelectedConversation(conversation));
};
