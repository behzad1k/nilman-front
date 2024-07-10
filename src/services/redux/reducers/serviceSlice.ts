import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import { extractChildren } from '../../../utils/utils.ts';
import {urls} from '../../endPoint.ts';
import {api} from '../../http.ts';
import {IService} from '../../types.ts';
interface serviceState {
  services: IService[];
  allServices: IService[];
}

const initialState: serviceState = {
  allServices: [],
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
      if (action.payload.code == 200) {
        const sortedData = [];

        action.payload.data.map(e => extractChildren(e, sortedData));

        state.allServices = sortedData;
        state.services = action.payload.data;
      }
    });
  },
});

export const {} = serviceSlice.actions;

const serviceReducer = serviceSlice.reducer;
export default serviceReducer;
