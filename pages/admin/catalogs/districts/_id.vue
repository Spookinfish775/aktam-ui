<template>
  <div class="update-district-page">
    <div class="update-district-page-header">
      <h2>{{ $t("pageHeader.pageTitles.districtUpdate") }}</h2>
      <DistrictCard
        :districtData="districtData"
        @successedUpdated="successedUpdated"
        @errorUpdated="errorUpdated"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

import { dataApi } from "../../../../static/dataApi";

import DistrictCard from "../../../../components/catalog-page/districts/card/district-card.vue";

export default Vue.extend({
  middleware: ["notAdmin"],
  components: {
    DistrictCard,
  },
  async asyncData({ $axios, route }) {
    const { data } = await $axios.get(`${dataApi.district}/${route.params.id}`);
    return { districtData: data };
  },
  methods: {
    successedUpdated() {
      this.$router.push("/admin/catalogs/districts");
    },
    errorUpdated() {
      this.$router.push("/admin/catalogs/districts");
    },
  },
});
</script>

<style lang="scss">
.update-district-page {
  width: 100%;
  .update-district-page-header {
    margin-top: 14px;
    h2 {
      font-size: 24px !important;
    }
  }
}
</style>