import { createSlice } from '@reduxjs/toolkit';

export const paymentSlice = createSlice({
  name: 'payment',
  initialState: {
    referenceID: null,
    paymentData: null
  },
  reducers: {
    setPaymentData: (state, action) => {
      state.paymentData = action.payload;
    },
    setReferenceID: (state, action) => {
      state.referenceID = action.payload;
    }
  }
});

export const { setPaymentData, setReferenceID } = paymentSlice.actions;

const paymentReducer = paymentSlice.reducer
export default paymentReducer;