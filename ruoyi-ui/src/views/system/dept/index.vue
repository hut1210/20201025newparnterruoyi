<template>
  <div class="app-container">
    <el-form :model="form"  ref="form" :inline="true" >
      <el-form-item label="付款单号:">
        <el-input
          v-model="form.id"
          placeholder="请输入付款单号"
        ></el-input>
      </el-form-item>
      <el-form-item label="付款状态:">
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
      <el-form-item label="收款人姓名:" prop>
        <el-input
        v-model="form.name"
        placeholder="请输入收款人姓名"
      ></el-input>
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
    <el-table-column prop="id" label="付款单号" width></el-table-column>
    <el-table-column prop="payeeName" label="收款人姓名" width></el-table-column>
    <el-table-column prop="payeeAccount" label="收款人银行卡号" width></el-table-column>
    <el-table-column prop="amount" label="付款金额" width></el-table-column>
    <el-table-column prop="message" label="付款备注" width></el-table-column>
    <el-table-column prop="status" label="付款状态" width>
      <template slot-scope="scope">
        <span
        v-if="scope.row.status==2"
          size="mini"
        >等待处理中</span>
        <span
        v-else-if="scope.row.status==1"
          size="mini"
        >处理成功</span>
        <span
        v-else
        size="mini"
      >等待处理中</span>
      </template>
    </el-table-column>
    <el-table-column prop="singleCharge" label="付款服务费" width></el-table-column>
    <el-table-column prop="addtime" label="付款详情" width></el-table-column>
    <el-table-column prop="payoutId" label="资金流水单号" width></el-table-column>
    <el-table-column prop="createTime" label="创建时间" width></el-table-column>
    <el-table-column prop="updateTime" label="更新时间" width></el-table-column>
    <!-- //商户系统是否需要重新付款功能？还是只从业务系统发起 失败 -->
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
import { listDept} from "@/api/system/dept";

export default {
  name: "Dept",
 
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
      form: {
       id:"",
        status:"0",
        name: ""
      },
      statusData: [
      {
          value: '',
          label: '全部'
        },
        {
          value: '0',
          label: '等待处理中'
        },
        {
          value: '1',
          label: '处理成功'
        },
        {
          value: '2',
          label: '失败'
        },
      ],
      tableData: [],
      pageIndex: 1,
      total: 0,
      pageSize:10,
      orderId:"",
    };
  },
  created() {
    alert( this.$route.query)
    debugger
    if ( this.$route.query.detailid) {
      this.orderId= this.$route.query.detailid
     
    }
    this.getList();
  },
  methods: {
    //时间 获取
    
  //查询
  //查询
  onSubmit() {
    this.pageIndex = 1;
      this.getList();
    },
    //导出
    onSubmitexport() {
      this.manageexport();
    },
    //分页
    handleCurrentChange(val) {
      this.pageIndex = val;
      this.getList();
    },
    //获取代付详情列表
     /** 查询部门列表 */
     getList() {
      let self = this;
      this.loading = true;
      let obj={
        page: self.pageIndex,
          size: self.pageSize,
          orderId:self.orderId?self.orderId:null,
          status:self.form.status?self.form.status:null,
          name: self.form.name?self.form.name:null,
          id: self.form.id?self.form.id:null,
      }
      
      listDept(obj).then(r => {
        console.log(r);
          self.tableData = r.result.list;
          self.total = r.result.total;
        this.loading = false;
      });
    },
      /** 重置按钮操作 */
      resetQuery() {
      this.resetForm("form");
     
    },
   
    
  },
  mounted() {
    
  },
};
</script>