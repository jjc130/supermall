import { request } from "./request";

export function getProfileInfo(uid) {
  return request({
    // 没有接口
    url: "/profile",
    params: {
      // 用户信息
      uid
    }
  });
}