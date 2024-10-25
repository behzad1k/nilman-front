import { isEmpty } from '../utils/utils';
import {config} from './config';
import Cookies from 'js-cookie';

type fetchType = {
  method?: string;
  body?: any;
  query?: any;
  headers?: {
    'content-type'?: string;
    accessToken?: string;
    refreshToken?: string;
    Authorization?: any;
  };
};

const api = async (url: string, request: fetchType = {}, useToken = false) => {
  const baseUrl = config.baseUrl;
  const headers: any = request.headers || {};
  if (isEmpty(headers)) {
    headers['content-type'] = 'application/json';
    request = {...request, headers};
  }

  if (useToken) headers.Authorization = `Bearer ${Cookies.get('token')}`;

  if (headers['content-type'] === 'application/json' && request.body) {
    request.body = JSON.stringify(request.body);
  }

  if (request.query){
    if (url.at(url.length - 1) == '/')
      url = url.substring(0, url.length - 1)
    Object.entries(request.query).map(([key, value], index) => url += ((index == 0 ? '?' : '&') + key + '=' + value) )
  }
  return await fetch(baseUrl + url, request)
    .then(async (response: any) => {
      return await response.json();
    })
    .catch((error) => {
      console.log('Fetch error', error);
      return {};
    });
};

export { api };
