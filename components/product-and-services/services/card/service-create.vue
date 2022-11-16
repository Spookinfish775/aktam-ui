<template>
  <div class="service-create-card">
    <DxForm ref="form" :col-count="3" :form-data.sync="formData">
      <!-- PHOTO AND NAME GROUP INFO -->
      <DxGroupItem :col-span="3" :col-count="4">
        <DxGroupItem :col-span="3" :col-count="1" v-if="isAdmin">
          <DxSimpleItem data-field="nameRu" editor-type="dxTextBox">
            <DxRequiredRule :message="$t('labels.ruleErrors.basic')" />
            <DxLabel :text="$t('products.servicesCard.nameRu')" />
          </DxSimpleItem>
          <DxSimpleItem data-field="nameEn" editor-type="dxTextBox">
            <DxRequiredRule :message="$t('labels.ruleErrors.basic')" />
            <DxLabel :text="$t('products.servicesCard.nameEn')" />
          </DxSimpleItem>
          <DxSimpleItem data-field="nameTm" editor-type="dxTextBox">
            <DxRequiredRule :message="$t('labels.ruleErrors.basic')" />
            <DxLabel :text="$t('products.servicesCard.nameTm')" />
          </DxSimpleItem>
        </DxGroupItem>

        <DxGroupItem :col-span="3" :col-count="1" v-else>
          <DxSimpleItem data-field="nameRu" editor-type="dxTextBox">
            <DxRequiredRule :message="$t('labels.ruleErrors.basic')" />
            <DxLabel :text="$t('products.servicesCard.name')" />
          </DxSimpleItem>
        </DxGroupItem>

        <DxSimpleItem data-field="image" template="photo" :col-span="1">
          <DxLabel :text="$t('products.servicesDataGrid.serviceImage')" />
        </DxSimpleItem>
      </DxGroupItem>
      <!-- PHOTO AND NAME GROUP INFO -->

      <!-- DESCRIPTION GROUP INFO -->
      <DxGroupItem :col-span="3" :col-count="3" v-if="isAdmin">
        <DxSimpleItem data-field="descriptionRu" editor-type="dxTextArea">
          <DxRequiredRule :message="$t('labels.ruleErrors.basic')" />
          <DxLabel :text="$t('products.servicesCard.descriptionRu')" />
        </DxSimpleItem>
        <DxSimpleItem data-field="descriptionEn" editor-type="dxTextArea">
          <DxRequiredRule :message="$t('labels.ruleErrors.basic')" />
          <DxLabel :text="$t('products.servicesCard.descriptionEn')" />
        </DxSimpleItem>
        <DxSimpleItem data-field="descriptionTm" editor-type="dxTextArea">
          <DxRequiredRule :message="$t('labels.ruleErrors.basic')" />
          <DxLabel :text="$t('products.servicesCard.descriptionTm')" />
        </DxSimpleItem>
      </DxGroupItem>

      <DxGroupItem :col-span="3" :col-count="1" v-else>
        <DxSimpleItem data-field="descriptionRu" editor-type="dxTextArea">
          <DxRequiredRule :message="$t('labels.ruleErrors.basic')" />
          <DxLabel :text="$t('products.servicesCard.description')" />
        </DxSimpleItem>
      </DxGroupItem>
      <!-- DESCRIPTION GROUP INFO -->

      <!-- SHOP AND CATEGORIES GROUP INFO -->
      <DxGroupItem :col-span="3" :col-count="3">
        <DxSimpleItem
          :col-span="3"
          data-field="shopId"
          template="shopIdSelectBox"
        >
          <DxLabel :text="$t('products.servicesCard.shop')" />
        </DxSimpleItem>
        <DxSimpleItem
          :col-span="3"
          data-field="categoriesId"
          editor-type="dxTagBox"
          :editor-options="categoryOptions"
        >
          <DxRequiredRule :message="$t('labels.ruleErrors.basic')" />
          <DxLabel :text="$t('products.servicesCard.categories')" />
        </DxSimpleItem>
      </DxGroupItem>
      <!-- SHOP AND CATEGORIES GROUP INFO -->

      <!-- TEMPLATES GROUP -->
      <template #photo>
        <ImageUploader
          :height="`170px`"
          :width="`100%`"
          @valueChanged="
            (data) => {
              setPhoto(data);
            }
          "
          @imageDeleted="deleteImage"
        />
      </template>

      <template #shopIdSelectBox>
        <ShopSelectBox tabindex="0" @shopIdChanged="throwShopIdToFormData" />
      </template>
      <!-- TEMPLATES GROUP -->
    </DxForm>
    <div class="save-button" @click="saveService">
      <span>{{ $t("products.servicesCard.saveService") }}</span>
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
import "devextreme-vue/tag-box";
import { DxTextArea } from "devextreme-vue/text-area";

import { SelectBoxPropertiesWithLocalData } from "../../../../infrastructure/components-properties/SelectBox/SelectBoxPropertiesWithLocalData";
import { TagBoxPropertiesWithDataSource } from "../../../../infrastructure/components-properties/TagBox/TagBoxPropertiesWithDataSource";
import { Services } from "../../../../infrastructure/classes/Services";

import ImageUploader from "../../../../components/pages-components/common/avatar.vue";
import ShopSelectBox from "../../../../components/pages-components/common/shop-select-box/shop-select-box-template.vue";

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
    DxTextArea,
    ImageUploader,
    ShopSelectBox,
  },
  data() {
    let formData: Services = new Services();
    let servicePhotoData = new FormData();

    return {
      formData,
      servicePhotoData,
      photoUploaded: false,
    };
  },
  computed: {
    isAdmin() {
      return this.$store.getters["auth/isAdmin"];
    },
    categoryOptions() {
      return new TagBoxPropertiesWithDataSource(this, {
        loadUrl: this.$dataApi.category,
        displayExpr: "nameRu",
        valueExpr: "id",
        readOnly: this.categoryReadOnly,
        searchEnabled: true,
        searchExpr: `${"nameRu" || "nameEn" || "nameTm"}`,
        placeholder: "Выбор категорий",
        showDropDownButton: true,
      });
    },
  },
  methods: {
    setPhoto(image: File) {
      this.servicePhotoData = new FormData();
      this.servicePhotoData.append("image", image);
      this.photoUploaded = true;
    },
    deleteImage() {
      this.servicePhotoData = new FormData();
      this.photoUploaded = false;
    },
    throwShopIdToFormData(shopId) {
      this.formData.shopId = shopId;
    },
    saveService() {
      let result = this.$refs["form"].instance.validate();

      if (result.isValid) {
        this.$awn.asyncBlock(
          this.$axios.post(this.$dataApi.storeService, this.formData),
          (e) => {
            if (this.photoUploaded) {
              this.servicePhotoData.append("storeServiceId", e.data.id);
              this.$axios.post(
                this.$dataApi.image.imageCRUD,
                this.servicePhotoData
              );
            }
            this.$awn.success();
            this.$emit("successedSaved");
          },
          (e) => {
            this.$awn.alert();
            this.$emit("errorSaved", e);
          }
        );
      }
    },
  },
});
</script>

<style lang="scss">
.service-create-card {
  margin-top: 20px;
  width: 100%;
  word-wrap: break-word !important;
  background-color: $body-background-color;
  padding: 20px;
  border-radius: 4px;
}
</style>