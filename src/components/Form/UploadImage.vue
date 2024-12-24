<script setup lang="ts">
import { ref } from "vue";
import defaultImage from "@assets/icons/default-image.svg";
import { error } from "@/plugins/toast";
import useFetch from "@/composables/useFetch";
import { useField } from "vee-validate";
import Message from "primevue/message";
import { watch } from "vue";
import { onMounted } from "vue";
const props = withDefaults(
  defineProps<{
    directory: string;
    name: string;
    required?: boolean;
  }>(),
  {
    name: "logo",
    required: false,
  }
);
const modelValue = defineModel<string | null | any>();
const previewedImage = ref<string | null>(null);
const fileInput = ref<HTMLInputElement | null>(null);
const allowedTypes = ["image/png", "image/jpg", "image/jpeg"];

const { value: field, errorMessage } = useField<string>(props.name, {
  required: props.required,
});

const uploadImage = (e: Event) => {
  const file = (e?.target as HTMLInputElement)?.files?.[0];
  if (file && !allowedTypes.some((type) => type === file.type)) {
    error("Only png, jpg, jpeg files are allowed");
    return;
  }
  if (file) {
    const reader = new FileReader();
    reader.onload = async (e) => {
      const formData = new FormData();
      formData.append("directory", props.directory);
      formData.append("image_name", file.name);
      formData.append("file", file);
      field.value = e.target?.result as string;
      const { data: uploadedImage } = await useFetch<{
        relative_path: string | null;
        full_path: string | null;
      }>("files/upload").post(formData);

      field.value = uploadedImage.value?.data?.relative_path ?? "";
      modelValue.value = uploadedImage.value?.data?.full_path;
      previewedImage.value = uploadedImage.value?.data?.full_path ?? "";
    };
    reader.readAsDataURL(file);
  }
};

watch(
  () => field.value,
  (value) => {
    previewedImage.value = value;
    if (value && value.includes("http")) {
      // field.value = value.split("files")[1];
    }
  },
  {
    once: true,
  }
);

onMounted(() => {
  previewedImage.value = field.value;
});
</script>
<template>
  <Message v-if="errorMessage" class="mt-0" severity="error" icon="null">
    {{ errorMessage }}
  </Message>
  <div class="upload-image flex items-center gap-4">
    <input
      class="appearance-none sr-only"
      id="file"
      name="file"
      type="file"
      ref="fileInput"
      @change="(e: Event) => uploadImage(e)"
    />
    <label
      for="file"
      class="cursor-pointer border border-strk-s2 block max-w-max rounded-full w-24 h-24 p-6"
    >
      <img
        :src="previewedImage ?? defaultImage"
        alt="preview"
        class="w-full h-full object-cover rounded-full aspect-square"
      />
    </label>
    <div class="upload">
      <AppButton
        icon="upload"
        variant="third"
        @click="() => fileInput?.click()"
        class="mb-1"
      >
        Upload Photo
      </AppButton>
      <span class="text-grey-200 text-sm font-light">
        Allowed file types: png, jpg, jpeg.
      </span>
    </div>
  </div>
</template>

<style></style>
