import Toast from './Toast'

const obj = {};

obj.install = function (Vue){
  // 创建组件构造器
  const toastConstrustor = Vue.extend(Toast);
  // new 组件构造器创建一个组件对象
  const toast = new toastConstrustor();
  // 将组件对象挂载到元素上
  toast.$mount(document.createElement('div'));
  // 将组件挂载到div上
  document.body.appendChild(toast.$el);
  Vue.prototype.$toast = Toast;
};
export default obj