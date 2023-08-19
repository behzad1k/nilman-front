import {useRef} from 'react';
import {TextInput} from '../../../../components';
import {useForm} from 'react-hook-form';
import {Typography, Container, Button, Box} from '@mui/material';
import {useState} from 'react';
import lock from '../../../../assets/img/lock.png';
import {OtpInput} from '../../../../components';

type LoginState = 'phoneNumber' | 'otp';

export default function Login() {
  const {reset, handleSubmit, control, getValues} = useForm();
  const [loginState, setLoginState] = useState<LoginState>('phoneNumber');
  const formRef = useRef(null);

  const handleSubmitForm = (data: any) => {
    if (loginState === 'phoneNumber') {
      // Send phonenumber here ...

      setLoginState('otp');
    } else {
      // Verify OTP Code here ...
    }
    console.log(data);
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
          )}
        </Box>
      </Container>
    </Box>
  );
}
