<template>
  <div>
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{this.$store.state.cartList.length}})</div>
    </nav-bar>
    <scroll class="content" ref="scroll">
      <cart-child :cartList='this.$store.state.cartList' />
    </scroll>
    <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import CartChild from './childCompos/CartChild'
import Scroll from 'components/common/scroll/Scroll'
import CartBottomBar from './childCompos/CartBottomBar'

export default {
  name:'Cart',
  components:{
    NavBar,
    CartChild,
    Scroll,
    CartBottomBar,
  },
  // 添加商品重新计算滑动的高度
  activated(){
    this.$refs.scroll.refresh()
  }
}
</script>

<style scoped>
@import url(~assets/css/base.css);
.nav-bar{
  background: var(--color-tint);
}
.content{
  margin-top: 44px;
  height: calc(100vh - 44px);
}
</style>
