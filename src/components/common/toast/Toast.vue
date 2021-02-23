<template>
  <div class="toast" v-show="isShow" @click="show('11',800)">
    {{message}}
  </div>
</template>

<script>
var _this = {}
export default {
  name:'Toast',
  props:{
    // message:{
    //   type: String,
    //   default: ''
    // },
    // isShow:{
    //   type: Boolean,
    //   default: false
    // }
  },
  data(){
    return {
      message: '',
      isShow: false,
    }
  },
  // 保存this指向
  beforeCreate(){
    _this = this;
  },
  methods:{
    show(message,deplay){
      _this.message = message;
      _this.isShow = true;
      let settime = setTimeout(()=>{
        _this.message = '';
        _this.isShow = false;
        clearInterval(settime)
      },deplay)
    }
  }
}
</script>

<style scoped>
.toast{
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  height: 30px;
  line-height: 30px;
  color: #999;
  padding: 0 5px;
  background-color: rgba(0, 0, 0, .6);
  z-index: 999;
}
</style>