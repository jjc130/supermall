<template>
  <div>
    <div v-for="(item,index) in cartList" :key="index">

    </div>
  </div>
</template>

<script>
export default {
  name:"CartChild",
  props:{
    cartList:{
      type:Array,
      default(){
        return []
      }
    }
  }
}
</script>

<style scoped>

</style>