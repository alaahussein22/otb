<template>
  <button
    :class="[
      buttonClass,
      {
        'px-[0.62rem] w-11 h-11': !$slots.default,
      },
    ]"
    v-bind="$attrs"
    :type="props.type"
    :disabled="props.disabled || props.loading"
  >
    <inline-svg
      :src="icon.url"
      v-if="props.icon && props.iconPosition === 'left'"
      :class="`w-4 h-4 ${icon.fill}`"
    />
    <slot></slot>
    <inline-svg
      :src="icon.url"
      v-if="props.icon && props.iconPosition === 'right'"
      :class="`w-4 h-4 ${icon.fill}`"
    />
    <span
      v-if="props.loading"
      :class="`w-4 h-4 border-2 border-${colors.text} border-t-transparent rounded-full animate-spin`"
    >
    </span>
  </button>
</template>
<script setup lang="ts">
import { useSvg } from "@/composables/useDynamicAssets";
import { computed } from "vue";
import inlineSvg from "vue-inline-svg";
const props = withDefaults(
  defineProps<{
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
    loading?: boolean;
    variant?: "primary" | "secondary" | "third";
    icon?: string;
    iconPosition?: "left" | "right";
  }>(),
  {
    type: "button",
    disabled: false,
    loading: false,
    variant: "primary",
    iconPosition: "left",
  },
);
// @ts-ignore
const possibleClasses = [
  "bg-primary-500",
  "bg-primary-50",
  "bg-secondary-100",
  "bg-secondary-800",
  "text-white",
  "text-primary-500",
  "text-grey-400",
  "fill-white",
  "fill-primary-500",
  "fill-grey-400",
  "border-primary-500",
  "border-primary-50",
  "border-secondary-100",
];

const variants = {
  secondary: {
    text: "primary-500",
    background: "primary-50",
  },
  third: {
    text: "grey-400",
    background: "secondary-800",
  },
  default: {
    text: "white",
    background: "primary-500",
  },
};

const colors = computed(() => {
  return variants[props.variant as keyof typeof variants] || variants.default;
});

const buttonClass = computed(() => {
  return [
    `flex-center gap-2 text-sm rounded-md py-3 px-4 font-medium h-max bg-${colors.value.background} text-${colors.value.text}`,
    {
      "transition-all hover:bg-primary-400 active:bg-primary-900":
        props.variant === "primary",
    },
  ];
});

const icon = computed(() => {
  return {
    url: useSvg(props.icon ?? ""),
    fill: `[&>path]:fill-${colors.value.text}`,
  };
});
</script>

<style></style>
