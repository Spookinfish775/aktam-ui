<template>
  <div class="create-product-from-page">
    <div class="create-product-from-page-heder">
      <!-- <h2>{{ $t("pageHeader.pageTitles.productCreate") }}</h2> -->
    </div>

    <ProductCreate
      :productData="productData"
      :categoryReadOnly="true"
      :shopIdReadOnly="true"
      @successedSaved="successedSaved"
      @errorSaved="errorSaved"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";

import { dataApi } from "../../../../static/dataApi";

import ProductCreate from "../../../../components/product-and-services/products/card/product-create.vue";

export default Vue.extend({
  middleware: ["user"],
  components: {
    ProductCreate,
  },
  async asyncData({ $axios, query }) {
    const { data } = await $axios.get(
      `${dataApi.product}/${query.productSlug}`
    );
    return { productData: data };
  },
  methods: {
    successedSaved() {
      this.$router.push(
        `/admin/products-and-services/products/${this.productData.slug}`
      );
    },
    errorSaved(error) {
      console.log(error);
    },
  },
});
</script>

<style lang="scss">
.create-product-from-page {
  width: 100%;
  .create-product-from-page-heder {
    margin-top: 14px;
    h2 {
      font-size: 24px !important;
    }
  }
}
</style>