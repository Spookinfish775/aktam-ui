<template>
  <div class="my-user-create-form">
    <DxForm ref="form" :col-count="2" :form-data.sync="formData">
      <DxGroupItem :caption="$t('userPage.userCard.personalInfo.title')">
        <DxGroupItem :col-count="4">
          <DxGroupItem :col-span="3" :col-count="1">
            <DxSimpleItem
              data-field="firstName"
              data-type="string"
              editor-type="dxTextBox"
            >
              <DxRequiredRule :message="$t('labels.ruleErrors.basic')" />
              <DxLabel :text="$t('userPage.userCard.personalInfo.firstName')" />
            </DxSimpleItem>
            <DxSimpleItem
              data-field="lastName"
              data-type="string"
              editor-type="dxTextBox"
            >
              <DxRequiredRule :message="$t('labels.ruleErrors.basic')" />
              <DxLabel :text="$t('userPage.userCard.personalInfo.lastName')" />
            </DxSimpleItem>
            <DxSimpleItem
              :col-span="2"
              data-field="email"
              data-type="string"
              editor-type="dxTextBox"
            >
              <DxRequiredRule :message="$t('labels.ruleErrors.basic')" />
              <DxEmailRule :message="$t('labels.ruleErrors.emailInvalid')" />
              <DxLabel :text="$t('userPage.userCard.personalInfo.email')" />
            </DxSimpleItem>
          </DxGroupItem>
          <DxSimpleItem data-field="image" template="avatar" :col-span="1">
            <DxLabel :text="$t('userPage.userCard.personalInfo.photo')" />
          </DxSimpleItem>
        </DxGroupItem>

        <DxGroupItem
          :col-count="1"
          :caption="$t('userPage.userCard.system.title')"
        >
          <DxSimpleItem
            data-field="password"
            data-type="string"
            editor-type="dxTextBox"
            :editor-options="passwordOptions"
          >
            <DxRequiredRule :message="$t('labels.ruleErrors.basic')" />
            <DxLabel :text="$t('userPage.userCard.system.password')" />
          </DxSimpleItem>
          <DxSimpleItem
            data-field="confirmPassword"
            data-type="string"
            editor-type="dxTextBox"
            :editor-options="passwordOptions"
          >
            <DxRequiredRule :message="$t('labels.ruleErrors.basic')" />
            <DxCompareRule
              :comparison-target="passwordComparison"
              :message="$t('labels.ruleErrors.password')"
            />
            <DxLabel :text="$t('userPage.userCard.system.confirmPassword')" />
          </DxSimpleItem>
          <DxSimpleItem
            data-field="role"
            data-type="number"
            editor-type="dxSelectBox"
            :editor-options="roleOptions"
          >
            <DxRequiredRule :message="$t('labels.ruleErrors.basic')" />
            <DxLabel :text="$t('userPage.userCard.system.role')" />
          </DxSimpleItem>
        </DxGroupItem>
      </DxGroupItem>

      <DxGroupItem :caption="$t('userPage.userCard.contacts.title')">
        <DxSimpleItem
          data-field="countryId"
          editor-type="dxSelectBox"
          :editor-options="countryOptions"
        >
          <DxRequiredRule :message="$t('labels.ruleErrors.basic')" />
          <DxLabel :text="$t('userPage.userCard.contacts.country')" />
        </DxSimpleItem>
        <DxGroupItem :col-count="2">
          <DxSimpleItem
            data-field="districtId"
            editor-type="dxSelectBox"
            :editor-options="districtOptions"
          >
            <DxRequiredRule :message="$t('labels.ruleErrors.basic')" />
            <DxLabel :text="$t('userPage.userCard.contacts.district')" />
          </DxSimpleItem>
          <DxSimpleItem
            data-field="cityId"
            editor-type="dxSelectBox"
            :editor-options="cityOptions"
          >
            <DxRequiredRule :message="$t('labels.ruleErrors.basic')" />
            <DxLabel :text="$t('userPage.userCard.contacts.city')" />
          </DxSimpleItem>
        </DxGroupItem>

        <DxSimpleItem data-field="addresses" template="addressesList">
          <DxLabel :text="$t('userPage.userCard.contacts.addresses')" />
        </DxSimpleItem>
        <DxSimpleItem data-field="phoneNumbers" template="phonesList">
          <DxLabel :text="$t('userPage.userCard.contacts.phoneNumbers')" />
        </DxSimpleItem>
      </DxGroupItem>

      <template #addressesList>
        <AddressesList @addressAdded="throwAddresToFormData" />
      </template>

      <template #phonesList>
        <PhonesListBox @phoneAdded="throwPhonesToFormData" />
      </template>

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
    <div class="save-button" @click="saveUser">
      <span>{{ $t("labels.userSaveButton") }}</span>
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

import { IUserCreate } from "../../../infrastructure/interfaces/IUserCreate";
import { UserCreate } from "../../../infrastructure/classes/UserCreate";
import { UserRoles } from "../../../infrastructure/data-sources/UserRoles";
import { SelectBoxPropertiesWithLocalData } from "../../../infrastructure/components-properties/SelectBox/SelectBoxPropertiesWithLocalData";
import { SelectBoxPropertiesWithDataSource } from "../../../infrastructure/components-properties/SelectBox/SelectBoxPropertiesWithDataSource";

import Avatar from "../../../components/pages-components/common/avatar.vue";
import PhonesListBox from "../../../components/pages-components/common/phones-list-box.vue";
import AddressesList from "../../../components/pages-components/common/addresses-list-box.vue";

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
    PhonesListBox,
    AddressesList,
  },
  data() {
    let formData: UserCreate = new UserCreate();
    let photoData = new FormData();

    return {
      formData,
      photoData,
      imageUploaded: false,
      currentCountryId: null,
      currentDistrictId: null,
    };
  },
  computed: {
    roleOptions() {
      return new SelectBoxPropertiesWithLocalData({
        dataSource: UserRoles(this),
        showClearButton: false,
      });
    },
    passwordOptions() {
      return {
        mode: "password",
      };
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
  },
  methods: {
    passwordComparison() {
      return this.formData.password;
    },
    setAvatar(image: File) {
      this.photoData = new FormData();
      this.photoData.append("image", image);
      this.imageUploaded = true;
    },
    deleteImage() {
      this.photoData = new FormData();
      this.imageUploaded = false;
    },
    throwAddresToFormData(addresses) {
      this.formData.addresses = addresses;
    },
    throwPhonesToFormData(phones) {
      this.formData.phoneNumbers = phones;
    },
    async saveUser() {
      let result = this.$refs["form"].instance.validate();


      if (result.isValid) {
        this.$awn.asyncBlock(
          this.$axios.post(this.$dataApi.users.userCRUD, this.formData),
          (e) => {
            if (this.imageUploaded) {
              this.photoData.append("userId", e.data.id);
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
.my-user-create-form {
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