<template>
  <div class="update-service-page">
    <div class="update-service-page-header">
      <h2>{{ $t("pageHeader.pageTitles.serviceUpdate") }}</h2>
    </div>
    <ServiceCard
      :serviceData="serviceData"
      @successedUpdated="successedUpdated"
      @errorUpdated="errorUpdated"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";

import { dataApi } from "../../../../static/dataApi";

import ServiceCard from "../../../../components/product-and-services/services/card/service-card.vue";

export default Vue.extend({
  middleware: ["user"],
  components: {
    ServiceCard,
  },
  async asyncData({ $axios, route }) {
    const { data } = await $axios.get(
      `${dataApi.storeService}/${route.params.id}`
    );
    return { serviceData: data };
  },
  methods: {
    successedUpdated() {
      this.$router.push("/admin/products-and-services/services");
    },
    errorUpdated(error) {
      console.log(error);
    },
  },
});
</script>

<style lang="scss">
.update-service-page {
  width: 100%;
  .update-service-page-header {
    margin-top: 14px;
    h2 {
      font-size: 24px !important;
    }
  }
}
</style>