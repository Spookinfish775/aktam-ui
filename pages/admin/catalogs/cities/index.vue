<template>
  <div>
    <CitiesDataGrid />
  </div>
</template>

<script>
import CitiesDataGrid from "../../../../components/catalog-page/cities/data-grid/index.vue";

export default {
  middleware: ["notAdmin"],
  components: {
    CitiesDataGrid,
  },
};
</script>

<style lang="scss" scoped>
</style>