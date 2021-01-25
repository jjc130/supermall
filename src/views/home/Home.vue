<template>
  <div class="home-nav">
    <!-- 顶部导航栏 -->
    <nav-bar class="nav">
      <!-- 必须加上slot的name -->
      <p slot="center">购物街</p>
    </nav-bar>
    <!-- 顶部tab选项，未滑到高度隐藏 -->
    <tab-control
      :titles="['流行', '新款', '精选']"
      @tabClick="tabClick"
      ref="tabControlTop"
      class="flex"
      v-show="isFlex"
    />
    <!-- 滑动区域 -->
    <!-- 使用better-scroll插件 -->
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
      @pullingUp="loadMore"
      :pullUpload="true"
    >
      <!-- 封装swipe，banners为子组件中的banners，banner为当前组件的banner，注意动态绑定 -->
      <!-- hoem轮播图 -->
      <home-swiper :banners="banner" @swiperImgLoad="offsetTop" />
      <!-- 优惠展示 -->
      <recommend-view :recommends="recommend" />
      <!-- 本周流行 -->
      <feature-view />
      <!-- tab选项卡 -->
      <tab-control
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
        ref="tabControl"
      />
      <!-- 商品展示 -->
      <goods-list :goods="showGoods" />
    </scroll>
    <!-- 回到顶部按钮 -->
    <back-top @click.native="backClick" v-show="isScrollShow" />
  </div>
</template>

<script>
// 引入导航组件NavBar,轮播图组件HomeSwiper,展示组件RecommendView，
import NavBar from "components/common/navbar/NavBar";
import Scroll from "components/common/scroll/Scroll";

import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import BackTop from "components/content/backTop/BackTop";

import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView";

// 引入axios请求的数据
import { getHomeMultidata, getHomeGoods } from "network/home";


import {itemMinix} from 'common/mixin'

export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,
    BackTop,
  },
  mixins:[itemMinix],
  // 组件中的数据必须为函数的返回值且为对象
  data() {
    return {
      // 存储轮播图图片
      banner: [],
      // 优惠展示数据
      recommend: [],
      // 对应流行，新款，精选，的页码及数据
      goods: {
        pop: { page: 0, list: [], scroll: 0, on: false },
        new: { page: 0, list: [], scroll: 0, on: false },
        sell: { page: 0, list: [], scroll: 0, on: false },
      },
      // 选项卡状态
      currentType: "pop",
      // 滑动区外tab是否显示
      isScrollShow: false,
      // 图片加载完成时计算高度
      offsettop: 0,
      // 滑动区tab是否隐藏
      isFlex: false,
      // 离开home组件时记录位置
      saveY: 0,
    };
  },
  methods: {
    // 网络相关的方法，请求数据
    getHomeMultidata() {
      // 1.请求多个数据，引用到data中result
      getHomeMultidata().then((res) => {
        this.banner = res.data.banner.list;
        this.recommend = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      // 获取用户访问的page页数据 原有0+1
      const page = this.goods[type].page + 1;
      // 请求home展示页商品数据
      getHomeGoods(type, page).then((res) => {
        // 获取的其他页码数据数组添加到当前用户数据数组里
        this.goods[type].list.push(...res.data.list);
        // 改变用户访问的页码
        this.goods[type].page += 1;

        // 实现上拉多次获取数据
        this.$refs.scroll.finishPullUp();
        // 获取数据后重新计算高度
        // this.$refs.scroll.scroll.refresh()
      });
    },
    // 事件监听相关方法，获取子组件的数据
    tabClick(index) {
      const heig = -this.$refs.tabControl.$el.offsetTop;
      const y = this.$refs.scroll.scroll.y;

      let pop = this.goods["pop"];
      let news = this.goods["new"];
      let sell = this.goods["sell"];

      // 滑出距离小时
      if(y > heig){
        pop.scroll = y
        news.scroll = y
        sell.scroll = y
      // 滑出距离大时
      }else if(y <= heig){
        // 判断滑距是否小等于heig
        if(pop.scroll >= heig) pop.scroll = heig
        if(news.scroll >= heig)news.scroll = heig
        if(sell.scroll >= heig)sell.scroll = heig
      // 被点击过或者起始状态时
        if(this.goods[this.currentType].on || this.currentType)this.goods[this.currentType].scroll = y
      }

      switch (index) {
        case 0:
          this.currentType = "pop";
          this.$refs.scroll.scrollTo(0, pop.scroll);
          pop['on'] = true;
          break;
        case 1:
          this.currentType = "new";
          this.$refs.scroll.scrollTo(0, news.scroll);
          news['on'] = true;
          break;
        case 2:
          this.currentType = "sell";
          this.$refs.scroll.scrollTo(0, sell.scroll);
          sell['on'] = true;
          break;

        default:
          break;
      }
      // console.log(this.currentType)
      // 如果点击的组件不同，将两个组件的index设置为一致
      this.$refs.tabControlTop.currentIndex = index;
      this.$refs.tabControl.currentIndex = index;
    },
    // 返回底部监听点击调用子组件的scrollTo方法
    backClick() {
      this.$refs.scroll.scrollTo(0, 0,1000);
    },
    // 监听判断返回顶部按钮是否隐藏
    contentScroll(position) {
      this.isScrollShow = position.y < -1000;
      // 判断tabcontor组件何时固定顶部
      this.isFlex = position.y < -this.offsettop;
      // 解决小bug
      if (position.y == -560) this.isFlex = true;
    },
    // 加载更多当前页数据
    loadMore() {
      this.getHomeGoods(this.currentType);
    },
    offsetTop() {
      this.offsettop = this.$refs.tabControl.$el.offsetTop;
    },
  },
  computed: {
    // 显示点击页数据
    showGoods() {
      return this.goods[this.currentType].list;
    },
  },
  // 创建后的回调函数，生命周期函数
  created() {
    this.getHomeMultidata();
    // 请求home商品展示页数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  mounted() {
    // const refresh = debounce(this.$refs.scroll.refresh, 500);
    // // 获取数据后重新计算高度 用事件总线来实现
    // // 接收事件
    // this.$bus.$on("itemImgLoad", () => {
    //   // 重新计算高度   条件判断  获取dom必须在mounted中
    //   // this.$refs.scroll && this.$refs.scroll.scroll.refresh();
    //   refresh();
    // });
    // 挂载后获取tabControl元素距顶部的长度
    if (this.offsettop) this.offsetTop();
  },
  // 底部按钮切换时，保存页面所处位置
  activated() {
    if (this.saveY !==0) this.$refs.scroll.scrollTo(0, this.saveY, 0);
    this.$refs.scroll.refresh()
  },
  deactivated() {
    this.saveY = this.$refs.scroll._data.scroll.y && this.$refs.scroll._data.scroll.y;
    this.$bus.$off('itemImgLoad',this.itemMinix)
  },
};
</script>

<style scoped>
@import url(~assets/css/base.css);
.nav {
  background-color: var(--color-tint);
}
.content {
  height: calc(100vh - 94px);
  margin-top: 43px;
}
.flex {
  width: 100%;
  position: absolute;
  z-index: 10;
}
</style>
