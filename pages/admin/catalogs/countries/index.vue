<template>
  <div>
    <CountriesDataGrid />
  </div>
</template>

<script>
import CountriesDataGrid from "../../../../components/catalog-page/countries/data-grid/index.vue";

export default {
  middleware: ["notAdmin"],
  components: {
    CountriesDataGrid,
  },
};
</script>

<style lang="scss" scoped>
</style>