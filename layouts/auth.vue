<template>
  <div class="dx-viewport auth-layout" id="root">
    <div class="content">
      <div class="header">
        <LanguageSwitcher />
      </div>
      <transition name="route">
        <nuxt />
      </transition>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

import LanguageSwitcher from "../components/layout/language-switcher.vue";

export default Vue.extend({
  components: {
    LanguageSwitcher,
  },
});
</script>

<style lang="scss">
.auth-layout {
  background-color: $body-background-color !important;
  .content {
    display: flex;
    flex-direction: column;
    .header {
      width: 100%;
      padding: 20px;
      display: flex;
      justify-content: flex-end;
    }
  }
}
</style>