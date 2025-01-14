import { Button, SwipeableDrawer, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { X } from '@phosphor-icons/react';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import emptyCart from '../../assets/img/empty-cart.png';
import { urls } from '../../services/endPoint';
import { api } from '../../services/http';
import { SET_LOADING } from '../../services/redux/reducers/loadingSlice';
import { useAppDispatch, useAppSelector } from '../../services/redux/store';
import CartItem from './cartItem';

export default function Cart() {
  const cartItems = useAppSelector((state) => state.cartReducer.cartItems);
  const dispatch = useAppDispatch();
  const linkRef = useRef(null);
  const formRef = useRef(null);
  const apFormRef = useRef(null);
  const [isCredit, setIsCredit] = useState(false);
  const [creditModel, setCreditModal] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('sep');
  const [portalToken, setPortalToken] = useState('');

  const pay = async () => {
    if (!selectedPaymentMethod) {
      toast('لطفا یکی از درگاه های زیر را انتخاب کنید', { type: 'error' });
    }
    dispatch(SET_LOADING(true));
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
      if (selectedPaymentMethod == 'sep') {
        formRef.current.elements.Token.value = res.data.authority;
        setPortalToken(res.data.authority);
      } else if (selectedPaymentMethod == 'ap') {
        apFormRef.current.elements.RefID.value = res.data.authority;
        setPortalToken(res.data.authority);
      } else {
        // linkRef.current.href = res.data?.url;
        // linkRef.current?.click();
      }
    } else {
      toast('مشکلی پیش آمده، لطفا مجددا امتحان کنید یا با اپراتور تماس بگیرید', { type: 'error' });
    }
    dispatch(SET_LOADING(false));

  };

  useEffect(() => {
    if (portalToken != '') {
      if (selectedPaymentMethod == 'sep') {
        formRef.current.submit();
      } else {
        apFormRef.current.submit();
      }
    }
  }, [portalToken]);

  return (
    <section className="cartContainer">
      {cartItems.length > 0 ? (
        <>
          {cartItems.map((order, index) => (
            <CartItem key={index} item={order}/>
          ))}

          <a className="payLink" href="" ref={linkRef}></a>
          <span className="payButtom" onClick={() => setCreditModal(true)}>
            پرداخت
          </span>
        </>
      ) : (
        <>
          <Box component="img" src={emptyCart} width="40%" mx="auto" maxWidth={160}/>
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
            <Typography>
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
            <img className="portalImage" src="img/ap.png"/>
            <span>آسان پرداخت (بزودی)</span>
            {selectedPaymentMethod == 'ap' && <img className="checkIcon marginRightAuto" src="img/checked.png" alt="ap"/>}
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
            <img className="portalImage" src="img/sep.png"/>
            <span>بانک سامان</span>
            {selectedPaymentMethod == 'sep' && <img className="checkIcon marginRightAuto" src="img/checked.png" alt="sep"/>}
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
            <img className="portalImage" src="img/zarinpal.png"/>
            <span>زرین پال</span>
            {selectedPaymentMethod == 'zarinpal' && <img className="checkIcon marginRightAuto" src="img/checked.png" alt="zarinpal"/>}
          </Box>

          {/* sep submit form */}
          <form
            action="https://asan.shaparak.ir"
            method="post"
            ref={apFormRef}
          >
            <input hidden name="RefID" type="text" value={portalToken}/>

          </form>
          <form
            action="https://sep.shaparak.ir/OnlinePG/OnlinePG"
            method="post"
            ref={formRef}
          >
            <input hidden name="Token" type="text" value={portalToken}/>
            <input hidden name="GetMethod" type="text" value="true"/>
          </form>
          <Button sx={{
            padding: '10px',
            border: '1px solid gray',
            background: '#8aff79',
            marginTop: '10px',
            borderRadius: '12px'
          }} onClick={pay}>پرداخت</Button>
        </Box>
      </SwipeableDrawer>
    </section>
  );
}
