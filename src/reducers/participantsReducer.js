import { createSlice } from "@reduxjs/toolkit";

const participantsSlice = createSlice({
  name: "participants",
  initialState: [],
  reducers: {
    setParticipants: (state, action) => {
      return action.payload;
    },
  },
});

export const { setParticipants } = participantsSlice.actions;
export default participantsSlice.reducer;

export const changeParticipants = (participants) => {
  return async (dispatch) => {
    dispatch(setParticipants(participants));
  };
};
