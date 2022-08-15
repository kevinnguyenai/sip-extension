import request from '~/utils/request';
import api from '~/api';

export async function queryNotices() {
  return request('/api/notices');
}

export async function requestCurrentUserInfo(headers) {
  if (headers) {
    return request(`${api.ACCESS_SERVICE}/me`, {
      method: 'GET',
      headers,
    });
  }
}

export async function requestGetLicense(data) {
  if (process.env.NODE_ENV && process.env.NODE_ENV === 'production') {
    return request(`${api.URL_LICENSE}/get-license`, {
      method: 'POST',
      data: {
        companyId: data?.companyId,
        email: data?.email,
      },
    });
  } else {
    return {
      status: 'OK',
      payload: {
        licenseObject: [
          'call_center/dialplan_manager',
          'call_center/default_settings',
          'call_center/extensions',
          'call_center/ivr',
          'call_center/voice_mail',
          'call_center/ring_groups',
          'call_center/applications',
          'call_center/active_call',
          'call_center/access_controls',
          'call_center',
          'call_center/history_call',
          'call_center/status',
          'call_center/time_conditions',
          'call_center/queues',
          'call_center/forward',
          'administrator/roles',
          'call_center/registrations',
          'call_center/call_block',
          'call_center/advanced',
          'call_center/operator_panel',
          'call_center/diaplan',
          'call_center/sip_status',
          'call_center/agent_status',
          'call_center/active_call_center',
          'call_center/call_recordings',
          'call_center/gateways',
          'call_center/recordings',
          'call_center/outbound_routes',
          'call_center/destination',
          'config',
          'config/campaign-management',
          'campaign',
          'campaign-management',
          'mainpage',
          'administrator',
          'config/standardized',
          'standardized',
          'call_center/inbound_routes',
          'config/campaign-report',
          'omni_inbound/config_livechat',
          'config/voicebot',
          'config/gateways',
          'report-billing',
          'omni_inbound',
          'chat',
        ],
        licenseModule: ['VoiceBot', 'OmniChatInbound', 'Usermanagement', 'CallCenterManagement'],
      },
    };
  }
}

export async function requestAddLicense(data, moduleType, email, company_id) {
  return request(`${api.URL_LICENSE}/add-license`, {
    method: 'POST',
    data: {
      ...data,
      type: moduleType,
      company_id: company_id,
      email: email,
    },
  });
}
