import axios from 'axios';
import { REST_API_URL } from './config';
import { v4 as uuidv4 } from 'uuid';

export const instance = axios.create({
  //baseURL: '/api',
  baseURL: REST_API_URL,
  timeout: 30000,
  method: 'POST',
      mode: 'no-cors',
  headers: {
    'Access-Control-Allow-Origin': true,
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
});

export const setAuthorizationHeader = (instance) => {
  const user = JSON.parse(localStorage.getItem('user'));
  if(user) {
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

      instance.interceptors.response.use(function (response) {
          //console.log('response :'+JSON.stringify(response))
          /*if (response.data && !response.data.status) {
              window.location.href = '/pages/login';
              return Promise.reject(response.data.message);
          }*/

          return response;
      }, function (error) {
        console.log('error response :'+error.response)
          if (error.response && (401 === error.response.status)) {
              localStorage.clear();
              window.location.href = '/pages/logout';
          } /*else {
              window.location.href = '/pages/error-404';
              return Promise.reject(error);
          }*/
      });
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
  //formData.deviceId = `dw-ckEuZFESeqnWjzzz9UE:APA91bF2xMw67hdbbMgC2fXNXfo9BfLPmZZBVMFEDGMLStVdJFgfvjLlsqnMViLMhKx5aeY_25CoMqD3PnY-xvt-xHsE0F44WpnvLDvS8L0QNzRQzYmueyyFWdAyTHeyHnEl7RaLQOIa`;
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
  const formData = {};
  if (data.search) {
    formData.search = data.search;
  }
 
  formData.pageRow = 10;//data.pageRow;
  formData.pageNumber = 0;//data.pageNumber;
  console.log(JSON.stringify(formData))

  return instance.post(url, JSON.stringify(formData));
};

export const obtainContents = (data) => {
  instance.defaults.headers.post['x-auth-token'] = data.token;
  instance.defaults.headers.post['x-auth-user'] = data.email;

  const url = `/posts/getuserposts`;
  const formData = {};
  if (data.email) {
    formData.search = data.email;
  }
 
  formData.pageRow = 10;//data.pageRow;
  formData.pageNumber = 0;//data.pageNumber;
  console.log(JSON.stringify(formData))

  return instance.post(url, JSON.stringify(formData));
};
