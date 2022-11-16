<template>
  <div>
    <CategoriesDataGrid />
  </div>
</template>

<script lang="ts">
import Vue from "vue";

import CategoriesDataGrid from "../../../../components/contacts/categories/data-grid/three.vue";

export default Vue.extend({
  middleware: ["auth", "notAdmin"],
  components: {
    CategoriesDataGrid,
  },
});
</script>