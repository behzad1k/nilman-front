import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {urls} from '../../endPoint.ts';
import {api} from '../../http.ts';
import {IService} from '../../types.ts';
interface serviceState {
  services: IService[];
}

const initialState: serviceState = {
  services: [],
};
export const services = createAsyncThunk('services/fetchServices', async () => {
  return await api(urls.services, {}, true);
});

export const serviceSlice = createSlice({
  name: 'serviceSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(services.fulfilled, (state, action) => {
      if (action.payload.code == 200) state.services = action.payload.data;
    });
  },
});

export const {} = serviceSlice.actions;

const serviceReducer = serviceSlice.reducer;
export default serviceReducer;
