<template>
  <div>
    <DistrictsDataGrid />
  </div>
</template>

<script>
import DistrictsDataGrid from "../../../../components/catalog-page/districts/data-grid/index.vue";

export default {
  middleware: ["notAdmin"],
  components: {
    DistrictsDataGrid,
  },
};
</script>

<style lang="scss" scoped>
</style>