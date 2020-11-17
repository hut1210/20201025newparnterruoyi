import request from '@/utils/request'

// 登录方法
export function login(email, pwd) {
  
  const data = {
    pwd,
    email
  }
  return request({
    url: '/gpauth/partner/merchant/users/login',
    method: 'post',
    data: data
  })
}

// 登录方法
export function loginadd(email, pwd,nick,cfpassword,source) {
  const data = {
    pwd,
    email,
    nick,
    cfpassword,
    source
  }
  return request({
    url: '/gpauth/partner/merchant/users/add',
    method: 'post',
    data: data
  })
}

// 获取用户详细信息
export function getInfo() {
  return request({
    url: '/gpmanage/partner/merchant/info',
    method: 'get'
  })
}

// 退出方法
export function logout() {
  return request({
    url: 'http://localhost:8090/logout',
    method: 'post'
  })
}

// 获取验证码
export function getCodeImg() {
  return request({
    url: 'http://localhost:8090/captchaImage',
    method: 'get'
  })
}