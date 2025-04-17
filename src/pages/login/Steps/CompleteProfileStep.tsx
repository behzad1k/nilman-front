import React from 'react';
import { Button } from '@mui/material';
import { toast } from 'react-toastify';
import { UseFormReturn } from 'react-hook-form';
import { NavigateFunction } from 'react-router-dom';
import globalType from '../../../types/globalType';
import { persianNumToEn } from '../../../utils/utils';
import { api } from '../../../services/http';
import { urls } from '../../../services/endPoint';
import { SET_LOADING } from '../../../services/redux/reducers/loadingSlice';
import { AppDispatch } from '../../../services/redux/store';
import Cookies from 'js-cookie';

interface CompleteProfileStepProps {
  formMethods: UseFormReturn<globalType.LoginForm>;
  dispatch: AppDispatch;
  navigate: NavigateFunction;
}

export const CompleteProfileStep: React.FC<CompleteProfileStepProps> = ({
                                                                          formMethods,
                                                                          dispatch,
                                                                          navigate
                                                                        }) => {
  const { register, handleSubmit } = formMethods;

  const onSubmit = async (data: globalType.LoginForm) => {
    if (!data.name || data.name.length < 3) {
      toast('لطفا نام خود را به درستی وارد کنید', { type: 'warning' });
      return;
    }

    if (!data.lastName || data.lastName.length < 3) {
      toast('لطفا نام خانوادگی خود را به درستی وارد کنید', { type: 'warning' });
      return;
    }

    if (!data.nationalCode || data.nationalCode.length !== 10) {
      toast('لطفا کد ملی خود را به درستی وارد کنید', { type: 'warning' });
      return;
    }

    const token = sessionStorage.getItem('login-step-token');

    if (!token) {
      toast('خطا در احراز هویت', { type: 'error' });
      return;
    }

    const reqOptions = {
      method: 'put',
      headers: {
        Authorization: `Bearer ${token}`,
        'content-type': 'application/json'
      },
      body: {
        name: data.name,
        lastName: data.lastName,
        nationalCode: persianNumToEn(data.nationalCode),
      },
    };

    dispatch(SET_LOADING(true));

    try {
      const res = await api(urls.updateSimpleUser, reqOptions) as globalType.ApiResponse;

      if (res.code === 200) {
        toast('اطلاعات شما با موفقیت ثبت شد، خوش آمدید', { type: 'success' });

        if (res.token) {
          Cookies.set('token', res.token, {
            expires: 30,
            path: '/'
          });
        }

        sessionStorage.removeItem('login-step');
        sessionStorage.removeItem('login-step-token');
        navigate(localStorage.getItem('new-order') ? '/' : '/home');
      } else if (res.code === 1005) {
        toast('کد ملی با شماره تلفن تطابق ندارد', { type: 'error' });
      }
    } catch (error) {
      toast('خطا در ثبت اطلاعات', { type: 'error' });
    } finally {
      dispatch(SET_LOADING(false));
    }
  };

  return (
    <div>
      <input
        placeholder="نام"
        {...register('name', { required: true, minLength: 3 })}
      />
      <input
        placeholder="نام خانوادگی"
        {...register('lastName', { required: true, minLength: 3 })}
      />
      <input
        placeholder="کد ملی"
        {...register('nationalCode', { required: true, minLength: 10, maxLength: 10 })}
      />
      <Button
        variant="contained"
        type="button"
        onClick={handleSubmit(onSubmit)}
        sx={{
          bgcolor: 'var(--light-pink)',
          py: 1,
          fontSize: 18,
          color: 'var(--light-black)',
          ':hover': { color: '#fff' },
        }}
        fullWidth
      >
        ثبت
      </Button>
    </div>
  );
};
