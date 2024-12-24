import { ToastSeverity } from "primevue/api";
import { app } from "@/main";
import { ToastMessageOptions } from "primevue/toast";

const lifeTime = 5000;

export function info(title = "I am title") {
  app.config.globalProperties.$toast.add({
    severity: ToastSeverity.INFO as ToastMessageOptions["severity"],
    summary: title,
    life: lifeTime,
  });
}
export function success(title = "Success") {
  app.config.globalProperties.$toast.add({
    severity: ToastSeverity.SUCCESS as ToastMessageOptions["severity"],
    summary: title,
    life: lifeTime,
  });
}

export function error(title = "error") {
  app.config.globalProperties.$toast.add({
    severity: ToastSeverity.ERROR as ToastMessageOptions["severity"],
    summary: title,
    life: lifeTime,
  });
}
