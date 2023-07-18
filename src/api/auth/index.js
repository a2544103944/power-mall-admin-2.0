import request from '@/util/request';

/**
 * 登录
 * @param data
 */
export function login(data) {
  return request({
    url: '/api-admin/auth/login',
    method: 'post',
    params: data
  });
}

/**
 * 退出
 */
export function logout() {
  return request({
    url: '/api-admin/auth/logout',
    method: 'delete',
  });
}

/**
 * 获取图形验证码
 */
export function getCaptcha(){
  return request({
    url: '/api-common/captcha/img?t=' + new Date().getTime().toString(),
    method: 'get',
  });
}


