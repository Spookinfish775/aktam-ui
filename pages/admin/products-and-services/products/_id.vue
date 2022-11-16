<template>
  <div class="update-product-page">
    <div class="update-product-page-header">
      <h2>{{ $t("pageHeader.pageTitles.productUpdate") }}</h2>
      <ProductCard
        :productData="productData"
        @successedUpdated="successedUpdated"
        @errorUpdated="errorUpdated"
      />

      <GroupProductDataGrid
        v-if="productData.isMain"
        :groupProductData="productData"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

import { dataApi } from "../../../../static/dataApi";

import ProductCard from "../../../../components/product-and-services/products/card/product-card.vue";
import GroupProductDataGrid from "../../../../components/product-and-services/products/data-grid/product-variation-data-grid.vue";

export default Vue.extend({
  middleware: ["user"],
  components: {
    ProductCard,
    GroupProductDataGrid,
  },
  async asyncData({ $axios, route }) {
    const { data } = await $axios.get(`${dataApi.product}/${route.params.id}`);
    return { productData: data };
  },
  methods: {
    successedUpdated() {
      this.$router.push("/admin/products-and-services/products");
    },
    errorUpdated(error) {
      console.log(error);
    },
  },
});
</script>

<style lang="scss">
.update-product-page {
  width: 100%;
  .update-product-page-header {
    margin-top: 14px;
    h2 {
      font-size: 24px !important;
    }
  }
}
</style>