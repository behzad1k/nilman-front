import { TimerOutlined } from '@mui/icons-material';
import { Calendar, MapPin, Trash } from '@phosphor-icons/react';
import moment from 'jalali-moment';
import comp from '../../types/comp';
import { formatPrice } from '../../utils/utils';
import IOrderCardProps = comp.IOrderCardProps;

export default function OrderCard({ item, userBalance = 0, isCredit = false }: IOrderCardProps) {

  return (
    <>
      <article className="cartItemContainer">
      <span className="orderInfo">
        {item.isUrgent && <span className="isUrgent">فوری</span>}
        <h3>{item.service.title}</h3>
        <span></span>
      </span>
        {item.orderServices.filter(e => !e.isAddOn)?.map((attribute, index) => (
          <div className="orderInfo" key={index}>
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
        </div>
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
        <h4> {formatPrice(item.finalPrice)} تومان</h4>
      </span>
        <div className="orderInfo dashedBottom">
        <span className="orderInfoIcon">
          <Calendar size={20}/>
          {item.date}
        </span>
          <span className="orderInfoIcon">
            <TimerOutlined style={{ width: 20}}/>
            {item.fromTime}{':00 '}
        </span>
          <span className="orderInfoIcon">
            {item.address?.title}
            <MapPin size={20}/>

        </span>

      </div>
            <span className="orderInfo">
              <h3>فاکتور نهایی</h3>
            </span>
        <span className="orderInfo">
          <p>جمع کل </p>
          <span className="orderInfoDelete">
            <p>{formatPrice(item.orderServices?.reduce((acc, curr) => acc + curr.price, 0))} تومان</p>
          </span>
              </span>
        <span className="orderInfo">
          <p>تخفیف</p>
          <span className="orderInfoDelete">
            <p>{formatPrice(item.orderServices?.reduce((acc, curr) => acc + curr?.discountPrice || 0, 0))} تومان</p>
          </span>
        </span>
        <span className="orderInfo">
        <h4>مبلغ قابل پرداخت</h4>
        <h4> {formatPrice(item.orderServices?.reduce((acc, curr) => acc + curr.price, 0) < 0 ? 0 : (item.orderServices?.reduce((acc, curr) => acc + curr.price, 0)))} تومان</h4>
      </span>
      </article>
    </>
  );
}
