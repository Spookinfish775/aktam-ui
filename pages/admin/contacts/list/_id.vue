<template>
  <div class="update-contact-page">
    <div class="update-contact-page-header">
      <h2>{{ $t("pageHeader.pageTitles.contactUpdate") }}</h2>
    </div>
    <ContactCard
      :contactData="contactData"
      @successedUpdated="successedUpdated"
      @errorUpdated="errorUpdated"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";

import { dataApi } from "~/static/dataApi";

import ContactCard from "../../../../components/contacts/list/card/contact-card.vue";

export default Vue.extend({
  middleware: ["auth", "notAdmin"],
  components: {
    ContactCard,
  },
  async asyncData({ $axios, route }) {
    const { data } = await $axios.get(`${dataApi.contact}/${route.params.id}`);
    return { contactData: data };
  },
  methods: {
    successedUpdated() {
      this.$router.push("/admin/contacts/list");
    },
    errorUpdated(error) {
      console.log(error);
    },
  },
});
</script>

<style lang="scss">
.update-contact-page {
  width: 100%;
  .update-contact-page-header {
    margin-top: 14px;
    h2 {
      font-size: 24px !important;
    }
  }
}
</style>