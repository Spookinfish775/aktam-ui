<template>
  <div class="create-product-page">
    <div class="create-product-page-header">
      <h2>{{ $t("pageHeader.pageTitles.productCreate") }}</h2>
    </div>
    <ProductCreate @successedSaved="successedSaved" @errorSaved="errorSaved" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";

import ProductCreate from "../../../../components/product-and-services/products/card/product-create.vue";

export default Vue.extend({
  middleware: ["user"],
  components: {
    ProductCreate,
  },
  methods: {
    successedSaved() {
      this.$router.push("/admin/products-and-services/products");
    },
    errorSaved(error) {
      console.log(error);
    },
  },
});
</script>

<style lang="scss">
.create-product-page {
  width: 100%;
  .create-product-page-header {
    margin-top: 14px;
    h2 {
      font-size: 24px !important;
    }
  }
}
</style>