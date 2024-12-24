<script setup lang="ts">
defineProps<{
  labelFor?: string;
}>();
</script>

<template>
  <label :for="labelFor" class="text-[#AAAAAA] text-[0.9rem] block mb-4">
    <slot></slot>
  </label>
</template>

<style></style>
