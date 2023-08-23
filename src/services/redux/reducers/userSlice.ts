import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {urls} from '../../endPoint.ts';
import {IUserData} from '../../types.ts';
import {api} from '../../http.ts';

interface IUserSlice {
  data: IUserData;
}

const initialState: IUserSlice = {
  data: {
    name: '',
    lastName: '',
    nationalCode: '',
    phoneNumber: '',
    role: 'USER',
    addresses: [],
    orders: [],
  },
};
export const user = createAsyncThunk('user/fetchUser', async () => {
  return await api(urls.getUser, {}, true);
});

const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    SET_DATA: (state, action: PayloadAction<IUserData>) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(user.fulfilled, (state, action) => {
      if (action.payload.code == 200) {
        console.log(action.payload.data);

        state.data = action.payload.data;
      }
    });
  },
});

export const {SET_DATA} = userSlice.actions;

const userReducer = userSlice.reducer;
export default userReducer;
