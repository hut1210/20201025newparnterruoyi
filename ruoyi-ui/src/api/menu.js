import request from '@/utils/request'

// 获取路由
export const getRouters = () => {
  return request({
    url: 'http://localhost:8090/getRouters',
    method: 'get'
  })
}