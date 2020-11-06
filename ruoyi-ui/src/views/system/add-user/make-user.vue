

<template>
  <!-- 认证信息 -->
  <div class="add-manage-info sharing">
    <!-- <div class="return">
      <div class="return-box" @click="goBack">返回列表</div>
    </div> -->
    <!-- tab标签 -->

    <div class="skillby-tab">
      <!-- 认证中查看信息 -->
      <div class="renzheng-look">
      <div  class="search_box" style="justify-content: flex-start;">
        <p class="attestation-title">商户配置参数:</p>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm" style="
        display: flex;
        justify-content: center;">
          <div class="search-input" style="position:relative;">
            <el-form-item label="商户号：" prop="">
              <el-input v-model="ruleForm.merchanDetail.merchantId"  readonly clearable></el-input>
            </el-form-item>
            <!-- <el-form-item label="应用名称：" prop="realname">
              <el-input v-model="ruleForm.merchanDetail.bizContactNumber"  clearable readonly></el-input>
            </el-form-item> -->
            <el-form-item label="APP_ID：" prop="app_id">
              <el-input v-model="ruleForm.merchantApp.app_id" placeholder="APP_ID" clearable readonly></el-input>
            </el-form-item>
            <el-form-item label="APP_Secret：" prop="realname">
              <el-input v-model="ruleForm.merchantApp.app_key" placeholder="APP_Secret" clearable readonly></el-input>
            </el-form-item>
            <el-form-item label="回调地址：" prop="callback_urls">
              <el-input
                type="textarea"
                class="textarea"
                v-model="ruleForm.merchantApp.callback_urls"
               
              ></el-input>
            </el-form-item>
        <el-button type="primary"  size="mini" style="position: absolute; top: 50%;" @click="resetclick">返回</el-button>
          </div>
        </el-form>
        
      </div>
    </div>
     
    </div>
  </div>
</template>

<script>
    import {
    addManage,
    fileadd,
    getJobmess
} from "@/api/system/user";
export default {
  data() {
    var checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('手机号不能为空'));
      } else {
        const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
        console.log(reg.test(value));
        if (reg.test(value)) {
          callback();
        } else {
          return callback(new Error('请输入正确的手机号'));
        }
      }
    };
    return {
      flag:false,
      groupState:false,
      renzhengtype: this.$route.params.type ?  this.$route.params.type : '1',
      groupData:[],
      tagsData:[],
      companyData:[],
      departmentData:[],
      optionsSelect: [],
      merchanDetail:{},
      merchantAccount:{},
      merchantApp:{},
      ruleForm: {
        username: "", //用户名称：
        realname: "", //真实姓名
        password: "", //密码：
        group: "", //用户组
        service: "",  //服务范围
        service_num: "",  //被选择数
        check_num: "",  //平均检测天数
        company_id: "", //公司
        department_id: "", //部门
        position: "", //职位：
        mobile: "", //电话：
        status: 1, //选择
        istop: 0, //选择
        remarks: "" //备注：
      },
      rules: {
        // username: [
        //   { required: true, message: "请输入用户名称", trigger: "blur" },
        //   { min: 3, max: 20, message: "长度在 3 到 20 个字符", trigger: "blur" }
        // ],
        // realname:{required: true, message: "请输入真实姓名", trigger: "blur" },
        // password:{required: true, message: "请输入用户密码", trigger: "blur" },
        // group:{required: true, message: "请选择用户组", trigger: "blur" },
        // company_id:{required: true, message: "请选择所属公司", trigger: "blur" },
        // department_id:{required: true, message: "请选择所属部门", trigger: "blur" },
        // position:{required: true, message: "请输入职位", trigger: "blur" },
        // mobile:[
        //   {validator: checkPhone, trigger: 'blur'}
        // ],
        // service_num:{type:"number",message: "被选择数必须为数字" },
        // check_num:{type:"number",message: "平均检测天数必须为数字"},
      }
    };
  },
  created() {
    //此处信息可以放到x的state里面哟吼放
    this.lookManage();
  },
  methods: {
   
    //获取公司列表
    lookManage(){
      debugger
      let self = this;
      getJobmess({}).then((r) => {
        self.ruleForm=r.result
          console.log("<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<")
          console.log(self.ruleForm)
        }
      );
    },
    
    // 返回
    goBack() {
      this.$router.go(-1);
    },
    //取消
    resetclick(){
      this.$router.go(-1);

    }
  },
  mounted: function() {}
};
</script>

<style lang="less" src="./add-user.less"></style>
<style>
.add-manage-info .radio-box {
  line-height: 4.375rem!important;
  width: 32.125rem;
  height: 70px;
  text-align: left;
}
.add-manage-info .el-radio, .el-radio__input{
  line-height: 4.375rem;
}
.radio-box .el-radio__input.is-checked + .el-radio__label {
  color: #66ce90;
}
.radio-box .el-radio__input.is-checked .el-radio__inner {
  background: #66ce90;
  border-color: #66ce90;
}
</style>
