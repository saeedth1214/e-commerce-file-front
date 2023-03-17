<template>
  <v-app
    style="background-color: #f5f5f5; overflow: hidden; position: relative"
  >
    <v-container fluid>
      <header>
        <ul>
          <li>
            <nuxt-link
              to="/front/plans"
              style="text-decoration: none; color: rgb(29, 38, 45)"
            >
              <v-icon small> mdi-chevron-right</v-icon>
              <span
                class="text-body-2 font-weight-bold"
                v-if="$vuetify.breakpoint.smAndUp"
                >بازگشت به لیست اشتراک ها
              </span>
            </nuxt-link>
          </li>
          <li v-if="$vuetify.breakpoint.smAndUp">
            <p class="text-subtitle-2 orange--text darken-2 font-weight-bold">
              فایلیمو دات آی آر
            </p>
          </li>
          <li>
            <div style="cursor: pointer; position: relative">
              <v-icon small> mdi-account</v-icon>
              <span v-if="$vuetify.breakpoint.mdAndUp">{{
                $auth.user.mobile || $auth.user.email
              }}</span>
              <v-icon small v-if="$vuetify.breakpoint.mdAndUp">
                mdi-chevron-down</v-icon
              >
              <div class="sub-account">
                <ul>
                  <li>
                    <nuxt-link to="/front/profile">
                      <v-icon small> mdi-account</v-icon>
                      <span class="text-body-2 font-weight-bold">پروفایل </span>
                    </nuxt-link>
                  </li>
                  <li>
                    <nuxt-link to="#" @click.native="logout">
                      <v-icon small> mdi-logout</v-icon>
                      <span class="text-body-2 font-weight-bold">خروج </span>
                    </nuxt-link>
                  </li>
                </ul>
              </div>
            </div>
          </li>
        </ul>
      </header>
      <Nuxt />
      <footer>
        <div>
          <p
            class="text-subtitle-2 font-weight-bold"
            style="color: #333; margin-top: 0.75rem"
          >
            پشتیبانی 7 روزه (7 صبح تا 12شب) - تلفن : 09302474269
          </p>
          <div class="socialite">
            <a href="https://t.me/mhsoltani1214" target="_blank">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1rem"
                height="1rem"
                preserveAspectRatio="xMidYMid meet"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#fff"
                  d="M12 20a8 8 0 1 0 0-16a8 8 0 0 0 0 16zm0 2C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10s-4.477 10-10 10zm-3.11-8.83l-2.498-.779c-.54-.165-.543-.537.121-.804l9.733-3.76c.565-.23.885.061.702.79l-1.657 7.82c-.116.557-.451.69-.916.433l-2.551-1.888l-1.189 1.148c-.122.118-.221.219-.409.244c-.187.026-.341-.03-.454-.34l-.87-2.871l-.012.008z"
                />
              </svg>
            </a>
            <a href="https://www.instagram.com/saeedt.h1214" target="_blank">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1rem"
                height="1rem"
                preserveAspectRatio="xMidYMid meet"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#fff"
                  d="M17.34 5.46a1.2 1.2 0 1 0 1.2 1.2a1.2 1.2 0 0 0-1.2-1.2Zm4.6 2.42a7.59 7.59 0 0 0-.46-2.43a4.94 4.94 0 0 0-1.16-1.77a4.7 4.7 0 0 0-1.77-1.15a7.3 7.3 0 0 0-2.43-.47C15.06 2 14.72 2 12 2s-3.06 0-4.12.06a7.3 7.3 0 0 0-2.43.47a4.78 4.78 0 0 0-1.77 1.15a4.7 4.7 0 0 0-1.15 1.77a7.3 7.3 0 0 0-.47 2.43C2 8.94 2 9.28 2 12s0 3.06.06 4.12a7.3 7.3 0 0 0 .47 2.43a4.7 4.7 0 0 0 1.15 1.77a4.78 4.78 0 0 0 1.77 1.15a7.3 7.3 0 0 0 2.43.47C8.94 22 9.28 22 12 22s3.06 0 4.12-.06a7.3 7.3 0 0 0 2.43-.47a4.7 4.7 0 0 0 1.77-1.15a4.85 4.85 0 0 0 1.16-1.77a7.59 7.59 0 0 0 .46-2.43c0-1.06.06-1.4.06-4.12s0-3.06-.06-4.12ZM20.14 16a5.61 5.61 0 0 1-.34 1.86a3.06 3.06 0 0 1-.75 1.15a3.19 3.19 0 0 1-1.15.75a5.61 5.61 0 0 1-1.86.34c-1 .05-1.37.06-4 .06s-3 0-4-.06a5.73 5.73 0 0 1-1.94-.3a3.27 3.27 0 0 1-1.1-.75a3 3 0 0 1-.74-1.15a5.54 5.54 0 0 1-.4-1.9c0-1-.06-1.37-.06-4s0-3 .06-4a5.54 5.54 0 0 1 .35-1.9A3 3 0 0 1 5 5a3.14 3.14 0 0 1 1.1-.8A5.73 5.73 0 0 1 8 3.86c1 0 1.37-.06 4-.06s3 0 4 .06a5.61 5.61 0 0 1 1.86.34a3.06 3.06 0 0 1 1.19.8a3.06 3.06 0 0 1 .75 1.1a5.61 5.61 0 0 1 .34 1.9c.05 1 .06 1.37.06 4s-.01 3-.06 4ZM12 6.87A5.13 5.13 0 1 0 17.14 12A5.12 5.12 0 0 0 12 6.87Zm0 8.46A3.33 3.33 0 1 1 15.33 12A3.33 3.33 0 0 1 12 15.33Z"
                />
              </svg>
            </a>
            <a href="https://wa.link/3ehfzm" target="_blank">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1rem"
                height="1rem"
                preserveAspectRatio="xMidYMid meet"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#fff"
                  d="m7.253 18.494l.724.423A7.953 7.953 0 0 0 12 20a8 8 0 1 0-8-8a7.95 7.95 0 0 0 1.084 4.024l.422.724l-.653 2.401l2.4-.655zM2.004 22l1.352-4.968A9.954 9.954 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10s-4.477 10-10 10a9.954 9.954 0 0 1-5.03-1.355L2.004 22zM8.391 7.308c.134-.01.269-.01.403-.004c.054.004.108.01.162.016c.159.018.334.115.393.249c.298.676.588 1.357.868 2.04c.062.152.025.347-.093.537a4.38 4.38 0 0 1-.263.372c-.113.145-.356.411-.356.411s-.099.118-.061.265c.014.056.06.137.102.205l.059.095c.256.427.6.86 1.02 1.268c.12.116.237.235.363.346c.468.413.998.75 1.57 1l.005.002c.085.037.128.057.252.11c.062.026.126.049.191.066a.35.35 0 0 0 .367-.13c.724-.877.79-.934.796-.934v.002a.482.482 0 0 1 .378-.127c.06.004.121.015.177.04c.531.243 1.4.622 1.4.622l.582.261c.098.047.187.158.19.265c.004.067.01.175-.013.373c-.032.259-.11.57-.188.733a1.155 1.155 0 0 1-.21.302a2.378 2.378 0 0 1-.33.288a3.71 3.71 0 0 1-.125.09a5.024 5.024 0 0 1-.383.22a1.99 1.99 0 0 1-.833.23c-.185.01-.37.024-.556.014c-.008 0-.568-.087-.568-.087a9.448 9.448 0 0 1-3.84-2.046c-.226-.199-.435-.413-.649-.626c-.89-.885-1.562-1.84-1.97-2.742A3.47 3.47 0 0 1 6.9 9.62a2.729 2.729 0 0 1 .564-1.68c.073-.094.142-.192.261-.305c.127-.12.207-.184.294-.228a.961.961 0 0 1 .371-.1z"
                />
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </v-container>
  </v-app>
</template>

<script>
export default {
  middleware(context) {
    if (!context.$auth.loggedIn || context.$auth.user.role_id !== 1) {
         context.redirect("/authenticate?login");
    }
  },

  methods: {
    async logout() {
      await this.$auth.logout();
      await this.$router.push("/");
    },
  },
};
</script>

<style scoped lang="scss">
@media screen and (max-width: 690px) {
  footer {
    > div {
      flex-direction: column !important;
      align-items: center !important;
    }
  }
  .sub-account {
    left: -8px;
  }
  header > ul {
    justify-content: space-around !important;
  }
}
ul {
  list-style: none;
  padding-left: 0px !important;
}
.container {
  padding: 0px;
}
footer {
  position: absolute;
  bottom: 0px;
  height: auto;
  background: #fff;
  width: 100%;
  > div {
    width: 70%;
    margin: 0.7rem auto;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: baseline;
    justify-content: space-between;
    text-align: center;
  }
}
header {
  width: 100%;
  height: 70px;
  padding: 1rem;
  background-color: #fff;
  > ul {
    width: 80%;
    display: flex;
    justify-content: space-between;
    margin: 0px auto;

    > li:nth-last-child(1) {
      .sub-account {
        display: none;
        z-index: 100;
        border: 1px solid #d7d7d7;
        border-radius: 5px;
        position: absolute;
        min-width: 150px;
        background: #fff;
        ul li a {
          display: block;
          padding: 0.5rem;
          border-bottom: 1px solid #d7d7d7;
          font-size: 0.8rem;
          font-weight: 600;
          color: #333;
          cursor: pointer;
          text-decoration: none;
        }
      }

      &:hover {
        .sub-account {
          display: block;
        }
      }
    }
  }
}
.socialite {
  position: relative;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 1rem;
  a {
    text-decoration: none;
    background: #000;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.2rem;
    border-radius: 8px;
    transition: all 0.2s linear;
  }
}
</style>
