import type { AuthResponse, ApiResponse } from "@/api";
import { ApiOfetch } from "@/config/ofetch";
import { defineStore } from "pinia";
import { ref } from "vue";

export interface login {
  username: string;
  password: string;
}

export const useUserStore = defineStore("user", () => {
  // State
  const token = ref<string>();

  // Getters

  // Actions
  async function fetchLogin(body: login) {
    ApiOfetch<ApiResponse<AuthResponse>>("/login", { body, method: "POST" }).then((res) => {
      token.value = res.data.access_token;
      console.log(res.data)
      localStorage.setItem("token", res.data.access_token);
    });
  }
  function logout() {
    token.value = "";
    localStorage.removeItem("token");
  }
  return {
    token,
    fetchLogin,
    logout,
  };
});
