import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {combineReducers} from 'redux';
import {configureStore} from '@reduxjs/toolkit';
import serviceReducer from './reducers/serviceSlice';
import userReducer from './reducers/userSlice';
import orderReducer from './reducers/orderSlice';
import cartReducer from './reducers/cartSlice';
import loadingReducer from './reducers/loadingSlice';
import globalReducer from './reducers/globalSlice';

const rootReducer = combineReducers({
  userReducer,
  serviceReducer,
  orderReducer,
  cartReducer,
  loadingReducer,
  globalReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>

    getDefaultMiddleware({
      immutableCheck: true,  // Force immutability checks even in production
      serializableCheck: true, // Force serialization checks even in production
    }),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useAppDispatch = () => useDispatch<AppDispatch>();
