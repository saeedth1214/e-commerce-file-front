<template>
  <v-app id="inspire">
    <v-container>
      <NewFile @initializeEmit="fetchAgainFlag = true" />
      <FileList
        :fetch="fetchAgainFlag"
        @closeFetchAgain="fetchAgainFlag = false"
      />
    </v-container>
  </v-app>
</template>
<script>
export default {
  data() {
    return {
      fetchAgainFlag: false,
    };
  },
};
</script>

<style scope lang="scss">
.file-details {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  position: absolute;
  top: 0px;
  right: -280px;
  transition: all 0.3s linear;
  opacity: 0.9;
}
.card:hover .file-details {
  right: 0px;
}
.on-hover {
  background-color: #fff !important;
  color: #00bdfe !important;
  border: 1px solid #00bdfe;
  transition: all 0.3s linear;
}
.like {
  padding: 0.3rem;
  border: 1px solid grey;
  border-radius: 10px;
  position: relative;
  background: #fff;
  text-align: center;
  &-count {
    border: 1px solid red;
    border-radius: 5px;
    color: red;
    text-align: center;
    position: absolute;
    top: -15px;
    right: -10px;
    font-size: 0.7rem;
    font-weight: bold;
    background: #fff;
    width: 2rem;
    letter-spacing: 1px;
  }
}
</style>
