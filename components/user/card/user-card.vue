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
            <DxLabel :text="$t('userPage.userCard.system.password')" />
          </DxSimpleItem>
          <DxSimpleItem
            data-field="confirmPassword"
            data-type="string"
            editor-type="dxTextBox"
            :editor-options="passwordOptions"
          >
            <DxCompareRule
              :comparison-target="passwordComparison"
              :message="$t('labels.ruleErrors.password')"
            />
            <DxLabel :text="$t('userPage.userCard.system.confirmPassword')" />
          </DxSimpleItem>
          <DxSimpleItem template="changePasswordButton"> </DxSimpleItem>
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
          data-type="string"
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

      <template #changePasswordButton>
        <div class="save-button" @click="changePassword">
          <span>{{ $t("labels.passwordChangeButton") }}</span>
        </div>
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

      <template #avatar>
        <Avatar
          @valueChanged="
            (data) => {
              setAvatar(data);
            }
          "
          :path="hasImage"
          @imageDeleted="deleteImage(userData.image)"
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
import type { PropType } from "vue";

import { IUserUpdate } from "~/infrastructure/interfaces/IUserUpdate";
import { UserUpdate } from "../../../infrastructure/classes/UserUpdate";
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
  props: {
    userData: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    let formData: UserUpdate = new UserUpdate(this.userData);
    formData.setAddresses(this.userData.addresses);
    formData.setPhoneNumbers(this.userData.phoneNumbers);
    if (this.userData.country !== null || undefined) {
      formData.setCountry(this.userData.country.id);
      formData.setDistrict(this.userData.district.id);
      formData.setCity(this.userData.city.id);
    }
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
    hasImage() {
      if (this.userData.image !== null) {
        return this.userData.image.directoryThumbnails;
      } else {
        return null;
      }
    },
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
    async changePassword() {
      if (this.formData.password && this.formData.confirmPassword !== "") {
        this.$awn.asyncBlock(
          this.$axios.put(this.$dataApi.users.userChangePassword, {
            id: this.formData.id,
            password: this.formData.password,
            confirmPassword: this.formData.confirmPassword,
          }),
          (e) => {
            this.$awn.success();
          },
          (e) => {
            this.$awn.alert();
          }
        );
      }
    },

    getCurrentCountryId() {
      if (this.userData.country) {
        this.currentCountryId = this.userData.country.id;
      } else {
        this.currentCountryId = null;
      }
    },
    getCurrentDistrictId() {
      if (this.userData.district) {
        this.currentDistrictId = this.userData.district.id;
      } else {
        this.currentDistrictId = null;
      }
    },

    passwordComparison() {
      return this.formData.password;
    },

    setAvatar(image: File) {
      this.photoData.append("image", image);
      this.imageUploaded = true;
    },
    async removeImage() {
      this.$awn.asyncBlock(
        this.$axios.delete(
          `${this.$dataApi.image.imageCRUD}/${this.userData.image.id}`
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

      this.userData.image = null;
      this.photoData = new FormData();
      this.imageUploaded = false;
    },

    throwAddresToFormData(addresses) {
      this.formData.addresses = addresses;
    },
    throwPhonesToFormData(phones) {
      this.formData.phoneNumbers = phones;
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

    async createImage() {
      this.photoData.append("userId", this.userData.id);
      await this.$axios.post(this.$dataApi.image.imageCRUD, this.photoData);
    },

    async updateImage() {
      this.photoData.append("userId", this.userData.image.userId);
      this.photoData.append("id", this.userData.image.id);
      await this.$axios.put(this.$dataApi.image.imageCRUD, this.photoData);
    },

    async saveUser() {
      let result = this.$refs["form"].instance.validate();
      if (result.isValid) {
        this.$awn.asyncBlock(
          this.$axios.put(this.$dataApi.users.userCRUD, this.formData),
          (e) => {
            if (this.userData.image && this.imageUploaded) {
              this.updateImage();
            } else if (!this.userData.image && this.imageUploaded) {
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
  mounted() {
    this.getCurrentCountryId();
    this.getCurrentDistrictId();
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
