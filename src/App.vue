<template>
  <div id="app">
    <router-view/>
    <maintabbar></maintabbar>
  </div>
</template>

<script>
import maintabbar from 'components/content/maintabbar/MainTabbar'

export default {
  name: 'App',
  components:{
    maintabbar
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
