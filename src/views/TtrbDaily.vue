<template>
  <div id="ttrb-daily">
    <div class="ttrb-daily">
      <div ref="dailycontent" class="dailycontent">
        <ul>
          <li>
            <div class="daily-nav">
              <i class="icon-book"></i>
              <h3>今日要闻：</h3>
            </div>
          </li>
          <li
            @click="newsArticle(n.id)"
            v-for="n in news.stories"
            :key="n.id"
            class="daily-content"
          >
            <div class="daily-content-img">
              <img :src="n.images[0]" alt />
            </div>
            <div class="daily-content-text">
              <h3>{{n.title}}</h3>
            </div>
          </li>

          <li>
            <div class="daily-nav">
              <i class="icon-book oldnews-icon"></i>
              <h3>昨日新闻：</h3>
            </div>
          </li>
          <li
            @click="newsArticle(n.id)"
            v-for="n in oldnews.stories"
            :key="n.id"
            class="daily-content"
          >
            <div class="daily-content-img">
              <img :src="n.images[0]" alt />
            </div>
            <div class="daily-content-text">
              <h3>{{n.title}}</h3>
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
      data: "",
      news: {},
      oldnews: {}
    };
  },
  mounted() {
    this.$nextTick(() => {
      //$refs绑定元素
      if (!this.scroll) {
        this.scroll = new BScroll(this.$refs.dailycontent, {
          //开启点击事件 默认为false
          click: true
        });
        // console.log(this.scroll);
      } else {
        this.scroll.refresh();
      }
    });

    this.axios.get("/news/4/stories/latest").then(res => {
      this.news = res.data;
      this.date = this.news.date;
      this.axios(`/news/4/stories/before/${this.date}`).then(res => {
        // console.log(res.data);
        this.oldnews = res.data;
      });
    });

  },
  beforeDestroy() {
    if (this.scroll) {
      this.scroll.destroy();
      this.scroll = null;
    }
  },
  methods: {
    newsArticle(id) {
      this.$router.push({ name: "AdilyArticleDetails", query: { id: id } });
    },
    oldNewsArticle(id) {
      this.$router.push({ name: "AdilyArticleDetails", query: { id: id } });
    }
  }
};
</script>

<style lang="scss">
.ttrb-daily {
  width: 100%;
  height: calc(100% - 100px);
  position: absolute;
  padding: 0 20px;

  .dailycontent {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;

    ul {
      padding: 0;
      margin: 0;
    }

    .daily-nav {
      width: 100%;
      height: 40px;
      line-height: 40px;
      font-weight: 700;
      top: 20px;

      .icon-book {
        position: absolute;
        line-height: 40px;
        color: brown;
      }

      .oldnews-icon {
        color: chocolate;
      }

      h3 {
        margin-left: 20px;
        color: #7e7e7e;
      }
    }

    .daily-content {
      width: 100%;
      height: 120px;
      padding: 20px 0;
      // display: flex;
      border-bottom: 1px solid #ccc;
      display: table;

      .daily-content-img {
        width: 80px;
        height: 80px;
        margin-right: 20px;
        border-radius: 5px;
        overflow: hidden;
      }

      .daily-content-text {
        flex: 1;
        margin-left: 20px;
        display: table-cell;
        vertical-align: middle;
        color: #777;
      }
    }
  }
}
</style>