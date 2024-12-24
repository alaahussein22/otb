import { Form, Field, ErrorMessage } from "vee-validate";
import { defineRule } from "vee-validate";
import AllRules from "@vee-validate/rules/dist/vee-validate-rules";
Object.keys(AllRules).forEach((rule: any) => {
  // @ts-ignore
  defineRule(rule, AllRules[rule]);
});
defineRule("required", (value: any) => {
  if (value) {
    return true;
  }
  return "This field is required";
});

defineRule("numeric", (value: any) => {
  if (Number(value) || value === "" || value === "0") {
    return true;
  } else {
    return `This Field must be a number`;
  }
});

defineRule("nonNegative", (value: number) => {
  const num = Number(value);
  if (!value) {
    return "This field is required";
  } else if (typeof num !== "number" || isNaN(num) || num < 0) {
    return "Enter a valid Amount"; // Error message for invalid input
  }
  return true; // Valid input
});

defineRule("zero", (value: any) => {
  if (value === 0 || value > 0) {
    return true;
  } else if (!value) {
    return "This field is required";
  } else {
    return "Enter a valid Amount";
  }
});

defineRule("min", (value: any, [limit]: any) => {
  // The field is empty so it should pass

  if (parseInt(value.length) < parseInt(limit)) {
    return `This field must be at least ${limit}`;
  }
  return true;
});

defineRule("max", (value: any, [limit]: any) => {
  // The field is empty so it should pass
  if (!value) {
    return true;
  }
  if (parseInt(value.length) > parseInt(limit)) {
    return `This field must be maximum ${limit}`;
  }
  return true;
});

defineRule("in", (value: any, limit: any) => {
  if (limit.length > 1) {
    if (!value) {
      return true;
    }
    if (
      Number(value) != Number(limit[0]) ||
      Number(value) != Number(limit[1])
    ) {
      return `This field must be between ${limit[0]} and ${limit[1]}`;
    }
  }
  return true;
});
defineRule("confirmed", (value, [target]: any, ctx) => {
  if (value === ctx.form[target]) {
    return true;
  }
  return "This field confirmation does not match. Please try again.";
});
defineRule("boolean", (value: any) => {
  if (value === true || value === false) {
    return true;
  }
  return "This field must be boolean";
});
defineRule("isArabic", (value: any) => {
  if (/^[\u0600-\u06FF\s]+$/.test(value)) {
    return true;
  }
  return "This field must be Arabic";
});

defineRule("isEnglish", (value: any) => {
  if (/^[a-zA-Z\s]+$/.test(value)) {
    return true;
  }
  return "This field must be English";
});

export default {
  install: (app: any) => {
    app
      .component("ValidationForm", Form)
      .component("Field", Field)
      .component("ErrorMessage", ErrorMessage);
  },
};
