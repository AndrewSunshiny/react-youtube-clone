import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import ChannelDetails from '~pages/ChannelDetails';
import { options } from '~utils/Fetch';

const BASE_URL = 'https://youtube-v31.p.rapidapi.com';
const initialState = {
  channelVideos: [],
  isLoading: false,
  ChannelDetails: '',
};

const getChannelVideos = createAsyncThunk(
  'redux/getChannelVideos',
  async (url) => {
    try {
      const { data } = await axios.get(`${BASE_URL}/${url}`, options);
      return data.items;
    } catch (error) {
      console.log(console.error(error));
    }
  },
);
const getChannelDetails = createAsyncThunk(
  'redux/getChannelDetails',
  async (url) => {
    try {
      const { data } = await axios.get(`${BASE_URL}/${url}`, options);
      return data.items[0];
    } catch (error) {
      console.error('error in getChannelVideos thunk: ', error);
    }
  },
);
const channelSlice = createSlice({
  name: 'channel',
  initialState,
  reducers: {},
  extraReducers: {
    [getChannelVideos.pending]: (state) => {
      state.isLoading = true;
    },
    [getChannelVideos.fulfilled]: (state, { payload }) => {
      state.channelVideos = payload;
      state.isLoading = false;
    },
    [getChannelVideos.rejected]: (state) => {
      console.log('request rejected');
      state.isLoading = false;
    },
    [getChannelDetails.pending]: (state) => {
      state.isLoading = true;
    },
    [getChannelDetails.fulfilled]: (state, { payload }) => {
      state.channelVideos = payload;
      state.isLoading = false;
    },
    [getChannelDetails.rejected]: (state) => {
      console.log('request rejected');
      state.isLoading = false;
    },
  },
});

export default channelSlice.reducer;
export { channelSlice, getChannelVideos, getChannelDetails };
