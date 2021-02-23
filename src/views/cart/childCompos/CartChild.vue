<template>
  <div class="cart-child">
    <cart-item :CartList=cartList></cart-item>
  </div>
</template>

<script>
import CartItem from './CartItem'
export default {
  name:"CartChild",
  components:{
    CartItem
  },
  props:{
    cartList:{
      type:Array,
      default(){
        return []
      }
    },
    
  }
}
</script>

<style scoped>
.cart-child{
  padding: 10px;
  color: #666;
  line-height: 30px;
  margin-bottom: 10px;
}


</style>