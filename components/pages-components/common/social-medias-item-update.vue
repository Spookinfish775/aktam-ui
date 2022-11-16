<template>
  <div>
    <DxForm ref="social-media-form" :form-data.sync="updatedData">
      <DxSimpleItem
        data-field="socialMediaType"
        editor-type="dxSelectBox"
        :editor-options="socialMediaTypeOptions"
      >
        <DxLabel :text="$t('shopPage.shopCard.socialMediaType')" />
      </DxSimpleItem>
      <DxSimpleItem data-field="url" editor-type="dxTextBox">
        <DxLabel :text="$t('shopPage.shopCard.socialMediaUrl')" />
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

import { SocialMediaTypes } from "../../../infrastructure/data-sources/SocialMediaTypes";
import { SelectBoxPropertiesWithLocalData } from "../../../infrastructure/components-properties/SelectBox/SelectBoxPropertiesWithLocalData";

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
    socialMediaTypeOptions() {
      return new SelectBoxPropertiesWithLocalData({
        dataSource: SocialMediaTypes(this),
        showClearButton: false,
        placeholder: "Выбор социальной сети",
      });
    },
    saveButtonOptions() {
      return {
        text: this.$t("labels.buttons.save"),
        type: "default",
        onClick: () => {
          this.$emit("socialUpdated", this.updatedData);
        },
      };
    },
  },
});
</script>