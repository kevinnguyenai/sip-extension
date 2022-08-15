import React , {Component} from 'react';
import LoginForm from  '~/components/LoginForm';



export default  {
  namespace: 'login',

  state: {
    isOpen: true,
    element: {
      content: LoginForm,
      title: "Login From",
      width: "48vh",
      footer: null,
    },
  },

  subscriptions: {
    setup({dispatch, history}) {
      history.listen(location => {
        location.pathname==="/login" &&
        dispatch({
          type: 'updateState',
          payload: {
            isOpen: true,
          }
        });
      });
    },
  },

  effects: {
    *close({ payload, history}, { call, put }) {
      yield put({
        type: 'saveState',
        payload: {
          isOpen: false,
        },
      });
    },
  },

  reducers: {
    saveState(state, {payload}) {
      return {...state, ...payload };
    },

    updateState(state, {payload}) {
      return {...state, ...payload };
    },
  },
}