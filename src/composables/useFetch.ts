import type {
  UseFetchOptions,
  UseFetchReturn,
  BeforeFetchContext,
  AfterFetchContext,
  OnFetchErrorContext,
} from "@vueuse/core";
import { createFetch } from "@vueuse/core";
import { useCookies } from "@vueuse/integrations/useCookies";
import { error, success } from "@plugins/toast";
import type { IResponse } from "@/interfaces/IResponse";
import type { Ref } from "vue";
import { useRouter, Router } from "vue-router";
import { FormContext } from "vee-validate";
const cookies = useCookies();

type formType = Ref<HTMLFormElement | null> | Ref<FormContext<{}>> | any;

// Function to retrieve token from cookies
export function getToken() {
  return cookies.get("token") as string;
}
// Function to retrieve tenant from cookies
export function getTenant() {
  return cookies.get("tenant") as string;
}

// Function to add authorization header before fetch
function addAuthorizationHeader(ctx: BeforeFetchContext, token: string) {
  ctx.options.headers = {
    ...ctx.options.headers,
    Authorization: `Bearer ${token}`,
  };
  return ctx;
}

// Function to parse response data and handle success
function handleResponse(ctx: AfterFetchContext) {
  ctx.data = JSON.parse(ctx.data);
  const method = ctx.response.headers.get("x-request-method") ?? "";
  const allowedMethods = ["POST", "PATCH", "DELETE"];
  if (
    ctx.response.status === 201 ||
    (ctx.response.status === 200 && allowedMethods.includes(method))
  ) {
    success(ctx.data.message);
  }
  return ctx;
}

// Function to handle fetch errors
function handleFetchError(
  ctx: OnFetchErrorContext,
  form?: formType,
  router?: Router
) {
  const data = JSON.parse(ctx.data);
  if (data?.status == 422 && form?.value) {
    const formValues = form.value.values;
    if (Object.keys(formValues).some((key) => data.errors[key])) {
      form.value.setErrors(data.errors);
    } else {
      error(data.message);
    }
  } else if (data?.status == 401) {
    const cookies = useCookies();
    cookies.remove("token");
    cookies.remove("user");
    router?.push("/auth/sign-in");
  } else if (data?.status == 403) {
    router?.push("/403");
  } else if (data?.status == 500) {
    router?.push("/500");
  } else if (data?.status == 500 || data?.status == 404) {
    error("Something went wrong, please try again later");
  }
  // else if (data?.status == 422) {
  //   error(data.errors.message);
  // }
  else if (data?.status == 406) {
    error(data.errors.message);
  }
  return ctx;
}

export default function customFetch<T>(
  endpoint: string | (() => string),
  options: Partial<UseFetchOptions> = {},
  form?: formType
) {
  const router = useRouter();
  const token = getToken();
  const useMyFetch: <T>(
    endpoint: string | (() => string)
  ) => UseFetchReturn<IResponse<T>> = createFetch({
    baseUrl: () => {
      const tenant = getTenant();
      return `https://${tenant}.${import.meta.env.VITE_APP_BASE_URL}/api/`;
    },
    options: {
      beforeFetch: (ctx) => addAuthorizationHeader(ctx, token),
      afterFetch: handleResponse,
      onFetchError: (ctx) => handleFetchError(ctx, form, router),
      ...options,
    },
  });
  return useMyFetch<T>(endpoint);
}
