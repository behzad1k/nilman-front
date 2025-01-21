import { Timer10, TimerOutlined, TimerRounded } from '@mui/icons-material';
import { Calendar, MapPin, Trash } from '@phosphor-icons/react';
import { toast } from 'react-toastify';
import { urls } from '../../services/endPoint';
import { api } from '../../services/http';
import { cart } from '../../services/redux/reducers/cartSlice';
import { SET_LOADING } from '../../services/redux/reducers/loadingSlice';
import { useAppDispatch } from '../../services/redux/store';
import comps from '../../types/comp';
import { formatPrice } from '../../utils/utils';

const CartItem = ({ item }: comps.ICartItem) => {
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
    if (res.code == 200) {
      dispatch(cart());
      toast('سفارش با موفقیت از سبد خرید حذف شد', { type: 'success' });
    }
    dispatch(SET_LOADING(false));
  };
  const deleteOrderService = async (id: number) => {
    dispatch(SET_LOADING(true));
    const res = await api(
      urls.orderService + id,
      {
        method: 'DELETE',
        body: {},
      },
      true,
    );
    if (res.code == 200) {
      dispatch(cart());
      toast('آیتم با موفقیت از سبد خرید حذف شد', { type: 'success' });
    }
    dispatch(SET_LOADING(false));
  };
  return (
    <article className="cartItemContainer">
      <span className="orderInfo">
        {item.isUrgent && <span className="isUrgent">فوری</span>}
        <h3>{item.service.title}</h3>
        <span className="trashCart" onClick={() => deleteCartItem(item.id)}>
          <span>حذف سفارش</span>
          <Trash size="20"/>
        </span>
      </span>
      {item.orderServices.filter(e => !e.isAddOn)?.map((attribute, index) => (
        <span className="orderInfo" key={index}>
          <span className="orderInfoAddon">
            <p>{attribute.service?.title + ' ' + attribute.count + 'x '} </p>
            {attribute.addOns?.map(e => <p>-{e.addOn?.title + ' ' + e.count + 'x'}</p>)}
          </span>
          <span className="orderInfoDelete">
          <span className="orderInfoAddon">

            <p>{formatPrice(attribute.price)} تومان</p>
            {attribute.addOns?.map(e => <p>{formatPrice(e.addOn?.price * e.count)} تومان </p>)}
          </span>

            {/* <span className="trashCart" onClick={() => deleteOrderService(attribute.id)}> */}
            {/*   <Trash size="20"/> */}
            {/* </span> */}
          </span>
        </span>
      ))}
      <span className="orderInfo">
        <p> ایاب ذهاب</p>
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
        <h4> {formatPrice(item.finalPrice)} تومان</h4>
      </span>
      <span className="orderInfo">
        <span className="orderInfoIcon">
          <MapPin size={20}/>
          {item.address?.title}
        </span>
        <div className='orderInfoCol'>
        <span className="orderInfoIcon">
          {item.date}
          <Calendar size={20}/>
        </span>
          <span className="orderInfoIcon">
          {item.fromTime}{' '}
            <TimerOutlined style={{ width: 20}}/>
        </span>
        </div>

      </span>
    </article>
  );
};

export default CartItem;
