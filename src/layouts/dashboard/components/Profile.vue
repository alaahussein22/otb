<template>
  <Menu as="div" class="relative">
    <MenuButton class="flex items-center justify-between gap-2">
      <img
        class="inline-block h-10 w-10 rounded-full"
        src="@/assets/images/global/person.png"
        alt="image"
      />
      <span class="mx-2">Khaled Ahmed</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="8"
        height="5"
        viewBox="0 0 8 5"
        fill="none"
      >
        <path
          d="M7.60656 0.333496H1.01834C0.70658 0.333496 0.547757 0.726086 0.771285 0.959186L4.06539 4.39435C4.20069 4.53543 4.42421 4.53543 4.55957 4.39435L7.85367 0.959186C8.07714 0.726086 7.91832 0.333496 7.60656 0.333496Z"
          fill="#161A22"
        />
      </svg>
    </MenuButton>

    <transition
      enter-active-class="transition duration-100 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-75 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <MenuItems
        class="absolute right-0 mt-2 w-60 origin-top-right divide-y space-y-2 divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none px-1 py-2"
      >
        <AppButton
          class="block w-full text-sm font-normal !py-2 rounded-sm logout"
          icon="setting"
        >
          Settings</AppButton
        >
        <hr class="border-2 border-solid border-[#EAEAEA] w-full" />

        <AppButton
          class="block w-full text-sm font-normal !py-2 rounded-sm logout"
          icon="logout"
          @click="router.push({ name: 'signIn' })"
          >Log out</AppButton
        >
      </MenuItems>
    </transition>
  </Menu>
</template>

<script setup lang="ts">
import { Menu, MenuItems, MenuButton } from "@headlessui/vue";
import { useRouter } from "vue-router";

const router = useRouter();
</script>

<style scoped>
.logout {
  background-color: unset;
  color: #0d0d0e;
  justify-content: unset;
  border: none;
}
</style>
