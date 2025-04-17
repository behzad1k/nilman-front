import React, { useState } from 'react';
import { Button } from '@mui/material';
import { toast } from 'react-toastify';
import { UseFormReturn } from 'react-hook-form';
import { NavigateFunction } from 'react-router-dom';
import globalType from '../../../types/globalType';
import { OTP } from '../../../components';
import { persianNumToEn } from '../../../utils/utils';
import { api } from '../../../services/http';
import { urls } from '../../../services/endPoint';
import { SET_LOADING } from '../../../services/redux/reducers/loadingSlice';
import { SET_LOGGED_IN, user } from '../../../services/redux/reducers/userSlice';
import { AppDispatch } from '../../../services/redux/store';
import { userApis } from '../../../services/apis/global';
import Cookies from 'js-cookie';

interface OtpVerificationStepProps {
  formMethods: UseFormReturn<globalType.LoginForm>;
  setLoginState: React.Dispatch<React.SetStateAction<globalType.LoginState>>;
  tokenRef: React.MutableRefObject<string | null>;
  dispatch: AppDispatch;
  navigate: NavigateFunction;
}

export const OtpVerificationStep: React.FC<OtpVerificationStepProps> = ({
                                                                          formMethods,
                                                                          setLoginState,
                                                                          tokenRef,
                                                                          dispatch,
                                                                          navigate
                                                                        }) => {
  const { getValues } = formMethods;
  const [code, setCode] = useState<string[]>([]);

  const verifyOtp = async () => {
    if (!code.length) {
      toast('لطفا کد تایید را وارد کنید', { type: 'warning' });
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
          toast('خوش آمدید', { type: 'success' });
          await userApis(dispatch);
          navigate('/');
        }
      } else {
        toast('کد وارد شده صحیح نیست', { type: 'error' });
      }
    } catch (error) {
      toast('خطا در تایید کد', { type: 'error' });
    } finally {
      dispatch(SET_LOADING(false));
    }
  };

  return (
    <div className="login-box">
      <img src="./img/newLogo.png" alt="Logo" />
      <span className="login-nilman">nilman</span>
      <h3 className="login-span">ارسال کد تایید</h3>
      <p className="login-code-status">
        رمز یکبار مصرف به شماره
        <div>
          {getValues().phoneNumber}
        </div>
        ارسال شد
      </p>
      <OTP
        code={code}
        setCode={setCode}
        onComplete={verifyOtp}
      />
      <div>
        <button className="login-code-submit" type='submit'
          onClick={verifyOtp}>
          ثبت
        </button>
        <span className="login-resend" 
          onClick={() => setLoginState('phoneNumber')}>
          کد پیامکی دریافت نکرده اید؟
        </span>
      </div>
    </div>
  );
};
