<script setup lang="ts">
defineProps<{
  errors: string[];
}>();
</script>

<template>
  <span v-if="errors.length" class="text-failed-500 text-xs mt-1 block">
    {{ errors[0] }}
  </span>
</template>



<style>
</style>