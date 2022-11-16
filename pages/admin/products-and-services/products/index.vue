<template>
  <div>
    <ProductsDataGrid />
  </div>
</template>

<script lang="ts">
import Vue from "vue";

import ProductsDataGrid from "../../../../components/product-and-services/products/data-grid/index.vue";

export default Vue.extend({
  middleware: ["user"],
  components: {
    ProductsDataGrid,
  },
});
</script>

<style lang="scss">
</style>