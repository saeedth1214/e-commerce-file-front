<template>
  <div>
    <TheNav/>
    <br>
    <div v-if="$store.state.card.card.length==0" class="text-center">
      <p>No items just yet. keep shopping</p>
    </div>
    <v-container>
      <div class="mb-3" v-if="$store.state.card.card.length">
        <v-btn nuxt to="/card/confrim" min-width="150" min-height="45" color="primary">Checkout</v-btn>
      </div>
      <v-row>
        <template v-for="(item,Idx) in $store.state.card.card">
          <v-col :key="`cardItem-${Idx}`">
            <v-card color="surface" flat>
              <v-btn @click="$store.commit('card/removeCardItem',Idx)" absolute top right icon>
                <v-icon size="18">mdi-delete</v-icon>
              </v-btn>
              <v-row dense>
                <v-col md="3">
                  <v-img class="rounded-lg" height="220" :src="item.product.thumbnailUrl"></v-img>
                </v-col>
                <v-col class="pl-5 pt-2" md="9">
                  <h2 class="text-md-h6 font-weight-bold">{{item.product.title}} * {{item.quantity}}</h2>
                  <p class="text--primary mt-2">{{$formatMoney(25000 * item.quantity)}}</p>
                  <v-btn @click="$store.commit('card/increaseItemCount',Idx)" icon>
                    <v-icon size="20">mdi-plus-circle</v-icon>
                  </v-btn>
                  <span class="mx-2">{{item.quantity}}</span>
                  <v-btn @click="$store.commit('card/decreaseItemCount',Idx)" icon>
                    <v-icon size="20">mdi-minus-circle</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </template>
      </v-row>
    </v-container>
    <TheFooter/>
    <ScrollTop/>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>
