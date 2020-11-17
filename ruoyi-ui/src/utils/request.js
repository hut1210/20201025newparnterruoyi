import axios from 'axios'
import { Notification, MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken, setToken, removeToken,setloc ,getloc } from '@/utils/auth'
import errorCode from '@/utils/errorCode'

axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'
// 创建axios实例
const service = axios.create({
  // axios中请求配置有baseURL选项，表示请求URL公共部分
  baseURL: process.env.VUE_APP_BASE_API,
  // 超时
  timeout: 1000000000,
  
})
function filterNull (o) {
  for (var key in o) {
    if (o[key] === null) {
      delete o[key]
    }
    if (toType(o[key]) === 'string') {
      o[key] = o[key].trim()
    } else if (toType(o[key]) === 'object') {
      o[key] = filterNull(o[key])
    } else if (toType(o[key]) === 'array') {
      o[key] = filterNull(o[key])
    }
  }
  return o
}
const getNowTime = () => {
  let date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let date1 = date.getDate();
  let hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
  let minute =
    date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
  let second =
    date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
  let milliSeconds = date.getMilliseconds();
  var currentTime =
    year +
    "-" +
    month +
    "-" +
    date1 +
    " " +
    hour +
    ":" +
    minute +
    ":" +
    second +
    "." +
    milliSeconds;
  return currentTime;
};
// 自定义判断元素类型JS
function toType (obj) {
  return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
}
// request拦截器
service.interceptors.request.use(config => {
  
  
  if (config.data && config.url!="/core/api/payment/paymentout") {
    config.data = filterNull(config.data)
    
  }
  
 let obj= "Bearer " + getloc("token")
 
 if(config.url=="/gpauth/partner/merchant/users/login" || config.url=="/gpauth/partner/merchant/users/add"){
    obj="";
 }
  // 是否需要设置 token
  // const isToken = (config.headers || {}).isToken === false
  if (getToken() ) {
    config.headers['Authorization'] = obj // 让每个请求携带自定义token 请根据实际情况自行修改
    
  }
  if(config.data){
    config.data=(config.method == 'post' || config.method == 'put' ? config.data : null)
  }
  if (config.params ){
  config.params=(config.method == 'get' || config.method == 'delete' ? config.data : null)
}
debugger
if (config.method == 'get') {
  if(config.url.indexOf("?") > -1){
    config.url += '&tp=' + getNowTime();
    config.url = config.url;
}else{
  config.url += '?&tp=' + getNowTime();
  config.url = config.url;
}
} else {
  //console.log((params));
  //if(typeof(params)=='string'){
  try {
    config.data.tp = getNowTime();
  } catch (e) {
    config.data = eval('(' + config.data + ')');
    config.data.tp = getNowTime();
    config.data = JSON.stringify(config.data);
  }
}
  return config
}, error => {
    console.log(error)
    Promise.reject(error)
})

// 响应拦截器
service.interceptors.response.use(res => {
  
    // 未设置状态码则默认成功状态
    const code = res.data.code || 200;
    // 获取错误信息
    const msg = errorCode[code] || res.data.msg || errorCode['default']
    if (code === 401) {
      MessageBox.confirm('登录状态已过期，您可以继续留在该页面，或者重新登录', '系统提示', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).then(() => {
        store.dispatch('LogOut').then(() => {
          location.href = '/index';
        })
      })
    } else if (code === 500) {
      Message({
        message: msg,
        type: 'error'
      })
      return Promise.reject(new Error(msg))
    } else if (code !== 200 && code<1000) {
      Notification.error({
        title: msg
      })
      return Promise.reject('error')
    } else {
      return res.data
    }
  },
  error => {
    console.log('err' + error)
    let { message } = error;
    if (message == "Network Error") {
      message = "后端接口连接异常";
    }
    else if (message.includes("timeout")) {
      message = "系统接口请求超时";
    }
    else if (message.includes("Request failed with status code")) {
      message = "系统接口" + message.substr(message.length - 3) + "异常";
    }
    Message({
      message: message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)
        

export default service
