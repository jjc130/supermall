<template>
  <div class="params">
    <table class="table1">
      <tr v-for="(item, index) in Params.tables" :key="index">
        <td v-for="(itemy,indey) in item" :key="indey">{{itemy}}</td>
      </tr>
    </table>
    <table class="table2">
      <tr v-for="(itemz, indez) in Params.set" :key="indez">
        <td class="key">{{itemz['key']}}</td>
        <td class="value">{{itemz['value']}}</td>
      </tr>
    </table>
    
  </div>
</template>

<script>
export default {
  props:{
    Params: {
      type:Object,
      default(){
        return {}
      }
    }
  }
}
</script>

<style scoped>
@import url(~assets/css/base.css);
.params{
  margin-top: 15px;
  border-top: 5px solid #f2f5f8;
}
table{
  padding: 0 5px;
  width: 100%;
  border-bottom: 5px solid #f2f5f8;
}
.table1 tr{
  display: flex;
  height: auto;
  box-shadow: 0 2px 1px #f2f5f8;
}

.table1 td{
  flex: 1;
  line-height: 60px;
  overflow: hidden;
}
.table2 tr{
  width: 100%;
  box-shadow: 0 2px 1px #f2f5f8;
}
.key{
  padding: 15px 0;
  width: 30%;
}
.value{
  width: 70%;
  color: red;
}
tr:last-child{
  box-shadow: none;
}
</style>