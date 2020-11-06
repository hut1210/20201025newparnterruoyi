<template>
  <div class="modal-bg" v-show="show">
    <div class="modal-container" :style="{width:currentWidth,height:height}">
      <div class="modal-header" :style=" {background: bgColor}">
        <div class="modal-header-title">{{ title }}</div>
        <div class="mydal-header-close" @click="hideModal">
          <i class="el-icon-close"></i>
        </div>
      </div>
      <div class="modal-main" :style=" {background: Color}">
        <slot></slot>
      </div>
      <div class="modal-footer" v-if="status">
        <el-button @click="hideModal">取消</el-button>
        <el-button type="primary" @click="submit">确定</el-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "modal",
  props: {
    show: {
      type: Boolean,
      default: true
    },
    status: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ""
    },
    width: {
      type: String,
      default: "91.25rem"
    },
    height: {
      type: String,
      default: "auto"
    },
    bgColor: {
      type: String
      // default: "#409eff"
    },
    Color: {
      type: String,
      default: "#fff"
    }
  },
  data() {
    return {
      x: 0,
      y: 0,
      node: null,
      isCanMove: false,
      currentWidth: this.width //把传过来的宽度绑定到当前组件页面的宽度
    };
  },
  computed: {},
  mounted() {
    this.node = document.querySelector(".modal-container");
  },
  methods: {
    submit() {
      this.$emit("submit");
    },
    //关闭弹窗
    hideModal() {
      this.$emit("hideModal");
      this.currentWidth = this.width;
      this.height = "auto";
    }
    //点击放大
    // largeModal() {
    //   if (this.height == "auto") {
    //     this.currentWidth = "100%";
    //     this.height = "100%";
    //   } else {
    //     this.currentWidth = this.width;
    //     this.height = "auto";
    //   }

    //   // $(".modal-container").css("width", "100%");
    //   // $(".modal-container").css("height", "100%");
    //   // if (window.screen) {
    //   //   //判断浏览器是否支持window.screen判断浏览器是否支持screen
    //   //   var myw = screen.availWidth; //定义一个myw，接受到当前全屏的宽
    //   //   var myh = screen.availHeight; //定义一个myw，接受到当前全屏的高
    //   //   window.moveTo(0, 0); //把window放在左上脚
    //   //   window.resizeTo(myw, myh); //把当前窗体的长宽跳转为myw和myh
    //   // }
    // }
  }
};
</script>
<style  scoped>
.modal-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
}
.modal-container {
  border: 2px solid rgba(237, 235, 235, 1);
  box-shadow: -1px 3px 16px 0px rgba(0, 0, 0, 0.25);
  border-radius: 3px;
  background: #fff;
  overflow: hidden;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  /* width: 1460px; */
  margin: 0 auto;
}
.modal-header {
  height: 56px;
  /* background: #409eff; */
  color: #fff;
  display: flex;
  align-items: center;
  position: relative;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  padding-left: 29px;
  font-size: 19px;
  border-bottom: 1px solid rgba(229, 229, 229, 1);
}
.modal-header-title {
  font-size: 19px;

  font-weight: normal;
  color: rgba(102, 102, 102, 1);
}
.mydal-header-close {
  position: absolute;
  right: 29px;
  top: 0;
  width: 33px;
  height: 52px;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  cursor: pointer;
  text-align: center;
  line-height: 52px;
}
.mydal-header-close i {
  font-size: 24px;
  color: #e5e5e5;
}
.modal-footer {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 57px;
  border-top: 1px solid #ddd;
}
.modal-footer button {
  width: 100px;
}
.modal-main {
  border-top: none;
  border-bottom-left-radius: 13px;
  border-bottom-right-radius: 13px;
  overflow-y: auto;
  /* min-height: 400px; */
  max-height: 800px;
}
.modal_box {
  border-bottom-left-radius: 13px;
  border-bottom-right-radius: 13px;
}
</style>
