import { ofetch } from "ofetch";

export const ApiOfetch = ofetch.create({
  baseURL: "/api/v1",
  headers: { Authorization: "Bearer xxx" },
  onRequest({ request, options }) {
    console.log("请求:", request,'opt', options);
  },
});
