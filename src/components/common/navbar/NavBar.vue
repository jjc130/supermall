<template>
  <div class="nav-bar">
    <div class="left"><slot name="left"></slot></div>
    <div class="center"><slot name="center"></slot></div>
    <div class="right"><slot name="right"></slot></div>
  </div>
</template>

<script>
export default {};
</script>

<style>
.nav-bar {
  width: 100%;
  height: 44px;
  line-height: 44px;
  text-align: center;
  color: white;
  background-color: #fff;
  display: flex;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 10;
}
.left {
  width: 60px;
}
.center {
  flex: 1;
}
.right {
  width: 60px;
}
</style>