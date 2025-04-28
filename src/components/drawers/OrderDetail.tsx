import { useAppSelector } from '../../services/redux/store';
import globalType from '../../types/globalType';
import { findAncestors, formatPrice } from '../../utils/utils';

const OrderDetail = ({ item }: { item: globalType.Order}) => {
  const services = useAppSelector(state => state.serviceReducer.allServices)
  return(
    <div className="orderDetailContainer">
      <h2>فاکتور سفارش</h2>
      {item.orderServices.map(orderService =>
        <div className="orderDetailRow">
          <span className="orderDetailRowTitle">{findAncestors(services, orderService.serviceId).slice(0,3).reverse().reduce((acc, curr, index) => acc + (index != 0 ? ' -> ' : '') + curr.title, '')}</span>
          <span>{formatPrice(orderService.price)} تومان</span>
        </div>
      )}
      <hr className="divider"/>
      <div className="orderDetailRow">
        <span className="orderDetailRowBoldTitle">مجموع سفارش</span>
        <span>{formatPrice(item.price)} تومان</span>
      </div>
      <div className="orderDetailRow">
        <span className="orderDetailRowTitle">ایاب ذهاب</span>
        <span>{formatPrice(item.transportation)} تومان</span>
      </div>
      <hr className="divider"/>
      <div className="orderDetailRow">
        <span className="orderDetailRowBoldTitle">جمع کل</span>
        <span>{formatPrice(item.finalPrice)} تومان</span>
      </div>
    </div>
  )
};

export default OrderDetail