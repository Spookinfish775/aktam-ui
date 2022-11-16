<template>
  <div class="contacts-page">
    <div class="contacts-page-header">
      <h2>{{ $t("pageHeader.pageTitles.contacts") }}</h2>
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

import { contactsNavigation } from "../../../infrastructure/navigation/contacts-navigation";

import NavItem from "../../../components/pages-components/nav-item.vue";

export default Vue.extend({
  middleware: ["auth", "notAdmin"],
  components: {
    NavItem,
  },
  computed: {
    navigationLinks() {
      return contactsNavigation(this);
    },
  },
});
</script>

<style lang="scss">
.contacts-page {
  .contacts-page-header {
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