import request from '@/util/request';

/**
 * 获取商品分类列表
 */
export function list() {
    return request({
        url: '/api-admin/pms/category',
        method: 'get'
    });
}


/**
 * 添加商品分类
 * @param data
 */
export function add(data) {
    return request({
        url: '/api-admin/pms/category',
        method: 'post',
        data: data,
    });
}

/**
 * 修改商品分类
 *
 * @param id
 * @param data
 */
export function updateById(id, data) {
    return request({
        url: '/api-admin/pms/category/' + id,
        method: 'put',
        data: data,
    });
}

/**
 * 删除商品分类
 * @param id
 */
export function deleteById(id) {
    return request({
        url: '/api-admin/pms/category/' + id,
        method: 'delete',
    });
}