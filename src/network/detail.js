import {request} from './request'
// 获取商品参数信息
export function getDetailIid(iid){
  return new request({
    url:'http://152.136.185.210:7878/api/m5/detail',
    params:{
      iid,
    }
  })
}
// 获取推荐信息
export function getRecommend(){
  return new request({
    url:'http://152.136.185.210:7878/api/m5/recommend'
  })
}

// 数据整理，new对象获取数据

export class Goods{
  constructor(itemInfo,columns,services){
    this.title = itemInfo.title
    this.desc = itemInfo.desc
    this.newPrice = itemInfo.newPrice
    this.oldPrice = itemInfo.oldPrice
    this.discount = itemInfo.discount
    this.columns = columns
    this.services = services
    this.realPrice = itemInfo.lowNowPrice
  }
}

export class Shop{
  constructor(shopInfo){
    this.logo = shopInfo.shopLogo
    this.name = shopInfo.name
    this.fans = shopInfo.cFans
    this.sells = shopInfo.cSells
    this.score = shopInfo.score
    this.goodsCount =shopInfo.cGoods
  }
}

export class Params{
  constructor(itemParams){
    this.info = itemParams.info
    this.set = itemParams.info.set
    this.rule = itemParams.rule
    this.tables = itemParams.rule.tables[0]
  }
}

