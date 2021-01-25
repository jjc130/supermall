<template>
  <div id="app">
    <keep-alive exclude="Detail">
      <router-view/>
    </keep-alive>
    <main-tabbar></main-tabbar>
  </div>
</template>

<script>
import MainTabbar from "components/content/maintabbar/MainTabbar";

export default {
  name: 'App',
  components:{
    MainTabbar,
  }
}
</script>

<style>
  *{
    margin:0;
    padding:0;
  }
  body{
    font-size: 16px;
  }
</style>
