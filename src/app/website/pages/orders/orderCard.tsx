import {useState} from 'react';
import {Modal, ProfilePicture} from '../../../../components';
import {Article, Calendar, MapPinLine, Money, Clock} from '@phosphor-icons/react';
import {Box, Typography, Paper, Button} from '@mui/material';
import {IOrder} from '../../../../services/types.ts';
import {formatPrice} from '../../../../utils/utils.ts';
import OrderItem from './orderItem';
import moment from 'jalali-moment';
import {urls} from '../../../../services/endPoint.ts';
import {api} from '../../../../services/http.ts';
import {order} from '../../../../services/redux/reducers/orderSlice.ts';
import {useAppDispatch, useAppSelector} from '../../../../services/redux/store.ts';
import { MapView } from '../../../../components/common/map.tsx';
interface IOrderCardProps {
  item: IOrder;
}

export default function OrderCard({item}: IOrderCardProps) {
  const dispatch = useAppDispatch();

  const [openModal, setOpenModal] = useState(false);
  const userType = useAppSelector((state) => state.userReducer.data.role);

  const date = item.date;
  const time = `${item.fromTime} - ${item.toTime}`;
  const attributes = item.orderServices.reduce((acc, atr, index) => {
    if (index !== 0) return (acc += ', ' + atr.service.title);
    else return (acc += atr.service.title);
  }, '');

  const updateOrder = async () => {
    const reqOptions = {
      method: 'PUT',
      body: {
        orderId: item.id,
        done: true,
      },
    };
    const res = await api(urls.order, reqOptions, true);
    if (res.code == 200) {
      // dispatch(cart());
      dispatch(order());
    }
  };

  return (
    <article className="infoBox orderRow">
      <h4>{item.service.title} </h4>
      <div>
        <div className="itemRowDetails">
          <span className="orderItem">
            <Article size={22} />
            <p>{attributes}</p>
          </span>
          <span className="orderItem">
            <Calendar size={22} />
            <p>
              {date} , {time}
            </p>
          </span>
          <span className="orderItem">
            <MapPinLine size={22} />
            <p> {item?.address?.title} </p>
          </span>
          <span className="orderItem">
            <Money size={22} />
            {item.discount > 0 ? (
              <>
                <s>{formatPrice(item.finalPrice)}</s>
                <p>{formatPrice(item.price - item.discount)}</p>
              </>
            ) : (
              <p>{formatPrice(item.finalPrice)}</p>
            )}
          </span>
        </div>
        <div className="orderRowProfile">
          <ProfilePicture imgSrc={item.worker?.profilePic?.url || './img/girl.png'} />
          <p>{item.worker?.name ? item.worker?.name + ' ' + item.worker?.lastName : 'در حال انتخاب'}</p>
        </div>
      </div>
    </article>
  );
}
