<template>
  <div>
    <v-container fluid v-if="!overlay" class="comment-container">
      <ul>
        <li class="parent" v-for="comment in comments" :key="comment.id">
          <div class="message">
            <p class="message-avatar">
              <v-avatar v-if="comment.user.data.media" size="38">
                <img :src="comment.user.data.media" />
              </v-avatar>

              <v-avatar color="indigo" v-else size="38">
                <v-icon dark> mdi-account-circle </v-icon>
              </v-avatar>
            </p>
            <div class="message-content">
              <p class="message-content-header">
                {{ comment.created_at }} ایجاد شده
                {{ comment.user.data.fullname }}
              </p>
              <p class="message-content-main" v-html="comment.content"></p>
            </div>
          </div>

          <ul v-if="comment.replies.data.length">
            <li
              v-for="reply in comment.replies.data"
              :key="reply.id"
              class="reply"
            >
              <div class="message">
                <p class="message-avatar">
                  <v-avatar v-if="reply.user.data.media" size="38">
                    <img :src="reply.user.data.media" />
                  </v-avatar>

                  <v-avatar color="indigo" v-else size="38">
                    <v-icon dark> mdi-account-circle </v-icon>
                  </v-avatar>
                </p>
                <div class="message-content">
                  <p class="message-content-header">
                    {{ reply.created_at }} ایجاد شده
                    {{ reply.user.data.fullname }}
                  </p>
                  <p class="message-content-main" v-html="reply.content"></p>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
      <div class="leave-comment">
        <p class="text-subtitle-1">دیدگاه شما</p>
      </div>
      <TheQuillEditor @applyComment="applyComment" />
      <div class="apply-message">
        <v-btn
          v-if="$auth.loggedIn"
          class="ma-2"
          :loading="loading"
          :disabled="loading || !editorInput"
          color="info"
          @click="saveComment"
        >
          ارسال دیدگاه
          <template v-slot:loader>
            <span class="custom-loader">
              <v-icon light>mdi-cached</v-icon>
            </span>
          </template>
        </v-btn>

        <v-alert color="pink darken-1" dark v-else class="text-center">
          برای ثبت دیدگاه نیاز به
          <nuxt-link
            to="/authenticate?login"
            style="text-decoration: none; font-size: 1rem; color: #253039"
            >ورود</nuxt-link
          >
          یا
          <nuxt-link
            to="/authenticate?register"
            style="text-decoration: none; font-size: 1rem; color: #253039"
            >عضویت</nuxt-link
          >
          در سایت است.
        </v-alert>
      </div>

      <v-pagination
        v-model="page"
        :length="pagination.total_pages"
        @input="handlePageChange"
      ></v-pagination>
    </v-container>
    <v-row dense v-else>
      <v-col cols="12">
        <v-sheet color="grey lighten-3" class="pa-3">
          <v-skeleton-loader
            class="mx-auto"
            width="100%"
            height="300px"
            type="card"
          ></v-skeleton-loader>
        </v-sheet>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      comments: [],
      pagination: {},
      page: 1,
      editorInput: null,
      loader: null,
      loading: false,
      overlay: false,
    };
  },
  props: {
    fileId: {
      type: Number,
      required: true,
    },
  },

  created() {
    this.fetchComments();
  },

  watch: {
    loader() {
      const l = this.loader;
      this[l] = !this[l];

      setTimeout(() => (this[l] = false), 3000);

      this.loader = null;
    },
  },
  methods: {
    async action(color, comment) {
      await this.$store.commit("option/changeSnackbarMood", true);
      await this.$store.commit("option/changeSnackbarColor", color);
      await this.$store.commit("option/changeSnackbarText", comment);
    },
    async saveComment() {
      this.loader = "loading";
      if (this.editorInput === null || this.editorInput === "") {
        this.action("orange darken-2", "لطفا متنی را جهت ثبت نظر وارد کنید");
        return;
      }
      let comment = {
        content: this.editorInput,
      };
      await this.$axios
        .post(`panel/files/${this.fileId}/comments`, comment)
        .then(async (res) => {
          await this.action("green ligthen-1", "نظر شما ثبت شد");
          this.editorInput = null;
        });
    },
    handlePageChange(value) {
      this.page = value;
      this.fetchComments();
    },
    applyComment(value) {
      this.editorInput = value.trim();
    },

    async fetchComments() {
      this.overlay = true;
      let params = {};
      params["include"] = "user,replies.user";
      this.page && (params["page"] = this.page);
      await this.$axios
        .get(`frontend/files/${this.fileId}/comments`, { params })
        .then((res) => {
          this.comments = res.data.data;
          this.pagination = res.data.meta.pagination;
        });
      this.overlay = false;
    },
  },
};
</script>

<style scoped lang="scss">
@media screen and (max-width: 425px) {
  .parent {
    width: 400px;
  }
  .comment-container {
    overflow-x: scroll;
  }
}

.leave-comment {
  padding: 0.5rem;
  text-align: center;

  p {
    width: 100%;
    border-bottom: 2px solid #d7d7d7;
    margin: 0px auto;
  }
}
.apply-message {
  width: 95%;
  margin: 0px auto;
}
.message {
  display: flex;
  align-items: baseline;
  border-radius: 0.5rem;
  &-content {
    display: flex;
    width: 100%;
    margin: 0px 1rem;
    flex-direction: column;
    border: 1px solid #d7d7d7;
    border-radius: 0.5rem;
    &::before {
      position: absolute;
      top: 22px;
      right: 51px;
      display: none;
      width: 8px;
      height: 16px;
      pointer-events: none;
      content: " ";
      border-style: solid;
      border-width: 0 7px 7px 7px;
      border-color: transparent transparent #d7d7d7 transparent;
      transform: rotate(90deg);
    }
    &-header {
      align-items: center;
      padding-right: 16px;
      padding-left: 16px;
      color: #57606a;
      flex-direction: row-reverse;
      background-color: #f6f8fa;
      border-bottom: 1px solid #d0d7de;
      border-top-left-radius: 6px;
      border-top-right-radius: 6px;
      font-size: 0.8rem;
      padding-top: 10px;
      padding-bottom: 10px;
    }
    &-main {
      padding-right: 16px;
      padding-left: 16px;
    }
  }
}

.reply .message {
  width: 95%;
  margin: 0px auto;
}

.parent {
  & > ul {
    padding: 0.5rem;
    list-style: none;
  }
}

.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}
@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-o-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
