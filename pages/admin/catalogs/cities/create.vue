<template>
  <div class="create-city-page">
    <div class="create-city-page-header">
      <h2>{{ $t("pageHeader.pageTitles.cityCreate") }}</h2>
      <CityCreate @successedSaved="successedSaved" @errorSaved="errorSaved" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

import CityCreate from "../../../../components/catalog-page/cities/card/city-create.vue";

export default Vue.extend({
  middleware: ["notAdmin"],
  components: {
    CityCreate,
  },
  methods: {
    successedSaved() {
      this.$router.push("/admin/catalogs/cities");
    },
    errorSaved() {
      this.$router.push("/admin/catalogs/cities");
    },
  },
});
</script>

<style lang="scss">
.create-city-page {
  width: 100%;
  .create-city-page-header {
    margin-top: 14px;
    h2 {
      font-size: 24px !important;
    }
  }
}
</style>