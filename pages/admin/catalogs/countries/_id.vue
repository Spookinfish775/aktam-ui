<template>
  <div class="update-country-page">
    <div class="update-country-page-header">
      <h2>{{ $t("pageHeader.pageTitles.countryUpdate") }}</h2>
      <CountryCard
        :countryData="countryData"
        @successedUpdated="successedUpdated"
        @errorUpdated="errorUpdated"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

import { dataApi } from "../../../../static/dataApi";

import CountryCard from "../../../../components/catalog-page/countries/card/country-card.vue";

export default Vue.extend({
  middleware: ["notAdmin"],
  components: {
    CountryCard,
  },
  async asyncData({ $axios, route }) {
    const { data } = await $axios.get(`${dataApi.country}/${route.params.id}`);
    return { countryData: data };
  },
  methods: {
    successedUpdated() {
      this.$router.push("/admin/catalogs/countries");
    },
    errorUpdated() {
      this.$router.push("/admin/catalogs/countries");
    },
  },
});
</script>

<style lang="scss">
.update-country-page {
  width: 100%;
  .update-country-page-header {
    margin-top: 14px;
    h2 {
      font-size: 24px !important;
    }
  }
}
</style>