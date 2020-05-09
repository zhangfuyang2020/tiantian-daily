<template>
<transition name="fade">
    <div class="adily-article-details">
    <div class="article-details" ref="articleDetails">
      <div v-html="newsArticle.body" class="article-content"></div>
    </div>

    <TtrbFooter />
  </div>
</transition>
</template>

<script>
import BScroll from "better-scroll";
import TtrbFooter from "./TtrbFooter";

export default {
  
  data() {
    return {
      newsId: "",
      newsArticle: {}
    };
  },
  mounted() {
    this.$nextTick(() => {
      //$refs绑定元素
      if (!this.scroll) {
        this.scroll = new BScroll(this.$refs.articleDetails, {
          //开启点击事件 默认为false
          click: true
        });
        // console.log(this.scroll);
      } else {
        this.scroll.refresh();
      }
    });

    this.newsId = this.$route.query.id;
    this.axios(`/news/4/story/${this.newsId}`).then(res => {
      this.newsArticle = res.data;
    });
  },

  components: {
    TtrbFooter
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
.adily-article-details {
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  background-color: #fff;
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
}

.article-details {
  width: 100%;
  height: calc(100% - 45px);
  position: absolute;
  top: 0;
  left: 0;
  background-color: #fff;
  overflow: hidden;
  padding: 0 12px;

  .article-content {
    line-height: 35px;
  }
}
</style>