import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {urls} from '../../endPoint';
import {api} from '../../http';
import globalType from '../../../types/globalType';


const initialState = {
  data: {
    id: 0,
    name: '',
    lastName: '',
    nationalCode: '',
    phoneNumber: '',
    role: 'USER',
    profilePic: { url: ''},
    isWorkerChoosable: false
  },
  addresses: [],
  workers: [],
  isLoggedIn: false,
};
export const addresses = createAsyncThunk('address/fetchAddress', async () => {
  return await api(urls.address, {}, true);
});
export const getWorkers = createAsyncThunk('worker/fetchWorkers', async () => {
  return await api(urls.userWorkers, {}, true);
});

const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    SET_LOGGED_IN: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
    },
    user: (state, action: PayloadAction<any>) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addresses.fulfilled, (state, action) => {
        if (action.payload.code == 200) {
          state.addresses = action.payload.data;
        }
      })
      .addCase(getWorkers.fulfilled, (state, action) => {
        if (action.payload.code == 200) {
          state.workers = action.payload.data;
        }
      });
  },
});

export const {SET_LOGGED_IN, user} = userSlice.actions;

const userReducer = userSlice.reducer;
export default userReducer;
