import colors from "vuetify/es5/util/colors";
import webpack from "webpack";

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    // coockie universal
    ssr: true,
    target: "server",

    //
    titleTemplate: "%s - file",
    title: "FreeECommerce",
    // htmlAttrs: {
    //   lang: 'en'
    // },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "Ecommerce" },
      { name: "format-detection", content: "telephone=no" },
    ],
  },
  server: {
    port: 8000, // default: 3000
  },
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    "~/assets/css/main.css",
    "~/assets/css/content-styles.css",
    "nuxt-dropzone/dropzone.css",
    "vue-select/dist/vue-select.css",
    "quill/dist/quill.snow.css",
    "quill/dist/quill.bubble.css",
    "quill/dist/quill.core.css",
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    "~/plugins/card.js",
    "~/plugins/chart.js",
    "~/plugins/axios.js",
    "~/plugins/validate.js",
    "~/plugins/vue-select.js",
    "~/plugins/basket.js",
    { src: "~/plugins/quilEditor.js", ssr: false },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components

  components: [
    "~/components",

    //panel
    { path: "~/components/panel/Header", extensions: ["vue"] },
    { path: "~/components/panel/SidebarAside", extensions: ["vue"] },
    { path: "~/components/panel/Content/category", extensions: ["vue"] },
    { path: "~/components/panel/Content/file", extensions: ["vue"] },
    { path: "~/components/panel/Content/plan", extensions: ["vue"] },
    { path: "~/components/panel/Content/tag", extensions: ["vue"] },
    { path: "~/components/panel/Content/user", extensions: ["vue"] },
    { path: "~/components/panel/Content/voucher", extensions: ["vue"] },
    { path: "~/components/panel/Content/comment", extensions: ["vue"] },

    // front
    { path: "~/components/front", extensions: ["vue"] },
    { path: "~/components/front/categories", extensions: ["vue"] },
    { path: "~/components/front/plans", extensions: ["vue"] },
    { path: "~/components/front/files", extensions: ["vue"] },
    { path: "~/components/front/files/singleFile", extensions: ["vue"] },
    { path: "~/components/front/landing-page", extensions: ["vue"] },
    { path: "~/components/front/profile", extensions: ["vue"] },

    // public
    { path: "~/components/notify", extensions: ["vue"] },
    { path: "~/components/pagination", extensions: ["vue"] },
    { path: "~/components/scroll", extensions: ["vue"] },
    { path: "~/components/overlay", extensions: ["vue"] },
    { path: "~/components/timer", extensions: ["vue"] },
    { path: "~/components/filter", extensions: ["vue"] },
    { path: "~/components/quillEditor", extensions: ["vue"] },
  ],

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: ["@nuxtjs/vuetify"],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    "vue-sweetalert2/nuxt",
    "@nuxtjs/axios",
    "@nuxt/content",
    "@nuxtjs/i18n",
    "@alireza-ab/vue-persian-datepicker/nuxt",
    "@nuxtjs/device",
    "@nuxtjs/auth-next",
    "cookie-universal-nuxt",
    "nuxt-moment-jalaali",
    "@nuxtjs/proxy",
  ],
  moment: {
    defaultLocale: "fa",
    timezone: {
      matchZones: ["Iran"],
      startYear: 2000,
      endYear: 2030,
    },
  },
  i18n: {
    locales: ["en", "fa"],
    defaultLocale: "fa",
    vueI18n: {
      fallbackLocale: "en",
      messages: {
        en: {
          dashboard: "Dashboard",
        },
        fa: {
          dashboard: "داشبورد",
          category: "دسته بندی",
          plan: "طرح ها",
          file: "فایل ها",
          tag: "تگ",
          users: "کاربران",
          transaction: "تراکنش ها",
          voucher: "کد تخفیف",
          fileTitle: "انتخاب فایل",
          voucherTitle: "انتخاب کد تخفیف",
          tagTitle: "انتخاب تگ",
          transactions: {
            title: "تراکنش ها ",
            successed: "تراکنش های موفق",
            failed: "تراکنش های ناموفق",
          },
          category: {
            title: "دسته بندی",
            link: "دسته بندی",
          },
          user: {
            link: "کاربران",
            fullName: "نام کامل",
            role: "نقش کاربری",
            mobile: "تلفن همراه",
            email: "ایمیل",
          },
          file: {
            title: "فایل ها",
            link: "فایل ها",
            message: "فایل",
          },
          plan: {
            title: "طرح ها",
            link: "طرح ها",
            message: "طرح",
          },
          tag: {
            title: "تگ ها",
            link: "تگ ها",
          },
          voucher: {
            title: "کد تخفیف",
            link: "تخفیف ها",
          },
          orders: {
            title: "سفارش ها",
            link: "سفارش ها",
          },
          comment: {
            title: "نظرات کاربران",
            link: "نظرات",
          },
          auth: {
            firstName: "نام",
            lastName: "نام خانوادگی",
            email: "ایمیل",
            mobile: "شماره تلفن",
            password: "رمزعبور",
            confirmation: "تکرار رمز عبور",
            username: "نام کاربری",
          },
          profile: {
            firstName: "نام",
            lastName: "نام خانوادگی",
            email: "ایمیل",
            mobile: "تلفن همراه",
          },
        },
      },
    },
  },
  auth: {
    plugins: [{ src: "~/plugins/axios" }],
    localStorage: false,
    strategies: {
      local: {
        token: {
          property: "token",
          global: true,
          required: true,
          type: "Bearer",
          maxAge: 604800,
        },
        user: {
          property: "data",
        },
        endpoints: {
          login: { url: "/auth/login", method: "post" },
          logout: { url: "/auth/logout", method: "post" },
          user: { url: "/auth/user", method: "get" },
        },
      },
    },
    cookie: {
      options: {
        path: "/",
        expires: 7,
      },
    },
  },
  axios: {
    proxy:true,
    baseURL:"https://api-ecommerce-file.iran.liara.run/api/",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  },
  proxy: {
  '/frontend/': {
      target: 'https://api-ecommerce-file.iran.liara.run/api/frontend/',
    },
     '/panel/': {
      target: 'https://api-ecommerce-file.iran.liara.run/api/panel/',
    },
    '/auth/*': {
      target: 'https://api-ecommerce-file.iran.liara.run/api/auth/',
    },
    '/user/': {
      target: 'https://api-ecommerce-file.iran.liara.run/api/user/',
    },
    
},
  sweetalert: {
    confirmButtonColor: "#41b882",
    cancelButtonColor: "#ff7674",
  },
  transition: {
    name: "fade",
    mode: "out-in",
  },
  env: {
    dropzoneUrl: "https://api-ecommerce-file.iran.liara.run/api/panel/",
    dropzoneUrlFront: "https://api-ecommerce-file.iran.liara.run/api/frontend/",

    count: 5,
    CART_MAX_AGE: 60 * 60 * 24 * 7,
  },
  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    rtl: true,
    customVariables: ["~/assets/variables.scss"],
    treeShake: true,
    defaultAssets: {
      font: {
        family: "vazir",
        size: 15,
      },
    },
    theme: {
      // ligth: true,
      breakpoint: {
        mobileBreakpoint: "sm", // This is equivalent to a value of 960
      },
      themes: {
        ligth: {
          primary: colors.deepPurple.darken1,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
        dark: {
          primary: colors.deepPurple.darken1,
          bg: "#0a0514",
          surface: "#130a24",
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: ["vee-validate/dist/rules"],
    plugins: [
      new webpack.ProvidePlugin({
        _: "lodash",
      }),
    ],
  },
};
