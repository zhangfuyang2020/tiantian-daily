<template>
  <transition name="fade">
    <div class="s-a-content">
      <div class="sac-header">
        <i class="icon-arrow_lift" @click="Goback"></i>
      </div>
      <div class="SAContent" ref="SAContent">
        <div v-html="saContent"></div>
      </div>
    </div>
  </transition>
</template>

<script>
import BScroll from "better-scroll";

export default {
  data() {
    return {
      saContent: "",
      storiesId: ""
    };
  },
  methods: {
    Goback() {
      this.$router.go(-1);
    }
  },
  mounted() {
    this.$nextTick(() => {
      //$refs绑定元素
      if (!this.scroll) {
        this.scroll = new BScroll(this.$refs.SAContent, {
          //开启点击事件 默认为false
          click: true
        });
        // console.log(this.scroll);
      } else {
        this.scroll.refresh();
      }
    });
    this.storiesId = this.$route.query.id;
    this.axios(`/sac/${this.storiesId}`).then(res => {
      this.saContent = res.data;
    });
  },
  beforeDestroy() {
    if (this.scroll) {
      this.scroll.destroy();
      this.scroll = null;
    }
  }
};
</script>

<style lang="scss" scoped>
.s-a-content {
  width: 100vw;
  height: 100vh;
  background-color: #fff;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 11;
  padding-top: 50px;
  overflow: hidden;

  &.fade-enter,
  &.fade-leave-to {
    transform: translateX(100%);
  }

  &.fade-enter-active,
  &.fade-leave-active {
    transition: all 0.3s linear;
  }

  &.fade-enter-to,
  &.fade-leave {
    transform: translateX(0);
  }

  .sac-header {
    position: absolute;
    background-color: #fff;
    width: 100%;
    height: 50px;
    top: 0;
  }

  .icon-arrow_lift {
    font-size: 25px;
    line-height: 50px;
    margin-left: 25px;
  }

  .SAContent {
    width: 100%;
    height: calc(100% - 45px);
    position: absolute;
    top: 50px;
    left: 0;
    background-color: #fff;
    overflow: hidden;
  }
}
</style>