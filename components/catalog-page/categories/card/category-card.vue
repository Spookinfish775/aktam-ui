<template>
  <div class="my-category-update-form">
    <DxForm ref="form" :form-data.sync="formData">
      <DxGroupItem :col-count="5">
        <DxSimpleItem
          v-if="formData.parrentId == nullableGUID"
          data-field="photo"
          template="avatar"
          :col-span="1"
        >
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
            v-if="formData.parrentId != nullableGUID"
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
          :path="hasImage"
          @imageDeleted="deleteImage(categoryData.image)"
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
import { CategoriesUpdate } from "../../../../infrastructure/classes/CategoriesUpdate";
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
    let photoData = new FormData();

    return {
      formData,
      photoData,
      imageUploaded: false,
      nullableGUID,
    };
  },
  computed: {
    hasImage() {
      if (this.categoryData.image !== null) {
        return this.categoryData.image.directoryThumbnails;
      } else {
        return null;
      }
    },
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
    async removeImage() {
      this.$awn.asyncBlock(
        this.$axios.delete(
          `${this.$dataApi.image.imageCRUD}/${this.categoryData.image.id}`
        ),
        (e) => {
          this.$awn.success();
        },
        (e) => {
          this.$awn.alert();
        }
      );
    },
    deleteImage(image) {
      if (image) {
        this.removeImage();
      }
      this.categoryData.image = null;
      this.photoData = new FormData();
      this.imageUploaded = false;
    },

    async createImage() {
      this.photoData.append("categoryId", this.categoryData.id);
      await this.$axios.post(this.$dataApi.image.imageCRUD, this.photoData);
    },
    async updateImage() {
      this.photoData.append("categoryId", this.categoryData.image.categoryId);
      this.photoData.append("id", this.categoryData.image.id);
      await this.$axios.put(this.$dataApi.image.imageCRUD, this.photoData);
    },

    async saveCategory() {
      let result = this.$refs["form"].instance.validate();
      if (result.isValid) {
        this.$awn.asyncBlock(
          this.$axios.put(this.$dataApi.category, this.formData),
          (e) => {
            if (this.categoryData.image && this.imageUploaded) {
              this.updateImage();
            } else if (!this.categoryData.image && this.imageUploaded) {
              this.createImage();
            }
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
.dx-group-colcount-1 {
  padding-left: 0 !important;
}
.my-category-update-form {
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