<template>
  <v-card>
    <v-row dense>
      <!-- User Info: Left col -->
      <v-col cols="12" md="6" sm="6" xl="6" class="d-flex justify-content-between flex-column">
        <!-- User Avatar & Action Buttons -->
        <div class="d-flex justify-content-start">
          <v-btn fab class="mr-4">
            <v-avatar v-if="user.media_url">
              <img :src="user.media_url">
            </v-avatar>
            <v-avatar v-else>
              <v-icon dark>mdi-account-circle</v-icon>
            </v-avatar>
          </v-btn>
          <div class="d-flex flex-column mr-3">
            <div class="mb-1">
              <h4 class="mb-0">{{user.first_name +' '+ user.last_name}}</h4>
              <span class="card-text">{{user.email}}</span>
            </div>
            <div class="d-flex flex-wrap mt-3">
              <v-btn color="success" nuxt :to="`/panel/users/edit/${$route.params.id}`">ویرایش</v-btn>
              <v-btn color="error" class="mr-1" @click="removeUser">حذف</v-btn>
            </div>
          </div>
        </div>
      </v-col>

      <v-col cols="12" md="6" sm="6" xl="6">
        <table class="mt-2" style="width:100%;">
          <tr>
            <th class="pb-50">
              <v-icon>mdi-account</v-icon>
              <span class="font-weight-bold">{{$t('user.fullName')}}</span>
            </th>
            <td class="pb-50">{{user.first_name + ' ' + user.last_name }}</td>
          </tr>
          <tr>
            <th class="pb-50">
              <v-icon>mdi-account-key</v-icon>
              <span class="font-weight-bold">{{$t('user.role')}}</span>
            </th>
            <td class="pb-50 text-capitalize">{{user.role}}</td>
          </tr>
          <tr>
            <th>
              <v-icon>mdi-cellphone-basic</v-icon>
              <span class="font-weight-bold">{{$t("user.mobile")}}</span>
            </th>
            <td>{{user.mobile ? user.mobile : 'ثبت نشده'}}</td>
          </tr>
          <tr>
            <th>
              <v-icon>mdi-email-open</v-icon>
              <span class="font-weight-bold">{{$t("user.email")}}</span>
            </th>
            <td>{{user.email ? user.email : 'ایمیل' }}</td>
          </tr>
        </table>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  computed: {
    user() {
      return this.$store.state.user.user;
    }
  },

  methods: {
    removeUser() {
      this.$swal({
        title: "حذف کاربر ! آیا مطمعن هستید ؟",
        icon: "warning",
        showCloseButton: true,
        showCancelButton: true,
        confirmButtonText: "‌ادامه",
        cancelButtonText: "انصراف",
        showClass: {
          popup: "animate__animated animate__fadeInDown"
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutUp"
        }
      }).then(async result => {
        if (result.isConfirmed) {
          await this.$axios
            .delete(`panel/users/${this.user.id}`)
            .then(res => {
              if (res.status === 204) {
                this.$swal({
                  title: "کاربر انتخاب شده حذف شد",
                  showClass: {
                    popup: "animate__animated animate__fadeInDown"
                  },
                  hideClass: {
                    popup: "animate__animated animate__fadeOutUp"
                  }
                });

                this.$router.push("panel/users");
              }
            })
            .catch(err => console.log(err));
        }
      });
    }
  }
};
</script>

<style scope>
tr {
  text-align: right;
}
</style>
