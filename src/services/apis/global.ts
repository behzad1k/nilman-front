import Cookies from 'js-cookie';
import {urls} from '../endPoint';
import {api} from '../http';
import {cart} from '../redux/reducers/cartSlice';
import { colors, posts } from '../redux/reducers/globalSlice';
import {order} from '../redux/reducers/orderSlice';
import {services} from '../redux/reducers/serviceSlice';
import { addresses, getWorkers, SET_LOGGED_IN, user } from '../redux/reducers/userSlice';
import {SET_LOADING} from '../redux/reducers/loadingSlice';

export const initialApis = async (dispatch: any) => {
  dispatch(SET_LOADING(true));
  await Promise.all([
    dispatch(services()),
  ]);
  if (Cookies.get('token')) {
    const res = await api(urls.getUser, {}, true);
    if (res.code == 200) {
      dispatch(SET_LOGGED_IN(true))
      await userApis(dispatch);
      dispatch(user(res.data))
    } else {
      // Cookies.remove('token');
    }
  }
  dispatch(SET_LOADING(false));
  dispatch(colors())
  // dispatch(posts())

};
export const userApis = async (dispatch: any) => {
  await Promise.all([
    dispatch(order()),
    dispatch(cart()),
    dispatch(getWorkers()),
    dispatch(addresses()),
  ]);
};

export const logout = (dispatch: any) => {
  dispatch(SET_LOGGED_IN(false));
  Cookies.remove('token');
  // window.location.reload();
};
