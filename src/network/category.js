import { request } from "./request";

export function getCategory() {
  return request({
    baseURL:'http://152.136.185.210:7878/api/m5/category',
  });
}

export function getCategoryInfo(maitKey) {
  return request({
    baseURL: "http://152.136.185.210:7878/api/m5/subcategory",
    params: {
      maitKey
    }
  });
}