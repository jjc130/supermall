import {debounce} from './utils'

// 混入，组件公共的属性，方法
export const itemMinix = {
  data(){
    return {
      // 保存刷新函数，离开组件时取消事件总线监听
      itemMinix: null
    }
  },
  mounted(){
    let refresh = debounce(this.$refs.scroll.refresh,500)
    this.itemMinix = ()=>{
      refresh()
    }
    this.$bus.$on('itemImgLoad', this.itemMinix)
  }
}