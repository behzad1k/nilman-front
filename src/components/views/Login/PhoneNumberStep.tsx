import React from 'react';
import { toast } from 'react-toastify';
import { UseFormReturn } from 'react-hook-form';
import { loginTicker } from '../../../services/redux/reducers/globalSlice';
import globalType from '../../../types/globalType';
import { persianNumToEn } from '../../../utils/utils';
import { api } from '../../../services/http';
import { urls } from '../../../services/endPoint';
import { SET_LOADING } from '../../../services/redux/reducers/loadingSlice';
import { AppDispatch } from '../../../services/redux/store';
import {useDrawer} from "../../layers/Drawer/DrawerContext";

interface PhoneNumberStepProps {
  formMethods: UseFormReturn<globalType.LoginForm>;
  setLoginState: React.Dispatch<React.SetStateAction<globalType.LoginState>>;
  tokenRef: React.MutableRefObject<string | null>;
  dispatch: AppDispatch;
}

export const PhoneNumberStep: React.FC<PhoneNumberStepProps> = ({
                                                                  formMethods,
                                                                  setLoginState,
                                                                  tokenRef,
                                                                  dispatch
                                                                }) => {
  const { handleSubmit, register } = formMethods;
  const {closeDrawer} = useDrawer()
  const onSubmit = async (data: globalType.LoginForm) => {
    if (!data.phoneNumber || data.phoneNumber.length !== 11) {
      toast('لطفا شماره تلفن خود را به درستی وارد کنید', { type: 'warning' });
      return;
    }

    const reqOptions = {
      method: 'post',
      body: {
        phoneNumber: persianNumToEn(data.phoneNumber)
      },
    };

    dispatch(SET_LOADING(true));

    try {
      const res = await api(urls.login, reqOptions);
      tokenRef.current = res.token || null;
      setLoginState('otp');
      dispatch(loginTicker(0))

    } catch (error) {
      toast('خطا در ارسال کد تایید', { type: 'error' });
    } finally {
      dispatch(SET_LOADING(false));
    }
  };

  return (
    <div className="login-box">
      <div className="login-nilman">
        <img src="./img/newLogo.png" alt="Logo" />
        <span>nilman</span>
      </div>
      <h3 className="login-span">ورود / ثبت نام</h3>
      <input
        className="login-phone-input"
        placeholder="تلفن همراه"
        {...register('phoneNumber', { required: true })}
      />
      <span className="terms-condition">
        ثبت نام در نیلمان، به منزله‌ پذیرش <a className="basicLink" href="/rules">قوانین و شرایط استفاده</a> و <a className="basicLink" href="/privacy">قوانین حریم شخصی</a> می باشد
      </span>
      <div className="buttons-container">
      <button
        className="login-button"
        type="button"
        onClick={handleSubmit(onSubmit)}
      >
        ارسال کد
      </button>
      <button
        className="login-button cancel"
        type="button"
        onClick={() => closeDrawer()}
      >
        انصراف
      </button>
      </div>
    </div>
  );
};
