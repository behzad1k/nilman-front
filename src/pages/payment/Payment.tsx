import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { urls } from '../../services/endPoint';
import { api } from '../../services/http';
import { cart } from '../../services/redux/reducers/cartSlice';
import { SET_LOADING } from '../../services/redux/reducers/loadingSlice';
import { order } from '../../services/redux/reducers/orderSlice';
import { useAppDispatch } from '../../services/redux/store';

const Payment = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [searchParam, setSearchParam] = useSearchParams();
  const [isSuccessful, setIsSuccessful] = useState(searchParam.get('Status') == 'OK' || searchParam.get('State') == 'OK');
  const send = async () => {
    dispatch(SET_LOADING(true));

    const res = await api(urls.paymentVerify, {
      method: 'POST',
      body: {
        authority: searchParam.get('Authority') || searchParam.get('Token'),
        status: searchParam.get('Status') || searchParam.get('State'),
        terminalId: searchParam.get('TerminalId'),
        refNum: searchParam.get('RefNum')
      }
    }, true);

    if (res.code == 200) {
      setIsSuccessful(true);
      dispatch(cart());
      dispatch(order());
    } else {
      setIsSuccessful(false);
    }
    dispatch(SET_LOADING(false));
  };
  useEffect(() => {
    const handleRequest = (event) => {
      // Access the request data from the event
      console.log('Request received:', event);
      const body = event.detail; // or event.data depending on how you dispatch the event
      console.log(event.detail);
      console.log(event.data);
    };

    // Add event listener
    window.addEventListener('request-received', handleRequest);

    // Cleanup
    return () => {
      window.removeEventListener('request-received', handleRequest);
    };
  }, []);

  useEffect(() => {
    if (isSuccessful) {
      send();
    }
  }, []);

  return (
    <div className="paymentContainer">
      {isSuccessful ?
        <div className="payment">
          <img className="paymentImage" src="/img/checked.png"/>
          <span>پرداخت شما موفقیت آمیز بود</span>
        </div>
        :
        <div className="payment">
          <img className="paymentImage" src="/img/cancel.png"/>
          <span>پرداخت موفقیت آمیز نبود</span>
        </div>
      }
      <button onClick={() => navigate('/orders')} className={`paymentButton ${isSuccessful ? 'successful' : 'unSuccessful'}`}>بازگشت به صفحه سفارشات</button>
    </div>
  );
};

export default Payment;
