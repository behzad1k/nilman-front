import { urls } from "../endPoint.ts";
import { api } from "../http.ts";
import { cart } from "../redux/reducers/cartSlice.ts";
import { order } from "../redux/reducers/orderSlice.ts";
import { services } from "../redux/reducers/serviceSlice.ts";
import { addresses, SET_LOGGED_IN, user } from "../redux/reducers/userSlice.ts";
import store from "../redux/store.ts";

export const initialApis = async (dispatch: any) => {
  const isLoggedIn = await api(urls.getUser, {}, true)
  dispatch(SET_LOGGED_IN(true))
  await Promise.all([
    dispatch(services())
  ])
  if (isLoggedIn){
    userApis(dispatch)
  }
}
export const userApis = async (dispatch: any) => {
  await Promise.all([
    dispatch(order()),
    dispatch(cart()),
    dispatch(user()),
    dispatch(addresses())
  ])
}