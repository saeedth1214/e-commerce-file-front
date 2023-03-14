<template>
  <v-row justify="center" class="pa-8">
    <v-container fluid>
      <v-card :loading="loading" v-if="!rendering">
        <v-card-title>
          <span v-if="!userHasActivePlan && !userHasThisFile">
            <v-btn
              color="primary"
              class="ma-2 subtitle-1 font-weight-light"
              dark
              @click="AddtoCart"
              v-if="file.sale_as_single"
            >
              افزودن به سبد خرید
              <v-icon class="mr-2">mdi-basket</v-icon>
            </v-btn>
            <v-btn
              color="primary"
              class="ma-2 subtitle-1 font-weight-light"
              dark
              nuxt
              to="/front/plans"
              @click="AddtoCart"
              v-else
            >
              خرید اشتراک
            </v-btn>
          </span>
          <v-btn
            color="#05a081"
            class="ma-2 subtitle-1 font-weight-light"
            dark
            @click="download"
          >
            دانلود
          </v-btn>
          <v-btn
            :color="is_reacted ? 'green' : '#dfdfe0'"
            class="ma-2 subtitle-1 font-weight-light"
            dark
            outlined
            @click="toggleReaction()"
          >
            <svg
              class="like_icon"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              :style="[is_reacted ? { fill: 'green !important' } : '']"
            >
              <path
                id="favorite_border-bcbe810b1c8684d420b21248b530177d_Tracé_2228"
                d="M19.519,9.6A5.717,5.717,0,0,0,14,4.858h0a5.238,5.238,0,0,0-1.8.278A5.692,5.692,0,0,0,9.616,6.8l-.1-.116a5.377,5.377,0,0,0-4.229-1.85,4.188,4.188,0,0,0-.481.019A5.451,5.451,0,0,0,1.057,6.8,6.306,6.306,0,0,0,.035,13.032a13.481,13.481,0,0,0,2.558,4.048,35.618,35.618,0,0,0,6.85,5.754.31.31,0,0,0,.173.058.27.27,0,0,0,.173-.058,36.676,36.676,0,0,0,5.47-4.276A18.5,18.5,0,0,0,18.636,14.4,7.4,7.4,0,0,0,19.519,9.6Zm-2.753,3.753a15.6,15.6,0,0,1-3.057,3.724,36.039,36.039,0,0,1-4.1,3.379,33.6,33.6,0,0,1-5.322-4.64,10.684,10.684,0,0,1-2.183-3.225,3.947,3.947,0,0,1,.487-4.367,2.955,2.955,0,0,1,2.38-1.222H5.3A4.416,4.416,0,0,1,8.53,8.741l.077.1.039.039,1.04,1.117.982-1.155a5.186,5.186,0,0,1,2.014-1.58A4.432,4.432,0,0,1,14,7.006a3.486,3.486,0,0,1,3.426,2.857A5.088,5.088,0,0,1,16.765,13.357Z"
                transform="translate(2.375 -1.865)"
              ></path>
            </svg>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-row justify="center">
            <TheLazyloadingImage :mediaUrl="file.media_url" />
          </v-row>
        </v-card-text>
        <v-card-title>
          <v-row dense>
            <v-col cols="12" md="6" lg="6" sm="6">
              <div class="btn-details" style="display: flex; gap: 1rem">
                <p
                  class="subtitle-1 font-weight-bold"
                  v-if="parseInt(file.amount_after_rebate) === 0"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24">
                    <g fill="#7f7f7f">
                      <path
                        fill-rule="evenodd"
                        d="M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638l-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89l-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622l-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01l.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637l.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89l.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622l.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01l-.622-.636zm.287 5.984a.5.5 0 0 0-.708-.708L7 8.793L5.854 7.646a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3z"
                      />
                    </g>
                  </svg>
                  <span style="position: relative; bottom: 10px; right: 5px"
                    >رایگان</span
                  >
                </p>
                <p class="subtitle-1 font-weight-bold">
                  <svg width="24" height="24" viewBox="0 0 24 24">
                    <path
                      fill="#7f7f7f"
                      d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2Zm3.408 5.89c-.83 0-1.318.64-1.318 1.753v.742c0 1.108.479 1.727 1.318 1.727c.69 0 1.138-.435 1.187-1.05h1.147v.114c-.058 1.147-1.029 1.938-2.343 1.938c-1.612 0-2.518-1.028-2.518-2.729v-.747c0-1.7.914-2.75 2.518-2.75c1.319 0 2.29.812 2.343 1.999v.11H6.595c-.049-.638-.506-1.108-1.187-1.108Zm5.404 0c-.831 0-1.319.64-1.319 1.753v.742c0 1.108.48 1.727 1.319 1.727c.69 0 1.138-.435 1.186-1.05h1.147v.114c-.057 1.147-1.028 1.938-2.342 1.938c-1.613 0-2.518-1.028-2.518-2.729v-.747c0-1.7.914-2.75 2.518-2.75c1.318 0 2.29.812 2.342 1.999v.11h-1.147c-.048-.638-.505-1.108-1.186-1.108Z"
                    />
                  </svg>
                  <span style="position: relative; bottom: 10px; right: 5px">{{
                    file.title
                  }}</span>
                </p>
                <p class="subtitle-1 font-weight-bold" v-if="file.amount > 0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="#7f7f7f"
                      d="M3 6v12h10.32a6.38 6.38 0 0 1-.32-2H7a2 2 0 0 0-2-2v-4c1.11 0 2-.89 2-2h10a2 2 0 0 0 2 2v.06c.67 0 1.34.12 2 .34V6H3m9 3c-1.7.03-3 1.3-3 3s1.3 2.94 3 3c.38 0 .77-.08 1.14-.23c.27-1.1.72-2.14 1.83-3.16C14.85 10.28 13.59 8.97 12 9m9.63 3.27l-3.87 3.9l-1.35-1.37L15 16.22L17.75 19l5.28-5.32l-1.4-1.41Z"
                    />
                  </svg>
                  <span style="position: relative; bottom: 10px; right: 5px"
                    >{{ $formatMoney(file.amount_after_rebate) }} تومان</span
                  >
                </p>
              </div>
            </v-col>
            <v-col
              cols="12"
              md="6"
              lg="6"
              sm="6"
              :class="
                $vuetify.breakpoint.smAndDown ? 'text-center' : 'text-left'
              "
            >
              <v-btn color="#888" class="ma-2 subtitle-2" dark outlined>
                اشتراک گذاری
                <svg width="18" height="18" viewBox="0 0 18 18" class="mr-2">
                  <path
                    fill="#7f7f7f"
                    d="M11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5z"
                  />
                </svg>
              </v-btn>
              <v-btn
                color="#888"
                class="ma-2 subtitle-2"
                dark
                outlined
                @click="detailFlag = true"
              >
                اطلاعات بیشتر
                <svg width="18" height="18" viewBox="0 0 18 18">
                  <path
                    fill="currentColor"
                    d="m9.708 6.075l-3.024.379l-.108.502l.595.108c.387.093.464.232.38.619l-.975 4.577c-.255 1.183.14 1.74 1.067 1.74c.72 0 1.554-.332 1.933-.789l.116-.549c-.263.232-.65.325-.905.325c-.363 0-.494-.255-.402-.704l1.323-6.208Zm.091-2.755a1.32 1.32 0 1 1-2.64 0a1.32 1.32 0 0 1 2.64 0Z"
                  />
                </svg>
              </v-btn>
            </v-col>
          </v-row>
        </v-card-title>
        <v-card-title v-if="detailFlag">
          <Detail
            @closeDetail="detailFlag = false"
            :detailFlag="detailFlag"
            :media_url="file.media_url"
            :title="file.title"
            :date="file.created_at"
            :attributes="file.attributes.data"
            :download="file.download_count"
            :like="
              Object.keys(reactionSummary).length ? reactionSummary.like : 0
            "
            :views="parseInt(file.views)"
          />
        </v-card-title>
        <v-card-text>
          <Tags :tags="file.tags.data" />
        </v-card-text>
        <v-card-text>
          <!-- <LikeFile /> -->
        </v-card-text>
        <v-card-text>
          <Comments :fileId="file.id" />
        </v-card-text>
      </v-card>
      <v-row dense v-else>
        <v-col cols="12">
          <v-sheet color="grey lighten-3" class="pa-3">
            <v-skeleton-loader
              class="mx-auto"
              width="100%"
              height="400px"
              type="card"
            ></v-skeleton-loader>
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>
  </v-row>
</template>
<script>
import toCart from "@/mixins/toCart.js";
import TheLazyloadingImage from "../TheLazyloadingImage.vue";
import Comments from "./Comments.vue";
import LikeFile from "./LikeFile.vue";
import Tags from "./Tags.vue";
export default {
  mixins: [toCart],

  mounted() {
    this.shoppingCart = this.$cookies.get("cart", { parseJSON: true }) || [];
  },
  components: {
    TheLazyloadingImage,
    Comments,
    Tags,
    LikeFile,
  },
  watch: {
    shoppingCart: {
      async handler(newVal) {
        await this.$cookies.set("cart", JSON.stringify(newVal), {
          path: "/",
          maxAge: process.env.CART_MAX_AGE,
        });
        await this.$store.commit("option/setBasketItems");
      },
      deep: true,
    },
  },
  data() {
    return {
      detailFlag: false,
      menu: false,
      is_reacted: false,
      rendering: false,
      userHasActivePlan: false,
      userHasThisFile: false,
      shoppingCart: [],
      reactionSummary: {
        like: 0,
      },
    };
  },
  props: {
    file: {
      type: Object,
      required: true,
    },
  },

  async created() {
    this.rendering = true;
    let user = this.$auth.user;
    this.file.is_reacted && (this.is_reacted = this.file.is_reacted);
    Object.keys(this.file.reaction_summary).length &&
      (this.reactionSummary = this.file.reaction_summary);

    if (this.$auth.loggedIn) {
      await this.$axios
        .get(`frontend/users/${user.id}/active-plan`)
        .then(async (res) => {
          if (res.data.data) {
            this.userHasActivePlan = true;
          } else {
            await this.$axios
              .get(`frontend/users/${user.id}/files/${this.file.id}`)
              .then((res) => {
                if (res.data.data.count) {
                  this.userHasThisFile = true;
                }
              });
          }
        });
    }
     this.$store.commit("option/changeSnackbarMood", false);
    this.rendering = false;
  },
  methods: {
    async download() {
      this.loading = true;
      if (!this.$auth.loggedIn) {
        return this.$router.push("/authenticate?login");
      }
      await this.$axios
        .post(`frontend/files/${this.file.id}/download`)
        .then((res) => {
          window.open(res.data.data.url, "_blank");
        })
        .catch(async (err) => {
          if (err.response) {
            let message = "";
            if (err.response.status === 400) {
              message = "لینک دانلود فایل وجود ندارد.";
            }
            if (err.response && err.response.status === 403) {
              message = "برای دانلود فایل ابتدا آن را خریداری کنید .";
            }
            await this.$store.commit("option/changeSnackbarMood", true);
            await this.$store.commit(
              "option/changeSnackbarColor",
              "orange darken-2"
            );
            await this.$store.commit("option/changeSnackbarText", message);
          }
        });
      this.loading = false;
    },
    async toggleReaction() {
      this.loading = true;
      await this.$axios
        .post(`frontend/files/${this.file.id}/reactions`)
        .then((res) => {
          this.is_reacted = res.data.data.is_reacted;
          this.reactionSummary = { ...res.data.data.reaction_summary };
        });
      this.loading = false;
    },

    async AddtoCart() {
      await this.toCart(this.file);
    },
  },
};
</script>
<style lang="scss">
svg {
  fill: #7f7f7f;
}
.btn-details {
  display: flex;
  gap: 1rem;
  > p {
    margin-top: 0.8rem;
  }
}
@media screen and (max-width: 560px) {
  .btn-details {
    justify-content: center;
    flex-direction: column;
    align-items: center;
  }
}

@media screen and (max-width: 325px) {
  .close-modal {
    right: 20% !important;
  }
}
@media screen and (min-width: 325px) and (max-width: 425px) {
  .close-modal {
    right: 25% !important;
  }
}
</style>
