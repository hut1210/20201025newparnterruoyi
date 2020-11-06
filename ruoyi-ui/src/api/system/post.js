import request from '@/utils/request'

// 查询岗位列表
export function listPost(data) {
  return request({
    url: '/gpmanage/partner/merchant/orders',
    method: 'post',
   data:data
  })
}

// 状态
export function getTypepost(query) {
  return request({
    url: '/core/manager/pay/type',
    method: 'get',
    params: query
  })
}

// 新增岗位
export function addPost(data) {
  return request({
    url: 'http://localhost:8090/system/post',
    method: 'post',
    data: data
  })
}

// 修改岗位
export function updatePost(data) {
  return request({
    url: 'http://localhost:8090/system/post',
    method: 'put',
    data: data
  })
}

// 删除岗位
export function delPost(postId) {
  return request({
    url: 'http://localhost:8090/system/post/' + postId,
    method: 'delete'
  })
}

// 导出岗位
export function exportPost(query) {
  return request({
    url: 'http://localhost:8090/system/post/export',
    method: 'get',
    params: query
  })
}