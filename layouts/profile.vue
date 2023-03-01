<template>
  <v-app>
    <TheNavBar headerStyle="padding-top:0.5rem;background-color: #1d262d" />
    <v-container max-width="960px" class="pt-8" style="direction: ltr">
      <section class="holder">
        <v-card elevation="8">
          <nav>
            <ul>
              <li>
                <nuxt-link to="?tab=information">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    class="ml-2"
                  >
                    <path
                      d="M20 15H4V5h16m-6 13h-4v-1h4m8 1V3H2v15H0v2h24v-2h-2z"
                      fill="#888"
                    />
                  </svg>
                  <span> پروفایل</span>
                </nuxt-link>
              </li>
              <li>
                <nuxt-link to="?tab=files">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    class="ml-2"
                  >
                    <path
                      fill="#888"
                      d="m7 19l5-5l1.88 1.88c-.55.91-.88 1.98-.88 3.12H7m3-8.5C10 9.67 9.33 9 8.5 9S7 9.67 7 10.5S7.67 12 8.5 12s1.5-.67 1.5-1.5m3.09 9.5H6V4h7v5h5v4.09c.33-.05.66-.09 1-.09c.34 0 .67.04 1 .09V8l-6-6H6a2 2 0 0 0-2 2v16c0 1.11.89 2 2 2h7.81c-.35-.61-.6-1.28-.72-2M18 15v3h-3v2h3v3h2v-3h3v-2h-3v-3h-2Z"
                    />
                  </svg>
                  <span>فایل ها</span>
                </nuxt-link>
              </li>
              <li>
                <nuxt-link to="?tab=plan">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    class="ml-2"
                  >
                    <path
                      fill="#888"
                      d="M18 11h-3v3h-2v-3h-3V9h3V6h2v3h3m2-5v12H8V4h12m0-2H8c-1.1 0-2 .9-2 2v12a2 2 0 0 0 2 2h12c1.11 0 2-.89 2-2V4a2 2 0 0 0-2-2M4 6H2v14a2 2 0 0 0 2 2h14v-2H4V6Z"
                    />
                  </svg>
                  <span>طرح</span>
                </nuxt-link>
              </li>
              <li>
                <nuxt-link to="?tab=orders">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    class="ml-2"
                  >
                    <path
                      fill="#888"
                      d="m21.63 16.27l-3.87 3.9l-1.35-1.37L15 20.22L17.75 23l5.28-5.32l-1.4-1.41M14 15c0 1.1-.9 2-2 2s-2-.9-2-2s.9-2 2-2s2 .9 2 2m-1 5c0-.34.04-.67.09-1H5.5l-2.19-8H20.7l-.84 3.07c.68.1 1.32.3 1.9.61l1.21-4.41L23 10c0-.55-.45-1-1-1h-4.79l-4.38-6.56a.997.997 0 0 0-1.66.01L6.79 9H2c-.55 0-1 .45-1 1c0 .09 0 .18.04.27l2.54 9.27c.23.84 1 1.46 1.92 1.46h7.59c-.05-.33-.09-.66-.09-1M12 4.8L14.8 9H9.2L12 4.8Z"
                    />
                  </svg>
                  <span>سفارشات</span>
                </nuxt-link>
              </li>
              <li>
                <nuxt-link to="?tab=changePassword">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    class="ml-2"
                  >
                    <path
                      fill="#888"
                      d="M12 17a2 2 0 0 1-2-2c0-1.11.89-2 2-2a2 2 0 0 1 2 2a2 2 0 0 1-2 2m6 3V10H6v10h12m0-12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V10c0-1.11.89-2 2-2h1V6a5 5 0 0 1 5-5a5 5 0 0 1 5 5v2h1m-6-5a3 3 0 0 0-3 3v2h6V6a3 3 0 0 0-3-3Z"
                    />
                  </svg>
                  <span>تغییر رمزعبور</span>
                </nuxt-link>
              </li>
            </ul>
            <div class="side-footer">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </nav>
        </v-card>
        <v-card evelation="8">
          <Nuxt />
        </v-card>
      </section>
    </v-container>
    <div style="width: 100%; height: 150px"></div>
    <TheFooter />
  </v-app>
</template>
<script>
export default {
  middleware(context) {
    if (!context.$auth.loggedIn) {
      context.redirect("/authenticate");
    }
  },
};
</script>

<style lang="scss" scoped>
.holder {
  display: flex;
  width: 100%;
  gap: 1rem;
  flex-direction: column;
}
a.nuxt-link-exact-active {
  border-bottom: 2px solid #30313e;
  color: #30313e;
  > svg path {
    fill: #30313e;
  }
}
nav {
  padding: 1rem;
  ul {
    list-style: none;
    direction: rtl;
    display: flex;
    justify-content: center;
    gap: 1rem;
    li a {
      display: flex;
      text-decoration: none;
      color: #888;
      font-size: 0.9rem;
      font-weight: 600;
    }
  }
}

@media screen and (max-width: 600px) {
  li a span {
    display: none;
  }

  nav {
    overflow-x: scroll;
  }

  nav ul {
    // justify-content: flex-start !important;
    gap: 0px !important;
  }
}

@media screen and(min-width:425px) and (max-width: 600px) {
  nav ul {
    gap: 1rem !important;
  }
}
</style>
