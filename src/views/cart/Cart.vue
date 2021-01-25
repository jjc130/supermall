<template>
  <div>
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{this.$store.state.cartList.length}})</div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'

export default {
  name:'Cart',
  components:{
    NavBar,
  }
}
</script>

<style scoped>
@import url(~assets/css/base.css);
.nav-bar{
  background: var(--color-tint);
}
</style>
