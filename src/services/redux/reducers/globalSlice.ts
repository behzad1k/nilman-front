import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {urls} from '../../endPoint.ts';
import {api} from '../../http.ts';
import { IOrder } from "../../types.ts";


interface IGlobalSlice {
  postCategories: any[];
}

const initialState: IGlobalSlice = {
  postCategories: [],
};
export const posts = createAsyncThunk('Posts/fetchPosts', async () => {
  return await api(urls.posts, {});
});

const GlobalSlice = createSlice({
  name: 'GlobalSlice',
  initialState,
  reducers: {
    SET_DATA: (state, action) => {
      state.postCategories = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(posts.fulfilled, (state, action) => {
      if (action.payload.code === 200) {
        state.postCategories = action.payload.data;
      }
    });
  },
});

export const {SET_DATA} = GlobalSlice.actions;

const GlobalReducer = GlobalSlice.reducer;
export default GlobalReducer;
