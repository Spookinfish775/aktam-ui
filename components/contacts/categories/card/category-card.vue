<template>
  <div class="my-contact-category-update-form">
    <DxForm ref="form" :form-data.sync="formData">
      <DxSimpleItem
        data-field="nameRu"
        data-type="string"
        editor-type="dxTextBox"
      >
        <DxRequiredRule :message="$t('labels.ruleErrors.basic')" />
        <DxLabel :text="$t('contacts.category.card.nameRu')" />
      </DxSimpleItem>
      <DxSimpleItem
        data-field="nameEn"
        data-type="string"
        editor-type="dxTextBox"
      >
        <DxRequiredRule :message="$t('labels.ruleErrors.basic')" />
        <DxLabel :text="$t('contacts.category.card.nameEn')" />
      </DxSimpleItem>
      <DxSimpleItem
        data-field="nameTm"
        data-type="string"
        editor-type="dxTextBox"
      >
        <DxRequiredRule :message="$t('labels.ruleErrors.basic')" />
        <DxLabel :text="$t('contacts.category.card.nameTm')" />
      </DxSimpleItem>
      <DxSimpleItem
        v-if="formData.parrentId != nullableGUID"
        data-field="parrentId"
        editor-type="dxSelectBox"
        :editorOptions="parrentCategoryOptions"
      >
        <DxLabel :text="$t('contacts.category.card.parrentCategory')" />
      </DxSimpleItem>
    </DxForm>
    <div class="save-button" @click="saveCategory">
      <span>{{ $t("contacts.category.card.saveButton") }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

import DxForm, {
  DxGroupItem,
  DxSimpleItem,
  DxButtonItem,
  DxLabel,
  DxEmailRule,
  DxRequiredRule,
  DxCompareRule,
} from "devextreme-vue/form";
import { DxAutocomplete } from "devextreme-vue/autocomplete";
import { CategoriesUpdate } from "../../../../infrastructure/classes/CategoriesUpdate";
import { SelectBoxPropertiesWithDataSource } from "../../../../infrastructure/components-properties/SelectBox/SelectBoxPropertiesWithDataSource";
import { nullableGUID } from "../../../../nullableGUID";

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
    DxAutocomplete,
  },
  props: {
    categoryData: {
      type: Object,
      required: true,
    },
  },
  data() {
    let formData: CategoriesUpdate = new CategoriesUpdate(
      this.categoryData.id,
      this.categoryData.nameRu,
      this.categoryData.nameEn,
      this.categoryData.nameTm,
      this.categoryData.parrentId
    );
    return {
      formData,
      nullableGUID,
    };
  },
  computed: {
    parrentCategoryOptions() {
      return new SelectBoxPropertiesWithDataSource(this, {
        loadUrl: this.$dataApi.category,
        readOnly: false,
        filter: ["parrentId", "=", `${nullableGUID}`],
        displayExpr: "nameRu",
        valueExpr: "id",
      });
    },
  },
  methods: {
    async saveCategory() {
      let result = this.$refs["form"].instance.validate();
      if (result.isValid) {
        this.$awn.asyncBlock(
          this.$axios.put(this.$dataApi.contactCategory, this.formData),
          (e) => {
            this.$awn.success();
            this.$emit("successedUpdated");
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
.my-contact-category-update-form {
  position: relative;
  .save-button {
    width: 100%;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: $main-button-color;
    border-radius: 4px;
    color: $content-background-color;
    font-size: 14px;
    font-weight: 700;
    transition: 0.4s;
    margin-top: 30px;
    margin-bottom: 30px;
    cursor: pointer;
    &:hover {
      background-color: rgba($color: $main-button-color, $alpha: 0.9);
      color: white;
    }
    &:active {
      background-color: rgba($color: $main-button-color, $alpha: 1);
      transform: scale(0.992);
    }
  }
}
</style>