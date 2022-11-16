<template>
  <div class="shop-update-card">
    <DxForm ref="form" col-count="3" :form-data.sync="formData">
      <!-- images group info -->

      <DxGroupItem :col-span="3" :col-count="3">
        <DxSimpleItem :col-span="1" data-field="shopLogo" template="shopLogo">
          <DxLabel :text="$t('shopPage.shopCard.avatar')" />
        </DxSimpleItem>
        <DxSimpleItem
          :col-span="1"
          data-field="shopBanner"
          template="shopBanner"
        >
          <DxLabel :text="$t('shopPage.shopCard.banner')" />
        </DxSimpleItem>
        <DxSimpleItem
          :col-span="1"
          data-field="shopMobileBanner"
          template="shopMobileBanner"
        >
          <DxLabel :text="$t('shopPage.shopCard.mobileBanner')" />
        </DxSimpleItem>
      </DxGroupItem>

      <DxGroupItem :col-span="3" :col-count="3">
        <!-- name group info -->

        <DxGroupItem :col-span="1" v-if="isAdmin">
          <DxSimpleItem data-field="nameRu" editor-type="dxTextBox">
            <DxRequiredRule :message="$t('labels.ruleErrors.basic')" />
            <DxLabel :text="$t('shopPage.shopCard.nameRu')" />
          </DxSimpleItem>
          <DxSimpleItem data-field="nameEn" editor-type="dxTextBox">
            <DxLabel :text="$t('shopPage.shopCard.nameEn')" />
          </DxSimpleItem>
          <DxSimpleItem data-field="nameTm" editor-type="dxTextBox">
            <DxLabel :text="$t('shopPage.shopCard.nameTm')" />
          </DxSimpleItem>
        </DxGroupItem>
        <DxGroupItem :col-span="1" v-else>
          <DxSimpleItem data-field="nameRu" editor-type="dxTextBox">
            <DxRequiredRule :message="$t('labels.ruleErrors.basic')" />
            <DxLabel :text="$t('shopPage.shopCard.name')" />
          </DxSimpleItem>
        </DxGroupItem>

        <!-- location group info -->

        <DxGroupItem>
          <DxSimpleItem
            data-field="countryId"
            editor-type="dxSelectBox"
            :editor-options="countryOptions"
          >
            <DxRequiredRule :message="$t('labels.ruleErrors.basic')" />
            <DxLabel :text="$t('shopPage.shopCard.country')" />
          </DxSimpleItem>
          <DxSimpleItem
            data-field="districtId"
            editor-type="dxSelectBox"
            :editor-options="districtOptions"
          >
            <DxRequiredRule :message="$t('labels.ruleErrors.basic')" />
            <DxLabel :text="$t('shopPage.shopCard.district')" />
          </DxSimpleItem>
          <DxSimpleItem
            data-field="cityId"
            editor-type="dxSelectBox"
            :editor-options="cityOptions"
          >
            <DxRequiredRule :message="$t('labels.ruleErrors.basic')" />
            <DxLabel :text="$t('shopPage.shopCard.city')" />
          </DxSimpleItem>
        </DxGroupItem>

        <!-- contact group info -->

        <DxGroupItem>
          <DxSimpleItem data-field="email" editor-type="dxTextBox">
            <DxRequiredRule :message="$t('labels.ruleErrors.basic')" />
            <DxEmailRule :message="$t('labels.ruleErrors.emailInvalid')" />
            <DxLabel :text="$t('shopPage.shopCard.email')" />
          </DxSimpleItem>
          <DxSimpleItem data-field="userId" template="userIdSelectBox">
            <DxRequiredRule :message="$t('labels.ruleErrors.basic')" />
            <DxLabel :text="$t('shopPage.shopCard.owner')" />
          </DxSimpleItem>
        </DxGroupItem>
      </DxGroupItem>

      <!-- addresses and phones group info -->

      <DxGroupItem :col-span="3" :col-count="3">
        <DxSimpleItem data-field="socialMedias" template="socialMediaList">
          <DxLabel :text="$t('shopPage.shopCard.socialMedia')" />
        </DxSimpleItem>
        <DxSimpleItem data-field="addresses" template="addressesList">
          <DxLabel :text="$t('shopPage.shopCard.addresses')" />
        </DxSimpleItem>
        <DxSimpleItem data-field="phoneNumbers" template="phonesList">
          <DxLabel :text="$t('shopPage.shopCard.phoneNumber')" />
        </DxSimpleItem>
      </DxGroupItem>

      <!-- description group info -->

      <DxGroupItem :col-span="3" :col-count="3" v-if="isAdmin">
        <DxSimpleItem data-field="descriptionRu" editor-type="dxTextArea">
          <DxRequiredRule :message="$t('labels.ruleErrors.basic')" />
          <DxLabel :text="$t('shopPage.shopCard.descriptionRu')" />
        </DxSimpleItem>
        <DxSimpleItem data-field="descriptionEn" editor-type="dxTextArea">
          <DxLabel :text="$t('shopPage.shopCard.descriptionEn')" />
        </DxSimpleItem>
        <DxSimpleItem data-field="descriptionTm" editor-type="dxTextArea">
          <DxLabel :text="$t('shopPage.shopCard.descriptionTm')" />
        </DxSimpleItem>
      </DxGroupItem>

      <DxGroupItem :col-span="3" :col-count="3" v-else>
        <DxSimpleItem
          :col-span="3"
          data-field="descriptionRu"
          editor-type="dxTextArea"
        >
          <DxRequiredRule :message="$t('labels.ruleErrors.basic')" />
          <DxLabel :text="$t('shopPage.shopCard.description')" />
        </DxSimpleItem>
      </DxGroupItem>

      <!-- category and endTime group info -->

      <DxSimpleItem
        :col-span="3"
        data-field="categoryIds"
        data-type="array"
        editor-type="dxTagBox"
        :editor-options="categoryOptions"
      >
        <DxRequiredRule :message="$t('labels.ruleErrors.basic')" />
        <DxLabel :text="$t('shopPage.shopCard.categories')" />
      </DxSimpleItem>

      <DxSimpleItem
        :col-span="3"
        data-field="endStoresPaymentPeriod"
        editor-type="dxDateBox"
        :editor-options="endDateOptions"
      >
        <DxRequiredRule :message="$t('labels.ruleErrors.basic')" />
        <DxLabel :text="$t('shopPage.shopCard.paymentIsValid')" />
      </DxSimpleItem>

      <template #userIdSelectBox>
        <UserSelectBox
          tabindex="0"
          :disabled="!isAdmin"
          :showDropDownButton="false"
          :userId="formData.userId"
          @userIdChanged="throwUserIdToFormData"
        >
        </UserSelectBox>
      </template>
      <template #addressesList>
        <AddressesList
          :items="formData.addresses"
          @addressAdded="throwAddresToFormData"
          @itemDeleted="addressItemDelete"
        />
      </template>
      <template #phonesList>
        <PhonesListBox
          :items="formData.phoneNumbers"
          @phoneAdded="throwPhonesToFormData"
          @itemDeleted="phoneItemDelete"
        />
      </template>
      <template #socialMediaList>
        <SocialMediaList
          :items="formData.socialMedias"
          @socialMediaAdded="throwSocialMediaToFormData"
          @itemDeleted="socialMediaItemDelete"
        />
      </template>
      <template #shopLogo>
        <ImageUploader
          :height="`170px`"
          :width="`100%`"
          :id="`shopLogo`"
          @valueChanged="
            (data) => {
              setShopLogo(data);
            }
          "
          :path="hasLogo"
          @imageDeleted="deleteShopLogo(shopLogoForDeleting)"
        />
      </template>
      <template #shopBanner>
        <ImageUploader
          :height="`170px`"
          :width="`100%`"
          :id="`shopBanner`"
          @valueChanged="
            (data) => {
              setShopBanner(data);
            }
          "
          :path="hasBanner"
          @imageDeleted="deleteShopBanner(shopBannerForDeleting)"
        />
      </template>
      <template #shopMobileBanner>
        <ImageUploader
          :height="`170px`"
          :width="`100%`"
          :id="`shopMobileBanner`"
          @valueChanged="
            (data) => {
              setShopMobileBanner(data);
            }
          "
          :path="hasMobileBanner"
          @imageDeleted="deleteShopMobileBanner(shopMobileBannerForDeleting)"
        />
      </template>
    </DxForm>
    <div class="save-button" @click="updateShop">
      <span>{{ $t("labels.shopSaveButton") }}</span>
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
import { DxAutocomplete } from "devextreme-vue/autocomplete";

import { SelectBoxPropertiesWithLocalData } from "../../../infrastructure/components-properties/SelectBox/SelectBoxPropertiesWithLocalData";
import { SelectBoxPropertiesWithDataSource } from "../../../infrastructure/components-properties/SelectBox/SelectBoxPropertiesWithDataSource";
import { TagBoxPropertiesWithDataSource } from "../../../infrastructure/components-properties/TagBox/TagBoxPropertiesWithDataSource";
import { DateBoxProperties } from "../../../infrastructure/components-properties/DateBoxProperties";
import { ShopsUpdate } from "../../../infrastructure/classes/ShopsUpdate";
import { UserRole } from "../../../infrastructure/enums/UserRole";
import { ShopPhotoType } from "../../../infrastructure/enums/ShopPhotoType";

import ImageUploader from "../../../components/pages-components/common/avatar.vue";
import AddressesList from "../../../components/pages-components/common/addresses-list-box.vue";
import PhonesListBox from "../../../components/pages-components/common/phones-list-box.vue";
import SocialMediaList from "../../../components/pages-components/common/social-medias-box.vue";
import UserSelectBox from "../../../components/pages-components/common/user-select-box/user-select-box-template.vue";

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
    DxAutocomplete,
    ImageUploader,
    AddressesList,
    PhonesListBox,
    SocialMediaList,
    UserSelectBox,
  },
  props: {
    shopData: {
      type: Object,
      required: true,
    },
  },
  data() {
    let formData: ShopsUpdate = new ShopsUpdate(
      this.shopData.id,
      this.shopData.nameRu,
      this.shopData.nameEn,
      this.shopData.nameTm,
      this.shopData.descriptionRu,
      this.shopData.descriptionEn,
      this.shopData.descriptionTm,
      this.shopData.email,
      this.shopData.endStoresPaymentPeriod,
      this.shopData.country.id,
      this.shopData.city.id,
      this.shopData.district.id,
      this.shopData.userId,
      this.shopData.phoneNumbers,
      this.shopData.addresses,
      this.shopData.categories,
      this.shopData.socialMedias
    );
    formData.setAddresses(this.shopData.addresses);
    formData.setPhoneNumbers(this.shopData.phoneNumbers);
    formData.setSocialMedias(this.shopData.socialMedias);
    let shopLogoData = new FormData();
    let shopBannerData = new FormData();
    let shopMobileBannerData = new FormData();
    return {
      formData,
      currentCountryId: this.shopData.country.id,
      currentDistrictId: this.shopData.district.id,
      shopLogoData,
      shopBannerData,
      shopMobileBannerData,
      logoUploaded: false,
      bannerUploaded: false,
      mobileBannerUploaded: false,
    };
  },
  computed: {
    isAdmin() {
      return this.$store.getters["auth/isAdmin"];
    },
    hasLogo() {
      let imageIs = this.shopData.images.find(
        (item) => item.shopPhotoType == ShopPhotoType.Logo
      );
      if (imageIs) {
        return imageIs.directoryThumbnails;
      } else {
        return null;
      }
    },
    hasBanner() {
      let imageIs = this.shopData.images.find(
        (item) => item.shopPhotoType == ShopPhotoType.ShopBanner
      );
      if (imageIs) {
        return imageIs.directoryThumbnails;
      } else {
        return null;
      }
    },
    hasMobileBanner() {
      let imageIs = this.shopData.images.find(
        (item) => item.shopPhotoType == ShopPhotoType.MobileShopBanner
      );
      if (imageIs) {
        return imageIs.directoryThumbnails;
      } else {
        return null;
      }
    },

    shopLogoForDeleting() {
      let image = this.shopData.images.find(
        (item) => item.shopPhotoType == ShopPhotoType.Logo
      );
      if (image) {
        return image;
      } else {
        return null;
      }
    },
    shopBannerForDeleting() {
      let image = this.shopData.images.find(
        (item) => item.shopPhotoType == ShopPhotoType.ShopBanner
      );
      if (image) {
        return image;
      } else {
        return null;
      }
    },
    shopMobileBannerForDeleting() {
      let image = this.shopData.images.find(
        (item) => item.shopPhotoType == ShopPhotoType.MobileShopBanner
      );
      if (image) {
        return image;
      } else {
        return null;
      }
    },

    countryOptions() {
      return new SelectBoxPropertiesWithDataSource(this, {
        loadUrl: this.$dataApi.country,
        readOnly: false,
        displayExpr: "nameRu",
        valueExpr: "id",
        searchEnabled: true,
        searchExpr: `${"nameRu" || "nameEn" || "nameTm"}`,
        placeholder: "Выбор страны",
        onValueChanged: (e) => {
          this.currentCountryId = e.value;
          this.formData.districtId = null;
          this.formData.cityId = null;
        },
      });
    },
    districtOptions() {
      return new SelectBoxPropertiesWithDataSource(this, {
        loadUrl: this.$dataApi.district,
        readOnly: false,
        displayExpr: "nameRu",
        valueExpr: "id",
        searchEnabled: true,
        searchExpr: `${"nameRu" || "nameEn" || "nameTm"}`,
        placeholder: "Выбор региона",
        filter: ["countryId", "=", `${this.currentCountryId}`],
        onValueChanged: (e) => {
          this.currentDistrictId = e.value;
          this.formData.cityId = null;
        },
      });
    },
    cityOptions() {
      return new SelectBoxPropertiesWithDataSource(this, {
        loadUrl: this.$dataApi.city,
        readOnly: false,
        displayExpr: "nameRu",
        valueExpr: "id",
        searchEnabled: true,
        searchExpr: `${"nameRu" || "nameEn" || "nameTm"}`,
        placeholder: "Выбор города",
        filter: ["districtId", "=", `${this.currentDistrictId}`],
      });
    },
    endDateOptions() {
      return new DateBoxProperties({
        dateSerializationFormat: "yyyy-MM-ddTHH:mm:ss",
        type: "date",
        applyValueMode: "instantly",
        readOnly: this.$store.getters["auth/isAdmin"] ? false : true,
        onValueChanged(e) {
          console.log(e);
        },
      });
    },
    categoryOptions() {
      return new TagBoxPropertiesWithDataSource(this, {
        loadUrl: this.$dataApi.category,
        displayExpr: "nameRu",
        valueExpr: "this",
        searchEnabled: true,
        searchExpr: `${"nameRu" || "nameEn" || "nameTm"}`,
        placeholder: "Выбор категорий",
        showDropDownButton: true,
      });
    },
  },
  methods: {
    throwUserIdToFormData(userId) {
      this.formData.userId = userId;
    },
    // OPERATIONS WITH ABSTRACT IMAGES

    removeImageFromReceivedData(image) {
      let indexOfImage = this.shopData.images.indexOf(image);
      if (indexOfImage !== -1) {
        this.shopData.images.splice(indexOfImage, 1);
      }
    },
    async removeImage(image) {
      this.$awn.asyncBlock(
        this.$axios.delete(`${this.$dataApi.image.imageCRUD}/${image.id}`),
        (e) => {
          this.$awn.success();
        },
        (e) => {
          this.$awn.alert();
        }
      );
    },

    // OPERATIONS WITH ABSTRACT IMAGES

    // OPERATIONS WITH SHOP LOGO IMAGES

    setShopLogo(image: File) {
      this.shopLogoData = new FormData();
      this.shopLogoData.append("image", image);
      this.logoUploaded = true;
    },
    deleteShopLogo(image) {
      if (image) {
        this.removeImage(image);
      }
      this.removeImageFromReceivedData(image);
      this.shopLogoData = new FormData();
      this.logoUploaded = false;
    },

    // OPERATIONS WITH SHOP LOGO IMAGES

    // OPERATIONS WITH SHOP BANNER IMAGES

    setShopBanner(image: File) {
      this.shopBannerData = new FormData();
      this.shopBannerData.append("image", image);
      this.bannerUploaded = true;
    },
    deleteShopBanner(image) {
      if (image) {
        this.removeImage(image);
      }
      this.removeImageFromReceivedData(image);
      this.shopBannerData = new FormData();
      this.bannerUploaded = false;
    },

    // OPERATIONS WITH SHOP BANNER IMAGES

    // OPERATIONS WITH SHOP MOBILE BANNER IMAGES

    setShopMobileBanner(image: File) {
      this.shopMobileBannerData = new FormData();
      this.shopMobileBannerData.append("image", image);
      this.mobileBannerUploaded = true;
    },
    deleteShopMobileBanner(image) {
      if (image) {
        this.removeImage(image);
      }
      this.removeImageFromReceivedData(image);
      this.shopMobileBannerData = new FormData();
      this.mobileBannerUploaded = false;
    },

    // OPERATIONS WITH SHOP MOBILE BANNER IMAGES

    getCategoryIds(item) {
      return [item.id].join(" ");
    },

    throwAddresToFormData(addresses) {
      this.formData.addresses = addresses;
    },
    throwPhonesToFormData(phones) {
      this.formData.phoneNumbers = phones;
    },
    throwSocialMediaToFormData(socialMedias) {
      this.formData.socialMedias = socialMedias;
    },

    addressItemDelete(value) {
      this.formData.addresses = this.formData.addresses.filter(
        (item) => item.id !== value
      );
    },
    phoneItemDelete(value) {
      this.formData.phoneNumbers = this.formData.phoneNumbers.filter(
        (item) => item.id !== value
      );
    },
    socialMediaItemDelete(value) {
      this.formData.socialMedias = this.formData.socialMedias.filter(
        (item) => item.id !== value
      );
    },

    //
    // getImageId

    // CREATE AND UPDATE SHOP LOGO
    async uploadShopLogo() {
      let shopId = this.shopData.id;

      this.shopLogoData.append("shopId", shopId);
      this.shopLogoData.append("shopPhotoType", ShopPhotoType.Logo);
      await this.$axios.post(this.$dataApi.image.imageCRUD, this.shopLogoData);
    },
    async updateShopLogo() {
      let image = this.shopData.images.find(
        (item) => item.shopPhotoType == ShopPhotoType.Logo
      );

      this.shopLogoData.append("shopId", image.shopId);
      this.shopLogoData.append("id", image.id);
      this.shopLogoData.append("shopPhotoType", ShopPhotoType.Logo);
      await this.$axios.put(this.$dataApi.image.imageCRUD, this.shopLogoData);
    },

    requestToUploadUpdateLogo() {
      let hasShopLogo = this.shopData.images.filter(
        (obj) => obj.shopPhotoType === ShopPhotoType.Logo
      );

      if (hasShopLogo.length === 0) {
        this.uploadShopLogo();
      } else if (hasShopLogo.length > 0) {
        this.updateShopLogo();
      }
    },

    // CREATE AND UPDATE SHOP BANNER
    async uploadShopBanner() {
      let shopId = this.shopData.id;

      this.shopBannerData.append("shopId", shopId);
      this.shopBannerData.append("shopPhotoType", ShopPhotoType.ShopBanner);
      await this.$axios.post(
        this.$dataApi.image.imageCRUD,
        this.shopBannerData
      );
    },
    async updateShopBanner() {
      let image = this.shopData.images.find(
        (item) => item.shopPhotoType == ShopPhotoType.ShopBanner
      );

      this.shopBannerData.append("shopId", image.shopId);
      this.shopBannerData.append("id", image.id);
      this.shopBannerData.append("shopPhotoType", ShopPhotoType.ShopBanner);
      await this.$axios.put(this.$dataApi.image.imageCRUD, this.shopBannerData);
    },

    requestToUploadUpdateBanner() {
      let hasShopBanner = this.shopData.images.filter(
        (obj) => obj.shopPhotoType === ShopPhotoType.ShopBanner
      );

      if (hasShopBanner.length === 0) {
        this.uploadShopBanner();
      } else if (hasShopBanner.length > 0) {
        this.updateShopBanner();
      }
    },

    // CREATE AND UPDATE SHOP MOBILE BANNER
    async uploadShopMobileBanner() {
      let shopId = this.shopData.id;

      this.shopMobileBannerData.append("shopId", shopId);
      this.shopMobileBannerData.append(
        "shopPhotoType",
        ShopPhotoType.MobileShopBanner
      );
      await this.$axios.post(
        this.$dataApi.image.imageCRUD,
        this.shopMobileBannerData
      );
    },
    async updateShopMobileBanner() {
      let image = this.shopData.images.find(
        (item) => item.shopPhotoType == ShopPhotoType.MobileShopBanner
      );

      this.shopMobileBannerData.append("shopId", image.shopId);
      this.shopMobileBannerData.append("id", image.id);
      this.shopMobileBannerData.append(
        "shopPhotoType",
        ShopPhotoType.MobileShopBanner
      );
      await this.$axios.put(
        this.$dataApi.image.imageCRUD,
        this.shopMobileBannerData
      );
    },

    requestToUploadUpdateMobileBanner() {
      let hasShopBanner = this.shopData.images.filter(
        (obj) => obj.shopPhotoType === ShopPhotoType.MobileShopBanner
      );

      if (hasShopBanner.length === 0) {
        this.uploadShopMobileBanner();
      } else if (hasShopBanner.length > 0) {
        this.updateShopMobileBanner();
      }
    },

    // UPDATING SHOP DATA
    async updateShop() {
      let result = this.$refs["form"].instance.validate();
      if (result.isValid) {
        this.formData.categoryIds = this.formData.categoryIds.map(
          this.getCategoryIds
        );

        this.$awn.asyncBlock(
          this.$axios.put(this.$dataApi.shop, this.formData),
          (e) => {
            if (this.logoUploaded) {
              this.requestToUploadUpdateLogo();
            }
            if (this.bannerUploaded) {
              this.requestToUploadUpdateBanner();
            }
            if (this.mobileBannerUploaded) {
              this.requestToUploadUpdateMobileBanner();
            }
            this.$awn.success();
            this.$emit("successedUpdated");
          },
          (e) => {
            this.$awn.alert();
            this.$emit("errorUpdated", e);
          }
        );
      }
    },
  },
});
</script>

<style lang="scss">
.shop-update-card {
  margin-top: 20px;
  width: 100%;
  word-wrap: break-word !important;
  background-color: $body-background-color;
  padding: 20px;
  border-radius: 4px;
}
</style>