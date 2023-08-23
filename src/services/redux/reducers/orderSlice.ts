import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {urls} from '../../endPoint.ts';
import {IUserData} from '../../types.ts';
import {api} from '../../http.ts';

interface IOrderSlice {
  service: string;
  attribute: string;
  addressId: number;
  time: string;
  date: number;
}

const initialState: IOrderSlice = {
  service: '',
  attribute: '',
  addressId: 0,
  time: '',
  date: 0,
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
      console.log(action.payload);
      if (action.payload.code === 200) {
        state = action.payload.data;
      }
    });
  },
});

export const {SET_DATA} = orderSlice.actions;

const orderReducer = orderSlice.reducer;
export default orderReducer;
