import {useRef} from 'react';
import {Loading, TextInput} from '../../../../components';
import {useForm} from 'react-hook-form';
import {Typography, Container, Button, Box} from '@mui/material';
import {useState} from 'react';
import lock from './public/img/lock.png';
import {OtpInput} from '../../../../components';
import {userApis} from '../../../../services/apis/global.ts';
import {api} from '../../../../services/http';
import {urls} from '../../../../services/endPoint';
import {AppDispatch, useAppDispatch} from '../../../../services/redux/store';
import {SET_LOGGED_IN, user} from '../../../../services/redux/reducers/userSlice';
import Cookies from 'js-cookie';
import {useNavigate} from 'react-router-dom';
import {SET_LOADING} from '../../../../services/redux/reducers/loadingSlice.ts';

type LoginState = 'phoneNumber' | 'otp' | 'complete-profile';
type LoginForm = {
  phoneNumber: string;
  otp?: string;
  name?: string;
  lastName?: string;
  nationalCode?: string;
};

export default function Login() {
  const {reset, handleSubmit, control, getValues} = useForm<LoginForm>();
  const [loginState, setLoginState] = useState<LoginState>('phoneNumber');
  const formRef = useRef(null);
  const tokenRef = useRef<null | string>(null);
  const dispatch: AppDispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmitForm = async (data: LoginForm) => {
    if (loginState === 'phoneNumber') {
      // Send phonenumber here ...
      const reqOptions = {
        method: 'post',
        body: data,
      };
      dispatch(SET_LOADING(true));
      const res = await api(urls.login, reqOptions);
      dispatch(SET_LOADING(false));
      console.log(res);
      if (res.code) {
        alert(res.code);
        tokenRef.current = res.token;
        setLoginState('otp');
      }
    } else if (loginState === 'otp') {
      // Verify OTP Code here ...
      const reqOptions = {
        method: 'post',
        body: {
          code: data.otp,
          token: tokenRef.current,
        },
      };
      dispatch(SET_LOADING(true));
      const res = await api(urls.check, reqOptions);
      dispatch(SET_LOADING(false));
      console.log(res.data.user.nationalCode);

      if (res.code == 200) {
        Cookies.set('token', res.data.token, {expires: 30 * 24 * 60 * 60, path: '/'});
        dispatch(SET_LOGGED_IN(true));
        console.log(res.data.user.role);
        await userApis(dispatch);
        if (res.data.user.role === 'SUPER_ADMIN') navigate('/dashboard');
        else if (!res.data.user.nationalCode) setLoginState('complete-profile');
        else navigate('/');
      }
    } else {
      // Complete Profile Code here ...
      const reqOptions = {
        method: 'put',
        body: {
          name: data.name,
          lastName: data.lastName,
          nationalCode: data.nationalCode,
        },
      };
      dispatch(SET_LOADING(true));
      const res = await api(urls.updateSimpleUser, reqOptions, true);
      dispatch(SET_LOADING(false));
      if (res.code === 200) navigate('/');
    }
  };
  return (
    <Box
      component="main"
      bgcolor="white"
      sx={{display: 'flex', flexDirection: 'column', minHeight: '100vh'}}
    >
      <Container
        sx={{
          height: '50vh',
          py: 4,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: 4,
        }}
      >
        <Typography
          variant="h3"
          component="h1"
          textAlign="center"
          color="var(--mid-pink)"
          sx={{
            filter: 'drop-shadow(0px 4px 2px rgb(201, 182, 182))',
          }}
        >
          nilman
        </Typography>
        <Box sx={{display: 'grid', placeItems: 'center'}}>
          {/*<Box*/}
          {/*  p={2}*/}
          {/*  borderRadius={50}*/}
          {/*  sx={{backgroundColor: 'white'}}*/}
          {/*>*/}
            <Box width={180} height={180} component="img" src="./img/nilmanLogo.png" />
          {/*</Box>*/}
        </Box>
      </Container>
      <Container
        sx={{
          flex: 1,
          bgcolor: "var(--mid-pink)",
          borderTopRightRadius: '80px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          pt: 8,
          pb: 4,
        }}
      >
        <Box
          component="form"
          width="100%"
          onSubmit={handleSubmit(handleSubmitForm)}
          ref={formRef}
        >
          {loginState === 'phoneNumber' ? (
            <Box display="flex" flexDirection="column" gap={4}>
              <TextInput
                label="تلفن همراه"
                name="phoneNumber"
                control={control}
                defaultValue=""
                size="medium"
                autoComplete="off"
                type="number"
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
              <Button
                variant="contained"
                type="submit"
                sx={{
                  bgcolor: 'var(--light-pink)',
                  py: 1,
                  fontSize: 18,
                  color: 'var(--light-black)',
                  ':hover': {color: '#fff'},
                }}
                fullWidth
              >
                ارسال کد
              </Button>
            </Box>
          ) : loginState === 'otp' ? (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 6,
              }}
            >
              <Typography component="p" variant="body2" textAlign="center">
                رمز یکبار مصرف به شماره
                <Box component="span" fontSize={14} mx={0.75}>
                  {getValues().phoneNumber}
                </Box>
                ارسال شد
              </Typography>
              <OtpInput
                name="otp"
                control={control}
                onComplete={handleSubmit(handleSubmitForm) as any}
                sx={{
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'var(--mid-pink)',
                    backgroundColor: 'var(--white-pink)',
                    borderRadius: '10px',
                    color: 'var(--light-black)',
                  },
                  '& .MuiOutlinedInput-input': {
                    zIndex: 1,
                  },
                }}
              />
              <Box>
                <Typography
                  color="var(--mid-pink)"
                  textAlign="center"
                  variant="subtitle2"
                  mb={0}
                >
                  کد را دریافت نکردید ؟
                </Typography>
                <Button fullWidth variant="text" sx={{fontSize: 16}}>
                  ارسال مجدد کد
                </Button>
              </Box>
            </Box>
          ) : (
            <Box display="flex" flexDirection="column" gap={4}>
              <TextInput
                label="نام"
                name="name"
                control={control}
                defaultValue=""
                size="medium"
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
              <TextInput
                label="نام خانوادگی"
                name="lastName"
                control={control}
                defaultValue=""
                size="medium"
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
              <TextInput
                label="کد ملی"
                name="nationalCode"
                control={control}
                defaultValue=""
                size="medium"
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
              <Button
                variant="contained"
                type="submit"
                sx={{
                  bgcolor: 'var(--light-pink)',
                  py: 1,
                  fontSize: 18,
                  color: 'var(--light-black)',
                  ':hover': {color: '#fff'},
                }}
                fullWidth
              >
                ثبت
              </Button>
            </Box>
          )}
        </Box>
      </Container>
      <Loading />
    </Box>
  );
}
