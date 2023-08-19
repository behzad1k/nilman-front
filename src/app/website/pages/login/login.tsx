import {Link} from 'react-router-dom';
import TextInput from '../../../dashboard/components/textInput';
import {useForm} from 'react-hook-form';
import {Typography, Container, Paper, Box, Button} from '@mui/material';
import {MuiOtpInput} from 'mui-one-time-password-input';
import {useState} from 'react';

import lock from '../../../../assets/img/lock.png';

type LoginState = 'phoneNumber' | 'otp';

export default function Login() {
  const [otp, setOtp] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const {reset, handleSubmit, control} = useForm();
  const [loginState, setLoginState] = useState<LoginState>('phoneNumber');

  const handleChangeOtp = (val: any) => setOtp(val);

  const validateChar = (value: string, index: number) => {
    console.log(value, index);
    return value !== '' && !isNaN(Number(value));
  };

  const handleSubmitPhoneNumber = (data: any) => {
    console.log(data);
    setPhoneNumber(data.phoneNumber);
    setLoginState('otp');
  };

  const handleSubmitOtp = (value: string) => {
    console.log(value);
  };
  return (
    <Box component="main" bgcolor="var(--light-pink)">
      <Container
        sx={{
          flex: 1,
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
          sx={{
            filter: 'drop-shadow(0px 10px 5px rgb(51, 51, 51))',
          }}
        >
          نیلمان
        </Typography>
        <Box sx={{display: 'grid', placeItems: 'center'}}>
          <Box
            p={2}
            borderRadius={50}
            sx={{backgroundColor: 'var(--white-pink-opacity)'}}
          >
            <Box width={110} height={110} component="img" src={lock} />
          </Box>
        </Box>
      </Container>
      <Container
        sx={{
          flex: 1,
          bgcolor: '#fff',
          borderTopRightRadius: '80px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '50vh',
        }}
      >
        {loginState === 'phoneNumber' ? (
          <Box
            component="form"
            sx={{display: 'flex', flexDirection: 'column', gap: 4, width: '100%'}}
            onSubmit={handleSubmit(handleSubmitPhoneNumber)}
          >
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
        ) : (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 6,
            }}
          >
            <Typography component="p" variant="body2" textAlign="center">
              رمز یکبار مصرف به شماره
              <Box component="span" fontSize={14} mx={0.75} color="var(--mid-pink)">
                {phoneNumber}
              </Box>
              ارسال شد
            </Typography>
            <MuiOtpInput
              value={otp}
              onChange={handleChangeOtp}
              length={4}
              onComplete={handleSubmitOtp}
              dir="ltr"
              autoFocus
              validateChar={validateChar}
              TextFieldsProps={{placeholder: '-'}}
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
        )}
      </Container>
    </Box>
  );
}
