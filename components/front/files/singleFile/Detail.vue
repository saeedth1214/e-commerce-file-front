<template>
  <v-dialog v-model="detailFlag" max-width="500px" persistent>
    <v-card color="#000">
      <div class="modal_upperContent">
        <div class="title">
          <div class="image">
            <v-img
              :src="media_url"
              lazy-src="https://picsum.photos/id/11/100/60"
              max-height="100"
              max-width="100"
              contain
            >
              <template v-slot:placeholder>
                <v-row class="fill-height ma-0" align="center" justify="center">
                  <v-progress-circular
                    indeterminate
                    color="grey lighten-5"
                  ></v-progress-circular>
                </v-row>
              </template>
            </v-img>
          </div>
          <div class="short-info">
            <span class="subtitle-1 font-weight-bold"> {{ title }}</span>
            <span class="subtitle-2 font-weight-light">
              ثبت شده در تاریخ : {{ splitDate }}</span
            >
          </div>
        </div>
        <div class="more-info">
          <p>
            <span>تعداد دانلود</span>
            <span>{{ $numberShorter(22500) }}</span>
          </p>
          <p>
            <span>تعداد لایک</span>
            <span>220</span>
          </p>
          <p>
            <span>تعداد بازدید</span>
            <span>{{ $numberShorter(445750) }}</span>
          </p>
        </div>
      </div>
    </v-card>
    <v-card>
      <v-btn color="#000" text @click="$emit('closeDetail')">
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <v-card-text>
        <div class="attribute-box" v-if="attributes.length">
          <p class="item" v-for="attribute in attributes" :key="attribute.id">
            <span>{{ attribute.name }}</span>
            <span>{{ attribute.value }}</span>
          </p>
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  data() {
    return {
      dialog: false,
    };
  },
  props: {
    detailFlag: {
      type: Boolean,
      required: true,
    },
    media_url: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    attributes: {
      type: Array,
      required: false,
      default: [],
    },
  },

  computed: {
    splitDate() {
      return this.date.split(" ")[0];
    },
  },
};
</script>
<style lang="scss" scoped>
@media screen and (max-width: 420px) {
  .title {
    flex-direction: column;
    text-align: center;
    gap: 1rem;
  }

  .image {
    margin: 0px auto;
  }
}
.modal_upperContent {
  padding: 2rem;

  > .title {
    display: flex;
    justify-content: flex-start;

    > .short-info {
      margin-right: 1.5rem;
      color: #fff;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
  }
  .more-info {
    margin-top: 1rem;
    display: flex;
    justify-content: center;
    gap: 1rem;

    > p {
      display: flex;
      flex-direction: column;
      > span:nth-child(1) {
        color: #d7d7d7;
        font-size: 0.8rem;
      }
      > span:nth-child(2) {
        color: #fff;
        font-size: 1rem;
        font-weight: 600;
        margin-top: 0.5rem;
      }
    }
  }
}

.attribute-box {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(75px, 1fr));
  > p {
    display: flex;
    flex-direction: column;
    font-weight: 600;

    > span:nth-child(1) {
      color: #1f1d1d;
      font-size: 0.8rem;
    }
    > span:nth-child(2) {
      color: #000;
      font-size: 1rem;
      margin-top: 0.5rem;
    }
  }
}
</style>
