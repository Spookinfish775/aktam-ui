<template>
  <div>
    <DxToolbar class="my-base-toolbar">
      <DxItem location="before" template="page-title" />
      <template #page-title>
        <div class="my-page-title">
          <h2>{{ pageTitle }}</h2>
        </div>
      </template>

      <DxItem
        v-if="canCreate"
        cssClass="my-create-button"
        location="before"
        widget="dxButton"
        :options="createButtonOptions"
      />
      <!-- <DxItem
        cssClass="my-delete-button"
        location="before"
        widget="dxButton"
        :options="deleteButtonOptions"
      /> -->
    </DxToolbar>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

import DxToolbar, { DxItem } from "devextreme-vue/toolbar";

export default Vue.extend({
  components: {
    DxToolbar,
    DxItem,
  },
  props: {
    pageTitle: {
      type: String,
      default: null,
    },
    canCreate: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    createButtonOptions() {
      return {
        icon: "mdi mdi-plus-circle",
        type: "default",
        visible: true,
        text: this.$t("pageHeader.buttons.create"),
        onClick: () => this.$emit("onCreate"),
      };
    },
    deleteButtonOptions() {
      return {
        icon: "mdi mdi-minus-circle",
        type: "danger",
        visible: true,
        text: this.$t("pageHeader.buttons.delete"),
        onClick: () => this.$emit("onDelete"),
      };
    },
  },
});
</script>

<style lang="scss">
.dx-button-text {
  text-transform: initial;
  font-weight: 700;
  font-size: 16px;
}

// .my-create-button {

// }

.my-base-toolbar {
  .my-page-title {
    width: 200px;
    h2 {
      font-size: 24px;
      font-weight: 700;
      color: $main-text-color;
      // margin-right: 120px;
    }
  }
}
</style>