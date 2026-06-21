import { ofetch } from "ofetch";

export const ApiOfetch = ofetch.create({
  baseURL: "/api/v1",
  headers: { Authorization: "Bearer xxx" },
  onRequest({ request, options }) {
    console.log("请求:", request,'opt', options.query);
  },
  onResponse({response, options}){
    console.log("响应:", response._data,'opt', options.query);
  }
});
