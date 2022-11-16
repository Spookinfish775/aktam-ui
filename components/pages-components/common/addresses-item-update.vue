<template>
  <div>
    <DxForm ref="addresses-form" :form-data.sync="updatedData">
      <DxSimpleItem
        data-field="nameRu"
        data-type="string"
        editor-type="dxTextBox"
      >
        <DxLabel :text="$t('labels.addresses.addressRu')" />
      </DxSimpleItem>
      <DxSimpleItem
        data-field="nameEn"
        data-type="string"
        editor-type="dxTextBox"
      >
        <DxLabel :text="$t('labels.addresses.addressEn')" />
      </DxSimpleItem>
      <DxSimpleItem
        data-field="nameTm"
        data-type="string"
        editor-type="dxTextBox"
      >
        <DxLabel :text="$t('labels.addresses.addressTm')" />
      </DxSimpleItem>
      <DxSimpleItem
        data-field="coordinates"
        data-type="string"
        editor-type="dxTextBox"
      >
        <DxLabel :text="$t('labels.addresses.coordinates')" />
      </DxSimpleItem>
      <DxButtonItem
        :button-options="saveButtonOptions"
        horizontalAlignment="center"
      />
    </DxForm>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

import DxForm, {
  DxGroupItem,
  DxSimpleItem,
  DxButtonItem,
  DxLabel,
} from "devextreme-vue/form";
import DxButton from "devextreme-vue/button";

export default Vue.extend({
  components: {
    DxForm,
    DxGroupItem,
    DxSimpleItem,
    DxButtonItem,
    DxLabel,
    DxButton,
  },
  props: {
    itemData: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      updatedData: this.itemData,
    };
  },
  computed: {
    saveButtonOptions() {
      return {
        text: this.$t("labels.buttons.save"),
        type: "default",
        onClick: () => {
          this.$emit("addressUpdated", this.updatedData);
        },
      };
    },
  },
});
</script>
