import axios from 'axios';
//import { REST_API_URL } from './config';
import { v4 as uuidv4 } from 'uuid';

export const instance = axios.create({
  baseURL: '/api',
  //baseURL: REST_API_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
});

export const setAuthorizationHeader = (instance) => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user) {
    const accessToken = user.token;
    const email = user.email;

    // Set the AUTH token for any request
    instance.interceptors.request.use(function (request) {
      //console.log('Starting Request', JSON.stringify(request, null, 2))

      if (accessToken) {
        request.headers['x-auth-token'] = accessToken;
        request.headers['x-auth-user'] = email;
      } else {
        //localStorage.removeItem("userInfo");
        window.location.href = '/pages/logout';
      }
      return request;
    });

    instance.interceptors.response.use(
      function (response) {
        //console.log('response :'+JSON.stringify(response))
        /*if (response.data && !response.data.status) {
              window.location.href = '/pages/login';
              return Promise.reject(response.data.message);
          }*/

        return response;
      },
      function (error) {
        console.log('error response :' + error.response);
        if (error.response && 401 === error.response.status) {
          localStorage.clear();
          window.location.href = '/pages/logout';
        } /*else {
              window.location.href = '/pages/error-404';
              return Promise.reject(error);
          }*/
      },
    );
  }

  return instance;
};

export const login = (data) => {
  //instance.defaults.headers.common["X-AUTH-SECURED"] = `EVENT`;
  //instance.defaults.headers.common["Content-Type"] = `multipart/form-data`;
  // instance.interceptors.request.use(request => {
  //   console.log('Starting Request', JSON.stringify(request, null, 2))
  //   return request
  // });

  const url = `/user/login`;
  const formData = {};
  formData.email = data.email;
  formData.password = data.password;
  formData.location = data.location ? data.location : { longitude: '0.0000', latitude: '0.0000' };
  formData.deviceId = data.device ? data.device : uuidv4();
  return instance.post(url, JSON.stringify(formData));
};

export const premiumSubscribe = (data) => {
  const url = `/user/premiumsubscribe`;
  const formData = {};
  formData.email = data.email;
  formData.event = 'SUBSCRIBE';
  formData.status = 'INITIAL';
  return instance.post(url, JSON.stringify(formData));
};

export const premiumConfirm = (data) => {
  //instance.defaults.headers.common["Content-Type"] = `application/json`;
  const url = `/user/premiumconfirm`;
  const formData = {};
  formData.email = data.email;
  formData.otpToken = data.otpToken;
  formData.event = 'VERIFY_OTP';
  formData.status = 'REPLY';
  return instance.post(url, JSON.stringify(formData));
};

export const obtainProfiles = (data) => {
  instance.defaults.headers.post['x-auth-token'] = data.token;
  instance.defaults.headers.post['x-auth-user'] = data.email;

  const url = `/user/getprofiles`;
  const form = new FormData();
  if (data.search) {
    form.append('search', data.search);
  }

  form.append('pageRow', 10);
  form.append('pageNumber', 0);

  return instance.post(url, form);
};

// idk this is use or not
export const obtainContents = (data) => {
  instance.defaults.headers.post['x-auth-token'] = data.token;
  instance.defaults.headers.post['x-auth-user'] = data.email;

  const url = `/posts/getuserposts`;
  const form = new FormData();
  if (data.email) {
    form.append('search', data.email);
  }

  form.append('pageRow', 10);
  form.append('pageNumber', 0);

  return instance.post(url, form);
};
