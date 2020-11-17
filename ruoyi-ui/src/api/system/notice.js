import request from '@/utils/request'

// 查询公告列表
export function listNotice(data) {
  return request({
    url: '/core/manager/review/withdraws/list',
    method: 'post',
    data: data
  })
}

