<template>
  <div class="create-shop-page">
    <div class="create-shop-page-header">
      <h2>{{ $t("shopPage.shopCard.createTitle") }}</h2>
    </div>
    <ShopCreate @successedSaved="successedSaved" @errorSaved="errorSaved" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";

import ShopCreate from "../../../components/shop/card/shop-create.vue";

export default Vue.extend({
  middleware: ["user"],
  components: {
    ShopCreate,
  },
  methods: {
    successedSaved() {
      this.$router.push("/admin/shops");
    },
    errorSaved(error) {
      console.log(error);
    },
  },
});
</script>

<style lang="scss">
.create-shop-page {
  width: 100%;
  .create-shop-page-header {
    margin-top: 14px;
    h2 {
      font-size: 24px !important;
    }
  }
}
</style>