import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { options } from '~utils/Fetch';

const initialState = {
  searchResults: [],
  isLoading: false,
};
const BASE_URL = 'https://youtube-v31.p.rapidapi.com';

const searchById = createAsyncThunk('redux/searchById', async (url) => {
  try {
    const data = await axios.get(`${BASE_URL}/${url}`, options);
    return data.items;
  } catch (error) {
    console.error('error in searchById thunk: ', error);
  }
});
const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {},
  extraReducers: {
    [searchById.pending]: (state) => {
      state.isLoading = true;
    },
    [searchById.fulfilled]: (state, { payload }) => {
      state.searchResults = payload;
      state.isLoading = false;
    },
    [searchById.rejected]: (state) => {
      state.isLoading = false;
      console.log('request rejected');
    },
  },
});

export default searchSlice.reducer;
export { searchById };
