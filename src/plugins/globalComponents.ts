// custom
import Toast from "primevue/toast";
import AppButton from "@/components/AppButton.vue";
import AppInput from "@/components/Form/AppInput.vue";
export default {
  install: (app: any) => {
    app
      .component("Toast", Toast)
      .component("AppButton", AppButton)
      .component("AppInput", AppInput)
  
  
  },
};
