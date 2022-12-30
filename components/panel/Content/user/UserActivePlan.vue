<template>
  <div
    style="
      height: 200px;
      padding: 0.5rem;
      border-radius: 10px;
      border: 1px solid #6c6868;
      display: flex;
      align-items: center;
    "
  >
    <v-container v-if="!loading" style="text-align: center">
      <div class="active-plan" v-if="Object.keys(activePlan).length">
        <v-row>
          <v-col md="4" sm="4" lg="4">
            <p>طرح فعال شما : {{ activePlan.title }}</p>
          </v-col>
          <v-col md="4" sm="4" lg="4">
            <p>روزهای باقیمانده : {{ activePlan.days_left }}</p>
          </v-col>
          <v-col
            md="4"
            sm="4"
            lg="4"
            style="display: flex; align-items: center"
          >
            <v-btn color="primary" small @click="deActivatePlan">
              غیر فعال
            </v-btn>
          </v-col>
        </v-row>
      </div>
      <div v-else>
        <v-row style="align-items: center">
          <v-col md="4" sm="4" offset-md="3">
            <InfiniteScroll
              url="panel/plans"
              label="title"
              title="plan"
              @selectedValue="setPlanId"
              :itemId="selectedPlanId"
            />
          </v-col>

          <v-col md="3" sm="3">
            <v-btn
              color="primary"
              small
              @click="activatePlan"
              :disabled="!selectedPlanId"
            >
              فعال
            </v-btn>
          </v-col>
        </v-row>
      </div>
    </v-container>
    <v-container v-else>
      <div class="text-center">
        <v-progress-circular
          :size="50"
          color="primary"
          indeterminate
          style="top: -10px !important"
        ></v-progress-circular>
      </div>
    </v-container>
  </div>
</template>
<script>
import showMessage from "@/mixins/showMessage";

export default {
  props: {
    userId: {
      type: Number,
      required: true,
    },
  },

  mixins: [showMessage],

  data() {
    return {
      activePlan: {},
      selectedPlanId: null,
      loading: false,
    };
  },

  methods: {
    setPlanId(planId) {
      this.selectedPlanId = planId;
    },
    async activatePlan() {
      this.loading = true;
      await this.$axios
        .post(`panel/users/${this.userId}/plans`, {
          plan_id: this.selectedPlanId,
        })
        .then((res) => {
          this.showMessage("success", ".طرح شما فعال شد");
          this.getActivePlan();
        })
        .catch((err) => {
          if (err.resposne.status === 400) {
            this.showMessage("warning", err.response.message);
          }
        });
      this.loading = false;
    },
    async deActivatePlan() {
      this.loading = true;
      await this.$axios
        .put(
          `panel/users/${this.userId}/plans/${this.activePlan.id}/de-activate`
        )
        .then((res) => {
          this.showMessage("success", ".طرح غیرفعال شد");
          this.activePlan = {};
        })
        .catch((err) => {
          if (ere.resposne.status === 400) {
            this.showMessage("warning", err.response.message);
          }
        });
      this.loading = false;
    },
    async getActivePlan() {
      this.loading = true;
      await this.$axios
        .get(`panel/users/${this.userId}/active-plan`)
        .then((res) => {
          this.activePlan = { ...res.data.data };
        })
        .catch((err) => {
          if (err.response.status === 400) {
            this.showMessage("warning", err.response.data.message);
          }
        });
      this.loading = false;
    },
  },
  async created() {
    this.getActivePlan();
  },
};
</script>
<style lang=""></style>
