<template>
  <!-- 认证信息 -->
  <div class="add-manage-info sharing">
    <!-- <div class="return">
      <div class="return-box" @click="goBack">返回列表</div>
    </div> -->
    <!-- tab标签 -->

    <div class="skillby-tab">
      <!-- 认证中查看信息 -->
      <div
        class="renzheng-look"
        v-if="renzhengtype == '2' || $utils.getloc('group_id') == 1 || $utils.getloc('group_id') == 2"
      >
        <div class="search_box">
          <p class="attestation-title">查看商户认证信息:</p>
          <el-form
            :model="ruleForm1"
            :rules="rules"
            ref="ruleForm1"
            class="demo-ruleForm"
          >
            <div class="search-input" style="
            padding: 0 26%;">
              <el-form-item label="公司名称：" prop="companyName">
                <el-input
                  v-model="ruleForm1.companyName"
                  placeholder="输入公司名称"
                  readonly
                ></el-input>
              </el-form-item>
              <el-form-item label="银行卡号：" prop="bankCardId">
                <el-input
                  v-model="ruleForm1.bankCardId"
                  placeholder="输入银行卡号"
                  clearable
                  readonly
                ></el-input>
              </el-form-item>
              <el-form-item label="营业执照号码：" prop="bizCertifNo">
                <el-input
                  v-model="ruleForm1.bizCertifNo"
                  placeholder="输入营业执照号码"
                  clearable
                  readonly
                ></el-input>
              </el-form-item>
              <el-form-item label="法人姓名：" prop="representativeName">
                <el-input
                  v-model="ruleForm1.representativeName"
                  placeholder="输入法人姓名"
                  clearable
                  readonly
                ></el-input>
              </el-form-item>
              <!-- <el-form-item label="法人证件号码：" prop="bankCardID">
                <el-input
                  v-model="ruleForm.bankCardID"
                  placeholder="输入真实姓名"
                  clearable
                ></el-input>
              </el-form-item> -->
              <el-form-item label="商务联系人姓名：" prop="bizContactName">
                <el-input
                  v-model="ruleForm1.bizContactName"
                  placeholder="输入商务联系人姓名"
                  clearable
                  readonly
                ></el-input>
              </el-form-item>
              <!-- <el-form-item label="商务联系人证件号码：" prop="representativeIds">
                <el-input
                  v-model="ruleForm1.representativeIds"
                  placeholder="输入商务联系人证件号码"
                  clearable
                  readonly
                ></el-input>
              </el-form-item> -->
              <el-form-item label="商务联系人方式：" prop="bizContactName">
                <el-input
                  v-model="ruleForm1.bizContactNumber"
                  placeholder="输入商务联系人方式"
                  clearable
                  readonly
                ></el-input>
              </el-form-item>
              <el-form-item label="营业执照号：" prop="bizCertifNo">
                <el-input
                  v-model="ruleForm1.bizCertifNo"
                  placeholder="输入营业执照号"
                  clearable
                  readonly
                ></el-input>
              </el-form-item>
              <!-- <el-form-item label="商务联系人电子邮箱：" prop="realname">
                <el-input
                  v-model="ruleForm.bankCardID"
                  placeholder="输入真实姓名"
                  clearable
                ></el-input>
              </el-form-item> -->
              <!-- <el-form-item label="银行账户：" prop="bankCardID">
                <el-input
                  v-model="ruleForm.bankCardID"
                  placeholder="输入银行账户"
                  clearable
                ></el-input>
              </el-form-item> -->
              <el-form-item label="注册地址：" prop="registeredAddr">
                <el-input
                  v-model="ruleForm1.registeredAddr"
                  placeholder="输入注册地址："
                  clearable
                  readonly
                ></el-input>
              </el-form-item>
              <el-form-item label="经营地址：" prop="bizAddr">
                <el-input
                  v-model="ruleForm1.bizAddr"
                  placeholder="输入经营地址："
                  clearable
                  readonly
                ></el-input>
              </el-form-item>
              <el-form-item label="所属行业：" prop="industry">
                <el-input
                  v-model="ruleForm1.industry"
                  placeholder="输入所属行业："
                  clearable
                  readonly
                ></el-input>
              </el-form-item>
              <el-form-item label="官网链接：" prop="website">
                <el-input
                  v-model="ruleForm1.website"
                  placeholder="输入官网链接"
                  clearable
                  readonly
                ></el-input>
              </el-form-item>
              <p  class="attestation-title" >
                认证文件:
              </p>
              <div class="uploud-file" style="padding-left: 20px">
                <el-form-item label="商户开户资料信息表：" prop="username">
                    <a   download="商户开户资料信息表.pdf" @click="dowload(merchantInfoFile)"  href="#" >下载</a>
                  <!-- <a href="#">预览</a>
                  <embed src="merchantInfoFile" v-if="swf"/> -->
                </el-form-item>
                <el-form-item label="公司营业执照：" prop="realname">
                  <a download="公司营业执照.pdf" @click="dowload(bizRegistCertificateFile)"  href="#"  >下载</a>
                  <!-- <a href="#">预览</a> -->
                </el-form-item>
                <el-form-item label="公司注册证书：" prop="username">
                  <a   download="公司注册证书.pdf"  @click="dowload(certificateIncorporationFile)" href="#" >下载</a>
                  <!-- <a href="#">预览</a> -->
                </el-form-item>
                <el-form-item label="法人身份证：" prop="realname">
                  <a download="法人身份证.pdf" @click="dowload(idFile)" href="#"  >下载</a>
                  <!-- <a href="#">预览</a> -->
                </el-form-item>
                <el-form-item label="公司章程：" prop="username">
                  <a download="公司章程.pdf" @click="dowload(articlesFile)" href="#" >下载</a>
                  <!-- <a href="#">预览</a> -->
                </el-form-item>
                <el-form-item label="银行账户开户证明：" prop="realname">
                  <a href="#"  download="银行账户开户证明.pdf"  @click="dowload(bankAccountFile)"  >下载</a>
                  <!-- <a href="#">预览</a> -->
                </el-form-item>
              </div>
              <!-- 开通业务 -->
              <!-- <div>
          <p style="margin-left:-17.625rem" class="attestation-title">开通业务:</p>

        </div> -->
        <el-button type="primary" size="mini" @click="resetclick">返回</el-button>
              
            </div>
          </el-form>
        </div>
      </div>
      <!-- 查询 -->
      <div v-else class="search_box">
        <p class="attestation-title">填写商户认证信息:</p>
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          class="demo-ruleForm"
        >
          <div class="search-input">
            <el-form-item label="公司名称：" prop="companyName">
              <el-input
                v-model="ruleForm.companyName"
                placeholder="输入公司名称"
              ></el-input>
            </el-form-item>
            <el-form-item label="银行卡号：" prop="bankCardId">
              <el-input
                v-model="ruleForm.bankCardId"
                placeholder="输入银行卡号"
                clearable
              ></el-input>
            </el-form-item>
            <el-form-item label="营业执照号码：" prop="bizCertifNo">
              <el-input
                v-model="ruleForm.bizCertifNo"
                placeholder="输入营业执照号码"
                clearable
              ></el-input>
            </el-form-item>
            <el-form-item label="法人姓名：" prop="representativeName">
              <el-input
                v-model="ruleForm.representativeName"
                placeholder="输入法人姓名"
                clearable
              ></el-input>
            </el-form-item>
            <!-- <el-form-item label="法人证件号码：" prop="bankCardID">
              <el-input
                v-model="ruleForm.bankCardID"
                placeholder="输入真实姓名"
                clearable
              ></el-input>
            </el-form-item> -->
            <el-form-item label="商务联系人姓名：" prop="bizContactName">
              <el-input
                v-model="ruleForm.bizContactName"
                placeholder="输入商务联系人姓名"
                clearable
              ></el-input>
            </el-form-item>
            <!-- <el-form-item label="商务联系人证件号码：" prop="representativeIds">
              <el-input
                v-model="ruleForm.representativeIds"
                placeholder="输入商务联系人证件号码"
                clearable
              ></el-input>
            </el-form-item> -->
            <el-form-item label="商务联系人方式：" prop="bizContactName">
              <el-input
                v-model="ruleForm.bizContactNumber"
                placeholder="输入商务联系人方式"
                clearable
              ></el-input>
            </el-form-item>
           
            <!-- <el-form-item label="商务联系人电子邮箱：" prop="realname">
              <el-input
                v-model="ruleForm.bankCardID"
                placeholder="输入真实姓名"
                clearable
              ></el-input>
            </el-form-item> -->
            <!-- <el-form-item label="银行账户：" prop="bankCardID">
              <el-input
                v-model="ruleForm.bankCardID"
                placeholder="输入银行账户"
                clearable
              ></el-input>
            </el-form-item> -->
            <el-form-item label="注册地址：" prop="registeredAddr">
              <el-input
                v-model="ruleForm.registeredAddr"
                placeholder="输入注册地址："
                clearable
              ></el-input>
            </el-form-item>
            <el-form-item label="经营地址：" prop="bizAddr">
              <el-input
                v-model="ruleForm.bizAddr"
                placeholder="输入经营地址："
                clearable
              ></el-input>
            </el-form-item>
            <el-form-item label="所属行业：" prop="industry">
              <el-input
                v-model="ruleForm.industry"
                placeholder="输入所属行业："
                clearable
              ></el-input>
            </el-form-item>
            <el-form-item label="官网链接：" prop="website">
              <el-input
                v-model="ruleForm.website"
                placeholder="输入官网链接"
                clearable
              ></el-input>
            </el-form-item>
            <p  class="attestation-title">
              上传认证文件:
            </p>
            <div class="uploud-file" style="padding-left: 20px">
              <el-form-item label="商户开户资料信息表：" prop="username">
                <el-upload
                  class="upload-demo"
                  :action="actions"
                  :on-success="onsuccess1"
                  :limit="1"
                >
                  <el-button
              style="
              width: 7.375rem;
              font-size: 1rem;
              font-weight: 400;
              margin-top: 0.3rem!important;
              margin-bottom: 0rem!important;
              height: 100%;"
                    size="small"
                    type="primary"

                    >上传</el-button
                  >
                </el-upload>
              </el-form-item>
              <el-form-item label="公司营业执照：" prop="realname">
                <el-upload
                  class="upload-demo"
                  :action="actions"
                  :on-success="onsuccess2"
                  multiple
                  :limit="1"
                  :file-list="fileList"
                >
                  <el-button
                  style="
              width: 7.375rem;
              font-size: 1rem;
              font-weight: 400;
              margin-top: 0.3rem!important;
              margin-bottom: 0rem!important;
              height: 100%;"
                    size="small"
                    type="primary"
                    >上传</el-button
                  >
                </el-upload>
              </el-form-item>
              <el-form-item label="公司注册证书：" prop="username">
                <el-upload
                  class="upload-demo"
                  :action="actions"
                  :on-success="onsuccess3"
                  multiple
                  :limit="1"
                  :file-list="fileList"
                >
                  <el-button
                  style="
              width: 7.375rem;
              font-size: 1rem;
              font-weight: 400;
              margin-top: 0.3rem!important;
              margin-bottom: 0rem!important;
              height: 100%;"
                    size="small"
                    type="primary"
                    >上传</el-button
                  >
                </el-upload>
              </el-form-item>
              <el-form-item label="法人身份证：" prop="realname">
                <el-upload
                  class="upload-demo"
                  :action="actions"
                  :on-success="onsuccess4"
                  multiple
                  :limit="1"
                >
                  <el-button
                  style="
              width: 7.375rem;
              font-size: 1rem;
              font-weight: 400;
              margin-top: 0.3rem!important;
              margin-bottom: 0rem!important;
              height: 100%;"
                    size="small"
                    type="primary"
                    >上传</el-button
                  >
                </el-upload>
              </el-form-item>
              <el-form-item label="公司章程：" prop="username">
                <el-upload
                  class="upload-demo"
                  :action="actions"
                  :on-success="onsuccess5"
                  multiple
                  :limit="1"
                  :file-list="fileList"
                >
                  <el-button
                  style="
                    width: 7.375rem;
                    font-size: 1rem;
                    font-weight: 400;
                    margin-top: 0.3rem!important;
                    margin-bottom: 0rem!important;
                    height: 100%;"
                    size="small"
                    type="primary"
                    >上传</el-button
                  >
                </el-upload>
              </el-form-item>
              <el-form-item label="银行账户开户证明：" prop="realname">
                <el-upload
                  class="upload-demo"
                  :action="actions"
                  :on-success="onsuccess6"
                  multiple
                  :limit="1"
                  :file-list="fileList"
                >
                  <el-button
                  style="
              width: 7.375rem;
              font-size: 1rem;
              font-weight: 400;
              margin-top: 0.3rem!important;
              margin-bottom: 0rem!important;
              height: 100%;"
                    size="small"
                    type="primary"
                    >上传</el-button
                  >
                </el-upload>
              </el-form-item>
              <el-form-item>
                上传内容说明：需要上传扫描件或清晰的照看，支持.pdf、.png格式文件
              </el-form-item>
            </div>
            <el-form-item>
            <el-button type="primary" size="mini" @click="submitForm('ruleForm')">保存</el-button>
            <el-button type="danger" size="mini" @click="resetclick">关闭</el-button>
          </el-form-item>
          </div>
        </el-form>
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
        return callback(new Error("手机号不能为空"));
      } else {
        const reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
        console.log(reg.test(value));
        if (reg.test(value)) {
          callback();
        } else {
          return callback(new Error("请输入正确的手机号"));
        }
      }
    };
    return {
      flag: false,
      groupState: false,
      renzhengtype: this.$route.params.type ? this.$route.params.type : "1",
      actions:  "http://test.gettin.in/core/api/files/upload",//this.$api.getUrlTitle()+
      fileList: [],
      groupData: [],
      tagsData: [],
      companyData: [],
      departmentData: [],
      optionsSelect: [],
      objfile: {},
      swf:false,
      certificationDetail:"",//图片路径
      ruleForm: {
        companyName: "",
        bankCardID: "",
        bizCertifNo: "",
        registeredAddr: "",
        bizAddr: "",
        industry: "",
        website: "",
        representativeName: "",
        representativeIds: "111",
        bizContactName: "",
        bizContactNumber: "",
       
      },
      merchantInfoFile: "",
          bizRegistCertificateFile: "",
          certificateIncorporationFile: "",
          idFile: "",
          articlesFile: "",
          bankAccountFile: "",
      ruleForm1: {
        // companyName: "",
        // bankCardID: "",
        // bizCertifNo: "",
        // registeredAddr: "",
        // bizAddr: "",
        // industry: "",
        // website: "",
        // representativeName: "",
        // representativeIds: "",
        // bizContactName: "",
        // bizContactNumber: ""
      },
      rules: {
        companyName: [
          { required: true, message: "请输入企业名称", trigger: "blur" },
          { min: 3, max: 50, message: "长度在 3 到 50 个字符", trigger: "blur" }
        ],
        bankCardID:{required: true, message: "请输入银行卡号", trigger: "blur" },
        bizCertifNo:{required: true, message: "请输入营业执照号", trigger: "blur" },
        registeredAddr:{required: true, message: "请输入注册地址", trigger: "blur" },
        bizAddr:{required: true, message: "请输入经营地址", trigger: "blur" },
        industry:{required: true, message: "请输入所属行业", trigger: "blur" },
        website:{required: true, message: "请选择官网链接", trigger: "blur" },
        representativeName:{required: true, message: "请输入法人姓名", trigger: "blur" },
        bizContactName:{required: true, message: "请输入商务联系人姓名", trigger: "blur" },
        bizContactNumber:{required: true, message: "请输入法人联系人方式", trigger: "blur" },
        representativeIds:{required: true, message: "请输入商务联系人证件号码", trigger: "blur" },
       
      }
    };
  },
  created() {
    
  },
  methods: {
   
       //下载
    dowload(hrefs) {
      
      console.log(hrefs);
      window.open(hrefs);
    },
    onsuccess1(response, file, fileList) {
      this.objfile.merchantInfoFile = file.response.result;
    },
    onsuccess2(response, file, fileList) {
      this.objfile.bizRegistCertificateFile = file.response.result;
    },
    onsuccess3(response, file, fileList) {
      this.objfile.certificateIncorporationFile = file.response.result;
    },
    onsuccess4(response, file, fileList) {
      this.objfile.idFile = file.response.result;
    },
    onsuccess5(response, file, fileList) {
      this.objfile.articlesFile = file.response.result;
    },
    onsuccess6(response, file, fileList) {
      this.objfile.bankAccountFile = file.response.result;
    },
    

    // 返回
    goBack() {
      this.$router.go(-1);
    },
    submitForm(formName) {
      let self = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          if(Object.keys(self.objfile).length==6){
            this.addManage();
          }else{
          console.log("error submit!!");
          self.$message.error("请上传完整文件信息");
          return false;
          }
        } else {
          console.log("error submit!!");
          self.$message.error("error submit!!");
          return false;
        }
      });
    },
    //新增用户信息
    addManage() {
      let self = this;
      addManage(self.ruleForm).then((response) => {
              if (response.code === 1000) {
                this.fileadd();
              }
            });
    },
     
    //文件信息保存
    fileadd() {
      // alert(this.fileList[0].name)
      console.log(this.objfile);
      let self = this;
      addManage(self.ruleForm).then((response) => {
        
             
                self.$utils.setloc("group_id", 2);//認證通過
                self.msgSuccess(response.info);
          setTimeout(() => {
            self.$router.push({
              path: "index",
            });
          }, 500);
              
            });
    },

    //取消
    resetclick() {
      let self = this;
      self.$router.push({
        path: "index"
      });
    },
    //獲取商戶信息
    getJobmess() {
      
      let self = this;
      getJobmess().then((r) => {
        debugger
        if (r.code == 1000) {
          self.ruleForm1 = r.result.merchanDetail;
          self.merchantInfoFile=r.result.certificationDetail.merchantInfoFile;
          self.bizRegistCertificateFile=r.result.certificationDetail.bizRegistCertificateFile;
          self.certificateIncorporationFile=r.result.certificationDetail.certificateIncorporationFile;
          self.idFile=r.result.certificationDetail.idFile;
          self.articlesFile=r.result.certificationDetail.articlesFile;
          self.bankAccountFile=r.result.certificationDetail.bankAccountFile;
         
        }
      });
    },
    beforeUpload(file) { 		
      		
				var testmsg=file.name.substring(file.name.lastIndexOf('.')+1)				
				//const extension = testmsg === 'xls'
				///const extension2 = testmsg === 'xlsx'
				const isLt2M = file.size / 1024 / 1024 < 10  //这里做文件大小限制
				// if(!extension && !extension2) {
				// 	this.$message({
				// 		message: '上传文件只能是 xls、xlsx格式!',
				// 		type: 'warning'
				// 	});
				// }
				if(!isLt2M) {
					this.$message({
						message: '上传文件大小不能超过 10MB!',
						type: 'warning'
					});
				}
				return  isLt2M
			}
  },
  mounted: function() {
    
    if(this.$utils.getloc("group_id")==1 || this.$utils.getloc("group_id")==2){
    this.getJobmess();
  }
  }
};
</script>

<style lang="less"  src="./add-user.less"></style>
<style scoped>
.add-manage-info .radio-box {
  line-height: 4.375rem !important;
  width: 32.125rem;
  height: 70px;
  text-align: left;
}

.add-manage-info .el-radio,
.el-radio__input {
  line-height: 4.375rem;
}
.add-manage-info .radio-box .el-radio__input.is-checked + .el-radio__label {
  color: #66ce90;
}
.add-manage-info .radio-box .el-radio__input.is-checked .el-radio__inner {
  background: #66ce90;
  border-color: #66ce90;
}
</style>
