<template>
  <div class="shop-create-card">
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

        <DxGroupItem :col-span="1">
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

      <DxGroupItem :col-span="3" :col-count="3">
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

      <!-- category and endTime group info -->

      <DxSimpleItem
        :col-span="3"
        data-field="categoryIds"
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
          :disabled="false"
          :showDropDownButton="false"
          :userId="formData.userId"
          @userIdChanged="throwUserIdToFormData"
        >
        </UserSelectBox>
      </template>
      <template #addressesList>
        <AddressesList @addressAdded="throwAddresToFormData" />
      </template>
      <template #phonesList>
        <PhonesListBox @phoneAdded="throwPhonesToFormData" />
      </template>
      <template #socialMediaList>
        <SocialMediaList @socialMediaAdded="throwSocialMediaToFormData" />
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
          @imageDeleted="deleteShopLogo"
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
          @imageDeleted="deleteShopBanner"
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
          @imageDeleted="deleteShopMobileBanner"
        />
      </template>
    </DxForm>
    <div class="save-button" @click="saveShop">
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
import { Shops } from "../../../infrastructure/classes/Shops";
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
  data() {
    let formData: Shops = new Shops();
    let shopLogoData = new FormData();
    let shopBannerData = new FormData();
    let shopMobileBannerData = new FormData();
    return {
      formData,
      shopLogoData,
      shopBannerData,
      shopMobileBannerData,
      logoUploaded: false,
      bannerUploaded: false,
      mobileBannerUploaded: false,
      currentCountryId: null,
      currentDistrictId: null,
    };
  },
  computed: {
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
          this.formData.district = null;
          this.formData.city = null;
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
          this.formData.city = null;
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
        onValueChanged(e) {
          console.log(e);
        },
      });
    },
    categoryOptions() {
      return new TagBoxPropertiesWithDataSource(this, {
        loadUrl: this.$dataApi.category,
        displayExpr: "nameRu",
        valueExpr: "id",
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
    setShopLogo(image: File) {
      this.shopLogoData = new FormData();
      this.shopLogoData.append("image", image);
      this.logoUploaded = true;
    },
    deleteShopLogo() {
      this.shopLogoData = new FormData();
      this.logoUploaded = false;
    },
    setShopBanner(image: File) {
      this.shopBannerData = new FormData();
      this.shopBannerData.append("image", image);
      this.bannerUploaded = true;
    },
    deleteShopBanner() {
      this.shopBannerData = new FormData();
      this.bannerUploaded = false;
    },
    setShopMobileBanner(image: File) {
      this.shopMobileBannerData = new FormData();
      this.shopMobileBannerData.append("image", image);
      this.mobileBannerUploaded = true;
    },
    deleteShopMobileBanner() {
      this.shopMobileBannerData = new FormData();
      this.mobileBannerUploaded = false;
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

    async uploadShopLogo(shopId) {
      this.shopLogoData.append("shopId", shopId);
      this.shopLogoData.append("ShopPhotoType", ShopPhotoType.Logo);
      await this.$axios.post(this.$dataApi.image.imageCRUD, this.shopLogoData);
    },
    async uploadShopBanner(shopId) {
      this.shopBannerData.append("shopId", shopId);
      this.shopBannerData.append("ShopPhotoType", ShopPhotoType.ShopBanner);
      await this.$axios.post(
        this.$dataApi.image.imageCRUD,
        this.shopBannerData
      );
    },
    async uploadShopMobileBanner(shopId) {
      this.shopMobileBannerData.append("shopId", shopId);
      this.shopMobileBannerData.append(
        "ShopPhotoType",
        ShopPhotoType.MobileShopBanner
      );
      await this.$axios.post(
        this.$dataApi.image.imageCRUD,
        this.shopMobileBannerData
      );
    },

    async saveShop() {
      let result = this.$refs["form"].instance.validate();

      if (result.isValid) {
        try {
          let { data } = await this.$axios.post(
            this.$dataApi.shop,
            this.formData
          );
          if (this.logoUploaded) {
            await this.uploadShopLogo(data.id);
          }
          if (this.bannerUploaded) {
            await this.uploadShopBanner(data.id);
          }
          if (this.mobileBannerUploaded) {
            await this.uploadShopMobileBanner(data.id);
          }
          this.$notification(this).showMessage({
            text: this.$t("labels.notificationSucces"),
            type: "success",
          });
          this.$emit("successedSaved");
        } catch (error) {
          this.$notification(this).showMessage({
            text: this.$t("labels.notificationError"),
            type: "error",
          });
          throw error;
        }
      }
    },
  },
});
</script>

<style lang="scss">
.shop-create-card {
  margin-top: 20px;
  width: 100%;
  word-wrap: break-word !important;
  background-color: $body-background-color;
  padding: 20px;
  border-radius: 4px;
}
</style>