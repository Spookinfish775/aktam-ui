<template>
  <div class="my-list-menu">
    <p class="my-list-menu-header-divider">
      {{ $t("navigation.navCategory.firstDivider") }}
    </p>
    <DxList
      :data-source="navigation"
      :active-state-enabled="false"
      :hover-state-enabled="true"
      :focus-state-enabled="false"
    >
      <template #item="{ data: item }">
        <ListMenuItem :item="item" />
      </template>
    </DxList>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

import { navigation } from "~/infrastructure/navigation/navigation";
import { UserRole } from "../../infrastructure/enums/UserRole";

import { DxList } from "devextreme-vue/list";

import ListMenuItem from "~/components/layout/list-menu-item.vue";

export default Vue.extend({
  components: {
    DxList,
    ListMenuItem,
  },
  computed: {
    userInfo() {
      return this.$store.getters["auth/user"];
    },
    navigation() {
      return navigation(this, this.userInfo.role);
    },
  },
});
</script>

<style lang="scss">
a.nuxt-link-exact-active {
  background-color: $main-link-color !important;
  p {
    color: $body-background-color !important;
  }
  .my-icon {
    &::before {
      font-size: 22px;
      color: $body-background-color !important;
    }
  }
}
.my-list-menu {
  width: 100%;
  padding: 0 20px;
  .my-list-menu-header-divider {
    text-transform: uppercase;
    font-size: 14px;
    font-weight: 400;
    color: $nav-divider-color;
    padding-left: 14px;
    margin-top: 36px;
  }
  .dx-list-item {
    margin-top: 20px;
  }
}
</style>