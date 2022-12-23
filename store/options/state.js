export default () => ({
  category: {
    headers: [
      { text: "#", value: "id", sortable: false },
      { text: "تصویر", value: "media", sortable: false },
      { text: "نامک", value: "slug", sortable: false },
      { text: "عنوان", value: "name", sortable: false },
      { text: "عملیات", value: "actions", sortable: false },
    ],
  },
  tag: {
    headers: [
      { text: "#", value: "id", sortable: false },
      { text: "نامک", value: "slug", sortable: false },
      { text: "عنوان", value: "name", sortable: false },
      { text: "عملیات", value: "actions", sortable: false },
    ],
  },
  snackbar: {
    snackbar: false,
    text: "",
    color: "",
  },
  voucher: {
    headers: [
      { text: "#", value: "id", sortable: false },
      { text: "کد", value: "code", sortable: false },
      { text: "مقدار تخفیف", value: "rebate", sortable: false },
      { text: "نوع تخفیف", value: "percentage", sortable: false },
      { text: "وضعیت", value: "status", sortable: false },
      { text: "نوع تخفیف", value: "type_text", sortable: false },
      { text: "تاریخ انقضا", value: "expired_at" },
      { text: "عملیات", value: "actions", sortable: false },
    ],
    accessTypes: [
      {
        text: "همه",
        value: 1,
      },
      {
        text: "چندتایی",
        value: 0,
      },
    ],
  },

  user: {
    headers: [
      { text: "#", value: "id" },
      { text: "مشخصات", value: "fullname", sortable: false },
      { text: "نقش کاربری", value: "role", sortable: false },
      { text: "تلفن همراه", value: "mobile", sortable: false },
      { text: "ایمیل", value: "email", sortable: false },
      {
        text: "تاریخ تایید موبایل",
        value: "mobile_verified_at",
        sortable: true,
      },
      { text: "تاربخ تایید ایمیل", value: "email_verified_at", sortable: true },
      { text: "تاریخ ثبت", value: "created_at", sortable: true },
    ],
  },

  plan: {
    headers: [
      { text: "عنوان", value: "title", sortable: false },
      { text: "قیمت", value: "amount", sortable: false },
      { text: "تخفیف", value: "rebate", sortable: false },
      { text: "قیمت نهایی", value: "amount_after_rebate", sortable: false },
      { text: "تاریخ فعالسازی", value: "activation_at", sortable: false },
      { text: "تعداد روز فعال", value: "activation_days", sortable: false },
      {
        text: "محدودیت دانلود روزانه",
        value: "daily_download_limit_count",
        sortable: false,
      },
      { text: "تاریخ انقضا", value: "expired_at", sortable: false },
      { text: "وضعیت", value: "hasBeenExpired", sortable: false },
    ],
  },
  file: {
    headers: [
      { text: "عنوان", value: "title", sortable: false },
      { text: "قیمت", value: "amount", sortable: false },
      { text: "تخفیف", value: "rebate", sortable: false },
      { text: "قیمت نهایی", value: "amount_after_rebate", sortable: false },
      { text: "تاریخ خرید", value: "bought_at", sortable: false },
    ],
  },
  order: {
    headers: [
      { text: "تعداد محصول", value: "total_items", sortable: false },
      { text: "قیمت کل", value: "total_amount", sortable: false },
      { text: "مقدار تخفیف", value: "rebate", sortable: false },
      {
        text: "قیمت نهایی",
        value: "total_amount_after_rebate_code",
        sortable: false,
      },
      { text: "وضعیت", value: "status", sortable: false },
      { text: "تاریخ ثبت", value: "created_at", sortable: false },
    ],
  },
  comment: {
    headers: [
      { text: "#", value: "id", sortable: false },

      { text: "نام کاربر", value: "user.data.fullname", sortable: false },
      { text: "متن پیام", value: "content", sortable: false },
      { text: "شناسه والد", value: "parent_id", sortable: false },
      {
        text: "شناسه محصول",
        value: "model.data.id",
        sortable: false,
      },
      { text: "نوع محصول", value: "model.data.title", sortable: false },
      { text: "وضعیت", value: "status", sortable: false },
      { text: "تاریخ ثبت", value: "created_at", sortable: false },
      { text: "", value: "actions", sortable: false },
    ],
  },
  basket: [],
  total_amount: 0,
});
