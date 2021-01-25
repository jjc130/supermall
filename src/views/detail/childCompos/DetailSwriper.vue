<template>
    <swiper class="show">
      <swiper-item v-for="(item,index) in topImages" :key="index">
        <div>
          <img :src="item" alt="">
        </div>
      </swiper-item>
    </swiper>
</template>

<script>
import {Swiper,SwiperItem} from 'components/common/swiper'
export default {
  name:'DetailSwiper',
  components:{
    Swiper,
    SwiperItem,
  },
  props:{
    topImages:{
      type:Array,
      default(){
        return []
      }
    }
  }
}
</script>

<style scoped>
.show{
  height: 300px;
}
</style>