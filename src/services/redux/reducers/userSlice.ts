import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {urls} from '../../endPoint.ts';
import {IAddress, IUser} from '../../types.ts';
import {api} from '../../http.ts';

interface IUserSlice {
  data: IUser;
  addresses: IAddress[];
  isLoggedIn: boolean;
}

const initialState: IUserSlice = {
  data: {
    id: 0,
    name: '',
    lastName: '',
    nationalCode: '',
    phoneNumber: '',
    role: 'USER',
  },
  addresses: [],
  isLoggedIn: false,
};
export const user = createAsyncThunk('user/fetchUser', async () => {
  return await api(urls.getUser, {}, true);
});

export const addresses = createAsyncThunk('address/fetchAddress', async () => {
  return await api(urls.address, {}, true);
});

const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    SET_LOGGED_IN: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(user.fulfilled, (state, action) => {
        if (action.payload.code == 200) {
          state.data = action.payload.data;
        }
      })
      .addCase(addresses.fulfilled, (state, action) => {
        if (action.payload.code == 200) {
          state.addresses = action.payload.data;
        }
      });
  },
});

export const {SET_LOGGED_IN} = userSlice.actions;

const userReducer = userSlice.reducer;
export default userReducer;
