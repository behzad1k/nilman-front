import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IUserData} from '../../types.ts';

interface IUserSlice {
  data: IUserData;
  // likes: ILike[],
  token: string;
}

const initialState: IUserSlice = {
  data: {
    name: '',
    username: '',
    email: '',
    imageUrl: ''

  },
  token: '',
};

const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    SET_DATA: (state, action: PayloadAction<IUserData>) => {
      state.data = action.payload;
    },
    SET_TOKEN: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
  },
});

export const {SET_DATA, SET_TOKEN} = userSlice.actions;

const userReducer = userSlice.reducer;
export default userReducer;
