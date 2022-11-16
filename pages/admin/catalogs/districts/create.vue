<template>
  <div class="create-district-page">
    <div class="create-district-page-header">
      <h2>{{ $t("pageHeader.pageTitles.districtCreate") }}</h2>
      <DistrictCreate
        @successedSaved="successedSaved"
        @errorSaved="errorSaved"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

import DistrictCreate from "../../../../components/catalog-page/districts/card/district-create.vue";

export default Vue.extend({
  middleware: ["notAdmin"],
  components: {
    DistrictCreate,
  },
  methods: {
    successedSaved() {
      this.$router.push("/admin/catalogs/districts");
    },
    errorSaved() {
      this.$router.push("/admin/catalogs/districts");
    },
  },
});
</script>

<style lang="scss">
.create-district-page {
  width: 100%;
  .create-district-page-header {
    margin-top: 14px;
    h2 {
      font-size: 24px !important;
    }
  }
}
</style>