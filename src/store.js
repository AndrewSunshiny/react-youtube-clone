import { configureStore } from '@reduxjs/toolkit';
import googleSlice from '~redux/googleSlice';
import categorySlice from '~redux/categorySlice';
import channelSlice from '~redux/channelSlice';
import searchSlice from '~redux/searchSlice';
import videoSlice from '~redux/videoSlice';

const store = configureStore({
  reducer: {
    google: googleSlice,
    category: categorySlice,
    channel: channelSlice,
    search: searchSlice,
    video: videoSlice,
  },
});
export default store;
