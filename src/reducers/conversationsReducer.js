import { createSlice } from '@reduxjs/toolkit';

const conversationsSlice = createSlice({
  name: 'conversations',
  initialState: [],
  reducers: {
    setConversations: (state, action) => action.payload,

    updateConversation: (state, action) => {
      const updatedConversation = action.payload;
      const index = state.findIndex((conv) => conv.id === updatedConversation.id);
      if (index !== -1) {
        // eslint-disable-next-line no-param-reassign
        state[index] = updatedConversation;
      }
    },
  },
});

export const { setConversations, updateConversation } = conversationsSlice.actions;
export default conversationsSlice.reducer;

export const changeConversations = (conversations) => async (dispatch) => {
  dispatch(setConversations(conversations));
};

export const updateConversations = (newGroup) => async (dispatch) => {
  dispatch(updateConversation(newGroup));
};
