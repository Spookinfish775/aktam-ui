<template>
  <div class="banner-page">
    <BannersDataGrid />
  </div>
</template>

<script lang="ts">
import Vue from "vue";

import BannersDataGrid from "../../../components/banners/data-grid/index.vue";

export default Vue.extend({
  middleware: ["notAdmin"],
  components: {
    BannersDataGrid,
  },
});
</script>

<style lang="scss">
.banner-page {
  width: 100%;
  height: 98%;
  .banner-page-header {
    margin-top: 14px;
    width: 100%;
    h2 {
      font-size: 24px !important;
    }
  }
}
</style>