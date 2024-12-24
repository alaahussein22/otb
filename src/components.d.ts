// declare module '@vue/runtime-core' works for vue 3
// declare module 'vue' works for vue2 + vue 3
declare module "@vue/runtime-core" {
  export interface GlobalComponents {
    AppButton: typeof import("./components/AppButton.vue")["default"];
    AppInput: typeof import("./components/Form/AppInput.vue")["default"];
    ValidationForm: typeof import("vee-validate")["Form"];
    Field: typeof import("vee-validate")["Field"];
  }
}
export { };
