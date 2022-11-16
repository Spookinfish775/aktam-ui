<template>
  <div class="update-shop-page">
    <div class="update-shop-page-header">
      <h2>{{ $t("pageHeader.pageTitles.shopUpdate") }}</h2>
      <ShopCard
        :shopData="shopData"
        @successedUpdated="successedUpdated"
        @errorUpdated="errorUpdated"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

import { dataApi } from "../../../static/dataApi";

import ShopCard from "../../../components/shop/card/shop-card.vue";

export default Vue.extend({
  middleware: ["user"],
  components: {
    ShopCard,
  },
  async asyncData({ $axios, route }) {
    const { data } = await $axios.get(`${dataApi.shop}/${route.params.id}`);
    return { shopData: data };
  },
  methods: {
    successedUpdated() {
      this.$router.push("/admin/shops");
    },
    errorUpdated(error) {
      console.log(error);
    },
  },
});
</script>

<style lang="scss">
.update-shop-page {
  width: 100%;
  .update-shop-page-header {
    margin-top: 14px;
    h2 {
      font-size: 24px !important;
    }
  }
}
</style>