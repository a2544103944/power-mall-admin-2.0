import request from '@/util/request';
/**
 * 上传文件
 *
 * @param file
 */
export function uploadFile(file) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('bucket','mall')
    return request({
        url: '/api-admin/oss/upload',
        method: 'post',
        data: formData,
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
}

/**
 * 删除文件
 *
 * @param filename 文件名
 */
export function deleteFile(filename) {
    return request({
        url: '/api-admin/oss/remove',
        method: 'delete',
        params: {
            filename: filename,
            bucket: 'mall'
        },
    });
}
