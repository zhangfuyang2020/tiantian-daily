<template>
  <div class="ttrb-special">
    <div class="special" ref="special">
      <ul>
        <li v-for="d in sections.data" :key="d.id" class="special-item" @click="setShow(true),Sections(d.id)">
          <div class="special-thumbnail">
            <img :src="d.thumbnail" alt />
          </div>
          <div class="special-right">
            <p class="special-name">{{d.name}}</p>
            <p class="special-description">{{d.description}}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";

export default {
  data() {
    return {
      sections: {},
      whole: {},
      id: "",
      show: false
    };
  },
  methods: {
    setShow(show) {
      this.show = show;
    },
    Sections(id) {
      this.$router.push({name:'SpecialArticleDetails',query:{id:id}})
      console.log(id);
    }
  },
  mounted() {
    this.axios(`/news/3/sections`).then(res => {
      this.sections = res.data;
    });

    this.$nextTick(() => {
      //$refs绑定元素
      if (!this.scroll) {
        this.scroll = new BScroll(this.$refs.special, {
          //开启点击事件 默认为false
          click: true
        });
        // console.log(this.scroll);
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
  }
};
</script>

<style lang="scss" scoped>
.ttrb-special {
  width: 100vw;
  height: calc(100vh - 100px);
  position: relative;
  overflow: hidden;

  .special {
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    padding: 0 15px;

    ul {
      padding: 0;
    }

    .special-item {
      width: 100%;
      padding: 20px 0;
      border-bottom: 1px solid #ccc;
    }

    .special-thumbnail {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      overflow: hidden;
      position: absolute;
    }

    .special-right {
      min-height: 50px;
      margin-left: 70px;
    }

    .special-name {
      display: inline-block;
      height: 30px;
      line-height: 30px;
      font-weight: 700;
      text-align: center;
      font-size: 14px;
    }

    .special-description {
      font-size: 14px;
      font-weight: 200;
      line-height: 25px;
    }
  }
}
</style>