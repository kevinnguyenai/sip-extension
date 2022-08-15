import extension from 'extensionizer';
import { v4 as uuidv4 } from 'uuid';
import { Cookie, CookieRequest, CookieResponse } from '~/utils/datatype';

extension.runtime.onInstalled.addListener((details) => {
  console.log('previousVersion', details.previousVersion)
});

extension.runtime.onConnect.addListener(port => {
  console.log(`new connection established: '${port}`);
  port.onMessage.addListener(msg => {
    const { id, method, data } = msg;
    switch(method) {
      case 'setCookie': {
        extension.cookies.set(
          data,
          res => {
            port.postMessage(
              Object.getPrototypeOf(CookieResponse(id, method, 'successful', res))
            );
          }
          );
        break;
      }
      case 'getCookie': {
        extension.cookies.get(
          {
            url: "http://127.0.0.1/",
            name: data.name,
          },
          res => {
            if(res!==null) {
              port.postMessage(
                Object.getPrototypeOf(CookieResponse(id, method, 'successful', res))
              );
            } else {
              port.postMessage(
                Object.getPrototypeOf(CookieResponse(id, method,"fail", {}))
              )
            }
          }
        )
        break;
      }
      case 'deleteCookie': {
        extension.cookies.get(
          {
            url: "http://127.0.0.1",
            name: data.name
          },
          res => {
            extension.cookies.remove(
              {
                url: `http://${res.domain}`,
                name: res.name,
              },
              result => {
                port.postMessage(
                  Object.getPrototypeOf(CookieResponse(id, method, "successful", result))
                );
              }
            );
          }
        );
        break;
      }
      default: {
        const ErrResponse = CookieResponse(id, method, `Unknown Command ${method}`, {})
        port.postMessage(Object.getPrototypeOf(ErrResponse));
        break;
      }
    }
  })
});
