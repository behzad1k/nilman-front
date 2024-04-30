import Cookies from 'js-cookie';
import {urls} from '../endPoint.ts';
import {api} from '../http.ts';
import {cart} from '../redux/reducers/cartSlice.ts';
import {order} from '../redux/reducers/orderSlice.ts';
import {services} from '../redux/reducers/serviceSlice.ts';
import {addresses, SET_LOGGED_IN, user} from '../redux/reducers/userSlice.ts';
import {SET_LOADING} from '../redux/reducers/loadingSlice.ts';

export const initialApis = async (dispatch: any) => {
  dispatch(SET_LOADING(true));
  await Promise.all([dispatch(services())]);

  const res = await api(urls.getUser, {}, true);

  if (res.code == 200) {
    dispatch(SET_LOGGED_IN(true));
    userApis(dispatch);
  }
  dispatch(SET_LOADING(false));
};
export const userApis = async (dispatch: any) => {
  dispatch(SET_LOADING(true));
  await Promise.all([
    dispatch(order()),
    dispatch(cart()),
    dispatch(user()),
    dispatch(addresses()),
  ]);
  dispatch(SET_LOADING(false));
};

export const logout = (dispatch: any) => {
  dispatch(SET_LOGGED_IN(false));
  Cookies.remove('token');
  // window.location.reload();
};
