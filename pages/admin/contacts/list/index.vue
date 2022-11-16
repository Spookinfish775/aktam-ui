<template>
  <div>
    <ContactsDataGrid />
  </div>
</template>

<script lang="ts">
import Vue from "vue";

import ContactsDataGrid from "../../../../components/contacts/list/data-grid/index.vue";

export default Vue.extend({
  middleware: ["auth", "notAdmin"],
  components: {
    ContactsDataGrid,
  },
});
</script>