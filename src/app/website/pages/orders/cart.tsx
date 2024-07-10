import {Calendar, MapPin, X} from '@phosphor-icons/react';
import moment from 'jalali-moment';
import { toast } from 'react-toastify';
import {urls} from '../../../../services/endPoint.ts';
import {api} from '../../../../services/http.ts';
import {cart} from '../../../../services/redux/reducers/cartSlice.ts';
import {order} from '../../../../services/redux/reducers/orderSlice.ts';
import {IOrder} from '../../../../services/types.ts';
import {useAppDispatch, useAppSelector} from '../../../../services/redux/store.ts';
import {SET_LOADING} from '../../../../services/redux/reducers/loadingSlice.ts';
import {Typography} from '@mui/material';
import {Box} from '@mui/system';
import emptyCart from '../../../../assets/img/empty-cart.png';
import { formatPrice } from '../../../../utils/utils.ts';

interface ICartItemProps {
  item: IOrder;
}
const CartItem = ({item}: ICartItemProps) => {
  const dispatch = useAppDispatch();
  const deleteCartItem = async (id: number) => {
    dispatch(SET_LOADING(true));
    const res = await api(
      urls.order,
      {
        method: 'DELETE',
        body: {
          orderId: id,
        },
      },
      true,
    );
    if (res.code == 200){
      dispatch(cart())
      toast('سفارش با موفقیت از سبد خرید حذف شد', { type: 'success'});
    }
    dispatch(SET_LOADING(false));
  };

  return (
    <article className="cartItemContainer">
      <span className="orderInfo">
        <p></p>
        <h3>{item.service.title}</h3>
        <X size="20" onClick={() => deleteCartItem(item.id)} />
      </span>
      {item.orderServices?.map((attribute, index) => (
        <span className="orderInfo" key={index}>
          <p>{attribute.service.title}</p>
          <p>{formatPrice(attribute.price)} تومان</p>
        </span>
      ))}
      <span className="orderInfo">
        <p>هزینه ایاب ذهاب</p>
        <p>{formatPrice(100000)} تومان</p>
      </span>
      {item.discountAmount &&
        <span className="orderInfo">
        <p>تخفیف</p>
        <p>{formatPrice(item.discountAmount)}- تومان</p>
      </span>
      }
      <span className="orderInfo dashedBottom">
        <h4>جمع کل</h4>
        <h4> {formatPrice(item.price)} تومان</h4>
      </span>
      <span className="orderInfo">
        <span className="orderInfoIcon">
          <MapPin size={20} />
          {item.address?.title}
        </span>
        <span className="orderInfoIcon">
          {item.fromTime + ' - ' + item.toTime}{' '}
          {moment(parseInt(item.date) * 1000).format('jYYYY/jMM/jDD')}
          <Calendar size={20} />
        </span>
      </span>
    </article>
  );
};

export default function Cart() {
  const cartItems = useAppSelector((state) => state.cartReducer.cartItems);
  const dispatch = useAppDispatch();

  const pay = async () => {
    dispatch(SET_LOADING(true))
    const res = await api(
      urls.pay,
      {
        method: 'POST',
      },
      true,
    );

    if (res.code == 200) {
      window.location.href = res.data?.url;
      // toast('پرداخت با موفقیت انجام شد.', { type: 'success'});
    }else{
      toast('مشکلی پیش آمده، لطفا مجددا امتحان کنید یا با اپراتور تماس بگیرید', { type: 'error'});
    }
    dispatch(SET_LOADING(false))

  };

  return (
    <section className="cartContainer">
      {cartItems.length > 0 ? (
        <>
          {cartItems.map((order, index) => (
            <CartItem key={index} item={order} />
          ))}
          <span className="payButtom" onClick={pay}>
            پرداخت
          </span>
        </>
      ) : (
        <>
          <Box component="img" src={emptyCart} width="40%" mx="auto" maxWidth={160} />
          <Typography variant="body1" component="p" textAlign="center" mt={2}>
            سبد خرید شما خالی است
          </Typography>
        </>
      )}
    </section>
  );
}
