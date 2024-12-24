<template>
  <div class="overflow-hidden main-layout">
    <Suspense>
      <div
        class="grid grid-rows-[auto,1fr] transition-all duration-500 ease-in-out"
      >
        <main class="">
          <router-view />
        </main>
      </div>
    </Suspense>
  </div>
</template>

<script setup lang="ts"></script>
