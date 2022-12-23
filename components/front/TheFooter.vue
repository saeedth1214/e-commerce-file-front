<template>
  <v-row dense>
    <footer>
      <v-container>
        <v-row>
          <v-col cols="12" md="4" lg="4" sm="4">
            <div class="introduce">
              <h3>درباره من</h3>
              <p style="margin-top: 1rem">
                برنامه نویس وطراح وب با بیش از 2 سال فعالیت در این زمینه مهارت
                ها : php , laravel , vuejs , nuxtjs
              </p>
            </div>
          </v-col>
          <v-col cols="12" md="3" lg="3" sm="3">
            <div class="content-footer">
              <h3>محتوای سایت</h3>
              <ul>
                <li>
                  <nuxt-link to="/front/files">فایل ها </nuxt-link>
                </li>
                <li>
                  <nuxt-link to="/front/plans">طرح ها </nuxt-link>
                </li>
                <li>
                  <nuxt-link to="/front/categories">دسته بندی</nuxt-link>
                </li>
              </ul>
            </div>
          </v-col>
          <v-col cols="12" md="5" lg="5" sm="5">
            <div class="contact-me">
              <h3>ارتباط با من</h3>
              <ul>
                <li>
                  ایمیل :
                  <p>m.h.soltani1214@gmail.com</p>
                </li>
                <li>
                  تلگرام :
                  <p>
                    <a href="https://t.me/mhsoltani1214" target="_blank"
                      >mhsoltani1214@</a
                    >
                  </p>
                </li>
                <li>
                  اینستاگرام :
                  <p>
                    <a
                      href="https://www.instagram.com/saeedt.h1214"
                      target="_blank"
                      >saeedt.h1214@</a
                    >
                  </p>
                </li>
              </ul>
            </div>
          </v-col>
          <v-col cols="12">
            <v-divider color="#a38901"></v-divider>
            <p class="copyright">
              کليه حقوق محصولات و محتوای اين سایت متعلق به اینجانب می باشد و هر
              گونه کپی برداری از محتوا و محصولات سایت غیر مجاز و بدون رضایت
              اینجانب است.
            </p>
          </v-col>
        </v-row>
      </v-container>
    </footer>
  </v-row>
</template>
<script>
export default {
  data() {
    return {};
  },
};
</script>

<style scoped lang="scss">
footer {
  width: 100%;
  margin-top: 1rem;
  height: auto;
  background: #253039;
  position: relative;
  bottom: 0;
  left: 0;
}
h3 {
  color: #fff;
}
ul {
  list-style: none;
  li,
  a {
    color: #a5b7c6;
    text-decoration: none;
    display: block;
    margin-top: 1rem;
  }
}
.contact-me ul li {
  display: flex;
  align-items: baseline;
  p {
    margin-right: 0.5rem;
  }
}
.introduce {
  &:first-child {
    color: #a5b7c6;
  }
}

.copyright {
  text-align: center;
  color: #fff;
  margin-top: 1rem;
}
</style>
