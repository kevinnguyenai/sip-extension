import React , {Component} from 'react';
import { requestLoginFworkByAccount } from '~/services/login';
import { requestFworkPermission} from '~/services/fworkPermission';
import { requestGetLicense } from '~/services/user';
import { setCookie, getCookie } from '~/utils/fworkPermission';

export default {
  namespace: 'loginform',
  state: {
    username: null,
    password: null,
    remember: false,
  },

  effects: {
    *submit({dispatch, payload},{call, put}) {
      const { username, password, remember } = payload;
      const res = yield call(requestLoginFworkByAccount, {
        email: username,
        password: password,
      });
      if (res && res.success && res.data && res.data.access_token) {
        //console.log(res.data.access_token);
        setCookie('fwork-token', res.data.access_token, 3600*24);
        yield put({
          type: 'saveState',
          payload: {
            status: 'success',
          }
        });
        /*
        const resFworkPermission = yield call(requestFworkPermission, {
          email: username,
          password: password
        });
        const resLicense = yield call(requestGetLicense, {
          companyId: res.data?.company._id,
          email: res.data?.email,
        });
        */
      }
      /*
      yield put({
        type: 'saveState',
        payload: {
          username: remember ? username : null,
          password: remember ? password : null,
          remember: remember,
        }
      });
      */
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      setAuthority(payload?.licenseObject, payload?.userId);
      localStorage.setItem('userId', payload.userId);
      localStorage.setItem('authToken', payload.authToken);
      localStorage.setItem('tokenHub', payload.tokenHub);
      localStorage.setItem('tokenGateway', payload.tokenGateway);
    },
    saveState(state, {payload}) {
      return{...state, ...payload};
    },
  },

}
