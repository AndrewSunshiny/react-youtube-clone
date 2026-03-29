import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { options } from 'prettier-plugin-tailwindcss';

const base_url = 'https://youtube-v31.p.rapidapi.com';
const initialState = {
  videoDetails: {},
  isLoading: false,
  relatedVideos: [],
};

const getVideoDetails = createAsyncThunk(
  'redux/createVideoDetails',
  async (url) => {
    try {
      const { data } = await axios.get(`${base_url}/${url}`, options);
      return data.items[0];
    } catch (error) {
      console.log('error in getVideoDetails thunk: ', error);
    }
  },
);
const getRelatedVideos = createAsyncThunk(
  'redux/getRelatedVideos',
  async (url) => {
    try {
      const { data } = await axios.get(`${base_url}/${url}`, options);
      return data.items[0];
    } catch (error) {
      console.log('error in getRelatedVideos thunk: ', error);
    }
  },
);
const videoSlice = createSlice({
  name: 'video',
  initialState,
  reducers: {},
  extraReducers: {
    [getVideoDetails.pending]: (state) => {
      state.isLoading = true;
    },
    [getVideoDetails.fulfilled]: (state, { payload }) => {
      state.videoDetails = payload;
      state.isLoading = false;
    },
    [getVideoDetails.rejected]: (state) => {
      state.isLoading = false;
    },
    [getVideoDetails.pending]: (state) => {
      state.isLoading = true;
    },
    [getVideoDetails.fulfilled]: (state, { payload }) => {
      state.relatedVideos = payload;
      state.isLoading = false;
    },
    [getVideoDetails.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export default videoSlice.reducer;
export { getVideoDetails, getRelatedVideos };
