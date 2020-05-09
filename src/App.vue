<template>
  <div id="app">

    <div class="ttrb">
      <div class="ttrb-header">
        <i class="icon-earth header-icon"></i>
        <p>天天日报</p>
        <div class="header-time">{{date}}</div>
      </div>
      <div class="ttrb-nav">
        <router-link tag="div" to="/" exact>日报</router-link>
        <router-link tag="div" to="/special">专栏</router-link>
        <router-link tag="div" to="/about">关于</router-link>
      </div>
    </div>
    <!-- <keep-alive> -->
      <router-view ></router-view>
    <!-- </keep-alive> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      date: "",
      news: {}
    };
  },
  mounted() {
    this.axios.get("/news/4/stories/latest").then(res => {
      this.news = res.data;
      this.date = this.news.date;
    });
  }
};
</script>

<style lang="scss">
img{
  width: 100%;
  height: 100%;
}
.ttrb{
  position:relative;
  width: 100%;
  height: 100px;
  top: 0;
  left: 0;
  z-index: 9;
  background-color: #fff;
}
.ttrb-header {
  width: 100%;
  height: 50px;
  border-bottom: 1px solid rgba(7, 17, 27, 0.1);
  padding-left: 50px;

  .header-icon {
    position: absolute;
    left: 15px;
    top: 15px;
    color: blue;
    font-size: 20px;
  }

  p {
    font-size: 18px;
    font-weight: 700;
    line-height: 50px;
  }

  .header-time {
    position: absolute;
    top: 18px;
    right: 20px;
    font-size: 14px;
    font-style: italic;
    color: #ccc;
  }
}
.ttrb-nav {
  display: flex;
  width: 100%;
  height: 50px;
  border-bottom: 1px solid rgba(7, 17, 27, 0.1);

  div {
    flex: 1;
    text-align: center;
    line-height: 50px;
    font-size: 16px;

    &.active {
      font-weight: 700;
    }
  }
}
</style>
