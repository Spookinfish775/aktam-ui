<template>
  <div class="catalogs-page">
    <div class="catalogs-page-header">
      <h2>{{ $t("pageHeader.pageTitles.catalogs") }}</h2>
    </div>
    <div class="nav-links">
      <div
        class="my-nav-link"
        v-for="(item, index) in navigationLinks"
        :key="index"
      >
        <NavItem :item="item" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

import { catalogsNavigation } from "../../../infrastructure/navigation/catalogue-navigation";

import NavItem from "../../../components/pages-components/nav-item.vue";

export default Vue.extend({
  middleware: ["notAdmin"],
  components: {
    NavItem,
  },
  computed: {
    navigationLinks() {
      return catalogsNavigation(this);
    },
  },
});
</script>

<style lang="scss">
.catalogs-page {
  .catalogs-page-header {
    margin-top: 14px;
    width: 100%;
    h2 {
      font-size: 24px !important;
    }
  }
  .nav-links {
    margin-top: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .my-nav-link {
      margin: 10px 0;
      width: 48%;
    }
  }
}
</style>