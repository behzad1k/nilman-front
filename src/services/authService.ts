import api from '../Axios';
import {LoginParams, SignUpParams} from './types';
import {setToken} from './redux/actions/setters';
import {setUserData} from './redux/actions/setters';

export const login = async (user: LoginParams) => {
  try {
    const response = await api.post('/user/login', user);
    if (response.status === 200) {
      setToken(response.data.token);
      setUserData(response.data.user);
      return response.data;
    } else
      throw new Error(`error occured: ${response.status} - ${response.data}`);
  } catch (err) {
    const error = err as Error;
    console.log(error.message);
  }
};

export const signup = async (user: SignUpParams) => {
  try {
    const response = await api.post('/user/signup', user);
    console.log(response);
    if (response.status === 201) {
      return response.data;
    } else
      throw new Error(`error occured: ${response.status} - ${response.data}`);
  } catch (err) {
    const error = err as Error;
    console.log(error.message);
  }
};
