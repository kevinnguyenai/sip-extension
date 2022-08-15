import request from '~/utils/request';
import api from '~/api'
import { getCookie } from '~/utils/fworkPermission';
import { store } from '~/pages/popup';
import { notification } from 'antd';

export async function requestFworkPermission() {
    const token = getCookie('fwork-token');
    return request(
      `${api.FWORK_URL}/api/v1/iam/authorization/${process.env.FWORD_PROJECT_ID}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      },
    );
  }
  export async function requestFworkPermissionOne(data) {
    return request(
      `${api.FWORK_URL}/api/v2/iam/auth/organizations?projectId=${
        process.env.FWORD_PROJECT_ID
      }&resourceCode=${data.resourceCode}&actionCode=${data?.actionCode || 'view'}`,
      {
        method: 'GET',
      },
    );
  }
  export async function requestFworkUsersList(filter) {
    return request(`${api.FWORK_URL}/api/v1/iam/users`, {
      method: 'GET',
      params: {
        pageSize: 100,
        ...filter,
      },
    });
  }

  /**
   * Get userinfo of authorized user
   * @Kevin
   * @params null
   * @results an object data present information of authorized user
   * { 
   *    "success":...
   *    "data": {
   *        "_id":...,
   *        "status":...,
   *        "name":...,
   *        "code":...,
   *        "phone":...,
   *        "size":...,
   *        "represent":...,
   *        "service": [
   *            {
   *                "active":...,
   *                "_id":...,
   *                "code": "oncx-104517c9",
   *                "status": true
   *            }
   *        ],
   *        "createdDate":...,
   *        "updateDate":...,
   *        "isPlan": "FREE"
   *    },
   *    "setting": {...}
   * }
   */
  export async function requestFworkUserInfo() {
    return request(`${api.FWORK_URL}/api/v1/portal/user`, {
        method: 'GET'
    });
  }

  export async function requestFworkCheckAuth() {
    const { authToken } = store.getState().global.user;
    if(authToken !== null) {
      return request(`${api.FWORK_URL}/api/v1/authentication/check-auth`,  {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      });
    } else {
      notification.error({
        message: 'Please Login again, unknown token',
      });
    }
  }
  