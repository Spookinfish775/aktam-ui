<template>
  <div class="my-category-create-form">
    <DxForm ref="form" :form-data.sync="formData">
      <DxGroupItem :col-count="5">
        <DxSimpleItem data-field="photo" template="avatar" :col-span="1">
          <DxRequiredRule :message="$t('labels.ruleErrors.basic')" />
          <DxLabel :text="$t('categoriesPage.card.avatar')" />
        </DxSimpleItem>
        <DxGroupItem :col-span="4">
          <DxSimpleItem
            data-field="nameRu"
            data-type="string"
            editor-type="dxTextBox"
          >
            <DxRequiredRule :message="$t('labels.ruleErrors.basic')" />
            <DxLabel :text="$t('categoriesPage.card.nameRu')" />
          </DxSimpleItem>
          <DxSimpleItem
            data-field="nameEn"
            data-type="string"
            editor-type="dxTextBox"
          >
            <DxRequiredRule :message="$t('labels.ruleErrors.basic')" />
            <DxLabel :text="$t('categoriesPage.card.nameEn')" />
          </DxSimpleItem>
          <DxSimpleItem
            data-field="nameTm"
            data-type="string"
            editor-type="dxTextBox"
          >
            <DxRequiredRule :message="$t('labels.ruleErrors.basic')" />
            <DxLabel :text="$t('categoriesPage.card.nameTm')" />
          </DxSimpleItem>
          <DxSimpleItem
            data-field="parrentId"
            editor-type="dxSelectBox"
            :editorOptions="parrentCategoryOptions"
          >
            <DxLabel :text="$t('categoriesPage.card.parrentCategory')" />
          </DxSimpleItem>
        </DxGroupItem>
      </DxGroupItem>

      <template #avatar>
        <Avatar
          @valueChanged="
            (data) => {
              setAvatar(data);
            }
          "
          @imageDeleted="deleteImage"
        />
      </template>
    </DxForm>
    <div class="save-button" @click="saveCategory">
      <span>{{ $t("categoriesPage.card.saveButton") }}</span>
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
import { Categories } from "../../../../infrastructure/classes/Categories";
import { SelectBoxPropertiesWithDataSource } from "../../../../infrastructure/components-properties/SelectBox/SelectBoxPropertiesWithDataSource";
import { nullableGUID } from "../../../../nullableGUID";

import Avatar from "../../../../components/pages-components/common/avatar.vue";

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
    Avatar,
  },
  data() {
    let formData: Categories = new Categories();
    let photoData = new FormData();

    return {
      formData,
      photoData,
      imageUploaded: false,
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
    setAvatar(image: File) {
      this.photoData.append("image", image);
      this.imageUploaded = true;
    },
    deleteImage() {
      this.photoData = new FormData();
      this.imageUploaded = false;
    },

    async saveCategory() {
      let result = this.$refs["form"].instance.validate();

      if (result.isValid) {
        this.$awn.asyncBlock(
          this.$axios.post(this.$dataApi.category, this.formData),
          (e) => {
            if (this.imageUploaded && !this.formData.parrentId) {
              this.photoData.append("categoryId", e.data.id);
              this.$axios.post(this.$dataApi.image.imageCRUD, this.photoData);
            }
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
.dx-group-colcount-1 {
  padding-left: 0 !important;
}
.my-category-create-form {
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