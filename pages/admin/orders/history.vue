<template>
  <div>
    <OrdersDataGrid :view="true" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";

import OrdersDataGrid from "../../../components/orders/data-grid/index.vue";

export default Vue.extend({
  middleware: ["user"],
  components: {
    OrdersDataGrid,
  },
});
</script>

<style lang="scss">
</style>