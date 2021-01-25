<template>
  <div>
    <nav-bar>
      <div slot="left">
        <img src="~assets/img/common/back.svg" alt="返回" @click="back">
      </div>
      <div class="detail-nav" slot="center">
        <div
          class="item"
          v-for="(item, index) in title"
          :key="item"
          @click="itemClick(index)"
          :class="{ active: index === currentIndex }"
        >
          {{ item }}
        </div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";

export default {
  components: {
    NavBar,
  },
  data() {
    return {
      title: ["商品", "参数", "评论", "推荐"],
      currentIndex: 0,
    };
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index;
      this.$emit('titleClick',index)
    },
    back(){
      this.$router.go(-1)
    }
  },
};
</script>

<style scoped>
@import url(~assets/css/base.css);  
.detail-nav {
  display: flex;
  background-color: #fff;
  color: black;
}
.item {
  flex: 1;
}
.active {
  color: var(--color-high-text);
}
img{
  margin-top: 11px;
}
</style>