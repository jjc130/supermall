<template>
  <div class="bottom-bar">
    <div class="item">
      <div>
        <img src="~assets/img/detail/lujing217.svg">
      </div>
      <span class="text">客服</span>
    </div>
    <div class="item">
      <div>
        <img src="~assets/img/detail/dianpu.svg">
      </div>
      <span class="text">店铺</span>
    </div>
    <div class="text item">
      <div>
        <img src="~assets/img/detail/shoucang.svg">
      </div>
      <span>收藏</span>
    </div>
    <div class="bar-item">
      <div class="cart" @click="shopClick">加入购物车</div>
      <div class="buy">购买</div>
    </div>
  </div>
</template>

<script>
export default {
  methods:{
    shopClick(){
      this.$emit('shopClick')
    }
  }
}
</script>

<style scoped>
@import url(~assets/css/base.css);
.bottom-bar{
  position: fixed;
  left: 0;
  bottom: 0;
  display: flex;
  width: 100%;
  height: 49px;
  color: black;
  font-size: 16px;
  text-align: center;
  background: #fff;
  z-index: 20;
}
.item{
  padding-top: 3px;
  flex:1
}
.bar-item{
  flex: 3;
  display: flex;
  line-height: 49px;
}
.cart{
  flex: 1;
  background-color: rgb(238, 238, 42);
}
.buy{
  flex: 1;
  color: #fff;
  background-color: var(--color-tint);
}
img{
  width: 25px;
  height: 25px;
}
</style>