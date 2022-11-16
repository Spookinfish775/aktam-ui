<template>
  <div class="update-banner-page">
    <div class="update-banner-page-header">
      <h2>{{ $t("pageHeader.pageTitles.bannersUpdate") }}</h2>
    </div>
    <BannerCard
      :bannerData="bannerData"
      @successedUpdated="successedUpdated"
      @errorUpdated="errorUpdated"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";

import { dataApi } from "../../../static/dataApi";

import BannerCard from "../../../components/banners/card/banner-card.vue";

export default Vue.extend({
  middleware: ["notAdmin"],
  components: {
    BannerCard,
  },
  async asyncData({ $axios, route }) {
    const { data } = await $axios.get(`${dataApi.banner}/${route.params.id}`);
    return { bannerData: data };
  },
  methods: {
    successedUpdated() {
      this.$router.push("/admin/banners");
    },
    errorUpdated() {
      this.$router.push("/admin/banners");
    },
  },
});
</script>

<style lang="scss">
.update-banner-page {
  width: 100%;
  .update-banner-page-header {
    margin-top: 14px;
    h2 {
      font-size: 24px !important;
    }
  }
}
</style>