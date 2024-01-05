import { Container, Typography, Box, Paper, TextField, FormControlLabel, Button } from "@mui/material";
import { api } from "../../../../services/http";
import { urls } from "../../../../services/endPoint";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import {AppDispatch, useAppDispatch} from '../../../../services/redux/store';
import {SET_LOGGED_IN, user} from '../../../../services/redux/reducers/userSlice';
import {userApis} from '../../../../services/apis/global.ts';


export default function Login() {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useAppDispatch();

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    const form = e.target;
    const reqOptions = {
      method: 'post',
      body: {
        username: form.username.value,
        password: form.password.value
      }
    }
    try {
      const res = await api(urls.adminLogin, reqOptions, false);
      if (res.code === 200) {
        Cookies.set('token', res.data, {expires: 30 * 24 * 60 * 60, path: '/'});
        dispatch(SET_LOGGED_IN(true));
        await userApis(dispatch);
        navigate('/dashboard');
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Container sx={{p: 2, minHeight: '100vh', display: 'grid',alignContent: 'center'}}>
      <Typography variant="h3" component='h1' align='center' mb={10}>
        ورود
      </Typography>
      <div>
        <Box component='form' display='flex' flexDirection='column' alignItems='center' justifyContent='center' gap={2} onSubmit={handleSubmit}>
            <TextField label="نام کاربری" fullWidth name="username"></TextField>
            <TextField label="رمزعبور" type={'password'} fullWidth name="password"></TextField>
            <Button fullWidth color="primary" variant="contained" size="large" type="submit"> ورود </Button>
        </Box>
    </div>
    </Container>
  )
}
