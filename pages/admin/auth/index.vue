<template>
  <div class="auth-page-wrapper">
    <AuthCard />
  </div>
</template>

<script lang="ts">
import Vue from "vue";

import AuthCard from "../../../components/auth/card.vue";

export default Vue.extend({
  layout: "auth",
  components: {
    AuthCard,
  },
});
</script>

<style lang="scss">
.auth-page-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
</style>