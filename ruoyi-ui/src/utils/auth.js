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
function getloc (name) {
  var value = localStorage.getItem(name)
  if (/^\{.*\}$/.test(value)) {
    value = JSON.parse(value)
  }
  return value
}
function setloc (name, value) {
  if (typeof value === typeof {}) {
    value = JSON.stringify(value)
  }
  return localStorage.setItem(name, value)
}
function removeloc (name) {
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
        "title": "系统管理",
        "icon": "system"
      },
      "children": [{
        "name": "User",
        "path": "user",
        "hidden": false,
        "component": "system/user/index",
        "meta": {
          "title": "用户管理",
          "icon": "user"
        }
      }, {
        "name": "Role",
        "path": "role",
        "hidden": false,
        "component": "system/role/index",
        "meta": {
          "title": "角色管理",
          "icon": "peoples"
        }
      }, {
        "name": "Menu",
        "path": "menu",
        "hidden": false,
        "component": "system/menu/index",
        "meta": {
          "title": "菜单管理",
          "icon": "tree-table"
        }
      }, {
        "name": "Dept",
        "path": "dept",
        "hidden": false,
        "component": "system/dept/index",
        "meta": {
          "title": "部门管理",
          "icon": "tree"
        }
      }, {
        "name": "Post",
        "path": "post",
        "hidden": false,
        "component": "system/post/index",
        "meta": {
          "title": "岗位管理",
          "icon": "post"
        }
      }, {
        "name": "Dict",
        "path": "dict",
        "hidden": false,
        "component": "system/dict/index",
        "meta": {
          "title": "字典管理",
          "icon": "dict"
        }
      }, {
        "name": "Config",
        "path": "config",
        "hidden": false,
        "component": "system/config/index",
        "meta": {
          "title": "参数设置",
          "icon": "edit"
        }
      }, {
        "name": "Notice",
        "path": "notice",
        "hidden": false,
        "component": "system/notice/index",
        "meta": {
          "title": "通知公告",
          "icon": "message"
        }
      }, {
        "name": "Log",
        "path": "log",
        "hidden": false,
        "redirect": "noRedirect",
        "component": "system/log/index",
        "alwaysShow": true,
        "meta": {
          "title": "日志管理",
          "icon": "log"
        },
        "children": [{
          "name": "Operlog",
          "path": "operlog",
          "hidden": false,
          "component": "monitor/operlog/index",
          "meta": {
            "title": "操作日志",
            "icon": "form"
          }
        }, {
          "name": "Logininfor",
          "path": "logininfor",
          "hidden": false,
          "component": "monitor/logininfor/index",
          "meta": {
            "title": "登录日志",
            "icon": "logininfor"
          }
        }]
      }]
    }, {
      "name": "Monitor",
      "path": "/monitor",
      "hidden": false,
      "redirect": "noRedirect",
      "component": "Layout",
      "alwaysShow": true,
      "meta": {
        "title": "系统监控",
        "icon": "monitor"
      },
      "children": [{
        "name": "Online",
        "path": "online",
        "hidden": false,
        "component": "monitor/online/index",
        "meta": {
          "title": "在线用户",
          "icon": "online"
        }
      }, {
        "name": "Job",
        "path": "job",
        "hidden": false,
        "component": "monitor/job/index",
        "meta": {
          "title": "定时任务",
          "icon": "job"
        }
      }, {
        "name": "Druid",
        "path": "druid",
        "hidden": false,
        "component": "monitor/druid/index",
        "meta": {
          "title": "数据监控",
          "icon": "druid"
        }
      }, {
        "name": "Server",
        "path": "server",
        "hidden": false,
        "component": "monitor/server/index",
        "meta": {
          "title": "服务监控",
          "icon": "server"
        }
      }]
    }, {
      "name": "Tool",
      "path": "/tool",
      "hidden": false,
      "redirect": "noRedirect",
      "component": "Layout",
      "alwaysShow": true,
      "meta": {
        "title": "系统工具",
        "icon": "tool"
      },
      "children": [{
        "name": "Build",
        "path": "build",
        "hidden": false,
        "component": "tool/build/index",
        "meta": {
          "title": "表单构建",
          "icon": "build"
        }
      }, {
        "name": "Gen",
        "path": "gen",
        "hidden": false,
        "component": "tool/gen/index",
        "meta": {
          "title": "代码生成",
          "icon": "code"
        }
      }, {
        "name": "Swagger",
        "path": "swagger",
        "hidden": false,
        "component": "tool/swagger/index",
        "meta": {
          "title": "系统接口",
          "icon": "swagger"
        }
      }]
    }, {
      "name": "Http://ruoyi.vip",
      "path": "http://ruoyi.vip",
      "hidden": false,
      "component": "Layout",
      "meta": {
        "title": "若依官网",
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