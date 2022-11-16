<template>
  <div class="city-create-card">
    <DxLoadPanel
      :visible.sync="isLoading"
      :shading="true"
      shading-color="rgba(0,0,0,0.8)"
      :show-pane="true"
    />
    <DxForm ref="cityForm" :form-data.sync="cityFormData">
      <DxSimpleItem
        data-field="nameRu"
        data-type="string"
        editor-type="dxTextBox"
      >
        <DxRequiredRule :message="$t('labels.ruleErrors.basic')" />
        <DxLabel :text="$t('counriesAndCitiesCards.city.nameRu')" />
      </DxSimpleItem>
      <DxSimpleItem
        data-field="nameEn"
        data-type="string"
        editor-type="dxTextBox"
      >
        <DxRequiredRule :message="$t('labels.ruleErrors.basic')" />
        <DxLabel :text="$t('counriesAndCitiesCards.city.nameEn')" />
      </DxSimpleItem>
      <DxSimpleItem
        data-field="nameTm"
        data-type="string"
        editor-type="dxTextBox"
      >
        <DxRequiredRule :message="$t('labels.ruleErrors.basic')" />
        <DxLabel :text="$t('counriesAndCitiesCards.city.nameTm')" />
      </DxSimpleItem>
      <DxSimpleItem
        data-field="districtId"
        editor-type="dxSelectBox"
        :editorOptions="parrentDistrictOptions"
      >
        <DxLabel :text="$t('counriesAndCitiesCards.city.parrentRegion')" />
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
import { Cities } from "../../../../infrastructure/classes/Cities";

import DxForm, {
  DxGroupItem,
  DxSimpleItem,
  DxButtonItem,
  DxLabel,
  DxEmailRule,
  DxRequiredRule,
  DxCompareRule,
} from "devextreme-vue/form";
import { DxLoadPanel } from "devextreme-vue/load-panel";

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
    DxLoadPanel,
  },
  data() {
    let cityFormData: Cities = new Cities();

    return {
      cityFormData,
      isLoading: false,
    };
  },
  computed: {
    saveButtonOptions() {
      return {
        text: this.$t("labels.buttons.save"),
        type: "default",
        onClick: () => {
          this.saveCity();
        },
      };
    },
    parrentDistrictOptions() {
      return new SelectBoxPropertiesWithDataSource(this, {
        loadUrl: this.$dataApi.district,
        readOnly: false,
        displayExpr: "nameRu",
        valueExpr: "id",
      });
    },
  },
  methods: {
    async saveCity() {
      let result = this.$refs["cityForm"].instance.validate();

      if (result.isValid) {
        this.$awn.asyncBlock(
          this.$axios.post(this.$dataApi.city, this.cityFormData),
          (e) => {
            this.$awn.success();
            this.$emit("successedSaved");
          },
          (e) => {
            this.$awn.alert();
          }
        );
      }
    },
  },
});
</script>

<style lang="scss">
.city-create-card {
  margin-top: 20px;
  width: 100%;
  word-wrap: break-word !important;
  background-color: $body-background-color;
  padding: 20px;
  border-radius: 4px;
}
</style>