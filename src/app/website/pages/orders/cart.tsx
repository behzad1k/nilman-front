import { Calendar, MapPin, X } from '@phosphor-icons/react';
import moment from 'jalali-moment';
import { urls } from '../../../../services/endPoint.ts';
import { api } from "../../../../services/http.ts";
import { cart } from "../../../../services/redux/reducers/cartSlice.ts";
import { order } from "../../../../services/redux/reducers/orderSlice.ts";
import { IOrder } from "../../../../services/types.ts";
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../services/redux/store.ts';

interface ICartItemProps{
  item: IOrder
}
const CartItem = ({item}: ICartItemProps) => {
  const dispatch = useAppDispatch();
  const deleteCartItem = async (id: number) => {
    const res = await api(urls.order,{
      method: "DELETE",
      body: {
        orderId: id
      }
    }, true);

  }


  return (
    <article className="cartItemContainer">
      <span className="orderInfo">
        <p></p>
      <h3>{item.service.title}</h3>
        <X size="20" onClick={() => deleteCartItem(item.id)}/>
        </span>
      {item.attributes.map((attribute,index) =>
        <span className="orderInfo" key={index}>
          <p>{attribute.title}</p>
          <p>{attribute.price} تومان</p>
      </span>
      )}


      <span className="orderInfo dashedBottom">
      <h4>جمع کل</h4>
      <h4>  {item.price} تومان</h4>
    </span>
      <span className="orderInfo">
        <span className="orderInfoIcon">
          <MapPin size={20}/>
          {item.address?.title}
        </span>
        <span className="orderInfoIcon">
          {item.fromTime + ' - ' + item.toTime} {moment(parseInt(item.date) * 1000).format('jYYYY/jMM/jDD')}
        <Calendar size={20}/>
        </span>

      </span>
    </article>
  )
}

export default function Cart() {
  const cartItems = useAppSelector((state) => state.cartReducer.cartItems);
  const dispatch = useAppDispatch();

  const pay = async () => {
    const res = await api(urls.pay, {
      method: 'POST'
    }, true)

    if (res.code == 200){
      dispatch(cart());
      dispatch(order());
    }
  }

  return (
    <section className="cartContainer">
      {cartItems.length ? cartItems.map((order, index) => <CartItem key={index} item={order}/>):''}
      <span className="payButtom" onClick={pay}>
        پرداخت
      </span>
    </section>

  );
}
