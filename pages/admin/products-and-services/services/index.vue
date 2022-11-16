<template>
  <div>
    <ServicesDatagrid />
  </div>
</template>

<script lang="ts">
import Vue from "vue";

import ServicesDatagrid from "../../../../components/product-and-services/services/data-grid/index.vue";

export default Vue.extend({
  middleware: ["user"],
  components: {
    ServicesDatagrid,
  },
});
</script>

<style lang="scss">
</style>