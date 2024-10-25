import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {urls} from '../../endPoint';
import { IOrder, IUser } from '../../types';
import {api} from '../../http';

interface IOrderSlice {
  orders: IOrder[]
}

const initialState: IOrderSlice = {
  orders: []
};
export const order = createAsyncThunk('order/fetchOrder', async () => {
  return await api(urls.order, {}, true);
});

const orderSlice = createSlice({
  name: 'orderSlice',
  initialState,
  reducers: {
    SET_DATA: (state, action: PayloadAction<IOrderSlice>) => {
      state = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(order.fulfilled, (state, action) => {
      if (action.payload.code === 200) {
        state.orders = action.payload.data;
      }
    });
  },
});

export const {SET_DATA} = orderSlice.actions;

const orderReducer = orderSlice.reducer;
export default orderReducer;
