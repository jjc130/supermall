<template>
  <div>
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{this.$store.state.cartList.length}})</div>
    </nav-bar>
    <cart-child :cartList=this.$store.state.cartList>

    </cart-child>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import CartChild from './childCompos/CartChild'

export default {
  name:'Cart',
  components:{
    NavBar,
    CartChild,
  }
}
</script>

<style scoped>
@import url(~assets/css/base.css);
.nav-bar{
  background: var(--color-tint);
}
</style>
