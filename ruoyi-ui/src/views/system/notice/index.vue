<template>
  <div class="app-container">
    <el-form :model="form" ref="form" :inline="true" v-show="showSearch">
      <el-form-item label="提现申请单号:">
        <el-input
          v-model="form.applyId"
          placeholder="请输入提现申请单号"
        ></el-input>
      </el-form-item>
      <el-form-item label="提现状态:">
        <el-select v-model="form.status" placeholder="请选择">
          <el-option
            v-for="item in statusData"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="提现申请时间:" prop>
        <el-date-picker
          style="height: 2.5rem;"
          class="ydateinput"
          v-model="form.startime"
          type="datetimerange"
          format="yyyy-MM-dd HH:mm:ss"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          
        ></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="cyan" icon="el-icon-search" size="mini" @click="onSubmit">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-table
      v-loading="loading"
      :data="tableData"
      row-key="menuId"
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
    <el-table-column
          prop="applyId"
          label="提现申请单号"
          width=""
        ></el-table-column>
        <el-table-column
          prop="amount"
          label="提现金额"
          width=""
        ></el-table-column>
        <el-table-column
          prop="serviceFee"
          label="提现服务费"
          width=""
        ></el-table-column>
        <el-table-column
          prop="toAccount"
          label="提现银行账户"
          width=""
        ></el-table-column>
        <el-table-column
          prop="company_name"
          label="提现状态"
          width=""
        >
        <template slot-scope="scope">
          <span
          v-if="scope.row.status==1"
            size="mini"
          >待审核</span>
          <span
          v-else-if="scope.row.status==2"
            size="mini"
          >审核通过，通道提现中</span>
          <span
          v-else-if="scope.row.status==3"
            size="mini"
          >提现成功</span>
          <span
          v-else-if="scope.row.status==4"
          size="mini"
        >提现失败</span>
          <span
          v-else-if="scope.row.status==5"
          size="mini"
        >审核拒绝</span>
        </template>
      </el-table-column>
        <el-table-column
        prop="createTime"
        label="申请提现时间"
        width=""
      ></el-table-column>
      <el-table-column
      prop="updateTime"
      label="更新时间"
      width=""
    ></el-table-column>
    </el-table>
     <!-- 分页 -->
     <el-pagination
     @current-change="handleCurrentChange"
     :page-size="pageSize"
     prev-text="上一页"
     next-text="下一页"
     layout="prev, pager, next, jumper"
     :total="total"
   >
   </el-pagination>
  </div>
</template>

<script>
import { listNotice} from "@/api/system/notice";
import Editor from '@/components/Editor';

export default {
  name: "Notice",
  data() {
    return {
      // 遮罩层
      loading: true,
      // 显示搜索条件
      showSearch: true,
      // 菜单表格树数据
      menuList: [],
      // 菜单树选项
      menuOptions: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 显示状态数据字典
      visibleOptions: [],
      // 菜单状态数据字典
      statusOptions: [],
      // 查询参数
      queryParams: {
        menuName: undefined,
        visible: undefined
      },
      // 表单参数
      form: {
        startime:[],
        status: "",
        applyId: ""
      },
      //状态，1-待审核 2-审核通过，通道提现中 3-提现成功 4-提现失败 5-审核拒绝
      statusData: [
      {
          value: "",
          label: "全部"
        },
        {
          value: 1,
          label: "待审核"
        },
        {
          value: 2,
          label: "审核通过"
        },
        {
          value: 3,
          label: "提现成功"
        },
        {
          value: 4,
          label: "提现失败"
        },
        {
          value: 5,
          label: "审核拒绝"
        },
      ],
      tableData: [],
      pageIndex: 1,
      total: 0,
      pageSize: 10 //每页显示条数
    };
  },
  created() {
    this.getdate();
  },
  methods: {
    //时间 获取
    getdate(){
      var myDate = new Date();
      this.form.startime.push(new Date( myDate.getFullYear(), myDate.getMonth(),  myDate.getDate(), 0, 0))
      this.form.startime.push(new Date( myDate.getFullYear(), myDate.getMonth(),  myDate.getDate(), 23, 59))
      console.log('startT',this.form.startime[0])
      console.log('endT',this.form.startime[1])
    },
    formatDate:function (date) {  
    var y = date.getFullYear();  
    var m = date.getMonth() + 1;  
    m = m < 10 ? ('0' + m) : m;  
    var d = date.getDate();  
    d = d < 10 ? ('0' + d) : d;  
    var h = date.getHours();  
    h = h < 10 ? ('0' + h) : h;
    var minute = date.getMinutes();  
    minute = minute < 10 ? ('0' + minute) : minute; 
    var second= date.getSeconds();  
    second = second < 10 ? ('0' + second) : second;  
    return y + '-' + m + '-' + d+' '+h+':'+minute+':'+ second;  
},
  //查询
  onSubmit() {
    this.pageIndex = 1;
    this.getList();
    },
handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pageIndex = val;
      this.getList();
    },
    /** 查询菜单列表 */
    getList() {
      
      let self = this;
      self.loading = true;
      let obj={
        page: self.pageIndex,
          size: self.pageSize,
          "startTime":self.form.startime ?self.formatDate(self.form.startime[0]):null,
          "endTime":self.form.startime ?self.formatDate(self.form.startime[1]):null,
          status: self.form.status?self.form.status:null,//状态，1-待审核 2-审核通过，通道提现中 3-提现成功 4-提现失败 5-审核拒绝
          applyId: self.form.applyId,//流水号，支持模糊查询
      }
      listNotice(obj).then(r => {
         //console.log(r.data.total_count);
         self.tableData = r.result.list;
          self.total = r.result.total;
          self.loading = false;
      }
      );
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.getList();
    },
  },
  mounted() {
    this.getList();
  },
};
</script>
<style>
  @media (max-width:550px) {
    .el-picker-panel{
      left:0 !important;
    }
     .el-date-range-picker__content{
    width: 50%;
    }
    .el-date-range-picker .el-picker-panel__body{
    
    width: 600px;
    }
    
    .el-date-range-picker__time-header{
      width: 100%;
    }
    .el-date-range-picker__content{
      padding:0;
    }
}
</style>