import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
// 本地存储
var localStorage = window.localStorage
export function getloc (name) {

  var value = localStorage.getItem(name)
  if (/^\{.*\}$/.test(value)) {
    value = JSON.parse(value)
  }
  return value
}
export function setloc (name, value) {
  return localStorage.setItem(name, value)
}
export function removeloc (name) {
  return localStorage.removeItem(name)
}
// 获取链接参数
function getparam (name, url) {
  var m
  var tmp
  url = (url || window.location.href).split('#')
  if (name.indexOf('#') !== -1) {
    tmp = url.length < 2 ? '' : url[1]
  } else {
    tmp = url[0]
  }
  m = tmp.match(new RegExp('(|[?&#])' + name.replace('#', '') + '=([^#&?]*)(\\s||$)', 'gi'))
  if (m) {
    return decodeURIComponent(m[0].split('=')[1])
  } else {
    return ''
  }
}
// 对象copy
function objcopy (obj) {
  let newobj = {}
  for (let attr in obj) {
    newobj[attr] = obj[attr]
  }
  return newobj
}
// 数组升序
function sortA (arr) {
  let newarr = arr
  newarr.sort((a, b) => { return a - b })
  return newarr
}
// 整数数组求和
function getSum (arr) {
  let sum = 0
  for (let i = 0; i < arr.length; i++) {
    if (!isNaN(arr[i])) {
      sum += parseInt(arr[i])
    }
  }
  return sum
}

export function getRoters(){
  const data={
    "data": [{
      "name": "System",
      "path": "/system",
      "hidden": false,
      "redirect": "noRedirect",
      "component": "Layout",
      "alwaysShow": true,
      "meta": {
        "title": "商户信息管理",
        "icon": "system"
      },
      "children": [
        {
          "name": "MerchantUser",
          "path": "/merchantUser",
          "hidden": false,
          "component": "system/add-user/index",
          "meta": {
            "title": "商户资质信息",
            "icon": "peoples"
          }
        },
        {
        "name": "User",
        "path": "user",
        "hidden": false,
        "component": "system/add-user/make-user",
        "meta": {
          "title": "商户配置参数",
          "icon": "user"
        }
      }
      ]
    }, {
      "name": "Monitor",
      "path": "/monitor",
      "hidden": false,
      "redirect": "noRedirect",
      "component": "Layout",
      "alwaysShow": true,
      "meta": {
        "title": "资金管理",
        "icon": "monitor"
      },
      "children": [{
        "name": "Menu",
        "path": "menu",
        "hidden": false,
        "component": "system/menu/index",
        "meta": {
          "title": "充值记录",
          "icon": "tree-table"
        }
      }, {
        "name": "Job",
        "path": "job",
        "hidden": false,
        "component": "monitor/job/index",
        "meta": {
          "title": "代付记录",
          "icon": "job"
        }
      },  {
        "name": "Dept",
        "path": "dept",
        "hidden": true,
        "component": "system/dept/index",
        "meta": {
          "title": "代付记录详情",
          "icon": "tree"
        }
      }, ]
    }, {
      "name": "Tool",
      "path": "/tool",
      "hidden": false,
      "redirect": "noRedirect",
      "component": "Layout",
      "alwaysShow": true,
      "meta": {
        "title": "交易管理",
        "icon": "tool"
      },
      "children": [{
        "name": "Post",
        "path": "post",
        "hidden": false,
        "component": "system/post/index",
        "meta": {
          "title": "订单信息查询",
          "icon": "post"
        }
      },]
    }, {
      "name": "https://shimo.im/docs/wpxgCdcYxKhYWrG8",
      "path": "https://shimo.im/docs/wpxgCdcYxKhYWrG8",
      "hidden": false,
      "component": "Layout",
      "meta": {
        "title": "开发者文档",
        "icon": "guide"
      }
    }]
    }
  return data.data
  }
export default {
  getloc,
  setloc,
  removeloc,
  getparam,
  objcopy,
  sortA,
  getSum
}