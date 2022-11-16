<template>
  <div class="country-create-card">
    <DxForm ref="countryForm" :form-data.sync="countryFormData">
      <DxSimpleItem
        data-field="nameRu"
        data-type="string"
        editor-type="dxTextBox"
      >
        <DxRequiredRule :message="$t('labels.ruleErrors.basic')" />
        <DxLabel :text="$t('counriesAndCitiesCards.country.nameRu')" />
      </DxSimpleItem>
      <DxSimpleItem
        data-field="nameEn"
        data-type="string"
        editor-type="dxTextBox"
      >
        <DxRequiredRule :message="$t('labels.ruleErrors.basic')" />
        <DxLabel :text="$t('counriesAndCitiesCards.country.nameEn')" />
      </DxSimpleItem>
      <DxSimpleItem
        data-field="nameTm"
        data-type="string"
        editor-type="dxTextBox"
      >
        <DxRequiredRule :message="$t('labels.ruleErrors.basic')" />
        <DxLabel :text="$t('counriesAndCitiesCards.country.nameTm')" />
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

import { Countries } from "../../../../infrastructure/classes/Countries";

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
    countryData: {
      type: Object,
      required: true,
    },
  },
  data() {
    let countryFormData: Countries = new Countries(
      this.countryData.id,
      this.countryData.nameRu,
      this.countryData.nameEn,
      this.countryData.nameTm
    );

    return {
      countryFormData,
    };
  },
  computed: {
    saveButtonOptions() {
      return {
        text: this.$t("labels.buttons.save"),
        type: "default",
        onClick: () => {
          this.saveCountry();
        },
      };
    },
  },
  methods: {
    async saveCountry() {
      let result = this.$refs["countryForm"].instance.validate();

      if (result.isValid) {
        this.$awn.asyncBlock(
          this.$axios.put(this.$dataApi.country, this.countryFormData),
          (e) => {
            this.$awn.success();
            this.$emit("successedUpdated");
          },
          (e) => {
            this.$awn.alert();
            this.$emit("errorUpdated");
          }
        );
      }
    },
  },
});
</script>

<style lang="scss">
.country-create-card {
  margin-top: 20px;
  width: 100%;
  word-wrap: break-word !important;
  background-color: $body-background-color;
  padding: 20px;
  border-radius: 4px;
}
</style>