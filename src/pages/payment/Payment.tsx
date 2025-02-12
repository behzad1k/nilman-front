import { useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
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
  const params = useParams();

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
  console.log('heeeeeee');
  useEffect(() => {
    const handleCallback = async () => {
      try {
        const response = await fetch(window.location.href, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        console.log(response);
        const result = await response.json();
        console.log(result);
      } catch (error) {
        console.log('Error fetching data:', error);
      } finally {
        console.log('finished');
        // setLoading(false);
      }
      if (window.performance.getEntriesByType("navigation")[0]?.type === "navigate") {
        const request = window.performance.getEntriesByType("resource")
        .find(entry => entry?.initiatorType === "fetch");

        if (request) {
          console.log(request);
          const requestData = request.toJSON();
          console.log(requestData);
        }
      }
    };

    handleCallback();
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
