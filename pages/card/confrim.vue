<template>
  <div>
    <TheNav/>
    <br>
    <div v-if="$store.state.card.card.length==0" class="text-center">
      <p>No items just yet. keep shopping</p>
    </div>
    <v-container>
      <div class="mb-3" v-if="$store.state.card.card.length">
        <v-btn nuxt to="/card" min-width="150" min-height="45" color="primary">Back</v-btn>
        <v-btn @click="process" min-width="150" min-height="45" color="primary">Complete</v-btn>
      </div>
      <v-form lazy-validation ref="form" class="mt-10">
        <p class="font-weight-bold">Personal & Delivery</p>
        <v-row>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="email"
              :rules="[rules.required,rules.email]"
              label="Email"
              outlined
              type="email"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="name"
              :rules="[rules.required]"
              label="Full Name"
              outlined
              type="text"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field v-model="phone" label="Phone" outlined type="tel"></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="address"
              label="Address"
              :rules="[rules.required]"
              outlined
              type="text"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="city"
              label="City"
              :rules="[rules.required]"
              outlined
              type="text"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="country"
              label="Country"
              :rules="[rules.required]"
              outlined
              type="text"
            ></v-text-field>
          </v-col>
        </v-row>

        <!-- <p class="font-weight-bold">Credit card</p>
        <v-row>
            <v-col cols="12" md="12">
                
            </v-col>
        </v-row>-->
      </v-form>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: null,
      name: null,
      phone: null,
      address: null,
      city: null,
      country: null,
      rules: {
        required: v => !!v || "Required",
        email: v => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(v) || "Invalid e-mail";
        }
      }
    };
  },

  methods: {
    async process() {
      if (!this.$refs.form.validate()) return;
      await this.$swal({
        title: "Proceessing your order",
        icon: "info",
        allowEscapeKey: false,
        alloweOutsideClick: false,
        timer: 3000,
        timerProgressBar: true,
        text: "Please Wait",
        showConfirmButton: false
      });
      await this.$swal({
        title: "Order Complete",
        icon: "success",
        allowEscapeKey: false,
        alloweOutsideClick: false,
        timer: 3000,
        timerProgressBar: true,
        text: "Thank you so Much",
        showConfirmButton: false
      });

      this.$store.commit("card/clearCard");
      this.$router.push("/");
    }
  }
};
</script>

<style>
</style>
