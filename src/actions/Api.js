import axios from 'axios';
import Config from 'react-native-config';

axios.interceptors.request.use(
  function (config) {
    config.baseURL = Config.API_HOST;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (__DEV__) {
      if (!error?.response) {
        console.log(error);
      } else {
        const {config, status, data} = error?.response || {};
        console.log(`URL: ${config?.url}\n`, `STATUS: ${status}\n`, data);
      }
    }
    return Promise.reject(error);
  },
);

export const ApiGetForecastWeather = body => {
  let params = {
    key: Config.SECRET_KEY,
    aqi: 'no',
    alerts: 'no',
    days: '7',
    ...body,
  };
  return axios({
    method: 'get',
    url: 'forecast.json',
    params,
  });
};

export const ApiSearchWeather = body => {
  let params = {
    key: Config.SECRET_KEY,
    ...body,
  };
  return axios({
    method: 'get',
    url: 'search.json',
    params,
  });
};
