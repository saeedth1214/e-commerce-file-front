import Vue from "vue";
import {
  ValidationObserver,
  ValidationProvider,
  extend,
  localize,
} from "vee-validate";
import * as rules from "vee-validate/dist/rules";

Object.keys(rules).forEach((rule) => {
  extend(rule, rules[rule]);
});

extend("percentageRule", (value) => {
  if (
    Number.isInteger(parseInt(value)) &&
    parseInt(value) >= 0 &&
    parseInt(value) <= 100
  ) {
    return true;
  }
  return "لطفا یک مقدار درصدی بین 0 تا 100 وارد کنید";
});

extend("username", (value) => {
  const mobile = /^(\+98||0)?[9][0|1|2|3|4|9][0-9]{8}$/;
  const email =
    /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/;

  if (mobile.test(value) || email.test(value)) {
    return true;
  }
  return "لطفا یک شماره موبایل یا یک ایمیل معتبر وارد کنید";
});
extend("mobile", (value) => {
  const pattern = /^(\+98||0)?[9][0|1|2|3|4|9][0-9]{8}$/;

  if (pattern.test(value)) {
    return true;
  }
  return "لطفا یک شماره موبایل معتبر وارد کنید";
});
extend("numberRule", (value) => {
  if (
    Number.isInteger(parseInt(value)) &&
    parseInt(value) >= 0 &&
    parseInt(value) <= 4294967295
  ) {
    return true;
  }
  return "لطفا یک مقدار عددی بین 0 تا 4294967295 وارد کنید";
});
extend("smalRule", (value) => {
  if (
    Number.isInteger(parseInt(value)) &&
    parseInt(value) >= 0 &&
    parseInt(value) <= 65535
  ) {
    return true;
  }
  return "لطفا یک مقدار عددی بین 0 تا 65535 وارد کنید";
});
extend("maxRebate", (value, from) => {
  if (from[0] && value <= parseInt(from[0])) {
    return true;
  }
  return "مقدار تخفیف از مبلغ نهایی بیشتراست";
});

extend("maxTimes", (value, from) => {
  if (from[0] && value <= parseInt(from[0])) {
    return true;
  }
  return "تعداد دفعات استفاده شده بیشتر از حد مجاز است";
});
extend("confirm", (value, password) => {
  if (value === password[0]) {
    return true;
  }
  return "رمزعبور و تکرار رمز عبور یکسان نیست";
});

localize({
  en: {
    fields: {
      "category-name": {
        required: " عنوان دسته بندی الزامی است",
        max: (_, { length }) => `مقدار ورودی بیشتر از ${length}  کاراکتر است`,
        min: (_, { length }) => `مقدار ورودی کمتر از ${length}  کاراکتر است`,
      },
      "category-slug": {
        required: " نامک دسته بندی الزامی است",
        max: (_, { length }) => `مقدار ورودی بیشتر از ${length}  کاراکتر است`,
        min: (_, { length }) => `مقدار ورودی کمتر از ${length}  کاراکتر است`,
      },
      "voucher-code": {
        required: " وارد کردن این فیلد الزامی است",
        max: (_, { length }) => `مقدار ورودی بیشتر از ${length}  کاراکتر است`,
        min: (_, { length }) => `مقدار ورودی کمتر از ${length}  کاراکتر است`,
      },

      "voucher-rebate": {
        required: " وارد کردن این فیلد الزامی است",
        max: (_, { length }) => `مقدار ورودی بیشتر از ${length}  کاراکتر است`,
        min: (_, { length }) => `مقدار ورودی کمتر از ${length}  کاراکتر است`,
      },
      "voucher-modelType": {
        required: " وارد کردن این فیلد الزامی است",
      },
      "voucher-userType": {
        required: " وارد کردن این فیلد الزامی است",
      },
      "plan-title": {
        required: "مقدار این فیلد الزامیست",
        max: (_, { length }) => `مقدار ورودی بیشتر از ${length}  کاراکتر است`,
        min: (_, { length }) => `مقدار ورودی کمتر از ${length}  کاراکتر است`,
      },
      "plan-description": {
        required: "مقدار این فیلد الزامیست",
        max: (_, { length }) => `مقدار ورودی بیشتر از ${length}  کاراکتر است`,
        min: (_, { length }) => `مقدار ورودی کمتر از ${length}  کاراکتر است`,
      },
      "plan-rebate": {
        required: "مقدار این فیلد الزامیست",
      },
      "plan-amount": {
        required: "مقدار این فیلد الزامیست",
      },

      "file-rebate": {
        required: "مقدار این فیلد الزامیست",
      },
      "file-amount": {
        required: "مقدار این فیلد الزامیست",
      },
      "file-title": {
        required: "مقدار این فیلد الزامیست",
        max: (_, { length }) => `مقدار ورودی بیشتر از ${length}  کاراکتر است`,
        min: (_, { length }) => `مقدار ورودی کمتر از ${length}  کاراکتر است`,
      },
      "file-link": {
        max: (_, { length }) => `مقدار ورودی بیشتر از ${length}  کاراکتر است`,
        min: (_, { length }) => `مقدار ورودی کمتر از ${length}  کاراکتر است`,
      },
      "file-description": {
        required: "مقدار این فیلد الزامیست",
        max: (_, { length }) => `مقدار ورودی بیشتر از ${length}  کاراکتر است`,
        min: (_, { length }) => `مقدار ورودی کمتر از ${length}  کاراکتر است`,
      },
      plan_activation_days: {
        required: "مقدار این فیلد الزامیست",
      },
      plan_daily_download_limit_count: {
        required: "مقدار این فیلد الزامیست",
      },

      firstName: {
        required: "مقدار این فیلد الزامیست",
        max: (_, { length }) => `مقدار ورودی بیشتر از ${length}  کاراکتر است`,
        min: (_, { length }) => `مقدار ورودی کمتر از ${length}  کاراکتر است`,
      },
      lastName: {
        required: "مقدار این فیلد الزامیست",
        max: (_, { length }) => `مقدار ورودی بیشتر از ${length}  کاراکتر است`,
        min: (_, { length }) => `مقدار ورودی کمتر از ${length}  کاراکتر است`,
      },
      mobile: {
        required: "مقدار این فیلد الزامیست",
      },
      email: {
        required: "مقدار این فیلد الزامیست",
        email: "لطفایک ایمیل معتبر وارد کنید",
      },
      category: {
        required: "مقدار این فیلد الزامیست",
      },
      password: {
        required: "مقدار این فیلد الزامیست",
        max: (_, { length }) => `مقدار ورودی بیشتر از ${length}  کاراکتر است`,
        min: (_, { length }) => `مقدار ورودی کمتر از ${length}  کاراکتر است`,
      },
      newPassword: {
        required: "مقدار این فیلد الزامیست",
        max: (_, { length }) => `مقدار ورودی بیشتر از ${length}  کاراکتر است`,
        min: (_, { length }) => `مقدار ورودی کمتر از ${length}  کاراکتر است`,
      },
      newPassword_confirmation: {
        required: "مقدار این فیلد الزامیست",
        max: (_, { length }) => `مقدار ورودی بیشتر از ${length}  کاراکتر است`,
        min: (_, { length }) => `مقدار ورودی کمتر از ${length}  کاراکتر است`,
      },
      password_confirmation: {
        required: "مقدار این فیلد الزامیست",
        max: (_, { length }) => `مقدار ورودی بیشتر از ${length}  کاراکتر است`,
        min: (_, { length }) => `مقدار ورودی کمتر از ${length}  کاراکتر است`,
      },
      // authenticate
      register_firstName: {
        max: (_, { length }) => `مقدار ورودی بیشتر از ${length}  کاراکتر است`,
        min: (_, { length }) => `مقدار ورودی کمتر از ${length}  کاراکتر است`,
      },
      register_lastName: {
        max: (_, { length }) => `مقدار ورودی بیشتر از ${length}  کاراکتر است`,
        min: (_, { length }) => `مقدار ورودی کمتر از ${length}  کاراکتر است`,
      },
      profile_firstName: {
        required: "واردکردن نام الزامیست",
        max: (_, { length }) => `مقدار ورودی بیشتر از ${length}  کاراکتر است`,
        min: (_, { length }) => `مقدار ورودی کمتر از ${length}  کاراکتر است`,
      },
      profile_lastName: {
        required: "واردکردن نام الزامیست",
        max: (_, { length }) => `مقدار ورودی بیشتر از ${length}  کاراکتر است`,
        min: (_, { length }) => `مقدار ورودی کمتر از ${length}  کاراکتر است`,
      },
      register_email: {
        required: "مقدار این فیلد الزامیست",
        email: "لطفا یک ایمیل معتبر وارد کنید",
      },
      "login-username": {
        required: "مقدار این فیلد الزامیست",
      },
      "login-password": {
        required: "مقدار این فیلد الزامیست",
        max: (_, { length }) => `مقدار ورودی بیشتر از ${length}  کاراکتر است`,
        min: (_, { length }) => `مقدار ورودی کمتر از ${length}  کاراکتر است`,
      },
      "forget-email": {
        required: "مقدار این فیلد الزامیست",
        email: "لطفا یک ایمیل معتبر وارد کنید",
      },
      times_use: {
        required: "مقدار این فیلد الزامیست",
      },
    },
  },
});
Vue.component("ValidationObserver", ValidationObserver);
Vue.component("ValidationProvider", ValidationProvider);
