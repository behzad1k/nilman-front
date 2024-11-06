import { Calendar, MapPin, Trash, X } from '@phosphor-icons/react';
import axios from 'axios';
import moment from 'jalali-moment';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import {urls} from '../../../../services/endPoint';
import {api} from '../../../../services/http';
import {cart} from '../../../../services/redux/reducers/cartSlice';
import {order} from '../../../../services/redux/reducers/orderSlice';
import {IOrder} from '../../../../services/types';
import {useAppDispatch, useAppSelector} from '../../../../services/redux/store';
import {SET_LOADING} from '../../../../services/redux/reducers/loadingSlice';
import { Button, SwipeableDrawer, Typography } from '@mui/material';
import {Box} from '@mui/system';
import emptyCart from '../../../../assets/img/empty-cart.png';
import { formatPrice } from '../../../../utils/utils';
import Switch from 'react-ios-switch';

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
    if (res.code == 200){
      dispatch(cart())
      toast('آیتم با موفقیت از سبد خرید حذف شد', { type: 'success'});
    }
    dispatch(SET_LOADING(false));
  };
  return (
    <article className="cartItemContainer">
      <span className="orderInfo">
        <span>{item.isUrgent && <span className='isUrgent'>فوری</span>}</span>
        <h3>{item.service.title}</h3>
        <span className='trashCart' onClick={() => deleteCartItem(item.id)}>
          <span>حذف همه</span>
          <Trash size="20" />
        </span>
      </span>
      {item.orderServices?.map((attribute, index) => (
        <span className="orderInfo" key={index}>
          <p>{attribute.service?.title}</p>
          <span className='orderInfoDelete'>
            <p>{formatPrice(attribute.price)} تومان</p>
            <span className='trashCart' onClick={() => deleteOrderService(attribute.id)}>
              <Trash size="20" />
            </span>
          </span>
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
        <h4> {formatPrice(item.finalPrice)} تومان</h4>
      </span>
      <span className="orderInfo">
        <span className="orderInfoIcon">
          <MapPin size={20} />
          {item.address?.title}
        </span>
        <span className="orderInfoIcon">
          {item.fromTime + ' - ' + item.toTime}{' '}
          {item.date}
          <Calendar size={20} />
        </span>
      </span>
    </article>
  );
};

export default function Cart() {
  const cartItems = useAppSelector((state) => state.cartReducer.cartItems);
  const dispatch = useAppDispatch();
  const linkRef = useRef(null);
  const userReducer = useAppSelector(state => state.userReducer)
  const [isCredit, setIsCredit] = useState(false);
  const [creditModel, setCreditModal] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('zarinpal');
  const formRef = useRef(null)
  const [sepToken, setSepToken] = useState('');
  const pay = async () => {
    if (!selectedPaymentMethod){
      toast('لطفا یکی از درگاه های زیر را انتخاب کنید', { type: 'error'})
    }
    dispatch(SET_LOADING(true))
    const res = await api(
      urls.pay,
      {
        method: 'POST',
        body: {
          isCredit: isCredit,
          method: selectedPaymentMethod
        }
      },
      true,
    );

    if (res.code == 200) {
      if (selectedPaymentMethod == 'sep'){
        window.location.href = `https://sep.shaparak.ir/OnlinePG/SendToken?token=${res.data.authority}`
        // formRef.current.elements.Token.value = res.data.authority;
        // setSepToken(res.data.authority);
      }
      else{
        linkRef.current.href = res.data?.url;
        linkRef.current?.click();
      }
    }else{
      toast('مشکلی پیش آمده، لطفا مجددا امتحان کنید یا با اپراتور تماس بگیرید', { type: 'error'});
    }
    dispatch(SET_LOADING(false))

  };

  // useEffect(() => {
  //   if (sepToken != ''){
  //     formRef.current.submit();
  //
  //   }
  // }, [sepToken]);

  return (
    <section className="cartContainer">
      {cartItems.length > 0 ? (
        <>
          {cartItems.map((order, index) => (
            <CartItem key={index} item={order} />
          ))}

          <a className='payLink' href='' ref={linkRef}></a>
          <span className="payButtom" onClick={() => setCreditModal(true)}>
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
      <SwipeableDrawer
        anchor="bottom"
        open={creditModel}
        onClose={() => setCreditModal(false)}
        onOpen={() => setCreditModal(true)}
        // disableSwipeToOpen={false}
        ModalProps={{
          // keepMounted: true,
        }}
      >
        <Box
          display="flex"
          flexDirection="column"
          gap={2}
          p={2}
          overflow="auto"
          className="attr-drawer-content"
          sx={{ paddingBottom: '65px' }}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            padding="0 10px"
          >
            <Typography >
              لطفا درگاه مورد نظر خود را انتخاب کنید
            </Typography>
            <X size={20} onClick={() => setCreditModal(false)}/>
          </Box>
          <Box
            display="flex"
            gap="10px"
            border="1px solid grey"
            borderRadius="12px"
            alignItems="center"
            padding="0 10px"
            bgcolor={selectedPaymentMethod == 'ap' ? 'rgba(210,253,191,0.99)' : '#FFF'}
            // onClick={() => setSelectedPaymentMethod('ap')}
          >
            <img className='portalImage' src='img/ap.png'/>
            <span>آسان پرداخت (بزودی)</span>
            {selectedPaymentMethod == 'ap' && <img className='checkIcon marginRightAuto' src="img/checked.png" alt="ap"/>}
          </Box>
          <Box
            display="flex"
            gap="10px"
            border="1px solid grey"
            borderRadius="12px"
            alignItems="center"
            padding="0 10px"
            bgcolor={selectedPaymentMethod == 'sep' ? 'rgba(210,253,191,0.99)' : '#FFF'}
            onClick={() => setSelectedPaymentMethod('sep')}
          >
            <img className='portalImage' src='img/sep.png'/>
            <span>بانک سامان (بزودی)</span>
            {selectedPaymentMethod == 'sep' && <img className='checkIcon marginRightAuto' src="img/checked.png" alt="sep"/>}
          </Box>
          <Box
            display="flex"
            gap="10px"
            border="1px solid grey"
            borderRadius="12px"
            alignItems="center"
            padding="0 10px"
            bgcolor={selectedPaymentMethod == 'zarinpal' ? 'rgba(210,253,191,0.99)' : '#FFF'}
            onClick={() => setSelectedPaymentMethod('zarinpal')}
          >
            <img className='portalImage' src='img/zarinpal.png'/>
            <span>زرین پال</span>
            {selectedPaymentMethod == 'zarinpal' && <img className='checkIcon marginRightAuto' src="img/checked.png" alt="zarinpal"/>}
          </Box>

          {/* sep submit form */}

          <form
            action="https://sep.shaparak.ir/payment.aspx"
            method="post"
            ref={formRef}
          >
            {/* <input type="hidden" name="MID" value="<?php echo $MID?>"> */}
            {/* <input type="hidden" name="ResNum" value="<?php echo $ResNum?>"> */}
            {/* <input type="hidden" name="Amount" value="<?php echo $Amount?>"> */}
            {/* <input type="hidden" name="RedirectURL" value="<?php echo $RedirectURL?>"> */}
            {/* <input type="hidden" name="ResNum1" value="<?php echo $ResNum1?>"> */}
            <input hidden name='token' type="text" value={sepToken}/>
            <input hidden name='RedirectURL' type="text" value='https://nilman.co/app/payment/verify'/>
          </form>
          <Button sx={{
            padding: '10px',
            border: '1px solid gray',
            background: '#8aff79',
            marginTop: '10px',
            borderRadius: '12px'}} onClick={pay} >پرداخت</Button>
        </Box>
      </SwipeableDrawer>
    </section>
  );
}
