import { createSlice } from '@reduxjs/toolkit';

const initialState = { gapi: null };

export const googleSlice = createSlice({
  name: 'google',
  initialState,
  reducers: {
    setGapi: (state, { payload }) => {
      state.gapi = payload;
    },
  },
});

export default googleSlice.reducer;
export const { setGapi } = googleSlice.actions;
