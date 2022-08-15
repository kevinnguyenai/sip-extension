import request from '~/utils/request';
import { getCookie } from '~/utils/fworkPermission';
import api from '~/api';

export async function getFakeCapcha(mobile) {
    return request(`/api/login/captcha?mobile=${mobile}`);
}

export async function requestLoginFworkByToken() {
    const token = getCookie('fwork-token');
    if (token && token !== '' ) {    
        return request(`${api.FWORK_URL}/api/v1/portal/user`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
    }
}

export async function requestLoginFworkByAccount(data) {
    return request(`${api.FWORK_URL}/api/v1/portal/login`, {
        method: 'POST',
        data,
    });
}