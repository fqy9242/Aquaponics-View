import { defineStore } from "pinia";
import { ref } from "vue";

export const useComponentStore = defineStore("component", () => {
  const currentTab = ref("");
  return {
    currentTab,
  };
});
