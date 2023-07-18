import request from '@/util/request';

// 登录成功后获取用户信息
export function getUserInfo() {
    return request({
        url: '/admin-api/user/info',
        method: 'get',
    });
}
