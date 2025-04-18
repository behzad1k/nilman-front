import React, {useEffect, useState} from 'react';
import {toast} from 'react-toastify';
import {UseFormReturn} from 'react-hook-form';
import {NavigateFunction} from 'react-router-dom';
import globalType from '../../../types/globalType';
import {OTP} from '../../../components';
import {persianNumToEn} from '../../../utils/utils';
import {api} from '../../../services/http';
import {urls} from '../../../services/endPoint';
import {SET_LOADING} from '../../../services/redux/reducers/loadingSlice';
import {SET_LOGGED_IN, user} from '../../../services/redux/reducers/userSlice';
import {AppDispatch, useAppSelector} from '../../../services/redux/store';
import {userApis} from '../../../services/apis/global';
import Cookies from 'js-cookie';
import Countdown from "react-countdown";
import {AccessAlarm} from "@mui/icons-material";
import moment from "jalali-moment";
import {loginTicker} from "../../../services/redux/reducers/globalSlice";

interface OtpVerificationStepProps {
  formMethods: UseFormReturn<globalType.LoginForm>;
  setLoginState: React.Dispatch<React.SetStateAction<globalType.LoginState>>;
  tokenRef: React.MutableRefObject<string | null>;
  dispatch: AppDispatch;
  navigate: NavigateFunction;
}

const INTERVAL = 120000 //mili-seconds

export const OtpVerificationStep: React.FC<OtpVerificationStepProps> = ({
                                                                          formMethods,
                                                                          setLoginState,
                                                                          tokenRef,
                                                                          dispatch,
                                                                          navigate
                                                                        }) => {
  const {getValues} = formMethods;
  const globalReducer = useAppSelector(state => state.globalReducer);
  const [code, setCode] = useState<string[]>([]);
  const [startTime, setStartTime] = useState<number>(Date.now() - globalReducer.loginTicker > INTERVAL ? Date.now() : globalReducer.loginTicker)
  const verifyOtp = async () => {
    if (!code.length) {
      toast('لطفا کد تایید را وارد کنید', {type: 'warning'});
      return;
    }

    const reqOptions = {
      method: 'post',
      body: {
        code: persianNumToEn(code.join('')),
        token: tokenRef.current,
      },
    };

    dispatch(SET_LOADING(true));

    try {
      const res = await api(urls.check, reqOptions) as globalType.ApiResponse;

      if (res.code === 200) {
        dispatch(SET_LOGGED_IN(true));
        if (res.data?.user) {
          dispatch(user(res.data.user));
        }

        if (!res.data?.user?.isVerified) {
          sessionStorage.setItem('login-step', 'complete-profile');
          if (res.data?.token) {
            sessionStorage.setItem('login-step-token', res.data.token);
          }
          setLoginState('complete-profile');
        } else {
          if (res.data?.token) {
            Cookies.set('token', res.data.token, {
              expires: 30,
              path: '/'
            });
          }
          toast('خوش آمدید', {type: 'success'});
          await userApis(dispatch);
          navigate('/');
        }
      } else {
        toast('کد وارد شده صحیح نیست', {type: 'error'});
      }
    } catch (error) {
      toast('خطا در تایید کد', {type: 'error'});
    } finally {
      dispatch(SET_LOADING(false));
    }
  };

  useEffect(() => {
    if (globalReducer.loginTicker != 0 && startTime - globalReducer.loginTicker > INTERVAL) {
      dispatch(loginTicker(0))
    }
  }, [])

  return (
    <div className="login-box">
      <div className="login-nilman">
        <img src="./img/newLogo.png" alt="Logo" />
        <span>nilman</span>
      </div>
      <h3 className="login-otp-sent">
        رمز یکبار مصرف به شماره
        <span>
          { getValues().phoneNumber }
        </span>
        ارسال شد
      </h3>

      <OTP
        code={ code }
        setCode={ setCode }
        onComplete={ verifyOtp }
      />
      <div className="login-ticker">
        <span className="login-ticker-left">
          <Countdown
            date={startTime + INTERVAL}
            onStart={() => {
              startTime - globalReducer.loginTicker > INTERVAL && dispatch(loginTicker(Date.now() + INTERVAL))
            }}
            onComplete={() => {
              dispatch(loginTicker(0))
            }}
            renderer={({ minutes, seconds }) => <span className="login-countdown">{moment(minutes, 'm').format('mm')}:{moment(seconds, 's').format('ss')}</span>}
          />
          <AccessAlarm width={35}/>
        </span>
        <span>
          زمان باقی مانده شما:
        </span>
      </div>
      {startTime - globalReducer.loginTicker > INTERVAL && <span className="login-code-not-received" onClick={() => setLoginState('phoneNumber')}>کد را دریافت نکردید؟</span>}
      <div className="buttons-container">
        <button
          className="login-button"
          type="button"
          onClick={verifyOtp}
        >
          ثبت
        </button>
        <button
          className="login-button cancel"
          type="button"
          disabled={startTime - globalReducer.loginTicker > INTERVAL}
          onClick={() => setLoginState('phoneNumber')}
        >
          مرحله قبل
        </button>
      </div>
    </div>
  );
};
