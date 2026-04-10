import { createSlice } from '@reduxjs/toolkit';

const initialState = { gapi: null, gapiClient: null };

export const googleSlice = createSlice({
  name: 'google',
  initialState,
  reducers: {
    setGapi: (state, { payload }) => {
      state.gapi = payload;
    },
    setGapiClient: (state, { payload }) => {
      state.gapiClient = payload;
    },
  },
});

export default googleSlice.reducer;
export const { setGapi, setGapiClient } = googleSlice.actions;
