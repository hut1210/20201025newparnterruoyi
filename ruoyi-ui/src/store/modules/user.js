import { login, logout, getInfo ,loginadd} from '@/api/login'
import { getToken, setToken, removeToken,setloc ,getloc,removeloc} from '@/utils/auth'

const user = {
  state: {
    token: getToken(),
    name: '',
    avatar: '',
    roles: [],
    permissions: []
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_PERMISSIONS: (state, permissions) => {
      state.permissions = permissions
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
    
      const email = userInfo.email.trim()
      const pwd = userInfo.pwd
      return new Promise((resolve, reject) => {
        login(email, pwd).then(res => {
          debugger
         
            setToken(res.result.access_token)
            commit('SET_TOKEN', res.result.access_token)
            setloc("token", res.result.access_token)
            resolve()
         
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 登录
    Loginadd({ commit }, userInfo) {
      const email = userInfo.email.trim()
      const pwd = userInfo.pwd
      const nick = userInfo.nick
      const cfpassword = userInfo.cfpwd
      const source = userInfo.source
      return new Promise((resolve, reject) => {
        loginadd(email, pwd,nick,cfpassword,source).then(res => {
            resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },


    // 获取用户信息
    GetInfo({ commit, state }) {
    
      return new Promise((resolve, reject) => {
        getInfo(state.token).then(r => {
          const avatar = require("@/assets/image/profile.jpg") ;
          commit('SET_ROLES', ['ROLE_DEFAULT'])
          commit('SET_AVATAR', avatar)
          resolve(r)
        }).catch(error => {
          reject(error)
        })
      })
    },
   
    
    // 退出系统
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        
        // logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          commit('SET_PERMISSIONS', [])
          removeloc('token')
          removeloc('userNickname')
          removeloc("group_id");
          removeToken()
          resolve()
        // }).catch(error => {
        //   reject(error)
        // })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
