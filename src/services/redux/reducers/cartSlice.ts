import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import globalType from '../../../types/globalType';
import {urls} from '../../endPoint';
import {api} from '../../http';

const initialState: globalType.ICartSlice = {
  cartItems: [],
};

export const cart = createAsyncThunk('cart/fetchCart', async () => {
  return await api(urls.cart, {}, true);
});

const cartSlice = createSlice({
  name: 'cartSlice',
  initialState,
  reducers: { },
  extraReducers: (builder) => {
    builder.addCase(cart.fulfilled, (state, action) => {
      if (action.payload.code === 200) {
        state.cartItems = [...action.payload.data];
      }
    });
  },
});


const cartReducer = cartSlice.reducer;
export default cartReducer;
