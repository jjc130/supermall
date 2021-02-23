<template>
  <div class="check-box" @click="checkBox">
    <img
      src="~assets/img/cart/tick.svg"
      :class="{ active: item.checked }"
    />
  </div>
</template>

<script>
export default {
  name:"CheckButton",
  props:{
    item:{
      type:Object,
      default(){
        return {}
      }
    },
  },
  methods:{
    checkBox(){
      this.item.checked = !this.item.checked
    }
  }
};
</script>

<style scoped>
.check-box{
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 5px;
}
.check-box img{
  border-radius: 50%;
  border: 2px solid #999;
}
.active{
  background-color: red;
}
</style>