import { createSlice } from "@reduxjs/toolkit";

const friendSlice = createSlice({
  name: "friends",
  initialState: [],
  reducers: {
    setFriends: (state, action) => {
      return action.payload;
    },
  },
});

export const { setFriends } = friendSlice.actions;
export default friendSlice.reducer;

export const changeFriends = (friends) => {
  return async (dispatch) => {
    dispatch(setFriends(friends));
  };
};
