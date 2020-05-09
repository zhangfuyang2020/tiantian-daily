<template>
  <div>
    <div class="adily-article-foot">
      <div class="icon-left" @click="Goback">
        <i class="icon-arrow_lift"></i>
      </div>
      <div class="icon-right">
        <div class="foot-right-icon">
          <i class="icon-bubble2 footer-icon" @click="CommentsShow(true)">
            <div class="comments">{{storyExtra.comments}}</div>
          </i>
        </div>
        <div class="foot-right-icon">
          <i class="icon-thumb_up footer-icon" :class="{check:Likebool}" @click="Support">
            <div class="popularity">{{storyExtra.popularity}}</div>
          </i>
        </div>
        <div class="foot-right-icon">
          <i class="icon-star-full" :class="{check:Collection}" @click="favoriteDaily"></i>
        </div>
      </div>
    </div>

    <transition name="fade">
      <div class="adily-article-comments" v-show="commentsShow">
        <div class="article-comments-header" @click="CommentsShow(false)">
          <i class="icon-arrow_lift"></i>
          <div class="comments-item">{{storyExtra.comments}}条评论</div>
        </div>

        <div class="article-comments-content" ref="articleComments">
          <ul>
            <li>
              <div
                class="long_comments"
                v-if="storyExtra.long_comments > 0"
              >{{storyExtra.long_comments}}条长评</div>
            </li>
            <li class="long_comments-item" v-for="l in long_comments.comments" :key="l.time">
              <div class="long_comments-avatar">
                <img :src="l.avatar" alt class="long_comments-avatar-img" />
              </div>
              <div class="long_comments-right">
                <div class="long_comments-author">{{l.author}}</div>
                <div class="long_comments-content">{{l.content}}</div>
                <div class="long_comments-time">{{l.time | formatDate}}</div>
              </div>
            </li>
            <li>
              <div
                class="short_comments"
                v-if="storyExtra.short_comments > 0"
              >{{storyExtra.short_comments}}条短评</div>
            </li>
            <!-- 短评 用长评的样式 -->
            <li class="long_comments-item" v-for="s in short_comments.comments" :key="s.time">
              <div class="long_comments-avatar">
                <img :src="s.avatar" alt class="long_comments-avatar-img" />
              </div>
              <div class="long_comments-right">
                <div class="long_comments-author">{{s.author}}</div>
                <div class="long_comments-content">{{s.content}}</div>
                <div class="long_comments-time">{{s.time | formatDate}}</div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import BScroll from "better-scroll";
import { formatDate } from "../../assets/util";

export default {
  data() {
    return {
      storyExtra: {},
      commentsShow: false,
      long_comments: {},
      short_comments: {},
      Likebool: false,
      Collection: false,
      newsDaily: "",
      newsLike:"",
    };
  },
  beforeMount() {
    this.newsId = this.$route.query.id;
    this.newsDaily = `第${this.newsId}个日报`;
    this.newsLike = `${this.newsId}个喜欢`;
    this.testDailyIsFavorite();
    this.likeDailyIsFavorite();
  },
  mounted() {
    this.axios(`/news/4/story-extra/${this.newsId}`).then(res => {
      this.storyExtra = res.data;
      this.Likebool ? this.storyExtra.popularity++ : this.storyExtra.popularity
    });
    this.axios(`/news/4/story/${this.newsId}/long-comments`).then(res => {
      this.long_comments = res.data;
    });
    this.axios(`/news/4/story/${this.newsId}/short-comments`).then(res => {
      this.short_comments = res.data;
    });

    this.$nextTick(() => {
      //$refs绑定元素
      if (!this.scroll) {
        this.scroll = new BScroll(this.$refs.articleComments, {
          //开启点击事件 默认为false
          click: true
        });
      } else {
        this.scroll.refresh();
      }
    });
  },
  beforeDestroy() {
    if (this.scroll) {
      this.scroll.destroy();
      this.scroll = null;
    }
  },

  methods: {
    Goback() {
      this.$router.go(-1);
    },
    CommentsShow(show) {
      this.commentsShow = show;
    },
    testDailyIsFavorite() {
      let storage = window.localStorage;
      // 通过localStorage拿到所有已收藏的日报
      let result = storage.getItem("favorite-daily");
      // 用户有没有收藏过商家
      if (result) {
        let arr = JSON.parse(result); // 字符串转数组
        // 判断用户收藏的日报中是否包含当前日报
        let item = arr.find(n => n === this.newsDaily);
        this.Collection = item ? true : false;
      } else {
        this.Collection = false;
      }
    },
    favoriteDaily() {
      let storage = window.localStorage;
      // 获取原来已经收藏的日报
      let result = storage.getItem("favorite-daily");
      // localStorage存储的数据是字符串，需要将字符串转化成js对象或者数组
      if (this.Collection) {
        // 取消收藏
        result = JSON.parse(result);

        result = result.filter(id => id !== this.newsDaily);
      } else {
        if (result) {
          // favorite-daily 已经存放其他日报
          result = JSON.parse(result);
          result = [...result, this.newsDaily];
        } else {
          result = [this.newsDaily];
        }
      }
      storage.setItem("favorite-daily", JSON.stringify(result));
      this.testDailyIsFavorite();
    },
    likeDailyIsFavorite() {
      let storage = window.localStorage;
      let result = storage.getItem("newsLike-daily");
      if (result) {
        let arr = JSON.parse(result); // 字符串转数组
        let item = arr.find(n => n === this.newsLike);
        this.Likebool = item ? true : false;
      } else {
        this.Likebool = false;
      }
    },
    Support() {
      let storage = window.localStorage;
      let result = storage.getItem("newsLike-daily");
      if (this.Likebool) {
        result = JSON.parse(result);
        result = result.filter(id => id !== this.newsLike);
      } else {
        if (result) {
          result = JSON.parse(result);
          result = [...result, this.newsLike];
        } else {
          result = [this.newsLike];
        }
      }
      storage.setItem("newsLike-daily", JSON.stringify(result));
      this.likeDailyIsFavorite();
      this.Likebool ? this.storyExtra.popularity++ : this.storyExtra.popularity--

    }
  },
  watch: {
    $route() {
      // 路由发生变化页面刷新
      // this.$router.go(0);
      // window.location.reload()
    },
    seller(newValue, oldValue) {
      // 当日报发生改变时，重新判断日报是否收藏
      if (newValue.id !== oldValue.id) {
        this.testDailyIsFavorite();
      }
    },
    likeseller(newValue, oldValue) {
      // 当日报发生改变时，重新判断日报是否收藏
      if (newValue.id !== oldValue.id) {
        this.likeDailyIsFavorite();
      }
    },
  },
  filters: {
    formatDate(time) {
      time = time * 1000;
      let date = new Date(time);
      return formatDate(date, "yyyy-MM-dd hh:mm:ss");
    }
  }
};
</script>

<style lang="scss" scoped>
.adily-article-foot {
  width: 100vw;
  height: 45px;
  background-color: #f0f0f0;
  font-size: 20px;
  position: absolute;
  left: 0;
  bottom: 0px;
  z-index: 100;

  .icon-left {
    width: 60px;
    height: 45px;
    line-height: 45px;
    margin-left: 20px;
    float: left;
  }

  .icon-right {
    display: flex;
    height: 45px;
    text-align: center;
    position: relative;

    .foot-right-icon {
      flex: 1;
      line-height: 45px;
    }

    .icon-star-full {
      color: #000;
    }

    .check {
      color: red;
    }

    .footer-icon {
      position: relative;
    }

    .comments,
    .popularity {
      position: absolute;
      top: -7px;
      left: 25px;
      font-size: 10px;
    }
  }
}

.adily-article-comments {
  width: 100vw;
  height: 100vh;
  background-color: #fff;
  position: relative;
  left: 0;
  top: 0;
  z-index: 101;

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

  .article-comments-header {
    height: 45px;
    width: 100vw;
    border-bottom: 1px solid #ccc;
    font-size: 20px;
    line-height: 45px;

    .icon-arrow_lift {
      position: absolute;
      width: 100px;
      height: 45px;
      line-height: 45px;
      padding-left: 20px;
    }

    .comments-item {
      width: 100vw;
      height: 45px;
      text-align: center;
    }
  }
}

.article-comments-content {
  padding: 0 20px;
  width: 100%;
  height: calc(100% - 45px);
  position: absolute;
  left: 0;
  top: 45px;
  overflow: hidden;

  ul {
    padding: 0;
  }

  .long_comments,
  .short_comments {
    width: 100%;
    height: 40px;
    font-size: 18px;
    color: #333333;
    line-height: 40px;
  }

  .long_comments-item {
    width: 100%;
    padding: 15px 0 35px 0;
    border-bottom: 1px solid #ccc;
    position: relative;
    display: flex;

    .long_comments-avatar {
      width: 45px;
      position: absolute;
      border-radius: 50%;
      overflow: hidden;
    }

    .long_comments-right {
      margin-left: 60px;
    }

    .long_comments-author {
      font-weight: 700;
      height: 30px;
      line-height: 30px;
    }

    .long_comments-content {
      line-height: 25px;
    }

    .icon-thumb_up {
      font-size: 18px;
    }

    .long_comments-time {
      position:absolute;
      font-size: 12px;
      font-style: italic;
      color: #aaa;
      line-height: 30px;
      right: 0;
      bottom: 0;
    }
  }
}
</style>