import { TimerOutlined } from '@mui/icons-material';
import { Calendar, MapPin, Trash } from '@phosphor-icons/react';
import moment from 'jalali-moment';
import { useAppSelector } from '../../services/redux/store';
import comps from '../../types/comp';
import { findAncestors, formatPrice } from '../../utils/utils';

const CartItem = ({ item, deleteCartItem }: comps.ICartItem) => {
  const services = useAppSelector(state => state.serviceReducer.allServices)
  console.log(item);
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
            <p className="orderInfoTitle">{findAncestors(services, attribute.serviceId).slice(0,3).reverse().reduce((acc, curr, index) => acc + (index != 0 ? ' -> ' : '') + curr.title, '') + ' ' + attribute.count + 'x '} </p>
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
        <p>{formatPrice(moment(item.date, 'jYYYY/jMM/jDD').unix() >= moment('1403/12/01', 'jYYYY/jMM/jDD').unix() ? 200000 : 100000)} تومان</p>
      </span>
      {item.discountAmount &&
          <span className="orderInfo">
        <p>تخفیف</p>
        <p>{formatPrice(item.discountAmount)}- تومان</p>
      </span>
      }
      <span className="orderInfo dashedBottom">
        <h4>جمع کل</h4>
        <span className="finalPrice"> {formatPrice(item.finalPrice)} تومان</span>
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
