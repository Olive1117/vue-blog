import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useLayoutStore = defineStore("layout", () => {
  // State
  const isEditorFullscreen = ref(false);
  // Getters
  const showNavbar = computed(() => !isEditorFullscreen.value);
  const showFooter = computed(() => !isEditorFullscreen.value);
  const isImmersive = computed(() => isEditorFullscreen.value);
  // Actions
  function enterImmersive() {
    isEditorFullscreen.value = true;
  }
  function exitImmersive() {
    isEditorFullscreen.value = false;
  }
  function toggleImmersive(status?: boolean) {
    isEditorFullscreen.value = status ?? !isEditorFullscreen.value;
  }

  return {
    isEditorFullscreen,
    showNavbar,
    showFooter,
    isImmersive,
    enterImmersive,
    exitImmersive,
    toggleImmersive
  };
});
