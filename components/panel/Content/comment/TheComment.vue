<template>
  <div>
    <v-card v-if="!loading">
      <v-card-title>نمایش پیام </v-card-title>
      <v-spacer></v-spacer>
      <v-card-text>
        <v-simple-table>
          <thead>
            <tr>
              <th>#</th>
              <th>متن</th>
              <th>شناسه والد</th>
              <th>شناسه محصول</th>
              <th>نوع محصول</th>
              <th>وضعیت</th>
              <th>تاریخ ثبت</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{{ comment.id }}</td>
              <td>{{ comment.content }}</td>
              <td>{{ comment.parent_id ? comment.parent_id : "-" }}</td>
              <td>{{ comment.model.data.id }}</td>
              <td>{{ comment.model.data.title }}</td>
              <td>
                <span
                  style="font-size: 0.7rem; width: 60px"
                  class="d-flex pa-1 font-weight-light white--text justify-center align-center rounded-sm"
                  :class="{
                    'yellow darken-2': comment.status === 0,
                    'primary darken-2': comment.status === 1,
                    'red darken-2': comment.status === 2,
                  }"
                >
                  {{ comment.status_dec }}</span
                >
              </td>
              <td>{{ comment.created_at }}</td>
            </tr>
          </tbody>
        </v-simple-table>
      </v-card-text>
      <v-card-text>
        <v-row>
          <v-col cols="12" md="6" sm="6">
            <v-text-field
              v-model.trim="newComment.content"
              label=""
              clearable
              :rules="[rules.required, rules.min, rules.max]"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4" sm="4">
            <v-radio-group v-model="newComment.status" row>
              <v-radio label="دیده نشده" :value="0"></v-radio>
              <v-radio label="تایید شده" :value="1"></v-radio>
              <v-radio label="رد شده" :value="2"></v-radio>
            </v-radio-group>
          </v-col>
          <v-col
            cols="12"
            md="2"
            sm="2"
            class="d-flex justify-center align-center"
          >
            <v-btn
              color="primary"
              small
              @click="updateComment"
              :disabled="invalidComment"
            >
              ویرایش
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>

      <v-card-text>
        <v-row>
          <v-col cols="12" md="6" sm="6">
            <v-text-field
              v-model.trim="reply.content"
              label=""
              clearable
              :rules="[rules.required, rules.min, rules.max]"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4" sm="4">
            <v-radio-group v-model="reply.status" row>
              <v-radio label="دیده نشده" :value="0"></v-radio>
              <v-radio label="تایید شده" :value="1"></v-radio>
              <v-radio label="رد شده" :value="2"></v-radio>
            </v-radio-group>
          </v-col>
          <v-col
            cols="12"
            md="2"
            sm="2"
            class="d-flex justify-center align-center"
          >
            <v-btn
              color="primary"
              small
              @click="replyComment"
              :disabled="invalidReply"
            >
              پاسخ
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <v-sheet color="grey lighten-3" class="pa-3" v-else>
      <v-skeleton-loader
        class="mx-auto"
        width="100%"
        height="300px"
        type="card"
      ></v-skeleton-loader>
    </v-sheet>
  </div>
</template>
<script>
import showMessage from "@/mixins/showMessage";
export default {
  props: {
    comment: {
      type: Object,
      required: true,
    },
  },
  mixins: [showMessage],
  data() {
    return {
      invalidReply: true,
      invalidComment: false,
      rules: {
        required: (value) => !!value || "مقدار فیلد الزامیست",
        min: (value) =>
          (value && value.length >= 3) || "تعداد حروف کمتر از حد مجاز است",
        max: (value) =>
          (value && value.length <= 256) || "تعداد حروف بیشتراز حد مجاز است",
      },
      newComment: {},
      reply: {
        content: null,
        status: 0,
      },
      loading: false,
    };
  },

  watch: {
    reply: {
      handler(value) {
        if (
          !value.content ||
          value.content.length < 3 ||
          value.content.length > 256
        ) {
          this.invalidReply = true;
        } else {
          this.invalidReply = false;
        }
      },
      deep: true,
    },

    newComment: {
      handler(value) {
        if (
          !value.content ||
          value.content.length < 3 ||
          value.content.length > 256
        ) {
          this.invalidComment = true;
        } else {
          this.invalidComment = false;
        }
      },
      deep: true,
    },
  },
  created() {
    this.newComment = {
      content: this.comment.content,
      status: this.comment.status,
    };
  },

  methods: {
    async replyComment() {
      this.loading = true;
      this.reply["parent_id"] = this.comment.id;
      let type = this.comment.model.data.type;

      await this.$axios
        .post(
          `panel/${type}/${this.comment.model.data.id}/comments`,
          this.reply
        )
        .then((res) => {
          this.showMessage("success", ".پیغام شما ثبت شد");
          this.$router.push("/panel/comments");
        })
        .catch((err) => console.log(err));
      this.loading = false;
    },
    async updateComment() {
      this.loading = true;
      let data = {
        content: this.newComment.content,
        status: this.newComment.status,
      };

      let type = this.comment.model.data.type;

      await this.$axios
        .put(
          `panel/${type}/${this.comment.model.data.id}/comments/${this.comment.id}`,
          data
        )
        .then((res) => {
          if (res.status === 204) {
            this.showMessage("success", ".پیغام انتخابی ویرایش شد");
            this.$router.push("/panel/comments");
          }
        })
        .catch((err) => console.log(err));
      this.loading = false;
    },
  },
};
</script>
<style lang=""></style>
