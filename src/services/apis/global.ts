import { cart } from "../redux/reducers/cartSlice.ts";
import { order } from "../redux/reducers/orderSlice.ts";
import { services } from "../redux/reducers/serviceSlice.ts";
import { addresses, user } from "../redux/reducers/userSlice.ts";
import store from "../redux/store.ts";

export const initialApis = async (dispatch: any) => {
  const isLoggedIn = store.getState().userReducer.isLoggedIn
  await Promise.all([
    dispatch(services())
  ])
  if (isLoggedIn){
    await Promise.all([
      dispatch(order()),
      dispatch(cart()),
      dispatch(user()),
      dispatch(addresses())
    ])
  }
}