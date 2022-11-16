<template>
  <div class="banner-create-card">
    <DxForm ref="form" :col-count="1" :form-data.sync="formData">
      <!-- BANNER TYPE -->
      <DxSimpleItem
        data-field="bannerType"
        data-type="number"
        editor-type="dxSelectBox"
        :editor-options="bannerTypeOptions"
      >
        <DxRequiredRule :message="$t('labels.ruleErrors.basic')" />
        <DxLabel :text="$t('banners.typeOfBanner')" />
      </DxSimpleItem>
      <!-- BANNER TYPE -->

      <!-- LINKS GROUP -->
      <DxGroupItem :caption="$t('banners.createBanner.chooseOneLink')">
        <DxSimpleItem
          data-field="url"
          data-type="string"
          editor-type="dxTextBox"
        >
          <DxLabel :text="$t('banners.createBanner.url')" />
        </DxSimpleItem>
        <DxSimpleItem data-field="shopId" template="shopIdSelectBox">
          <DxLabel :text="$t('banners.createBanner.shopId')" />
        </DxSimpleItem>
      </DxGroupItem>
      <!-- LINKS GROUP -->

      <!-- IMAGE GROUP -->
      <DxSimpleItem data-field="image" template="photo" :col-span="1">
        <DxLabel :text="$t('banners.createBanner.banner')" />
      </DxSimpleItem>
      <!-- IMAGE GROUP -->

      <!-- TEMPLATES GROUP -->
      <template #shopIdSelectBox>
        <ShopSelectBox
          tabindex="0"
          :disabled="false"
          :showDropDownButton="false"
          :shopId="formData.shopId"
          @shopIdChanged="throwShopIdToFormData"
        />
      </template>

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
      <!-- TEMPLATES GROUP -->
    </DxForm>
    <div class="save-button" @click="saveBanner">
      <span>{{ $t("banners.createBanner.save") }}</span>
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

import { Banners } from "../../../infrastructure/classes/Banners";
import { BannerTypes } from "../../../infrastructure/data-sources/BannerTypes";
import { SelectBoxPropertiesWithLocalData } from "../../../infrastructure/components-properties/SelectBox/SelectBoxPropertiesWithLocalData";

import ShopSelectBox from "../../../components/pages-components/common/shop-select-box/shop-select-box-template.vue";
import ImageUploader from "../../../components/pages-components/common/avatar.vue";

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
    ShopSelectBox,
    ImageUploader,
  },
  data() {
    let formData: Banners = new Banners();
    let photoData = new FormData();

    return {
      formData,
      photoData,
      imageUploaded: false,
    };
  },
  computed: {
    bannerTypeOptions() {
      return new SelectBoxPropertiesWithLocalData({
        dataSource: BannerTypes(this),
        showClearButton: false,
      });
    },
  },
  methods: {
    throwShopIdToFormData(shopId) {
      this.formData.shopId = shopId;
    },
    setPhoto(image: File) {
      this.photoData = new FormData();
      this.photoData.append("image", image);
      this.imageUploaded = true;
    },
    deleteImage() {
      this.servicePhotoData = new FormData();
      this.photoUploaded = false;
    },
    saveBanner() {
      let result = this.$refs["form"].instance.validate();
      if (this.formData.shopId == "") {
        this.formData.shopId = null;
      } else if (this.formData.url == "") {
        this.formData.url = null;
      }
      if (result.isValid) {
        this.$awn.asyncBlock(
          this.$axios.post(this.$dataApi.banner, this.formData),
          (e) => {
            if (this.imageUploaded) {
              this.photoData.append("bannerId", e.data.id);
              this.$axios.post(this.$dataApi.image.imageCRUD, this.photoData);
            }
            this.$awn.success();
            this.$emit("successedSaved");
          },
          (e) => {
            this.$awn.alert();
            this.$emit("errorSaved");
          }
        );
      }
    },
  },
});
</script>

<style lang="scss">
.banner-create-card {
  margin-top: 20px;
  width: 100%;
  word-wrap: break-word !important;
  background-color: $body-background-color;
  padding: 20px;
  border-radius: 4px;
  .dx-form-group-caption {
    color: $second-link-color !important;
    font-size: 16px;
  }
}
</style>