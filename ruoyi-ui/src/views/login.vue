<template>
  <div class="login">
    <el-form ref="formLogin" :model="formLogin" :rules="loginRules" class="login-form">
      <h3 class="title">Grepay商户系统</h3>
      <el-form-item prop="email">
        <el-input v-model="formLogin.email" type="text" auto-complete="off" placeholder="账号">
          <svg-icon slot="prefix" icon-class="user" class="el-input__icon input-icon" />
        </el-input>
      </el-form-item>
    
      <el-form-item prop="pwd">
        <el-input
          v-model="formLogin.pwd"
          type="password"
          auto-complete="off"
          placeholder="密码"
          @keyup.enter.native="handleLogin"
        >
          <svg-icon slot="prefix" icon-class="password" class="el-input__icon input-icon" />
        </el-input>
      </el-form-item>
      
      <el-form-item v-if="ok" prop="cfpwd">
        <el-input
        v-model="formLogin.cfpwd"
        type="password"
        auto-complete="off"
        placeholder="请再次输入密码"
        @keyup.enter.native="handleLogin"
      >
        <svg-icon slot="prefix" icon-class="password" class="el-input__icon input-icon" />
      </el-input>
      </el-form-item>
      <el-form-item style="width:100%;" v-else>
        <el-button
          :loading="loading"
          size="medium"
          type="primary"
          style="width:100%;"
          @click.native.prevent="handleLogin"
        >
          <span v-if="!loading">登 录</span>
          <span v-else>登 录 中...</span>
        </el-button>
        <span style="font-size:12px;color:#999">没有账号？ <span style="color: #198afa;
          cursor: pointer" @click="toaddView">立即注册</span></span>
      </el-form-item>
      <el-form-item style="width:100%;"  v-if="ok">
        <el-button
          size="medium"
          type="primary"
          style="width:100%;"
          @click.native.prevent="handleLoginadd"
        >
          <span>注册</span>
         
        </el-button>
      
      </el-form-item>
    </el-form>
    <!--  底部  -->
    <div class="el-login-footer">
      <span>Copyright © 2020 jindou.vip All Rights Reserved.</span>
    </div>
  </div>
</template>

<script>
import { getCodeImg } from "@/api/login";
export default {
  name: "Login",
  data() {
    var validateemail = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入账号'));
        }else if(!this.ext.test(this.formLogin.email)){
          callback(new Error('请填写正确的邮箱'));
        } else {
          callback();
        }
      };
      var validatepwd = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else if (!this.pwdRegex.test(this.formLogin.pwd) &&  this.ok) {
          callback(new Error('密码中必须包含大小写字母、数字!'));
        } else {
          callback();
        }
      };
      var validatecfpwd = (rule, value, callback) => {
        if (value != this.formLogin.pwd && this.ok) {
          callback(new Error('两次密码输入不一致！'));
        } else {
          callback();
        }
      };
    return {
      ok: false,
      formLogin: {
        email: "aab0@163.com",
        pwd: "123456",
        source: "PC",
        nick: "aa",
        cfpwd: ""
      },
      ext :/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/,
      pwdRegex : /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z]){8,30}/,
      errorInfo: {
        text: "登陆失败,请重试",
        isShowError: false // 显示错误提示
      },
      loginRules: {
        email: [
          { validator: validateemail,  trigger: "blur", }
        ],
        pwd: [
          {validator: validatepwd, trigger: "blur",}
        ],
        cfpwd: [
          {validator: validatecfpwd, trigger: "blur",}
        ]
      },
      loading: false,
      redirect: undefined
    };
  },
  created() {
    
  },
  methods: {
    handleLogin() {
      let self = this;
      this.$refs.formLogin.validate(valid => {
        if (valid) {
          this.loading = true;
          this.$store
            .dispatch("Login", this.formLogin)
            .then(() => {
              debugger
              self.getinfo()
              this.$message({
                  message: "登陆成功",
                  type: "success"
                });
              
            })
            .catch(() => {
              this.loading = false;
            });
        }
      });
    },
    handleLoginadd() {
      let self = this;
      this.$refs.formLogin.validate(valid => {
        if (valid) {
          this.$store
            .dispatch("Loginadd", this.formLogin)
            .then(() => {
              self.ok = false;
              this.$message({
                  message: "注册成功",
                  type: "success"
                });
            })
            .catch(() => {
             
            });
        }
      });
    },
    toaddView() {
      let self = this;
      self.ok = true;
    },
    getinfo(){
      
      this.$store.dispatch('GetInfo').then(r => {
        
      let self = this;
      if (r.code == 1000) {
          self.$utils.setloc("userNickname", r.result.merchanDetail.companyName);
          if(r.result.merchanDetail.status==1){
            self.$utils.setloc("group_id", 1);//認證通過
            self.$utils.setloc("countryCode", r.result.merchantAccount.countryCode);
            self.$utils.setloc("currency", r.result.merchantAccount.currency);
          }else if(r.result.merchanDetail.status==0 || r.result.merchanDetail.status==2){
            self.$utils.setloc("group_id", 2);//正在認證
          }else{
            self.$utils.setloc("group_id", 0);//未通過或是沒認證
          }
        }else{
          self.$utils.setloc("group_id", 0);
        }
        this.$router.push({ path: this.redirect || "/" });
        // self.$router.push({ path: "/index" });
    })
  }
  },
  
};
</script>

<style rel="stylesheet/scss" lang="scss">
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-image: url("../assets/image/login-background.jpg");
  background-size: cover;
}
.title {
  margin: 0px auto 30px auto;
  text-align: center;
  color: #707070;
}

.login-form {
  border-radius: 6px;
  background: #ffffff;
  width: 400px;
  padding: 25px 25px 5px 25px;
  .el-input {
    height: 38px;
    input {
      height: 38px;
    }
  }
  .input-icon {
    height: 39px;
    width: 14px;
    margin-left: 2px;
  }
}
.login-tip {
  font-size: 13px;
  text-align: center;
  color: #bfbfbf;
}
.login-code {
  width: 33%;
  height: 38px;
  float: right;
  img {
    cursor: pointer;
    vertical-align: middle;
  }
}
.el-login-footer {
  height: 40px;
  line-height: 40px;
  position: fixed;
  bottom: 0;
  width: 100%;
  text-align: center;
  color: #fff;
  font-family: Arial;
  font-size: 12px;
  letter-spacing: 1px;
}
.login-code-img {
  height: 38px;
}
</style>
