<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  props: {
    probeType: {
      type: Number,
      default: 0,
    },
    pullUpLoad: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      scroll: null,
    };
  },
  mounted() {
    this.scroll = new BScroll(this.$refs.wrapper, {
      click: true,
      // 动态绑定监听类型
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad,
    });
    // 监听返回顶部按钮的出现和隐藏是的y的值
    this.scroll.on("scroll", (position) => {
      this.$emit("scroll", position);
    });
    this.scroll.on("pullingUp", () => {
      // console.log('上拉加载更多')
      this.$emit("pullingUp");
    });
  },
  // 封装scrollTo方法
  methods: {
    scrollTo(x, y, time) {
      this.scroll && this.scroll.scrollTo(x, y, time);
    },
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp();
    },
    refresh() {
      // console.log('----')
      this.scroll && this.scroll.refresh();
    },
  },
};
</script>

<style scoped>
.content {
  background-color: #fff;
}
</style>