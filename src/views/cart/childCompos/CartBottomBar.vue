<template>
  <div class="bottom-bar">
    <check-button :item="isSelectAll" @click.native="checkClick">
    </check-button>
    <div class="space">
      <span>合计：￥{{ sumPrice }}</span>
      <span class="computed" @click="check">去结算（{{ computed }}）</span>
    </div>
  </div>
</template>

<script>
import CheckButton from "./CheckButton";
export default {
  components: {
    CheckButton,
  },
  data() {
    return {
      item: {
        checked: false,
      },
    };
  },
  computed: {
    sumPrice() {
      return this.$store.state.cartList
        .filter((item) => {
          return item.checked;
        })
        .reduce((prePrice, item) => {
          return prePrice + item.price * item.count;
        }, 0)
        .toFixed(2);
    },
    computed() {
      return this.$store.state.cartList.filter((item) => {
        return item.checked;
      }).length;
    },
    isSelectAll() {
      this.item.checked = !this.$store.state.cartList.filter(
        (item) => !item.checked
      ).length;
      if (this.$store.state.cartList.length === 0) this.item.checked = false;
      return this.item;
    },
  },
  methods: {
    checkClick() {
      if (this.isSelectAll.checked) {
        this.$store.state.cartList.forEach((item) => {
          item.checked = true;
        });
      } else {
        this.$store.state.cartList.forEach((item) => {
          item.checked = false;
        });
      }
    },
    check(){
      let arr =this.$store.state.cartList.filter(
        item => item.checked === true
      );
      if(arr.length == 0){
        this.$toast.methods.show('请选择购买商品',800)
      }
    },
  },
};
</script>

<style scoped>
.bottom-bar {
  display: flex;
  line-height: 40px;
  position: relative;
  bottom: 89px;
  background-color: #eee;
  padding-left: 5px;
}
.space {
  flex: 1;
  display: flex;
  justify-content: space-between;
}
.space span:nth-child(1) {
  flex: 1;
}
.computed {
  flex: 1;
  align-items: center;
  text-align: center;
  background-color: var(--color-high-text);
  color: #eee;
}
</style>