<template lang="">
  <div>
    <v-tabs-items v-model="tab">
      <v-tab-item>
        <Information :user="user" />
      </v-tab-item>
      <v-tab-item>
        <UserPlans :userId="user.id" />
      </v-tab-item>
      <v-tab-item>
        <UserFiles :userId="user.id" />
      </v-tab-item>
      <v-tab-item>
        <UserOrders :userId="user.id" />
      </v-tab-item>
      <v-tab-item>
        <!-- <Transactions :transactions="data.transactions.data" /> -->
      </v-tab-item>
      <v-tab-item>
        <ChangePassword />
      </v-tab-item>
      <v-tab-item>
        <ChangeAvatar />
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>
<script>
export default {
  props: {
    tab: {
      type: Number,
      Required: true,
    },
    user: {
      type: Object,
      Required: true,
    },
  },
};
</script>
<style lang=""></style>
