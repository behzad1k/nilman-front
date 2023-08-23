import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {urls} from '../../endPoint.ts';
import {api} from '../../http.ts';

interface ICartSlice {
  service: string;
  attribute: string;
  addressId: number;
  time: string;
  date: number;
}

const initialState: ICartSlice = {
  service: '',
  attribute: '',
  addressId: 0,
  time: '',
  date: 0,
};
export const cart = createAsyncThunk('cart/fetchCart', async () => {
  return await api(urls.cart, {}, true);
});

const cartSlice = createSlice({
  name: 'cartSlice',
  initialState,
  reducers: {
    SET_DATA: (state, action: PayloadAction<ICartSlice>) => {
      state = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(cart.fulfilled, (state, action) => {
      console.log(action.payload);
      if (action.payload.code === 200) {
        state = action.payload.data;
      }
    });
  },
});

export const {SET_DATA} = cartSlice.actions;

const cartReducer = cartSlice.reducer;
export default cartReducer;
