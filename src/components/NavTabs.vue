<script setup lang="ts">
import { useRouter } from "vue-router";
type Tab = {
  name: string;
  routeName?: string;
};
defineProps<{
  tabs: Tab[];
}>();
const modelValue = defineModel<string | null>();
const router = useRouter();

const changeTab = (tab: Tab) => {
  if (tab.routeName) {
    router.push({
      name: tab.routeName,
    });
  } else {
    modelValue.value = tab.name;
  }
};
</script>

<template>
  <div
    class="nav-tabs flex text-sm font-medium text-[#545454]  border-strk-s3 bg-secondary-200 rounded-full w-max mb-5"
  >
    <button
      v-for="tab in tabs"
      :key="tab.name"
      class="tab py-3 px-12 rounded-full transition-colors duration-200"
      @click="changeTab(tab)"
      :class="{
        'bg-[#980000] text-[#fff]':
          $route.name === tab.routeName || modelValue === tab.name,
      }"
    >
      {{ tab.name }}
    </button>
  </div>
</template>



<style>
</style>