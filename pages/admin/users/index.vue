<template>
  <div>
    <UserDataGrid />
  </div>
</template>

<script lang="ts">
import Vue from "vue";

import UserDataGrid from "../../../components/user/data-grid/index.vue";

export default Vue.extend({
  middleware: ["notAdmin"],
  components: {
    UserDataGrid,
  },
});
</script>