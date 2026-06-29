import { ofetch } from "ofetch";

export const ApiOfetch = ofetch.create({
  baseURL: "/api/v1",
  onRequest({ request, options }) {
    const token = localStorage.getItem('token')
    if (token) {
      options.headers.append("Authorization", `Bearer ${token}`)
    }
    console.log("请求:", request,'opt', options);
  },
  onResponse({response, options}){
    console.log("响应:", response._data,'opt', options.query);
  }
});
