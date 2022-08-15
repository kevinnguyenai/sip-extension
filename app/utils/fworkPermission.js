import { requestFworkPermissionOne } from '~/services/fworkPermission';
import extension from 'extensionizer';
import { Cookie, CookieRequest, CookieResponse } from '~/utils/datatype';
import { v4 as uuidv4 } from 'uuid';
import { port } from './connect';
/**
 *
 * Check permission for page
 * @param resource_code resourceCode
 * @param action action need search (default 'View')
 * @returns result Bool is have permission (true=have/false=don't have)
 *
 **/
export const checkPermission = (resource_codes = '', action = 'View') => {
  return requestFworkPermissionOne({ resourceCode: resource_codes, actionCode: action })
    .then((res) => {
      return res.success;
    })
    .catch((e) => {
      console.error(e);
      return false;
    });
};
/*
 * Check permission for page
 * @param resource_code resourceCode
 * @param permissionList permissionList
 * @param action action need search (default 'View')
 * @returns result Bool is have permission (true=have/false=don't have)
 *
 **/
export const checkPermissionMany = ({ resourceCode = '', action = 'View', listPermissions }) => {
  if (Array.isArray(listPermissions)) {
    let findRSrc = listPermissions.find((x) => {
      return x.resourceCode === resourceCode;
    });
    if (findRSrc) {
      let findA = findRSrc.action.find((x) => x.name == action);
      if (findA) return true;
      else return false;
    } else return false;
  } else return false;
};

/**
 *
 * get Cookie of fwork
 * @status OK
 * @param cname name of Cookie
 * @returns true/false if action done or catch error
 *
 **/
export const getCookie = (cname) => {
  try {
    const GetCookieRequest = CookieRequest(uuidv4(), "getCookie", {name: cname});
    port.postMessage(Object.getPrototypeOf(GetCookieRequest));
    return true;
  } catch (error) {
    return false;
  }
};

/**
 * 
 * @param {string} cname name of cookies will set
 * @param {string} cvalue value of cookies name will set
 * @param {number} exdays expired days will set
 * @returns Boolean true/false if action done
 */
export const setCookie = (cname, cvalue, exdays) => {
  extension.tabs.query({active: true, currentWindow: true}, tabs => {
    const cookie = Cookie(cname, cvalue, exdays, "/");
    const SetCookieRequest = CookieRequest(uuidv4(), "setCookie", Object.getPrototypeOf(cookie));
    port.postMessage(Object.getPrototypeOf(SetCookieRequest));
    return true;
  });
  return false;
};

export const deleteCookie = (cname) => {
  const cookie = Cookie(cname, '', 0, "/");
  const DelCookieRequest = CookieRequest(uuidv4(), "deleteCookie", Object.getPrototypeOf(cookie));
  port.postMessage(Object.getPrototypeOf(DelCookieRequest));
}

/**
 * checked user was logged in
 * @status DEPRECATED
 */
export const checkCookie = () => {
  let user = getCookie('username');
  if (user != '') {
    alert('Welcome again ' + user);
  } else {
    user = prompt('Please enter your name:', '');
    if (user != '' && user != null) {
      setCookie('username', user, 30);
    }
  }
};

/**
 * remove fwork-token cookies
 * @status DEPRECATED
 */
export const deleteAllCookies = () => {
  document.cookie = 'fwork-token=; Max-Age=0; path=/';
};
