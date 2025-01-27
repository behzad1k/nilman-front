import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import { extractChildren } from '../../../utils/utils';
import {urls} from '../../endPoint';
import {api} from '../../http';
import globalType from '../../../types/globalType';
interface serviceState {
  services: globalType.Service[];
  allServices: globalType.Service[];
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
