import { createSlice } from '@reduxjs/toolkit';

const messageSlice = createSlice({
  name: 'messages',
  initialState: [],
  reducers: {
    setMessages: (state, action) => action.payload,
  },
});

export const { setMessages } = messageSlice.actions;
export default messageSlice.reducer;

export const changeMessages = (messages) => async (dispatch) => {
  dispatch(setMessages(messages));
};
