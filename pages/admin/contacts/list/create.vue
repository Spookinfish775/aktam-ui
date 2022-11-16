<template>
  <div class="create-contact-page">
    <div class="create-contact-page-header">
      <h2>{{ $t("pageHeader.pageTitles.contactCreate") }}</h2>
    </div>
    <ContactCreate @successedSaved="successedSaved" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import ContactCreate from "~/components/contacts/list/card/contact-create.vue";

export default Vue.extend({
  middleware: ["auth", "notAdmin"],
  components: { ContactCreate },
  methods: {
    successedSaved() {
      this.$router.push("/admin/contacts/list");
    },
    errorSaved(error) {
      console.log(error);
    },
  },
});
</script>

<style lang="scss">
.create-contact-page {
  width: 100%;
  .create-contact-page-header {
    margin-top: 14px;
    h2 {
      font-size: 24px !important;
    }
  }
}
</style>