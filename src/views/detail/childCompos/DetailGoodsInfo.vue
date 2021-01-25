<template>
  <div v-if="Object.keys(detailInfo).length !== 0" class="goods-info">
    <div class="info-desc"><span> </span></div>
    <div class="desc">新品上市~</div>
    <div class="end"><span> </span></div>
    <div class="info-key">
      {{ detailInfo.detailImage[0].key }}
    </div>
    <div class="info-list">
      <img
        v-for="(item, index) in detailInfo.detailImage[0].list"
        :src="item"
        :key="index"
        @load="imgLoad"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    detailInfo: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      counter: 0,
      imgLength: 0,
    };
  },
  methods: {
    imgLoad() {
      // 所以图片加载完发送请求
      this.counter += 1;
      if (this.counter === this.imgLength) this.$emit("imgLoad");
    },
  },
  watch:{
    detailInfo(){
    this.imgLength = this.detailInfo.detailImage[0].list.length
    }
  }
};
</script>

<style scoped>
.goods-info {
  position: relative;
  margin-top: 10px;
  padding: 5px;
  text-align: center;
}
span {
  position: absolute;
  top: -4px;
  display: inline-block;
  height: 10px;
  width: 10px;
  background-color: #666;
}
.info-desc,
.end {
  position: relative;
  border-bottom: 3px solid #666;
}
.info-desc {
  margin-right: 70%;
  text-align: left;
}
.end {
  text-align: right;
  margin-left: 70%;
}
.end span {
  right: 0;
}
img {
  width: 100%;
}
.info-key {
  margin: 5px;
  font-size: 18px;
  font-weight: bolder;
  color: #666;
}
</style>