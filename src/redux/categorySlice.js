import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { options } from '~utils/Fetch';

const BASE_URL = 'https://youtube-v31.p.rapidapi.com';

const initialState = {
  selectedCategory: 'Home',
  categoryVideos: [],
  isLoading: false,
  sidebarExtended: false,
};

export const getCategoryVideos = createAsyncThunk(
  'redux/categorySlice',
  async (url) => {
    try {
      const { data } = await axios.get(`${BASE_URL}/${url}`, options);
      return data.items;
    } catch (error) {
      console.log(error);
    }
  },
);

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    setSelectedCategory: (state, { payload }) => {
      state.selectedCategory = payload;
    },
    setSidebarExtendedValue: (state, { payload }) => {
      state.sidebarExtended = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCategoryVideos.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCategoryVideos.fulfilled, (state, { payload }) => {
        state.categoryVideos = payload;
        state.isLoading = false;
      })
      .addCase(getCategoryVideos.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default categorySlice.reducer;
export const { setSelectedCategory, setSidebarExtendedValue } =
  categorySlice.actions;
