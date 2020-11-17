import request from '@/utils/request'
import { praseStrEmpty } from "@/utils/ruoyi";
// 商户认证信息提交
export function addManage(data) {
  return request({
    url: '/gpmanage/partner/merchant/bind',
    method: 'post',
    data: data
  })
}

// 商户认证信息文件提交
export function fileaddfile(data) {
  return request({
    url: '/gpmanage/partner/merchant/certif',
    method: 'post',
    data: data
  })
}
// 商户认证信息查询
export function getJobmess() {
  return request({
    url: '/gpmanage/partner/merchant/info',
    method: 'get',
    
  })
}
// 查询费率
export function getRequestRate(data) {
  return request({
    url: '/core/api/payment/merchant/rate',
    method: 'post',
    data:data
   
  })
}
// 充值
      export function   requestAddManagecz(data) {
  return request({
    url: '/core/api/payment/recharge',
    method: 'post',
    data: data
   
  })
}
// 提现
export function   requestAddManagetx(data) {
  return request({
    url: '/core/manager/withdraw',
    method: 'post',
    data: data
   
  })
}
// 代付
export function  requestAddManagedf(data) {
  return request({
    url: '/core/api/payment/paymentout',
    method: 'post',
    data: data
   
  })
}
// 查询用户列表
export function listUser(query) {
  return request({
    url: 'http://localhost:8090/system/user/list',
    method: 'get',
    params: query
  })
}

// 查询用户详细
export function getUser(userId) {
  return request({
    url: 'http://localhost:8090/system/user/' + praseStrEmpty(userId),
    method: 'get'
  })
}

// 新增用户
export function addUser(data) {
  return request({
    url: 'http://localhost:8090/system/user',
    method: 'post',
    data: data
  })
}

// 修改用户
export function updateUser(data) {
  return request({
    url: 'http://localhost:8090/system/user',
    method: 'put',
    data: data
  })
}

// 删除用户
export function delUser(userId) {
  return request({
    url: 'http://localhost:8090/system/user/' + userId,
    method: 'delete'
  })
}

// 导出用户
export function exportUser(query) {
  return request({
    url: 'http://localhost:8090/system/user/export',
    method: 'get',
    params: query
  })
}

// 用户密码重置
export function resetUserPwd(userId, password) {
  const data = {
    userId,
    password
  }
  return request({
    url: 'http://localhost:8090/system/user/resetPwd',
    method: 'put',
    data: data
  })
}

// 用户状态修改
export function changeUserStatus(userId, status) {
  const data = {
    userId,
    status
  }
  return request({
    url: 'http://localhost:8090/system/user/changeStatus',
    method: 'put',
    data: data
  })
}

// 查询用户个人信息
export function getUserProfile() {
  return request({
    url: 'http://localhost:8090/system/user/profile',
    method: 'get'
  })
}

// 修改用户个人信息
export function updateUserProfile(data) {
  return request({
    url: 'http://localhost:8090/system/user/profile',
    method: 'put',
    data: data
  })
}

// 用户密码重置
export function updateUserPwd(oldPassword, newPassword) {
  const data = {
    oldPassword,
    newPassword
  }
  return request({
    url: 'http://localhost:8090/system/user/profile/updatePwd',
    method: 'put',
    params: data
  })
}

// 用户头像上传
export function uploadAvatar(data) {
  return request({
    url: 'http://localhost:8090/system/user/profile/avatar',
    method: 'post',
    data: data
  })
}

// 下载用户导入模板
export function importTemplate() {
  return request({
    url: 'http://localhost:8090/system/user/importTemplate',
    method: 'get'
  })
}
