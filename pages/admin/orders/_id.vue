<template>
  <div class="order-page">
    <div class="order-header">
      <h2>{{ $t("order.card.order") }}</h2>
    </div>
    <OrderCard
      :orderData="orderData"
      @successedStatusChanged="successedStatusChanged"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";

import { dataApi } from "../../../static/dataApi";

import OrderCard from "../../../components/orders/card/order-card.vue";

export default Vue.extend({
  middleware: ["user"],
  components: {
    OrderCard,
  },
  async asyncData({ $axios, route }) {
    const { data } = await $axios.get(`${dataApi.order}/${route.params.id}`);

    return { orderData: data };
  },

  methods: {
    successedStatusChanged() {
      this.$router.push("/admin/orders");
    },
  },
});
</script>

<style lang="scss">
.order-page {
  width: 100%;
  .order-header {
    margin-top: 14px;
    h2 {
      font-size: 24px !important;
    }
  }
}
</style>