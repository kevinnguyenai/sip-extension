import extension from 'extensionizer';
import { store } from '~/pages/popup';
import { requestFworkCheckAuth } from '~/services/fworkPermission';
import { notification } from 'antd';
export const port = extension.runtime.connect({name: 'Cookie'});

port.onMessage.addListener(res => {
  const {id, method, result, data } = res;
  //console.log(`${method}: ${JSON.stringify(data)}`);
  switch(method) {
    case 'getCookie': {
      // dispatch saved authToken from cookies
      if(result==="successful") { 
        store.dispatch({
          type: 'global/asyncUpdateToken',
          payload: data,
        });
        // fetch Authentication Info if exist token
        if(store.getState().global.user.authToken !== null) {
          requestFworkCheckAuth()
          .then(resp => {
            store.dispatch({
              type: 'global/asyncUpdateLoginUserInfo',
              payload: resp.data,
            });
            }
          )
          .catch(err => notification.error({
              message: `error in login process ${err}`
            })
          );
          // update login status OK
          store.dispatch({
            type: 'global/asyncUpdateLoginStatus',
            payload: {
              authorized: true,
            },
          });
        }
      }
      break;
    }
    case 'setCookie': {
      // dispatch for setCookie method
      store.dispatch({
        type: 'global/asyncUpdateToken',
        payload: data,
      });
      requestFworkCheckAuth()
      .then(resp => {
        console.log(store.getState());
        store.dispatch({
          type: 'global/asyncUpdateLoginUserInfo',
          payload: resp.data,
        });
        console.log(resp.data);
        console.log(store.getState());
        }
      )
      .catch(err => notification.error({
          message: `error in login process ${err}`
        })
      );
      store.dispatch({
        type: 'global/asyncUpdateLoginStatus',
        payload: {
          authorized: true,
        },
      });
      if(store.getState().login.isOpen) {
        store.dispatch({
          type: 'login/close',
          payload: {}
        });
      }
      break;
    }
    case 'deleteCookie': {
      // dispatch reset login state
      store.dispatch({
        type: 'global/asyncResetLoginState',
        payload: {}
      });
      break;
    }
    default: {
      break;
    }
  }
});