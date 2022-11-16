<template>
  <div class="create-service-page">
    <div class="create-service-page-header">
      <h2>{{ $t("pageHeader.pageTitles.serviceCreate") }}</h2>
    </div>
    <ServiceCreate @successedSaved="successedSaved" @errorSaved="errorSaved" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";

import ServiceCreate from "../../../../components/product-and-services/services/card/service-create.vue";

export default Vue.extend({
  middleware: ["user"],
  components: {
    ServiceCreate,
  },
  methods: {
    successedSaved() {
      this.$router.push("/admin/products-and-services/services");
    },
    errorSaved(error) {
      console.log(error);
    },
  },
});
</script>

<style lang="scss">
.create-service-page {
  width: 100%;
  .create-service-page-header {
    margin-top: 14px;
    h2 {
      font-size: 24px !important;
    }
  }
}
</style>