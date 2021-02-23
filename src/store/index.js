import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex);

const store = new Vuex.Store({
  state:{
    // 存放购物车数据的数组
    cartList: []
  },
  mutations:{
    addCount(state,product){
      product.count += 1
    },
    addToCart(state,product){
      product.checked = false;
      product.count = 1;
      state.cartList.push(product)
    }
  },
  actions:{
    // 点击加入购物车事件
    addCart(context,payload){
      return new Promise((resolve,reject)=>{
        let oldProduct = null;
      for(let item of context.state.cartList){
        // 如果购物车中有商品与加入的商品一样
        if(item.iid == payload.iid){
          oldProduct = item
        }
      };
      if(oldProduct){
        // 一样的商品数量加一
        context.commit('addCount',oldProduct);
        resolve('购物车商品数量+1')
      }else{
        // 不一样的商品添加到数组中
        context.commit('addToCart',payload);
        resolve('成功加入购物车')
      };
      // console.log(context.state.cartList)
      })
    }
  }
});
export default store