<template>
  <header class="nav-bar flex items-center justify-between p-4 whitespace-nowrap">
    <div class="flex items-center">
      <img src="@/assets/小小波奇_透明.png" alt="头像" class="h-10 w-10" />
      <span class="ml-2 text-xl font-bold">olive的博客</span>
    </div>
    <nav class="relative" ref="navRef">
      <div
        class="absolute bottom-0 top-0 transition-all duration-300 ease-out border rounded-2xl w-10"
        :style="indicatorStyle"
      ></div>
      <ul class="flex items-center justify-center gap-4">
        <li class="relative" v-for="navitem in NavLinks" :key="navitem.name">
          <component
            id="dropdown"
            :ref="(el: unknown) => setItemRef(el, navitem.name)"
            class="flex items-center p-2 gap-2"
            :is="components(navitem.isFolder, navitem.isUrl)"
            v-bind="linkProps(navitem)"
            @mouseenter="openDropdown(navitem.name)"
            @click.stop="toggleDropdown(navitem.name)"
          >
            <DynamicIcon :icon-name="navitem.icon" size="24" color="#333" />
            <span>{{ navitem.name }}</span>
            <DynamicIcon v-if="navitem.isUrl" icon-name="ExternalLink" size="16" color="#333" />
            <DynamicIcon
              v-if="navitem.isFolder"
              class="transition-transform"
              :class="{ 'rotate-180': navitem.name === activeDropdown }"
              icon-name="ChevronDown"
              size="16"
              color="#333"
            />
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
import { computed, ref, useTemplateRef } from "vue";
import { vOnClickOutside } from "@vueuse/components";
import { useDebounceFn} from "@vueuse/core";
import { useRoute} from "vue-router";

const components = (isFolder: boolean, isUrl: boolean) => {
  return isFolder ? "button" : isUrl ? "a" : "RouterLink";
};

// 下拉菜单逻辑
const activeDropdown = ref<string | null>(null);
const debouncedCloseDropdown = useDebounceFn(() => {
  activeDropdown.value = null;
}, 3000);
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

// 移动提示框逻辑
const route = useRoute();
const itemRefs = ref(new Map<string, HTMLElement>());
const navRef = useTemplateRef('navRef')
// 获取html元素
function setItemRef(el: unknown, name: string) {
  if (el === null) {
    itemRefs.value.delete(name);
    return;
  }
  const maybeComponent = el as any;
  const actualEl: unknown = maybeComponent.$el ?? el;
  if (actualEl instanceof HTMLElement) {
    itemRefs.value.set(name, actualEl);
  }
}
const currentNav = computed(() => {
  return NavLinks.find(item => item.path === route.path || item.children?.some(childrenItem => childrenItem.path === route.path))
})
const activeItemRect = computed(() => {
  if (!navRef.value) return null;
  const targetName = activeDropdown.value ?? currentNav.value?.name;
  if (!targetName) return null;
  const el = itemRefs.value.get(targetName)
  if (!el) return null;
  const rect = el.getBoundingClientRect()
  const parentrect = navRef.value.getBoundingClientRect()
  return {
    width: rect.width,
    left: rect.left - parentrect.left,
  };
});
const indicatorStyle = computed(() => {
  if (!activeItemRect.value) {
    return { width: '0px', left: '0px', opacity: '0' };
  }
  return {
    left: activeItemRect.value.left + 'px',
    width: activeItemRect.value.width + 'px'
  };
});
</script>

<style scoped></style>
