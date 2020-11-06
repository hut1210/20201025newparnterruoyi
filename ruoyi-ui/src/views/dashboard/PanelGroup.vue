<template>
  <el-row :gutter="40" class="panel-group">
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('newVisitis')">
        <div class="card-panel-icon-wrapper icon-people">
          <h1 class="icon-money-h1"> ₹</h1>
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            账户总余额
          </div>
          <count-to :start-val="0" :end-val="objmessge.totalBalance" :duration="2600" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('messages')">
        <div class="card-panel-icon-wrapper icon-message">
          <h1 class="icon-money-h1"> ₹</h1>
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            可用余额
          </div>
          <count-to :start-val="0" :end-val="objmessge.availableBalance" :duration="3000" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('purchases')">
        <div class="card-panel-icon-wrapper icon-money">
         <h1 class="icon-money-h1"> ₹</h1>
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            不可用余额
          </div>
          <count-to :start-val="0" :end-val="objmessge.blockedBalance" :duration="3200" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" style="
      display: flex;
      justify-content: center;
      align-items: center;"
  >
        <div calss="use-hand" >
          <el-button size="medium" round @click="btModifyWindow(1)"
            >充值</el-button
          >
          <!-- <el-button size="medium" round @click="btModifyWindow(2)"
            >提现</el-button
          > -->
          <el-button size="medium" round @click="btModifyWindow(3)"
            >代付</el-button
          >
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import CountTo from 'vue-count-to'

export default {

  props: {
    objmessge: {},
  },
  
  components: {
    CountTo
  },
  data() {
    return{
 
    }
  },
  methods: {
    handleSetLineChartData(type) {
      this.$emit('handleSetLineChartData', type)
    },
    btModifyWindow:function(v){
      this.$emit("btModifyWindow", v);
      // if(v==1){
      //   this.ModifyWindow=true;
      //   this.getrate();
      // }else if(v==2){
      //   this.getrate();
      //   this.ModifyWindow1=true;
      // }else {
      //   this.ModifyWindow2=true;
      // }
    }
  }
}
</script>

<style lang="scss" scoped>
.panel-group {
  margin-top: 18px;

  .card-panel-col {
    margin-bottom: 32px;
  }

  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    border-color: rgba(0, 0, 0, .05);

    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }

      .icon-people {
        background: #40c9c6;
      }

      .icon-message {
        background: #36a3f7;
      }

      .icon-money {
        background: #f4516c;
      }

      .icon-shopping {
        background: #34bfa3
      }
    }

    .icon-people {
      color: #40c9c6;
    }

    .icon-message {
      color: #36a3f7;
    }

    .icon-money {
      color: #f4516c;
    }

    .icon-shopping {
      color: #34bfa3
    }

    .card-panel-icon-wrapper {
      float: left;
       margin: 5px 0 0 5px;
      padding: 0px 38px;
      
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }
    .icon-money-h1{
      font-size:3em;
    }
    .card-panel-icon {
      float: left;
      font-size: 48px;
    }

    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;

      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }

      .card-panel-num {
        font-size: 20px;
      }
    }
  }
  
}


@media (max-width:550px) {
  .card-panel-description {
    display: none;
  }

  .card-panel-icon-wrapper {
    float: none !important;
    width: 100%;
    height: 100%;
    margin: 0 !important;

    .svg-icon {
      display: block;
      margin: 14px auto !important;
      float: none !important;
    }
  }
}
</style>
