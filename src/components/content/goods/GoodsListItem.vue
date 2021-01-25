<template>
  <div class="goods-item" @click="click">
    <!-- 商品图片 -->
      <img :src="showImg" @load="itemImgLoad" />
    <!-- 商品描述，价格，收藏数量 -->
    <div class="goods-info">
      <p>{{ goodsItem.title }}</p>
      <span class="price">{{ goodsItem.price }}</span>
      <span class="collect">{{ goodsItem.cfav }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GoodsListItem',
  props: {
    goodsItem: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods:{
    click(){
      
      this.$router.push('/detail/' + this.goodsItem.iid)
    },
    // 监听图片加载完成 操作  请求重新计算页面高度
    itemImgLoad(){
      // 不同组件向事件总线发送事件
      if(this.$route.path.indexOf('/home') !== -1)
      this.$bus.$emit('itemImgLoad')
      else if(this.$route.path.indexOf('/detail') !== -1)
      this.$bus.$emit('itemImgLoad')
    },
    
  },
  computed:{
    showImg(){
      return this.goodsItem.image || this.goodsItem.show.img
    }
  }
};
</script>

<style scoped>
.goods-item {
  padding-bottom: 40px;
  position: relative;
  width: 48%;
  z-index: 10;
}
.goods-item img {
  width: 100%;
  border-radius: 5px;
}
.goods-info {
  font-size: 12px;
  position: absolute;
  bottom: 5px;
  left: 0;
  right: 0;
  overflow: hidden;
  text-align: center;
}
.goods-info p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 3px;
}
.goods-info .price {
  color: var(--color-high-text);
  margin-right: 20px;
}
.goods-info .collect {
  position: relative;
}
.goods-info .collect::before {
  content: "";
  position: absolute;
  left: -15px;
  top: -1px;
  width: 14px;
  height: 14px;
  background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
}
</style>