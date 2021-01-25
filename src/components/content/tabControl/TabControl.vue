<template>
  <div class="tab-control">
    <div
      v-for="(item, index) in titles"
      :key="item"
      class="control-item"
      :class="{ active: index === currentIndex }"
      @click="itemClick(index)"
    >
      <span>{{ item }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabControl",
  data() {
    return {
      //记录当前选项卡状态
      currentIndex: 0,
    };
  },
  props: {
    titles: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  // 点击事件
  methods: {
    itemClick(index) {
      this.currentIndex = index;
      this.$emit('tabClick',index)
    },
  },
};
</script>
  
<style scoped>
.tab-control {
  display: flex;
  text-align: center;
  line-height: 40px;
  top:44px;
  background-color: #fff;
}
.control-item {
  flex: 1;
}
.active {
  color: var(--color-high-text);
}
.active span {
  padding: 10px;
  border-bottom: 3px solid var(--color-high-text);
}
</style>