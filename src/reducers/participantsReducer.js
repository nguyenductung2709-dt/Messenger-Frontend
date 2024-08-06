import { createSlice } from '@reduxjs/toolkit';

const participantsSlice = createSlice({
  name: 'participants',
  initialState: [],
  reducers: {
    setParticipants: (state, action) => action.payload,
  },
});

export const { setParticipants } = participantsSlice.actions;
export default participantsSlice.reducer;

export const changeParticipants = (participants) => async (dispatch) => {
  dispatch(setParticipants(participants));
};
