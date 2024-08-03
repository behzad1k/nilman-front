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
  console.log(item);

  const [openModal, setOpenModal] = useState(false);
  const userType = useAppSelector((state) => state.userReducer.data.role);

  const date = item.date;
  const time = `${item.fromTime} - ${item.toTime}`;
  const attributes = item.orderServices.reduce((acc, atr, index) => {
    if (index !== 0) return (acc += ', ' + atr.service.title);
    else return (acc += atr.service.title);
  }, '');

  const updateOrder = async () => {
    console.log('here', item);

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

  if (userType === 'WORKER') {
    return (
      <Paper
        elevation={3}
        component="article"
        sx={{
          width: '100%',
          bgcolor: 'var(--white-pink)',
        }}
      >
        <Box
          className="order-card-title"
          sx={{
            display: 'grid',
            placeItems: 'center',
            bgcolor: 'var(--light-pink)',
            height: '40px',
            m: '10px -14px 0 -14px',
          }}
        >
          <Typography variant="body1" component="h2">
            {item.service.title}
          </Typography>
        </Box>
        <Box
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
          }}
        >
          {attributes && <OrderItem Icon={Article} value={attributes} />}
          <OrderItem Icon={Clock} value={time} />
          <OrderItem Icon={Calendar} value={date} />
          <OrderItem Icon={MapPinLine} value={item.address?.description ?? ''} />
          <OrderItem Icon={Money} value={Intl.NumberFormat().format(item.price)} />
          <Button
            variant="outlined"
            onClick={() => setOpenModal(true)}
            sx={{
              borderColor: 'var(--light-grey)',
              color: 'var(--light-black)',
              mt: 1,
              ':hover': {bgcolor: 'var(--mid-pink)', borderColor: 'var(--mid-pink)'},
            }}
          >
            جزئیات
          </Button>
          {userType === 'WORKER' && (
            <Box display="flex" gap={1}>
              <Button
                fullWidth
                variant="contained"
                sx={{
                  bgcolor: 'var(--light-grey)',
                  color: 'var(--light-black)',
                  ':hover': {bgcolor: 'var(--mid-pink)'},
                }}
              >
                <a href="tel:09037131808">تماس با پشتیبانی</a>
              </Button>
              {item.status !== 'Done' && (
                <Button
                  fullWidth
                  variant="contained"
                  sx={{
                    bgcolor: 'var(--light-pink)',
                    color: 'var(--light-black)',
                    ':hover': {bgcolor: 'var(--mid-pink)'},
                  }}
                  onClick={updateOrder}
                >
                  انجام شده
                </Button>
              )}
            </Box>
          )}
        </Box>
        <Modal open={openModal} setOpen={setOpenModal}>
          <MapView position={{lat: +item.address.latitude, lng: +item.address.longitude}}></MapView>
        </Modal>
      </Paper>
    );
  }
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
          <ProfilePicture imgSrc={'./img/girl.png'} />
          <p>{item.worker?.name ? item.worker?.name + ' ' + item.worker?.lastName : 'در حال انتخاب'}</p>
        </div>
      </div>
    </article>
  );
}
