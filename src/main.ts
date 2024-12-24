import { createApp } from "vue";
import App from "@/App.vue";
import router from "@/router/index";
import { createPinia } from "pinia";
import { globalComponents, validator } from "./plugins";
import "@/assets/styles/main.scss";
import "@/assets/styles/theme/mytheme/theme.scss"; // theme
import PrimeVue from "primevue/config";
import ConfirmationService from "primevue/confirmationservice";
import ToastService from "primevue/toastservice";
import Vue3Lottie from "vue3-lottie";
import Tooltip from 'primevue/tooltip';
import mitt from "mitt"; // Import mitt
const emitter = mitt(); // Initialize mitt


const pinia = createPinia();

export const app = createApp(App);
app.provide("emitter", emitter);

app
  .use(pinia)
  .use(router)
  .use(globalComponents)
  .use(validator)
  .use(PrimeVue)
  .use(ConfirmationService)
  .use(ToastService)
  .use(Vue3Lottie, { name: "LottieAnimation" })
  .directive("tooltip", Tooltip)
  .mount("#app");
