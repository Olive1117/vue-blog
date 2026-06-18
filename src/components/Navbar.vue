<template>
  <header class="nav-bar flex items-center justify-between p-4 whitespace-nowrap">
    <div class="flex items-center">
      <img src="@/assets/小小波奇_透明.png" alt="头像" class="h-10 w-10" />
      <span class="ml-2 text-xl font-bold">olive的博客</span>
    </div>
    <nav class="">
      <ul class="flex items-center justify-center gap-4">
        <li class="relative" v-for="navitem in NavLinks" :key="navitem.name">
          <component
            id="dropdown"
            class="flex items-center border rounded-2xl p-2 gap-2"
            :is="components(navitem.isFolder, navitem.isUrl)"
            v-bind="linkProps(navitem)"
            @mouseenter="navitem.isFolder && openDropdown(navitem.name)"
            @click.stop="navitem.isFolder && toggleDropdown(navitem.name)"
          >
            <DynamicIcon :icon-name="navitem.icon" size="24" color="#333"/>
            <span>{{ navitem.name }}</span>
            <DynamicIcon v-if="navitem.isUrl" icon-name="ExternalLink" size="16" color="#333" />
            <DynamicIcon v-if="navitem.isFolder" class="transition-transform" :class="{'rotate-180': navitem.name === activeDropdown}" icon-name="ChevronDown" size="16" color="#333" />
          </component>
          <!-- 下拉菜单 -->
          <ul
            v-on-click-outside="[
              () => {
                activeDropdown = null;
              },
              { ignore: ['#dropdown'] },
            ]"
            v-if="navitem.isFolder"
            v-show="activeDropdown === navitem.name"
            class="absolute left-0 top-full mt-2 p-2 bg-white/70 shadow-lg rounded-2xl"
          >
            <li v-for="child in navitem.children" :key="child.name">
              <component
                class="flex items-center p-2 border-transparent border rounded rounded-2xl hover:border-black"
                :is="components(child.isFolder, child.isUrl)"
                v-bind="linkProps(child)"
              >
                <DynamicIcon :icon-name="child.icon" size="24" color="#333" class="mr-2" />
                <span>{{ child.name }}</span>
                <DynamicIcon class="ml-2" v-if="child.isUrl" icon-name="ExternalLink" size="16" color="#333" />
              </component>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
    <div class="flex items-center">
      <DynamicIcon icon-name="Search" size="24" color="#333" class="mr-4" />
    </div>
  </header>
</template>

<script setup lang="ts">
import { NavLinks, type NavLink } from "@/config/config";
import DynamicIcon from "@/components/DynamicIcon.vue";
import { ref } from "vue";
import { vOnClickOutside } from "@vueuse/components";
import { useDebounceFn } from "@vueuse/core";

const components = (isFolder: boolean, isUrl: boolean) => {
  return isFolder ? "button" : isUrl ? "a" : "RouterLink";
};

const activeDropdown = ref<string | null>(null);
const debouncedCloseDropdown = useDebounceFn(() => {
  activeDropdown.value = null;
}, 5000);
const toggleDropdown = (name: string) => {
  activeDropdown.value = activeDropdown.value === name ? null : name;
  debouncedCloseDropdown();
};
const openDropdown = (name: string) => {
  activeDropdown.value = name;
  debouncedCloseDropdown();
};
const linkProps = (navitem: NavLink) => {
  return navitem.isFolder ? {} : navitem.isUrl ? { href: navitem.url, target: "_blank" } : { to: navitem.path };
};
</script>

<style scoped></style>
