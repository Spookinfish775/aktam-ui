<template>
  <div>
    <CategoriesDataGrid />
  </div>
</template>

<script lang="ts">
import Vue from "vue";

import CategoriesDataGrid from "../../../components/catalog-page/categories/data-grid/tree.vue";

export default Vue.extend({
  middleware: ["notAdmin"],
  components: {
    CategoriesDataGrid,
  },
});
</script>