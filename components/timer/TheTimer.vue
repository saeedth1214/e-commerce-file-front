<template>
  <v-chip class="ma-2" color="secondary" text-color="white">{{time }} : 00</v-chip>
</template>

<script>
export default {
  data: () => ({
    time: 60,
    intervel: null
  }),
  methods: {
    start() {
      this.intervel = setInterval(() => {
        if (this.time >0) {
          this.time--;
        } else {
          this.$emit('showtimer');
          this.time = 59;
        }
      }, 1000);
    }
  },
  created() {
    this.start();
  }
};
</script>

<style>
</style>
