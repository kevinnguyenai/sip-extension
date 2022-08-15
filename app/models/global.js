import { getCookie, deleteCookie } from '~/utils/fworkPermission';

export default {
  namespace: 'global',

  state: {
    collapsed: false,
    authorized: false,
    user: {
      authToken: null,
      userId: null,
      compId: null,
      orgId: null,
      ext: null,
      licenseModule: [],
    }
  },

  subscriptions: {
    setup({dispatch, history}) {
      // change path to root
      history.listen(location => {
        dispatch({
          type: 'updateLocation',
          payload: {
            pathname: location.pathname
          }
        });
      });
      // getCookie
      const login = getCookie('fwork-token');
    },
  },

  effects: {
    *logout() {
      deleteCookie("fwork-token");
    },
    *asyncResetLoginState({dispatch, payload}, { put }) {
      yield put({
        type: 'resetLoginState',
        payload: {
          authorized: false,
          user: {
            authToken: null,
            userId: null,
            compId: null,
            orgId: null,
            ext: null,
            licenseModule: [],
          },
        }
      });
    },
    *asyncUpdateToken({dispatch, payload}, { put }) {
      const { domain, name, value } = payload;
      yield put({
        type: 'saveUserInfo',
        payload: { 
          authToken: value,
        }
      });
    },
    *asyncUpdateLoginStatus({dispatch, payload}, { put }) {
      const { authorized } = payload;
      yield put({
        type: 'saveLoginStatus',
        payload: authorized
      });
    },
    *asyncUpdateLoginUserInfo({dispatch, payload}, { put }) {
      const { userId, currentCompanyId, currentOrganizationId } = payload;
      yield put({
        type: 'saveUserInfo',
        payload: {
          userId: userId,
          compId: currentCompanyId,
          orgId: currentOrganizationId,
        },
      });
    }
  },

  reducers: {
    updateLocation(state, location) {
      const  { pathname } = location;
      return {...state, 
        location: {
          pathname: pathname,
        },
      };
    },
    saveState(state, { payload }) {
      return{...state, ...payload};
    },
    saveUserInfo(state , { payload }) {
      return {
        ...state,
        user: {
          ...state.user,
          ...payload
        }
      };
    },
    saveLoginStatus(state, { payload }) {
      return {...state,
        authorized: payload
      };
    },
    resetLoginState(state, { payload }) {
      const { authorized, user } = payload;
      return {...state,
        authorized: authorized,
        user: user,
      }
    }
  }
}