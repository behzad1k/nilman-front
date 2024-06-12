import Cookies from 'js-cookie';
import {urls} from '../endPoint.ts';
import {api} from '../http.ts';
import {cart} from '../redux/reducers/cartSlice.ts';
import { posts } from '../redux/reducers/globalSlice.ts';
import {order} from '../redux/reducers/orderSlice.ts';
import {services} from '../redux/reducers/serviceSlice.ts';
import { addresses, SET_LOGGED_IN, user } from '../redux/reducers/userSlice.ts';
import {SET_LOADING} from '../redux/reducers/loadingSlice.ts';

export const initialApis = async (dispatch: any) => {
  dispatch(SET_LOADING(true));
  await Promise.all([
    dispatch(services()),
  ]);

  if (Cookies.get('token')) {
    const res = await api(urls.getUser, {}, true);
    if (res.code == 200) {
      dispatch(SET_LOGGED_IN(true))
      userApis(dispatch);
      dispatch(user(res.data))
    } else {
      // Cookies.remove('token');
    }
  }
  dispatch(SET_LOADING(false));
  dispatch(posts())

};
export const userApis = async (dispatch: any) => {
  await Promise.all([
    dispatch(order()),
    dispatch(cart()),
    dispatch(addresses()),
  ]);
};

export const logout = (dispatch: any) => {
  dispatch(SET_LOGGED_IN(false));
  Cookies.remove('token');
  // window.location.reload();
};
