<template>
  <div class="create-country-page">
    <div class="create-country-page-header">
      <h2>{{ $t("pageHeader.pageTitles.countryCreate") }}</h2>
      <CountryCreate
        @successedSaved="successedSaved"
        @errorSaved="errorSaved"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

import CountryCreate from "../../../../components/catalog-page/countries/card/country-create.vue";

export default Vue.extend({
  middleware: ["notAdmin"],
  components: {
    CountryCreate,
  },
  methods: {
    successedSaved() {
      this.$router.push("/admin/catalogs/countries");
    },
    errorSaved() {
      this.$router.push("/admin/catalogs/countries");
    },
  },
});
</script>

<style lang="scss">
.create-country-page {
  width: 100%;
  .create-country-page-header {
    margin-top: 14px;
    h2 {
      font-size: 24px !important;
    }
  }
}
</style>