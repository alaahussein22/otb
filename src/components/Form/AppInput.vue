<script setup lang="ts">
import InputText from "primevue/inputtext";
import IconField from "primevue/iconfield";
import InputIcon from "primevue/inputicon";
import AppLabel from "./AppLabel.vue";
import { useSvg } from "@/composables/useDynamicAssets";
import inlineSvg from "vue-inline-svg";
import ErrorMessage from "./ErrorMessage.vue";
import { InputTypeHTMLAttribute, watch } from "vue";
import { Nullable } from "primevue/ts-helpers";
import { computed } from "vue";
import InputNumber from "primevue/inputnumber";

const modelValue = defineModel<Nullable<any>>();
const props = withDefaults(
  defineProps<{
    label?: string;
    type?: InputTypeHTMLAttribute;
    placeholder?: string;
    disabled?: boolean;
    id?: string;
    name: string;
    validation?: string;
    optional?: boolean;
    icon?: string;
    iconPosition?: "left" | "right";
    block?: boolean;
  }>(),
  {
    iconPosition: "left",
    type: "text",
  }
);
const iconUrl = computed(() => {
  return useSvg(props.icon ?? "");
});

watch(modelValue, (newValue) => {
  if (props.type === "number" && newValue !== null && newValue !== undefined) {
    const numValue = parseFloat(newValue);
    if (numValue < 0) {
      modelValue.value = "";
    }
  }
});
</script>

<template>
  <div class="input-wrapper">
    <AppLabel :labelFor="id" v-if="label"
      >{{ label }}
      <span v-if="optional">(optional)</span>
    </AppLabel>

    <Field
      v-model="modelValue"
      :type="type"
      :rules="validation"
      :name="name"
      v-slot="{ errors }"
    >
      <IconField v-if="type !== 'number'" :iconPosition="iconPosition">
        <InputIcon v-if="iconUrl">
          <inline-svg :src="iconUrl" class="[&>path]:fill-grey-200" />
        </InputIcon>
        <InputText
          v-model="modelValue"
          :id="id"
          :name="name"
          :placeholder="placeholder"
          :disabled="disabled"
          :invalid="errors.length > 0"
          v-bind="$attrs"
          :type="type"
          :class="{ 'w-full': block }"
        />
      </IconField>
      <IconField v-if="type === 'number'" :iconPosition="iconPosition">
        <InputNumber
          v-model="modelValue"
          :id="id"
          :name="name"
          :placeholder="placeholder"
          :disabled="disabled"
          :invalid="errors.length > 0"
          v-bind="$attrs"
          :class="{ 'w-full': block }"
        />

        <InputIcon v-if="iconUrl">
          <inline-svg :src="iconUrl" class="[&>path]:fill-grey-200" />
        </InputIcon>
      </IconField>
      <ErrorMessage :errors="errors" />
    </Field>
  </div>
</template>

<style></style>
