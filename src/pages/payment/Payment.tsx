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
      console.log('Event triggered:', event);
      // Log all available data
      console.log('Event detail:', event.detail);
      console.log('Event data:', event.data);
      console.log('Current URL:', window.location.href);
    };

    // Try multiple events that might capture the request
    window.addEventListener('load', handleRequest);
    window.addEventListener('DOMContentLoaded', handleRequest);
    window.addEventListener('submit', handleRequest);
    window.addEventListener('message', handleRequest);

    return () => {
      window.removeEventListener('load', handleRequest);
      window.removeEventListener('DOMContentLoaded', handleRequest);
      window.removeEventListener('submit', handleRequest);
      window.removeEventListener('message', handleRequest);
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
