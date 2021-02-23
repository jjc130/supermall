<template>
  <div class="detail">
    <!-- 顶部导航栏 -->
    <detail-nav-bar @titleClick="titleClick" ref="nav" />
    <scroll ref="scroll" @scroll="scroll" :probeType="3">
      <!-- 轮播图 -->
      <detail-swiper :topImages="topImages" />
      <!-- 商品描述title -->
      <detail-base-info :goods="goods" />
      <!-- 店铺信息 -->
      <detail-shop-info :shop="shop" />
      <!-- 穿着效果 -->
      <detail-goods-info :detail-info="detailInfo" @imgLoad="imgLoad" />
      <!-- 商品参数 -->
      <detail-params-info ref="params" :Params="Params" />
      <!-- 用户评价 -->
      <detail-commen-info ref="commen" :rate="rate" />
      <!-- 推荐信息 -->
      <goods-list ref="list" :goods="recommend" />
    </scroll>
    <back-top @click.native="backClick" v-show="isScrollShow" />
    <detail-bottom-bar @shopClick="shopClick" />
  </div>
</template>

<script>
import DetailNavBar from "./childCompos/DetailNavBar";
import {
  getDetailIid,
  Goods,
  Shop,
  Params,
  getRecommend,
} from "network/detail.js";
import DetailSwiper from "./childCompos/DetailSwriper";
import DetailBaseInfo from "./childCompos/DetailBaseInfo";
import DetailShopInfo from "./childCompos/DetailShopInfo";
import Scroll from "components/common/scroll/Scroll";
import DetailGoodsInfo from "./childCompos/DetailGoodsInfo";
import DetailParamsInfo from "./childCompos/DetailParamsInfo";
import DetailCommenInfo from "./childCompos/DetailCommenInfo";
import DetailBottomBar from "./childCompos/DetailBottomBar";
import GoodsList from "components/content/goods/GoodsList";
import BackTop from "components/content/backTop/BackTop";
import { debounce } from "common/utils";
import { itemMinix } from "common/mixin";

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    Scroll,
    DetailParamsInfo,
    DetailCommenInfo,
    GoodsList,
    DetailBottomBar,
    BackTop,
  },
  mixins: [itemMinix],
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      Params: {},
      rate: {},
      recommend: [],
      offsetTopY: [],
      getTopY: null,
      isScrollShow: false,
    };
  },
  // 获取商品参数和推荐参数
  created() {
    this.iid = this.$route.params.iid;

    getDetailIid(this.iid).then((res) => {
      // console.log(res);
      const data = res.result;

      // 展示商品图片，轮播图
      this.topImages = data.itemInfo.topImages;

      // 获取商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );

      // 创建店铺信息对象
      this.shop = new Shop(data.shopInfo);

      // 商品详情数据
      this.detailInfo = data.detailInfo;

      // 商品参数
      this.Params = new Params(data.itemParams);

      // 评论信息
      if (data.rate.cRate) {
        this.rate = data.rate.list[0];
      }
    });
    getRecommend().then((res) => {
      // console.log(res);
      this.recommend = res.data.list;
      // console.log(this.recommend);
    });
  },
  methods: {
    // 获取图片个数
    imgLoad() {
      this.$refs.scroll.refresh();

      // 图片加载完成防抖计算组件的top
      this.getTopY = debounce(() => {
        this.offsetTopY.push(0);
        this.offsetTopY.push(-this.$refs.params.$el.offsetTop - 44);
        this.offsetTopY.push(-this.$refs.commen.$el.offsetTop - 44);
        this.offsetTopY.push(-this.$refs.list.$el.offsetTop - 44);
      });
      this.getTopY();
    },
    titleClick(index) {
      // nav点击跳转到对应位置
      this.$refs.scroll.scrollTo(0, this.offsetTopY[index], 500);
    },
    scroll(position) {
      // 滚动监听，判断nav的状态改变样式
      for (let i in this.offsetTopY) {
        // i转类型
        i = Number(i);
        // 如果nav的index为i时不判断
        if (this.$refs.nav.currentIndex !== i) {
          // top[i] < y < top[i+1] || i=length-1 ,y < top[i]
          if (
            (position.y <= this.offsetTopY[i] &&
              position.y >= this.offsetTopY[i + 1]) ||
            (i === this.offsetTopY.length - 1 &&
              position.y <= this.offsetTopY[i])
          ) {
            this.$refs.nav.currentIndex = i;
          }
        }
      }
      this.isScrollShow = position.y < -1000;
    },
    backClick() {
      this.$refs.scroll.scrollTo(0, 0, 1000);
    },
    shopClick() {
      // 将加入购物车的一条商品数据存储到该对象
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.price = this.goods.realPrice;
      product.desc = this.goods.desc;
      product.iid = this.iid;
      // vuex发送事件
      this.$store.dispatch("addCart", product)
      .then((res) => {
        // 注意this指向，--差点吐血
        this.$toast.methods.show(res,800)
      })
    },
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
  },
  // 离开组件时取消总线监听
  destroyed() {
    this.$bus.$off("itemImgLoad", this.itemMinix);
  },
};
</script>

<style scoped>
.detail {
  position: relative;
  z-index: 10;
  height: 100vh;
}
.wrapper {
  position: absolute;
  margin-top: 44px;
  height: calc(100vh - 44px);
}
</style>