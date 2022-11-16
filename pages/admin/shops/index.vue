<template>
  <div>
    <ShopsDataGrid />
  </div>
</template>

<script lang="ts">
import Vue from "vue";

import ShopsDataGrid from "../../../components/shop/data-grid/index.vue";

export default Vue.extend({
  middleware: ["user"],
  components: {
    ShopsDataGrid,
  },
});
</script>

<style lang="scss">
</style>