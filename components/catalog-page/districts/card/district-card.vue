<template>
  <div class="district-create-card">
    <DxForm ref="districtForm" :form-data.sync="districtFormData">
      <DxSimpleItem
        data-field="nameRu"
        data-type="string"
        editor-type="dxTextBox"
      >
        <DxRequiredRule :message="$t('labels.ruleErrors.basic')" />
        <DxLabel :text="$t('counriesAndCitiesCards.district.nameRu')" />
      </DxSimpleItem>
      <DxSimpleItem
        data-field="nameEn"
        data-type="string"
        editor-type="dxTextBox"
      >
        <DxRequiredRule :message="$t('labels.ruleErrors.basic')" />
        <DxLabel :text="$t('counriesAndCitiesCards.district.nameEn')" />
      </DxSimpleItem>
      <DxSimpleItem
        data-field="nameTm"
        data-type="string"
        editor-type="dxTextBox"
      >
        <DxRequiredRule :message="$t('labels.ruleErrors.basic')" />
        <DxLabel :text="$t('counriesAndCitiesCards.district.nameTm')" />
      </DxSimpleItem>
      <DxSimpleItem
        data-field="countryId"
        editor-type="dxSelectBox"
        :editorOptions="parrentCountryOptions"
      >
        <DxLabel :text="$t('counriesAndCitiesCards.district.parrentCountry')" />
      </DxSimpleItem>
      <DxButtonItem
        :button-options="saveButtonOptions"
        horizontalAlignment="left"
      />
    </DxForm>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

import { SelectBoxPropertiesWithDataSource } from "../../../../infrastructure/components-properties/SelectBox/SelectBoxPropertiesWithDataSource";
import { Districts } from "../../../../infrastructure/classes/Districts";

import DxForm, {
  DxGroupItem,
  DxSimpleItem,
  DxButtonItem,
  DxLabel,
  DxEmailRule,
  DxRequiredRule,
  DxCompareRule,
} from "devextreme-vue/form";

export default Vue.extend({
  components: {
    DxForm,
    DxGroupItem,
    DxSimpleItem,
    DxButtonItem,
    DxLabel,
    DxEmailRule,
    DxRequiredRule,
    DxCompareRule,
  },
  props: {
    districtData: {
      type: Object,
      required: true,
    },
  },
  data() {
    let districtFormData: Districts = new Districts(
      this.districtData.id,
      this.districtData.nameRu,
      this.districtData.nameEn,
      this.districtData.nameTm,
      this.districtData.countryId
    );

    return {
      districtFormData,
    };
  },
  computed: {
    saveButtonOptions() {
      return {
        text: this.$t("labels.buttons.save"),
        type: "default",
        onClick: () => {
          this.saveDistrict();
        },
      };
    },
    parrentCountryOptions() {
      return new SelectBoxPropertiesWithDataSource(this, {
        loadUrl: this.$dataApi.country,
        readOnly: false,
        displayExpr: "nameRu",
        valueExpr: "id",
      });
    },
  },
  methods: {
    async saveDistrict() {
      let result = this.$refs["districtForm"].instance.validate();

      if (result.isValid) {
        this.$awn.asyncBlock(
          this.$axios.put(this.$dataApi.district, this.districtFormData),
          (e) => {
            this.$awn.success();
            this.$emit("successedUpdated");
          },
          (e) => {
            this.$awn.alert();
            this.$emit("errorUpdated");
          }
        );

        // try {
        //   await this.$axios.put(this.$dataApi.district, this.districtFormData);
        //   this.$notification(this).showMessage({
        //     text: this.$t("labels.notificationSucces"),
        //     type: "success",
        //   });
        //   this.$emit("successedUpdated");
        // } catch (error) {
        //   this.$emit("errorUpdated");
        //   throw this.$notification(this).showMessage({
        //     text: this.$t("labels.notificationError"),
        //     type: "error",
        //   });
        // }
      }
    },
  },
});
</script>

<style lang="scss">
.district-create-card {
  margin-top: 20px;
  width: 100%;
  word-wrap: break-word !important;
  background-color: $body-background-color;
  padding: 20px;
  border-radius: 4px;
}
</style>