<template>
  <div
  v-if="$utils.getloc('group_id') == 0 && type != '3'"
  class="search_box1"
>
  <div class="sure-message">
    <p>
      <img
        class="headerimg"
        id="logoid"
        src="../assets/image/nozhizhi.png"
        alt=""
      />
    </p>
    <p>还没有认证公司信息，快去认证吧</p>
    <el-button
      size="medium"
      type="primary"
      class="primarybut"
      @click="submitattestation"
      >去认证</el-button
    >
  </div>
</div>
<div v-else-if="$utils.getloc('group_id') == 2" class="search_box1">
  <div class="sure-message">
    <p>
      <img
        class="headerimg"
        id="logoid"
        src="../assets/image/nozhizhi.png"
        alt=""
      />
    </p>
    <p style="margin-left:-2rem">公司资质认证审核中</p>
    <el-button
      size="medium"
      type="primary"
      class="primarybut"
      @click="submitattestation(1)"
      >查看认证信息</el-button
    >
  </div>
</div>
<div
  v-else-if="$utils.getloc('group_id') == 0 && type == '3'"
  class="search_box1"
>
  <div class="sure-message">
    <p>
      <img
        class="headerimg"
        id="logoid"
        src="../assets/image/nozhizhi.png"
        alt=""
      />
    </p>
    <p>公司资质认证未通过，请重新申请</p>
    <el-button
      size="medium"
      type="primary"
      class="primarybut"
      @click="submitattestation(type)"
      >重新申请</el-button
    >
  </div>
</div>

  <div class="dashboard-editor-container index-basic" v-else>
    
    <panel-group   @btModifyWindow="btModifyWindow" @handleSetLineChartData="handleSetLineChartData" :objmessge="objmessge" />

    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <line-chart :chart-data="lineChartData" />
    </el-row>

    <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <raddar-chart />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <pie-chart />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <bar-chart />
        </div>
      </el-col>
    </el-row>

        <!-- 充值弹窗 -->
        <Modal
        class="noDesign"
        :show="ModifyWindow"
        width="59.25rem"
        :title="Topupapplication"
        @hideModal="hideModal"
      >
        <div class="modify-window">
          <el-form
            :model="formchongzhi"
            :rules="rulescz"
            ref="formchongzhi"
            class="demo-ruleForm"
            label-position="right" 
          >
            <div class="search-input" >
              <el-form-item label="币种：">
                <el-select v-model="formchongzhi.currency" placeholder="充值币种">
                  <el-option label="卢比" value="INR"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="国家：">
                <el-select v-model="formchongzhi.countryCode" placeholder="国家">
                  <el-option label="印度" value="IN"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="充值金额：" prop="amount">
                <el-input
                  v-model.number="formchongzhi.amount"
                  placeholder="输入充值金额："
                  clearable
                ></el-input>
                
              </el-form-item>
              <el-form-item label="充值服务费：" prop="singleCharge">
                <span  class="recivemoney">{{
                  singleCharge
                }}<i style="font-size: 0.75rem;
                margin-left: 1rem;
                color: #121313;">(仅供参考)</i></span>
              </el-form-item>
              <el-form-item label="到账金额：" prop="getamount">
                <span class="recivemoney">{{ getamount }}
                  <i style="font-size: 0.75rem;
                  margin-left: 1rem;
                  color: #121313;">(仅供参考)</i>
                </span>
              </el-form-item>
              <el-form-item>
                到账金额=充值金额-充值服务费(充值费率{{rechargeRate}}+单笔费用{{rechargeSingleCharge}}) ，实际到账
                金额以充值当日费率计算结果为准
              </el-form-item>
              <el-form-item>
                <el-button
                  type="primary"
                  class="primarybut"
                  @click="submitFormchongzhi('formchongzhi')"
                  >确认充值</el-button
                >
                <el-button type="info" class="down" @click="ModifyWindow = false"
                  >关闭</el-button
                >
              </el-form-item>
            </div>
          </el-form>
        </div>
      </Modal>
      <!-- 提现弹框 -->
      <Modal
        class="noDesign"
        :show="ModifyWindow1"
        width="59.25rem"
        :title="Withdrawalapplication"
        @hideModal="hideModal1"
       
      >
        <div class="modify-window modify-tixian">
          <el-form
            :model="formtixian"
            :rules="ruletx"
            ref="formtixian"
            class="demo-ruleForm"
            label-position="right"
          >
            <div class="search-input">
              <el-form-item label="可提现金额：">
                <span class="recivemoney">₹{{ objmessge.availableBalance }}</span>
              </el-form-item>
              <el-form-item style="margin-left: -2.5rem;" label="本次提现金额：" prop="amount">
                <el-input
                  v-model.number="formtixian.amount"
                  placeholder="输入本次提现金额"
                  clearable
                ></el-input>
              </el-form-item>
              <el-form-item label="提现服务费：" prop="">
                <span style="margin-left:4.875rem;" class="recivemoney"
                  >₹{{recivemoneyfuwu}}<i style="font-size:0.5rem">（服务费将从您的账户余额中扣除）</i></span
                >
              </el-form-item>
              <el-form-item style='margin-left: -1.5rem'label="提现银行账户：" prop="">
                <span class="recivemoney">{{ objmessge.bankCardNumber }}</span>
              </el-form-item>
              <el-form-item label="到账金额：" prop="">
                <span class="recivemoney"> ₹{{recivemoney}} </span>
              </el-form-item>
              <el-form-item>
                到账金额=提现金额-提现服务费(提现费率{{withdrawRate}}+单笔费用{{withdrawSingleCharge}}) ，实际到账
                金额以提现当日汇率计算结果为准
              </el-form-item>
              <el-form-item>
                <el-button
                  type="primary"
                  class="primarybut"
                  @click="submitFormtx('formtixian')"
                  >确认提现</el-button
                >
                <el-button type="info" class="down" @click="ModifyWindow1= false"
                  >关闭</el-button
                >
              </el-form-item>
            </div>
          </el-form>
        </div>
      </Modal>
      <!-- 代付弹框 -->
      <Modal
        class="noDesign"
        :show="ModifyWindow2"
        width="59.25rem"
        :title="Paidforapplication"
        @hideModal="hideModal2"
      >
        <div class="modify-window">
          <el-form
            :model="ruleFormPaidfor"
            :rules="rules"
            ref="ruleFormPaidfor"
            class="demo-ruleForm"
            label-position="right"
          >
            <div class="search-input">
              <el-form-item label="代付方式：" prop="payType">
                <el-radio-group v-model="ruleFormPaidfor.payType">
                  <el-radio :label="5">付款至银行卡</el-radio>
                  <el-radio :label="1">付款至电子钱包</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="上传收款人信息：" style="margin-left:-3rem;" prop="file">
                <a href="javascript:;" class="file">
                  {{ filename }}
                  <input
                    type="file"
                    @change="getFile($event)"
                    class="inputstyle"
                  />
                </a>
                <a
                  download="代付单.csv"
                  :href="hrefscsv"
                  >下载模板</a
                >
                <P>（服务费将从您的付款金额中扣除）</P>
              </el-form-item>
  
              <el-form-item>
                <el-button
                  type="primary"
                  class="primarybut"
                  @click="submitFormPaidfor('ruleFormPaidfor')"
                  >申请代付</el-button
                >
                <el-button type="info" class="down" @click="ModifyWindow2 = false"
                  >关闭</el-button
                >
              </el-form-item>
            </div>
          </el-form>
        </div>
      </Modal>
  </div>
</template>

<script>
import PanelGroup from './dashboard/PanelGroup'
import LineChart from './dashboard/LineChart'
import RaddarChart from './dashboard/RaddarChart'
import PieChart from './dashboard/PieChart'
import BarChart from './dashboard/BarChart'
import Modal from "@/components/Modal.vue";
import {
    addManage,
    fileadd,
    getJobmess,
    getRequestRate,
    requestAddManagecz,
    requestAddManagetx,
    requestAddManagedf

} from "@/api/system/user";
const lineChartData = {
  newVisitis: {
    expectedData: [100, 120, 161, 134, 105, 160, 165],
    actualData: [120, 82, 91, 154, 162, 140, 145]
  },
  messages: {
    expectedData: [200, 192, 120, 144, 160, 130, 140],
    actualData: [180, 160, 151, 106, 145, 150, 130]
  },
  purchases: {
    expectedData: [80, 100, 121, 104, 105, 90, 100],
    actualData: [120, 90, 100, 138, 142, 130, 130]
  },
  shoppings: {
    expectedData: [130, 140, 141, 142, 145, 150, 160],
    actualData: [120, 82, 91, 154, 162, 140, 130]
  }
}

export default {
  name: 'Index',
  components: {
    PanelGroup,
    LineChart,
    RaddarChart,
    PieChart,
    BarChart,
    Modal
  },
  data() {
    var checkamount = (rule, value, callback) => {
            if (value < 100 || value>100000) {
              callback(new Error('充值金额必须大于100小于100000'));
            } else{
              callback()
            }
      }
      var   txcheckamount = (rule, value, callback) => {
            if (value < 100) {
              callback(new Error('提现金额必须大于100'));
            } else{
              callback()
            }
      }
      
    return {
      lineChartData: lineChartData.newVisitis,

      userId: {
        token: this.$utils.getloc("token")
      },
      formtixian:{
        amount:"",
      },
      filename: "上传文件",
      hrefscsv: "https://greapy.s3.ap-south-1.amazonaws.com/import.csv",
      imageUrl: "", //图片路径
      ModifyWindow: false, //充值弹窗
      ModifyWindow1: false, //提现弹窗
      ModifyWindow2: false, //代付弹窗
      Topupapplication: "充值申请",
      Paidforapplication: "代付申请",
      Withdrawalapplication: "提现申请",
      formchongzhi: {
        currency: "",
        countryCode: "",
        amount:"" ,
        singleCharge: "",
        rate:this.rechargeRate,
        merchantId:"",
      },
      ruletx:{
        amount: [
            { validator: txcheckamount, trigger: 'blur' },
            {required: true, message: "提现金额不能为空", },
            { type: 'number', message: '提现金额为数字'}
          ]
      },
      rulescz: {
        currency: [{ required: true, message: "请选择币种", trigger:'change'}],
        countryCode: {
          required: true,
          message: "请选择国家码",
          trigger:'change'
        },
        
        amount: [
            { validator: checkamount, trigger: 'blur' },
            {required: true, message: "请填写正确的充值金额", },
            { type: 'number', message: '请填写正确的充值金额'}
          ]
      },
      
      type: this.$route.params.type ? this.$route.params.type : "2",
      objmessge: {},
      actiondaifu: "/core/api/payment/paymentout",
      importHeaders: {
        Authorization: "Bearer " + this.$utils.getloc("token")
      },
      ruleFormPaidfor: {
        file: "",
        payType: 5,
        countryCode: "",
        currency: ""
      },
      ruleForm: {
        username: "",
        password: "",
        mobile: "",
        resource: "付款至银行卡",
        position: "",
        company_id: "",
        department_id: "",
        remarks: "",
        realname: "",
        file: ""
      },
      theuser: {
        admin: "",
        realname: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名称", trigger: "blur" }
          // { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ]
      },
      rechargeRate: "", //单笔费率
      rechargeSingleCharge: "", //单笔充值收费
      withdrawRate:"",//单笔提现费率
      withdrawSingleCharge:"",//单笔提现收费

    }
  },
  computed: {
    
    singleCharge: function() {
      
      
      let singleCharges = this.rechargeSingleCharge +parseFloat(( this.rechargeRate * this.formchongzhi.amount ).toFixed(
        4
      ));

      this.formchongzhi.singleCharge = singleCharges;
      return singleCharges;
    },
    getamount: function() {
      
      return ( this.formchongzhi.amount- this.formchongzhi.singleCharge).toFixed(4);
    },
    recivemoneyfuwu:function(){
     
      return (this.withdrawRate * this.formtixian.amount).toFixed(
        4
      );
    },
    recivemoney:function(){
      return ((1 - this.withdrawRate) * this.formtixian.amount -this.withdrawSingleCharge).toFixed(4);
    },

  },
  methods: {
     //充值
     getrate() {
      
      let self = this;
      getRequestRate({}).then(r => {
          this.rechargeRate = r.result.rechargeRate;
          this.rechargeSingleCharge = r.result.rechargeSingleCharge;
          this.withdrawRate = r.result.withdrawRate;
          this.withdrawSingleCharge = r.result.withdrawSingleCharge;
      }
      );
    },
    handleSetLineChartData(type) {
      
      this.lineChartData = lineChartData[type]
    },
    //跳到认证信息页面
    submitattestation(type) {
      let self = this;
      //跳转查看
      if (type == "1") {
        self.$router.push({
          path: "merchantUser",
          params: {
            type: 2
          }
        });
      } else {
        self.$router.push({
          path: "/merchantUser"
        });
      }
    },
     //获取公司列表
     lookManage() {
       
      let self = this;
      getJobmess({}).then(r => {
          this.objmessge = r.result.merchantAccount;
          self.$utils.setloc(
            "userNickname",
            r.result.merchanDetail.companyName
          );
          if (r.result.merchanDetail.status == 1) {
            self.$utils.setloc("group_id", 1); //認證通過
            self.$utils.setloc(
              "countryCode",
              r.result.merchantAccount.countryCode
            );
            self.$utils.setloc("currency", r.result.merchantAccount.currency);
          } 
        
     } )
    },
    btModifyWindow(v){
      
      
      if(v==1){
        this.ModifyWindow=true;
        this.getrate();
      }else if(v==2){
        this.getrate();
        this.ModifyWindow1=true;
      }else {
        this.ModifyWindow2=true;
      }
    },
    hideModal() {
      this.ModifyWindow = false;
    },
    hideModal1() {
      this.ModifyWindow1 = false;
    },
    hideModal2() {
      this.ModifyWindow2 = false;
    },
    
    submitFormchongzhi(formName) {
      let self = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.addManagecz();
        } else {
          console.log("error submit!!");
          self.$message.error("error submit!!");
          return false;
        }
      });
    },


    //新增充值信息
    addManagecz() {
      let self = this;
      console.log(self.formchongzhi);
      
      requestAddManagecz(self.formchongzhi).then((r) => {
        
          if (r.code == 1000) {
            this.$message({
              message: r.info,
              type: "success"
            });
            self.$router.push({
              path: "/monitor/menu"
            });
          } else {
            this.$message.error(r.info);
          }
        }
      );
    },
    // 提现
    
    submitFormtx(formName) {
      let self = this;
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.addManagetx();
        } else {
          console.log("error submit!!");
          self.$message.error("error submit!!");
          return false;
        }
      });
    },

 //提现信息提交
 addManagetx() {
      let self = this;
      requestAddManagetx(self.formtixian).then((r) => {
          if (r.code == 1000) {
            this.$message({
              message: r.info,
              type: "success"
            });
            self.$router.push({
              path: "/monitor/notice"
            });
          } else {
            this.$message.error(r.info);
          }
        });
    },
   //代付方法
    submitFormPaidfor() {
      let self = this;
      if (!self.ruleFormPaidfor.file) {
        this.$message.error({
          message: "请上传正确的文件格式"
        });
        return false;
      }
      console.log(self.ruleFormPaidfor);
      let formData = new FormData();
      formData.append("payType", self.ruleFormPaidfor.payType);
      formData.append("file", self.ruleFormPaidfor.file);
      formData.append("currency", self.$utils.getloc("currency"));
      formData.append("countryCode", self.$utils.getloc("countryCode"));
      let config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + self.$utils.getloc("token")
        }
      };
      requestAddManagedf(formData).then((r) => {
        if (r.code == 1000) {
            this.$message({
              message: r.info,
              type: "success"
            });
            self.$router.push({
              path: "/monitor/job"
            });
          } else {
            this.$message.error(r.info+'：'+r.result);
          }
      });

      
    },

    //代付
    //下载
    dowloads() {
      window.open(this.urlforpay);
    },
    downlodd: function() {
      window.open(this.hrefscsv);
    },
    getFile(event) {
      this.ruleFormPaidfor.file = event.target.files[0];
      console.log(this.ruleFormPaidfor.file);
      this.filename = this.ruleFormPaidfor.file.name;
    }
    


  },
  created() {
   
  },
  mounted() {
     //此处信息可以放到x的state里面哟吼放
     if (this.$utils.getloc("group_id") == 1 || this.$utils.getloc("group_id") ==2) {
      this.lookManage();
    }
  },

}
</script>

<style lang="scss" scoped>
 
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}

@media (max-width:1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}

 .search_box1 {
  width: 100%;
  height: 985px;
  background: #ffffff;
  border: 1px solid #f0f2f1;
  box-shadow: 0px 0px 18px 0px rgba(0, 0, 0, 0.15);
  border-radius: 5px;
  display: flex;
  /*定义为弹性盒子*/
  flex-direction: column;
  /*设置排列方式*/
  justify-content: flex-start;
  /*设置水平对齐方式*/
  align-items: center;
  /*设置改行垂直对齐方式*/
}
 .search_box1 .sure-message {
  padding: 20px;
}
.search_box1 .sure-message p:nth-child(1) {
  width: 94px;
  height: 94px;
}
 .search_box1 .sure-message p:nth-child(1) img {
  width: 100%;
  height: 94px;
}
 .search_box1 .sure-message p:nth-child(2) {
  font-size: 20px;
  margin-left: -96px;
  line-height: 76px;
}

</style>
<style  lang="scss" scoped>
  .el-select-dropdown{
      z-index: 99999999 !important;
    }
    @media (max-width:550px) {
  
  .index-basic .modify-window .primarybut{
    width: 90px !important;
    height: 30px !important;
    font-size: 14px !important;
    margin-top: 36px !important;
  }
  
  .index-basic .modify-window .down{
    width: 90px !important;
    height: 30px !important;
    font-size: 14px !important;
    margin-top: 36px !important;
  }
  .modify-tixian  .el-input{
    width: 60%;
  } 
  .modify-tixian .el-form-item__error {
    left: 40% !important;
}  
.modify-tixian  .el-form-item{
  margin-left:0 !important;
}
}
.index-basic{
     
  .file {
    position: relative;
    display: inline-block;
    background: #D0EEFF;
    border: 1px solid #99D3F5;
    border-radius: 4px;
    padding: 0.5rem 0.5rem;
    overflow: hidden;
    color: #1E88C7;
    text-decoration: none;
    text-indent: 0;
	line-height: 20px;
	margin-left: -1.5rem;
}
.file input {
    position: absolute;
    font-size: 100px;
    right: 0;
    top: 0;
    opacity: 0;
}
.file:hover {
    background: #AADFFD;
    border-color: #78C3F3;
    color: #004974;
    text-decoration: none;
}
.modal-bg{
	z-index: 9999 !important;
    background: rgba(0 ,11 ,16 , 0.5) !important;
   }
   .modify-window{
    .recivemoney{
		font-size: 1rem;
		font-weight: 500;
		text-align: center; 
		margin-left: -5.375rem;
	}
}
.modify-window {
		display: flex;
		/*定义为弹性盒子*/
		//   flex-direction:row;                /*设置排列方式*/
		justify-content: space-around;
		/*设置水平对齐方式*/
		align-items: center;
 
		/*设置改行垂直对齐方式*/
		padding-bottom: 74px;
		.el-form-item__label {
			min-width: 156px;
			font-size: 24px;
			font-family: Source Han Sans CN;
			font-weight: 400;
			color: rgba(102, 102, 102, 1);
			line-height: 43px;
		}

		.el-form-item {
			display: block;
			text-align: center;
			margin-top: 22px;
		}
        .el-form-item--small .el-form-item__content, .el-form-item--small .el-form-item__label {
			line-height: 2.8rem !important;
		}
		.el-input--small {
			height: 50px;
		}

		.el-form-item__content {
			display: inline-block;
		}

		.el-input__inner {
			width: 401px;
			height: 43px;
			background: rgba(255, 255, 255, 1);
			border: 1px solid rgba(237, 235, 235, 1);
			border-radius: 5px;
			font-size: 18px;
			font-family: Source Han Sans CN;
			font-weight: 400;
			color: rgba(153, 153, 153, 1);
			line-height: 15px;
		}

		.primarybut {
			width: 182px;
			height: 51px;
			background:#49a1c3;
			border-radius: 5px;
			font-size: 30px;
			font-family: Source Han Sans CN;
			font-weight: bold;
			color: rgba(255, 255, 255, 1);
			line-height: 8px;
			margin-top: 36px;
		}

		.down {
			width: 182px;
			height: 51px;
			background: rgba(224, 224, 224, 1);
			border-radius: 5px;
			font-size: 30px;
			font-family: Source Han Sans CN;
			font-weight: bold;
			color: rgba(255, 255, 255, 1);
			line-height: 8px;
			margin-left: 74px;
		}
  }
}

</style>
