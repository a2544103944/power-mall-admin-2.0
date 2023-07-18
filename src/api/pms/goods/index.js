import request from '@/util/request';

/**
 * 获取商品分页列表
 *
 * @param queryParams
 */
export function list(queryParams) {
  return request({
    url: '/api-admin/pms/spu',
    method: 'get',
    params: queryParams,
  });
}

/**
 * 获取商品详情
 *
 * @param id
 */
export function getDetail(id) {
  return request({
    url: '/api-admin/pms/spu/' + id,
    method: 'get',
  });
}

/**
 * 添加商品
 *
 * @param data
 */
export function add(data) {
  return request({
    url: '/api-admin/pms/spu/',
    method: 'post',
    data: data,
  });
}

/**
 * 修改商品
 *
 * @param id
 * @param data
 */
export function updateById(id, data) {
  return request({
    url: '/api-admin/pms/spu/' + id,
    method: 'put',
    data: data,
  });
}

/**
 * 删除商品
 *
 * @param ids
 */
export function deleteById(id) {
  return request({
    url: '/api-admin/pms/spu/' + id,
    method: 'delete',
  });
}
