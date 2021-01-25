import axios from 'axios'

//封装抽离，

export function request(config){
  // 创建axios实例
  const instance=axios.create({
    baseURL:'http://123.207.32.32:8000',
    timeout:5000
  })
// axios的拦截器
  //请求
  instance.interceptors.request.use(
    config=>{
      // console.log(config)
      return config
    },
    err=>console.log(err)
  )
  //响应
  instance.interceptors.response.use(
    res=>{
      // console.log(res)
      return res.data
    },
    err=>console.log(err)
  )
  //返回实例axios promise对象
  return instance(config)
}


