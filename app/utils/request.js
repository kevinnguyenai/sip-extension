/**
 * request 网络请求工具
 * 更详细的api文档: https://bigfish.alipay.com/doc/api#request
 */
import { extend } from 'umi-request';
import { notification } from 'antd';


const codeMessage = {
  200: 'The server successfully returned the requested data.',
  201: 'New or modified data succeeded. ',
  202: 'A request has entered the background queue (async task). ',
  204: 'Delete data successfully. ',
  400: 'There was an error in the request sent, and the server did not create or modify data. ',
  401: 'User does not have permission (token, username, password incorrect). ',
  403: 'User is authorized, but access is forbidden. ',
  404: 'The request was made for a record that does not exist, and the server did not operate. ',
  406: 'The requested format is not available. ',
  410: 'The requested resource was permanently deleted and will no longer be available. ',
  422: 'A validation error occurred while creating an object. ',
  500: 'The server encountered an error, please check the server. ',
  502: 'Bad gateway. ',
  503: 'The service is unavailable, the server is temporarily overloaded or maintained. ',
  504: 'Gateway timed out. ',
};

/**
 * Exception handler
 */
const errorHandler = (error, router) => {
  const { response = {} } = error;
  const errortext = codeMessage[response.status] || response.statusText;
  const { status, url } = response;

  if (status === 401) {
    notification.error({
      message: 'Not logged in or the login has expired, please log in again.',
    });
    // @HACK
    /* eslint-disable no-underscore-dangle */
    window.g_app._store.dispatch({
      type: 'login/logout',
    });
    return;
  }
  notification.error({
    message: `request error ${status}: ${url}`,
    description: errortext,
  });
  // environment should not be used
  if (status === 403) {
    router.push('/exception/403');
    return;
  }
  if (status <= 504 && status >= 500) {
    router.push('/exception/500');
    return;
  }
  if (status >= 404 && status < 422) {
    router.push('/exception/404');
  }
};

/**
 * @Kevin
 * 
 */
export const accessToken = process.env.NODE_ENV && process.env.NODE_ENV === 'production'
  ? getCookie('fwork-token')
  : process.env.DEVELOP_USER_TOKEN
  ? process.env.DEVELOP_USER_TOKEN
  : ''
  ;
export const accessTokenFwork = window.location.search.split('token=').length >= 2
  ? window.location.search.split('token=')[1]
  : accessToken
  ;

/**
 * Default parameters when configuring the request
 */
const request = extend({
  //prefix: 'https://proapi.azurewebsites.net',
  errorHandler, // Default error handling
  timeout: 60000,
  haders: {
    Authorization: `Bearer ${accessTokenFwork}`,
  }
  // credentials: 'include', // Whether to bring cookies by default
});

export default request;
