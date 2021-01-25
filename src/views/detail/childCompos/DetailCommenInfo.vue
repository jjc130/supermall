<template>
  <div class="commen-info" v-if="Object.keys(rate).length !== 0">
    <div class="commen-heard">
      <span>用户评价</span>
      <span>更多>></span>
    </div>
    <div class="info-user">
      <img :src="rate.user.avatar">
      <span>{{rate.user.uname}}</span>
    </div>
    <div class="info-detail">
      <p>{{rate.content}}</p>
      <div class="info-other">
        <span class="date">
          {{rate.created | showDate}}
        </span>
        <span>
          {{rate.style}}
        </span>
      </div>
      <div class="info-imgs">
        <img :src="item" v-for="(item,index) in rate.images" :key="index">
      </div>
    </div>
  </div>
</template>

<script>
import {formatDate} from 'common/utils'
export default {
  name: 'DetailCommenInfo',
  props:{
    rate:{
      type:Object,
      default(){
        return {}
      }
    }
  },
  filters:{
    showDate: function(value){
      let date = new Date(value*1000)
      return formatDate(date,'yyyy-MM-dd')
    }
  }
}
</script>

<style scoped>
@import url(~assets/css/base.css);
.commen-info{
  line-height: 60px;
  padding: 0 5px;
  color: #333;
}
.commen-heard{
  display: flex;
  justify-content: space-between;
  border-bottom: 3px solid #f2f5f8;
}
.info-user{
  margin-top: 15px;
  display: flex;
  vertical-align: middle;
  font-weight: bolder;
}
.info-user img{
  width: 60px;
  height: 60px;
  margin-right: 10px;
  border-radius: 50%;
}
.info-detail{
  margin-top: 10px;
  line-height: 24px;
}
.info-other{
  color: #999;
  line-height: 40px;
}
.info-imgs{
  display: flex;
  padding-bottom: 10px;
}
.info-imgs img{
  width: 80px;
  height: 90px;
  margin-right: 10px;
}
</style>