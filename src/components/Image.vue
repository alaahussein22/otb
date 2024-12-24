<script setup lang="ts">
import defaultImg from "../assets/images/global/default_image.jpg";
import Avatar from "primevue/avatar";

const setDefaultImg = (event: any) => {
  event.target.src = defaultImg;
};
withDefaults(
  defineProps<{
    src?: string | any;
    alt?: string;
    width?: string;
    height?: string;
    label?: string;
  }>(),
  {
    alt: "default img",
  }
);
</script>

<template>
  <img
    v-if="!label"
    :src="src ?? defaultImg"
    :alt="alt"
    @error="setDefaultImg"
    class="rounded-full bg-white w-8 h-8 object-cover"
    v-bind="$attrs"
  />

  <Avatar
    v-if="label"
    size="normal"
    shape="circle"
    class="gap-2 bg-[#EBEFF5] text-[#4D4F52] text-sm p-1.5"
    :label="label?.slice(0, 2)"
  />
</template>

<style scoped></style>
