import { Button, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { X } from '@phosphor-icons/react';
import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { PaymentMethods } from '../../enums/enums';
import { urls } from '../../services/endPoint';
import { api } from '../../services/http';
import { SET_LOADING } from '../../services/redux/reducers/loadingSlice';
import { useDrawer } from '../layers/Drawer/DrawerContext';

type PortalPickerDrawerProps = {
  selectedPaymentMethod: keyof typeof PaymentMethods,
  setSelectedPaymentMethod: any,
  isCredit?: boolean,
}

const PortalPickerDrawer = ({ selectedPaymentMethod, setSelectedPaymentMethod, isCredit = false }: PortalPickerDrawerProps) => {
  const { closeDrawer } = useDrawer();
  const [portalToken, setPortalToken] = useState('');
  const formRef = useRef(null);
  const apFormRef = useRef(null);
  const linkRef = useRef(null);

  const dispatch = useDispatch();
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
        linkRef.current.href = res.data?.url;
        linkRef.current?.click();
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
        <X size={20} onClick={() => closeDrawer()}/>
      </Box>
      <Box
        display="flex"
        gap="10px"
        border="1px solid grey"
        borderRadius="12px"
        alignItems="center"
        padding="0 10px"
        bgcolor={selectedPaymentMethod == 'credit' ? '#cecece' : (selectedPaymentMethod == 'ap' ? 'rgba(210,253,191,0.99)' : '#FFF')}
        onClick={() => selectedPaymentMethod != 'credit' && setSelectedPaymentMethod('ap')}
      >
        <img className="portalImage" src="img/ap.png"/>
        <span>آسان پرداخت</span>
        {selectedPaymentMethod == 'ap' && <img className="checkIcon marginRightAuto" src="img/checked.png" alt="ap"/>}
      </Box>
      <Box
        display="flex"
        gap="10px"
        border="1px solid grey"
        borderRadius="12px"
        alignItems="center"
        padding="0 10px"
        bgcolor={selectedPaymentMethod == 'credit' ? '#cecece' : (selectedPaymentMethod == 'sep' ? 'rgba(210,253,191,0.99)' : '#FFF')}
        onClick={() => selectedPaymentMethod != 'credit' && setSelectedPaymentMethod('sep')}
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
        bgcolor={selectedPaymentMethod == 'credit' ? '#cecece' : (selectedPaymentMethod == 'zarinpal' ? 'rgba(210,253,191,0.99)' : '#FFF')}
        onClick={() => selectedPaymentMethod != 'credit' && setSelectedPaymentMethod('zarinpal')}
      >
        <img className="portalImage" src="img/zarinpal.png"/>
        <span>زرین پال</span>
        {selectedPaymentMethod == 'zarinpal' && <img className="checkIcon marginRightAuto" src="img/checked.png" alt="zarinpal"/>}
      </Box>
      {selectedPaymentMethod == 'credit' &&
          <Box
              display="flex"
              gap="10px"
              border="1px solid grey"
              borderRadius="12px"
              alignItems="center"
              padding="0 10px"
              bgcolor={selectedPaymentMethod == 'credit' ? 'rgba(210,253,191,0.99)' : '#FFF'}
            // onClick={() => selectedPaymentMethod != 'credit' && setSelectedPaymentMethod('zarinpal')}
          >
              <img className="portalImage" src="img/wallet.png"/>
              <span>کیف پول</span>
              <img className="checkIcon marginRightAuto" src="img/checked.png" alt="zarinpal"/>
          </Box>
      }
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
      <a className="payLink" href="" ref={linkRef}></a>
      <Button sx={{
        padding: '10px',
        border: '1px solid gray',
        background: '#8aff79',
        marginTop: '10px',
        borderRadius: '12px'
      }} onClick={pay}>پرداخت</Button>
    </Box>
  )
};

export default PortalPickerDrawer;