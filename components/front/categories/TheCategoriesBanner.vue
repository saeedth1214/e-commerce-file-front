<template>
  <v-app>
    <v-img height="100vh" src="/images/heading-bg.jpg"></v-img>
    <div class="main-title" :class="{'main-title-sm' : $vuetify.breakpoint.xs}">
      <p class="text-center">دسته بند ی های محبوب</p>
      <v-divider style="background-color:#fff;width:80%;margin:auto"></v-divider>
      <p
        class="text-body-2 font-weight-bold white--text mt-3 text-center"
      >ما اینجا با کیفیت ترین فایل های فتوشاپی روبرای شما آماده میکنیم</p>
    </div>
  </v-app>
</template>

<script>
export default {};
</script>

<style scoped>
.main-title {
 
  width: 100%;
  position: relative;
  top: -430px;
  margin: auto;
}
.main-title p:nth-child(1) {
  width: 100%;
  font-weight: 300;
  color: white;
  font-size: 3rem;
}
</style>
