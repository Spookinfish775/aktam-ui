<template>
  <div class="banner-update-card">
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
          :path="hasImage"
          @imageDeleted="deleteImage(bannerData.image)"
        />
      </template>
      <!-- TEMPLATES GROUP -->
    </DxForm>
    <div class="save-button" @click="updateBanner">
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

import { BannersUpdate } from "../../../infrastructure/classes/BannersUpdate";
import { BannerTypes } from "../../../infrastructure/data-sources/BannerTypes";
import { SelectBoxPropertiesWithLocalData } from "../../../infrastructure/components-properties/SelectBox/SelectBoxPropertiesWithLocalData";

import ShopSelectBox from "../../../components/pages-components/common/shop-select-box/shop-select-box-template.vue";
import ImageUploader from "../../../components/pages-components/common/avatar.vue";
import { updateLocale } from "moment";

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
  props: {
    bannerData: {
      type: Object,
      required: true,
    },
  },
  data() {
    let formData: BannersUpdate = new BannersUpdate(
      this.bannerData.id,
      this.bannerData.bannerType,
      this.bannerData.url,
      this.bannerData.shopId
    );
    let photoData = new FormData();

    return {
      formData,
      photoData,
      imageUploaded: false,
    };
  },
  computed: {
    hasImage() {
      if (this.bannerData.image !== null) {
        return this.bannerData.image.directoryThumbnails;
      } else {
        return null;
      }
    },
    bannerTypeOptions() {
      return new SelectBoxPropertiesWithLocalData({
        dataSource: BannerTypes(this),
        showClearButton: false,
        readOnly: true,
      });
    },
  },

  methods: {
    throwShopIdToFormData(shopId) {
      if (shopId) {
        this.formData.shopId = shopId;
      } else {
        this.formData.shopId = null;
      }
    },
    setPhoto(image: File) {
      this.photoData = new FormData();
      this.photoData.append("image", image);
      this.imageUploaded = true;
    },
    async removeImage() {
      this.$awn.asyncBlock(
        this.$axios.delete(
          `${this.$dataApi.image.imageCRUD}/${this.bannerData.image.id}`
        )
      ),
        (e) => {
          this.$awn.success();
        },
        (e) => {
          this.$awn.alert();
        };
    },
    deleteImage(image) {
      if (image) {
        this.removeImage();
      }

      this.bannerData.null = null;
      this.photoData = new FormData();
      this.imageUploaded = false;
    },

    async createImage() {
      this.photoData.append("bannerId", this.bannerData.id);
      await this.$axios.post(this.$dataApi.image.imageCRUD, this.photoData);
    },

    async updateImage() {
      this.photoData.append("bannerId", this.bannerData.id);
      this.photoData.append("id", this.bannerData.image.id);
      await this.$axios.put(this.$dataApi.image.imageCRUD, this.photoData);
    },

    updateBanner() {
      let result = this.$refs["form"].instance.validate();
      if (this.formData.url == "") {
        this.formData.url = null;
      }
      if (result.isValid) {
        this.$awn.asyncBlock(
          this.$axios.put(this.$dataApi.banner, this.formData),
          (e) => {
            if (this.bannerData.image && this.imageUploaded) {
              this.updateImage();
            } else if (!this.bannerData.image && this.imageUploaded) {
              this.createImage();
            }
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
.banner-update-card {
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