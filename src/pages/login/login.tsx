import { div, Button, Container, SwipeableDrawer, Typography } from '@mui/material';
import Cookies from 'js-cookie';
import Picker, { MaskComponent } from 'react-simple-picker';
import React, { CSSProperties, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Loading, Modal, OTP, TextInput } from '../../components';
import { userApis } from '../../services/apis/global';
import { urls } from '../../services/endPoint';
import { api } from '../../services/http';
import { SET_LOADING } from '../../services/redux/reducers/loadingSlice';
import { SET_LOGGED_IN, user } from '../../services/redux/reducers/userSlice';
import { AppDispatch, useAppDispatch, useAppSelector } from '../../services/redux/store';
import '../../assets/css/scroll.css'
import { persianNumToEn } from '../../utils/utils';

type LoginState = 'phoneNumber' | 'otp' | 'complete-profile';
type LoginForm = {
  phoneNumber: string;
  otp?: string;
  name?: string;
  lastName?: string;
  nationalCode?: string;
  birthday?: string;
};

export default function Login() {
  const {
    reset,
    handleSubmit,
    control,
    getValues,
    setValue
  } = useForm<LoginForm>();
  const [loginState, setLoginState] = useState<string>(sessionStorage.getItem('login-step') || 'phoneNumber');
  const userReducer = useAppSelector(state => state.userReducer);
  const [code, setCode] = useState([]);
  const formRef = useRef(null);
  const tokenRef = useRef<null | string>(null);
  const dispatch: AppDispatch = useAppDispatch();
  const navigate = useNavigate();
  const [urlParams] = useSearchParams();
  const [showDatePicker, setShowDatePicker] = useState(false);
  // const [birthday, setBirthday] = useState({
  //   day: 0,
  //   month: 0,
  //   year: 0
  // });

  // const renderCustomMask = (className: string, style?: CSSProperties) => {
  //   const CustomMask = (Mask: MaskComponent) => (
  //     <Mask className={className} style={style} />
  //   );
  //
  //   CustomMask.displayName = 'CustomMask';
  //
  //   return CustomMask;
  // };
  const handleSubmitForm = async (data: LoginForm = null) => {
    if (loginState === 'phoneNumber') {
      if (data.phoneNumber.length != 11 || data.phoneNumber.at(0) != '0' || data.phoneNumber.at(1) != '9') {
        toast('لطفا شماره تلفن خود را به درستی وارد کنید', { type: 'warning' });
        return;
      }
      // Send phonenumber here ...
      const reqOptions = {
        method: 'post',
        body: {
          phoneNumber: persianNumToEn(data.phoneNumber)
        },
      };
      dispatch(SET_LOADING(true));
      const res = await api(urls.login, reqOptions);
      dispatch(SET_LOADING(false));
      tokenRef.current = res.token;
      setLoginState('otp');
    } else if (loginState === 'otp') {
      // Verify OTP Code here ...
      const reqOptions = {
        method: 'post',
        body: {
          code: persianNumToEn(code?.reduce((acc, curr) => acc + curr, '')),
          token: tokenRef.current,
        },
      };

      dispatch(SET_LOADING(true));
      const res = await api(urls.check, reqOptions);
      dispatch(SET_LOADING(false));

      if (res.code == 200) {
        dispatch(SET_LOGGED_IN(true));
        dispatch(user(res.data.user))
        if (!res.data?.user?.isVerified) {
          sessionStorage.setItem('login-step', 'complete-profile');
          sessionStorage.setItem('login-step-token', res.data.token)
          setLoginState('complete-profile');
        }
        else {
          Cookies.set('token', res.data.token, {
            expires: 30 * 24 * 60 * 60,
            path: '/'
          });
          toast('خوش آمدید', { type: 'success' });
          await userApis(dispatch);
          navigate(`/`)        }
      } else {
        toast('کد وارد شده صحیح نیست', { type: 'error' });
      }
    } else {
      // Complete Profile Code here ...
      if (!data.name || data.name?.length < 3) {
        toast('لطفا نام خود را به درستی وارد کنید', { type: 'warning' });
        return;
      }
      if (!data.lastName || data.lastName?.length < 3) {
        toast('لطفا نام خانوادگی خود را به درستی وارد کنید', { type: 'warning' });
        return;
      }
      if (!data.nationalCode || data.nationalCode?.length != 10) {
        toast('لطفا کد ملی خود را به درستی وارد کنید', { type: 'warning' });
        return;
      }

      const reqOptions = {
        method: 'put',
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('login-step-token')}`,
          'content-type': 'application/json'
        },
        body: {
          name: data.name,
          lastName: data.lastName,
          nationalCode: persianNumToEn(data.nationalCode),
          // birthday: Object.values(birthday).reverse().reduce((acc, curr, index) => acc + (index == 1 && curr < 10 ? '0' : '') + curr + (index < 2 ? '/' : '') , '')
        },
      };
      dispatch(SET_LOADING(true));
      const res = await api(urls.updateSimpleUser, reqOptions);
      dispatch(SET_LOADING(false));
      if (res.code === 200) {
        toast('اطلاعات شما با موفقیت ثبت شد، خوش آمدید', { type: 'success' });
        Cookies.set('token', res?.token, {
          expires: 30 * 24 * 60 * 60,
          path: '/'
        });
        sessionStorage.removeItem('login-step')
        sessionStorage.removeItem('login-step-token')
        navigate(`${localStorage.getItem('new-order') ? '/' : '/home'}`);
      } else if (res.code == 1005) {
        toast('کد ملی با شماره تلفن تطابق ندارد', { type: 'error' });
      }
    }
  };
  useEffect(() => {
    if ("OTPCredential" in window) {
      const ac = new AbortController();
        navigator.credentials
        .get({
          // @ts-ignore
          otp: { transport: ['sms'] },
          signal: ac.signal
        })
        .then((otp) => {
          // @ts-ignore
          setValue('otp', otp.code);
          ac.abort();
        })
        .catch((err) => {
          ac.abort();
        });
    }
  }, [window]);

  return (
    <main>
      <div className="login-container">
        <div className="login-block">
          </div>
      <form
          onSubmit={handleSubmit(handleSubmitForm)}
          ref={formRef}
        >
      <div>
        
          {loginState === 'phoneNumber' ? (
            <div className="login-box">
              <img src="./img/newLogo.png"/>
              <span className="login-nilman">nilman</span>
              <h3 className="login-span">ورود / ثبت نام</h3>
              <input className="login-phone-input" placeholder='تلفن همراه' />
              <button className="login-button" type="submit">
                ارسال کد
              </button>
              <span className="terms-condition">ثبت نام در نیلمان، به منزله‌ پذیرش <a className='basicLink' href={'/rules'}>قوانین و شرایط استفاده </a> و <a className='basicLink' href={'/privacy'}>قوانین حریم شخصی</a> می باشد</span>

            </div>
          ) : loginState === 'otp' ? (
            <div>
              <p >
                رمز یکبار مصرف به شماره
                <div>
                  {getValues().phoneNumber}
                </div>
                ارسال شد
              </p>
              <OTP
                code={code}
                setCode={setCode}
                onComplete={() => handleSubmit(handleSubmitForm) as any}
              />
              <div>
                <p>
                  کد را دریافت نکردید ؟
                </p>
                <Button fullWidth variant="text" sx={{ fontSize: 16 }} onClick={() => setLoginState('phoneNumber')}>
                  ارسال مجدد کد
                </Button>
                <Button fullWidth>ثبت</Button>
              </div>
            </div>
          ) : (
            <div>
              <input
                label="نام"
                name="name"
              />
              <input
                label="نام خانوادگی"
                name="lastName"
              />
              <input
                label="کد ملی"
                name="nationalCode"
                sx={{
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'var(--mid-pink)',
                    backgroundColor: 'var(--white-pink)',
                    borderRadius: '10px',
                  },
                  '& .MuiOutlinedInput-input': {
                    zIndex: 1,
                  },
                }}
              />
              {/* <TextInput */}
              {/*   label="تاریخ تولد" */}
              {/*   name="birthday" */}
              {/*   control={control} */}
              {/*   defaultValue="" */}
              {/*   size="medium" */}
              {/*   value={Object.values(birthday).reverse().reduce((acc, curr, index) => acc + curr + (index < 2 ? '/' : '') , '')} */}
              {/*   // disabled={true} */}
              {/*   onClick={() => setShowDatePicker(true)} */}
              {/*   sx={{ */}
              {/*     '& .MuiOutlinedInput-notchedOutline': { */}
              {/*       borderColor: 'var(--mid-pink)', */}
              {/*       backgroundColor: 'var(--white-pink)', */}
              {/*       borderRadius: '10px', */}
              {/*     }, */}
              {/*     '& .MuiOutlinedInput-input': { */}
              {/*       zIndex: 1, */}
              {/*     }, */}
              {/*   }} */}
              {/* /> */}
              <Button
                variant="contained"
                type="submit"
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
          )}
        
         </div>
         </form>
         </div>
    {/*   <SwipeableDrawer */}
    {/*   anchor="bottom" */}
    {/*   open={showDatePicker} */}
    {/*   onClose={() => setShowDatePicker(false)} */}
    {/*   onOpen={() => setShowDatePicker(true)} */}
    {/*   disableSwipeToOpen={false} */}
    {/*   ModalProps={{ */}
    {/*     keepMounted: true, */}
    {/*   }} */}
    {/* > */}
    {/*     <i className="close-button datepicker" onClick={() => setShowDatePicker(false)}></i> */}
    {/*     <p className='fontWeight400 padding10'>تاریخ تولد خود را وارد کنید</p> */}
    {/*     <section className='datePickerModal'> */}
    {/*       <Picker */}
    {/*         className='datepicker-year' */}
    {/*         height={300} */}
    {/*         iconAdd={<div>+</div>} */}
    {/*         iconMinus={<div>-</div>} */}
    {/*         initCount={1} */}
    {/*         minCount={1} */}
    {/*         maxCount={31} */}
    {/*         preloadCount={8} */}
    {/*         renderMask={renderCustomMask(styles.gradientMask, { */}
    {/*           background: 'var(--mid-pink)', */}
    {/*           borderRadius: '8px', */}
    {/*           color: '#FFFFFF', */}
    {/*         })} */}
    {/*         onChange={number => setBirthday(prev => ({ ...prev, day: number}))} */}
    {/*       /> */}
    {/*       <Picker */}
    {/*         className='datepicker-year' */}
    {/*         height={300} */}
    {/*         iconAdd={<div>+</div>} */}
    {/*         iconMinus={<div>-</div>} */}
    {/*         initCount={1} */}
    {/*         minCount={1} */}
    {/*         maxCount={12} */}
    {/*         preloadCount={8} */}
    {/*         renderMask={renderCustomMask(styles.gradientMask, { */}
    {/*           background: 'var(--mid-pink)', */}
    {/*           borderRadius: '8px', */}
    {/*           color: '#FFFFFF', */}
    {/*         })}            onChange={number => setBirthday(prev => ({ ...prev, month: number}))} */}
    {/*       /> */}
    {/*       <Picker */}
    {/*         className='datepicker-year' */}
    {/*         height={300} */}
    {/*         iconAdd={<div>+</div>} */}
    {/*         iconMinus={<div>-</div>} */}
    {/*         initCount={1375} */}
    {/*         minCount={1320} */}
    {/*         maxCount={1403} */}
    {/*         preloadCount={8} */}
    {/*         renderMask={renderCustomMask(styles.gradientMask, { */}
    {/*           background: 'var(--mid-pink)', */}
    {/*           borderRadius: '8px', */}
    {/*           color: '#FFFFFF', */}
    {/*         })}            onChange={number => setBirthday(prev => ({ ...prev, year: number}))} */}
    {/*       /> */}
    {/*     </section> */}
    {/* </SwipeableDrawer> */}
    </main>
  );
}
