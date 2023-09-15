import {useState} from 'react';
import { Modal, ProfilePicture } from '../../../../components';
import { Article, Icon, Calendar, MapPinLine, Money, User, Clock } from '@phosphor-icons/react';
import {Box, Typography, Paper, Button} from '@mui/material';
import { urls } from "../../../../services/endPoint.ts";
import { api } from "../../../../services/http.ts";
import { cart } from "../../../../services/redux/reducers/cartSlice.ts";
import { order } from "../../../../services/redux/reducers/orderSlice.ts";
import { useAppDispatch, useAppSelector } from "../../../../services/redux/store.ts";
import { IOrder } from "../../../../services/types.ts";
import { formatPrice } from "../../../../utils/utils.ts";
import OrderItem from './orderItem';
import moment from 'jalali-moment';
interface IOrderCardProps {
  item: IOrder
}
export default function OrderCard({item} : IOrderCardProps) {
  const [openModal, setOpenModal] = useState(false);
  const userType = useAppSelector(state => state.userReducer.data.role)
  const dispatch = useAppDispatch();

  const updateOrder = async (orderId: number,accept: boolean) => {
    const res = await api(urls.order,{
      method: 'PUT',
      body:{
        orderId: orderId,
        accept: accept
      }
    }, true)
    if (res.code == 200){
      dispatch(cart());
      dispatch(order());
    }
  }
  if (userType === "WORKER"){
    return <Paper
        elevation={3}
        component="article"
        sx={{
          width: '100%',
          bgcolor: 'var(--white-pink)'
        }}
    >
      <Box
          className="order-card-title"
          sx={{
            display: 'grid',
            placeItems: 'center',
            bgcolor: 'var(--light-pink)',
            height: '40px',
            m: '10px -14px 0 -14px'
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
            gap: 1
          }}
      >
        {item.attribute && <OrderItem Icon={Article} value={item.attribute?.title}/>}
        {/* <OrderItem Icon={Calendar} value={moment(item.date).locale('fa').format('DD MMM')}/> */}
        <OrderItem Icon={Clock} value={item.time}/>
        <OrderItem Icon={MapPinLine} value={item.address?.description ?? ''}/>
        <OrderItem Icon={Money} value={Intl.NumberFormat().format(item.price)}/>
        {/* <OrderItem Icon={User} */}
        {/*            value={item.worker ? (item.worker.name + item.worker.lastName) : 'در حال جست و جو'}/> */}
        <Button
            variant="outlined"
            onClick={() => setOpenModal(true)}
            sx={{
              borderColor: 'var(--light-grey)',
              color: 'var(--light-black)',
              mt: 1,
              ':hover': {bgcolor: 'var(--mid-pink)', borderColor: 'var(--mid-pink)'}
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
                    bgcolor: 'var(--light-pink)',
                    color: 'var(--light-black)',
                    ':hover': {bgcolor: 'var(--mid-pink)'}
                  }}
                  onClick={() => updateOrder(item.id, true)}
              >
                پذیرفتن
              </Button>
              <Button
                  fullWidth
                  variant="contained"
                  sx={{
                    bgcolor: 'var(--light-grey)',
                    color: 'var(--light-black)',
                    ':hover': {bgcolor: 'var(--mid-pink)'}
                  }}
                  onClick={() => updateOrder(item.id, false)}

              >
                رد کردن
              </Button>
            </Box>
        )}
      </Box>
      <Modal open={openModal} setOpen={setOpenModal}>
        عکس و توضیحات
      </Modal>
    </Paper>
  }
  return (

      <article className="infoBox orderRow"
          // style={{backgroundColor: service.status == 1 ? 'green' : 'red'}}
      >
        <h4>{item.service.title} </h4>
        <div>
          <div className="itemRowDetails">
                    <span className="orderItem">
              <Article size={22}/>
                          <p>{item.attribute?.title}</p>
            </span>
            <span className="orderItem">
              <Calendar size={22}/>
              <p> {moment(item.date).locale('fa').format('DD MMM , HH:mm')} </p>
            </span>
            <span className="orderItem">
              <MapPinLine size={22}/>
              <p> {item?.address?.title} </p>
            </span>
            <span className="orderItem">
              <Money size={22}/>
              {item.discount > 0 ?
                  <>
                    <s>{formatPrice(item.price)}</s>
                    <p>{formatPrice(item.price - item.discount)}</p>
                  </> :
                  <p>{formatPrice(item.price)}</p>
              }
            </span>
          </div>
          <div className="orderRowProfile">
            <ProfilePicture imgSrc={'./img/girl.png'}/>
            <p>{item.worker?.name ?? 'در حال انتخاب'}</p>
          </div>
        </div>
      </article>
  )
}
