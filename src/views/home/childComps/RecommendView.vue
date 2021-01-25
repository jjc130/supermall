<template>
  <div class="recommend">
    <div class="recommend-view" v-for="item in recommends" :key="item.title">
      <a :href="item.link">
        <img :src="item.image" alt="" />
        <div>
          <p>{{ item.title }}</p>
        </div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    recommends: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style>
.recommend {
  display: flex;
  text-align: center;
  font-size: 12px;
  padding-bottom: 20px;
  margin-bottom: 12px;
  box-shadow: 0 12px 0 rgba(100, 100, 100, .1);
}
.recommend-view {
  flex: 1;
  margin: 10px 3px;
}
.recommend-view img {
  width: 100%;
  margin-bottom: 10px;
}
</style>