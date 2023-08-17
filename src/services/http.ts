import { config } from "./config.tsx";

type fetchType = {
  method?: string,
  body?: any,
  headers?: {
    'content-type'?: string,
    accessToken?: string,
    refreshToken?: string,
  }
}

const api = async (url: string, request: fetchType = {}, useAccessToken = false, useRefreshToken = false) => {
  const baseUrl = config.baseUrl
  const headers = request.headers || {};
  if (!headers['content-type']) {
    headers['content-type'] = 'application/json';
    request = {...request, headers};
  }
  if (headers['content-type'] === 'application/json' && request.body) {
    request.body = JSON.stringify(request.body);
  }
  return await fetch(baseUrl + url, request)
      .then(async (response: any) => {
        return await response.json();
      })
      .catch(error => {
        console.log('Fetch error', error);
        return {}
      })
}

export { api };