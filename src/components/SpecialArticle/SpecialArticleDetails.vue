<template>
  <div id="special-article-details">
    <div class="special-article-details">
      <div class="special-article" ref="specialArticle">
        <ul>
          <li v-for="s in section.stories" :key="s.id" class="special-article-item" @click="SAContent(s.id)">
            <div class="special-article-img">
              <img :src="s.images" alt />
            </div>
            <div class="special-article-right">
              <p class="special-article-title">{{s.title}}</p>
              <p class="special-article-display_date">{{s.display_date}}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  data() {
    return {
      id: "",
      section: {},
      storiesId: "",
      show:false
    };
  },
  methods:{
    getShow(show){
      this.show = show
    },
    SAContent(id) {
      this.$router.push({name:'SpecialArticleContent',query:{id:id}})
    }
  },
  mounted() {
    this.$nextTick(() => {
      //$refs绑定元素
      if (!this.scroll) {
        this.scroll = new BScroll(this.$refs.specialArticle, {
          //开启点击事件 默认为false
          click: true
        });
        // console.log(this.scroll);
      } else {
        this.scroll.refresh();
      }
    });
    this.id = this.$route.query.id;
    this.axios(`/news/3/section/${this.id}`).then(res => {
      this.section = res.data;
      this.storiesId = this.section.stories[0].id;
    });
  },
  beforeDestroy() {
    if (this.scroll) {
      this.scroll.destroy();
      this.scroll = null;
    }
  },
  watch: {
    $route() {
      // 路由发生变化页面刷新
      this.$router.go(0);
    }
  }
};
</script>

<style lang="scss" scoped>
.special-article-details {
  width: 100vw;
  height: calc(100vh - 100px);
  position: relative;
  left: 0;
  top: 0;
  overflow: hidden;

  .special-article {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    height: 0;
    padding: 0 15px;

    .special-article-item {
      width: 100%;
      padding: 15px 0;
      border-bottom: 1px solid #ccc;
      min-height: 130px;

      .special-article-img {
        width: 100px;
        border-radius: 10px;
        overflow: hidden;
        position: absolute;
      }

      .special-article-right {
        margin-left: 120px;
        position: relative;
      }

      .special-article-title {
        margin-top: 10px;
        height: 40px;
        font-size: 16px;
        font-weight: 700;
        text-align: center;
        line-height: 20px;
      }

      .special-article-display_date {
        position: absolute;
        font-size: 12px;
        color: #aaa;
        bottom: -45px;
        right: 10px;
      }
    }
  }
}
</style>