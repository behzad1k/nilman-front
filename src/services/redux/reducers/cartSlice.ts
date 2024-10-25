import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {urls} from '../../endPoint';
import {api} from '../../http';
import { IOrder } from "../../types.ts";


interface ICartSlice {
  cartItems: IOrder[];
}

const initialState: ICartSlice = {
  cartItems: [],
};
export const cart = createAsyncThunk('cart/fetchCart', async () => {
  return await api(urls.cart, {}, true);
});

const cartSlice = createSlice({
  name: 'cartSlice',
  initialState,
  reducers: {
    SET_DATA: (state, action) => {
      state.cartItems = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(cart.fulfilled, (state, action) => {
      if (action.payload.code === 200) {
        state.cartItems = action.payload.data;
      }
    });
  },
});

export const {SET_DATA} = cartSlice.actions;

const cartReducer = cartSlice.reducer;
export default cartReducer;
