<template>
  <div>
    <div v-for="(item,index) in CartList" :key="index" class="cart-item">
      <check-button :item='item'></check-button>
      <div class="cart-img">
        <img :src="item.image">
      </div>
      <div class="item-title">
        <p class="title">{{item.title}}</p>
        <p>{{item.desc}}</p>
        <div class="item-count">
          <span class="price">￥{{item.price}}</span>
          <span>X{{item.count}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CheckButton from './CheckButton'
export default {
  name:'CartItem',
  components:{
    CheckButton
  },
  props:{
    CartList:{
      type:Array,
      default(){
        return []
      }
    }
  }
}
</script>

<style scoped>
.item-count, .cart-item{
  display: flex;
}
.cart-item{
  margin-bottom: 10px;
}
.cart-img{
  border-radius: 10px;
  width: 80px;
  height: 90px;
  overflow: hidden;
}
.cart-img img{
  width: 100%;
  height: 100%;
}
.item-title{
  width: calc(100vw - 110px);
  margin-left: 10px;
}
.item-title p{
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.title, .item-count{
  font-size: 18px;
  font-weight: bolder;
}
.price{
  color: var(--color-tint);
}
.item-count{
  font-size: 17px;
  line-height: 30px;
  justify-content: space-between;
}

</style>