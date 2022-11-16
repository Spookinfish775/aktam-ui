<template>
  <div class="create-banner-page">
    <div class="create-banner-page-header">
      <h2>{{ $t("pageHeader.pageTitles.bannersCreate") }}</h2>
    </div>
    <BannerCreate @successedSaved="successedSaved" @errorSaved="errorSaved" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";

import BannerCreate from "../../../components/banners/card/banner-create.vue";

export default Vue.extend({
  middleware: ["notAdmin"],
  components: {
    BannerCreate,
  },
  methods: {
    successedSaved() {
      this.$router.push("/admin/banners");
    },
    errorSaved() {
      this.$router.push("/admin/banners");
    },
  },
});
</script>

<style lang="scss">
.create-banner-page {
  width: 100%;
  .create-banner-page-header {
    margin-top: 14px;
    h2 {
      font-size: 24px !important;
    }
  }
}
</style>