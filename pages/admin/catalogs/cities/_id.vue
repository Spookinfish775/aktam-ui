<template>
  <div class="update-city-page">
    <div class="update-city-page-header">
      <h2>{{ $t("pageHeader.pageTitles.cityUpdate") }}</h2>
      <CityCard
        :cityData="cityData"
        @successedUpdated="successedUpdated"
        @errorUpdated="errorUpdated"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

import { dataApi } from "../../../../static/dataApi";

import CityCard from "../../../../components/catalog-page/cities/card/city-card.vue";

export default Vue.extend({
  middleware: ["notAdmin"],
  components: {
    CityCard,
  },
  async asyncData({ $axios, route }) {
    const { data } = await $axios.get(`${dataApi.city}/${route.params.id}`);
    return { cityData: data };
  },
  methods: {
    successedUpdated() {
      this.$router.push("/admin/catalogs/cities");
    },
    errorUpdated() {
      this.$router.push("/admin/catalogs/cities");
    },
  },
});
</script>

<style lang="scss">
.update-city-page {
  width: 100%;
  .update-city-page-header {
    margin-top: 14px;
    h2 {
      font-size: 24px !important;
    }
  }
}
</style>