<template>
  <div class="contact-create-card">
    <DxForm ref="form" :col-count="3" :form-data.sync="formData">
      <DxSimpleItem
        :col-span="3"
        data-field="contactBanner"
        template="contactBanner"
      >
        <DxLabel :text="$t('contacts.contact.card.banner')" />
      </DxSimpleItem>
      <DxGroupItem
        :col-span="3"
        :col-count="6"
        :caption="$t('contacts.contact.card.gallery')"
      >
        <DxSimpleItem
          :col-span="1"
          data-field="contactPhotoFirst"
          template="contactPhotoFirst"
        >
          <DxLabel text=" " />
        </DxSimpleItem>
        <DxSimpleItem
          :col-span="1"
          data-field="contactPhotoSecond"
          template="contactPhotoSecond"
        >
          <DxLabel text=" " />
        </DxSimpleItem>
        <DxSimpleItem
          :col-span="1"
          data-field="contactPhotoThird"
          template="contactPhotoThird"
        >
          <DxLabel text=" " />
        </DxSimpleItem>
        <DxSimpleItem
          :col-span="1"
          data-field="contactPhotoFour"
          template="contactPhotoFour"
        >
          <DxLabel text=" " />
        </DxSimpleItem>
        <DxSimpleItem
          :col-span="1"
          data-field="contactPhotoFive"
          template="contactPhotoFive"
        >
          <DxLabel text=" " />
        </DxSimpleItem>
        <DxSimpleItem
          :col-span="1"
          data-field="contactPhotoSix"
          template="contactPhotoSix"
        >
          <DxLabel text=" " />
        </DxSimpleItem>
      </DxGroupItem>

      <!-- NAMES -->
      <DxGroupItem :col-span="3" :col-count="3">
        <DxSimpleItem data-field="nameRu" editor-type="dxTextBox">
          <DxRequiredRule :message="$t('labels.ruleErrors.basic')" />
          <DxLabel :text="$t('contacts.contact.card.nameRu')" />
        </DxSimpleItem>
        <DxSimpleItem data-field="nameEn" editor-type="dxTextBox">
          <DxRequiredRule :message="$t('labels.ruleErrors.basic')" />
          <DxLabel :text="$t('contacts.contact.card.nameEn')" />
        </DxSimpleItem>
        <DxSimpleItem data-field="nameTm" editor-type="dxTextBox">
          <DxRequiredRule :message="$t('labels.ruleErrors.basic')" />
          <DxLabel :text="$t('contacts.contact.card.nameTm')" />
        </DxSimpleItem>
      </DxGroupItem>
      <!-- NAMES -->

      <!-- DESCRIPTIONS -->
      <DxGroupItem :col-span="3" :col-count="3">
        <DxSimpleItem data-field="descriptionRu" editor-type="dxTextArea">
          <DxRequiredRule :message="$t('labels.ruleErrors.basic')" />
          <DxLabel :text="$t('contacts.contact.card.descriptionRu')" />
        </DxSimpleItem>
        <DxSimpleItem data-field="descriptionEn" editor-type="dxTextArea">
          <DxRequiredRule :message="$t('labels.ruleErrors.basic')" />
          <DxLabel :text="$t('contacts.contact.card.descriptionEn')" />
        </DxSimpleItem>
        <DxSimpleItem data-field="descriptionTm" editor-type="dxTextArea">
          <DxRequiredRule :message="$t('labels.ruleErrors.basic')" />
          <DxLabel :text="$t('contacts.contact.card.descriptionTm')" />
        </DxSimpleItem>
      </DxGroupItem>
      <!-- DESCRIPTIONS -->

      <!-- EMAIL -->
      <DxSimpleItem :col-span="3" data-field="email" editor-type="dxTextBox">
        <!-- <DxRequiredRule :message="$t('labels.ruleErrors.basic')" /> -->
        <DxEmailRule :message="$t('labels.ruleErrors.emailInvalid')" />
        <DxLabel :text="$t('contacts.contact.card.email')" />
      </DxSimpleItem>
      <!-- EMAIL -->

      <!-- CATEGORIES -->
      <DxSimpleItem
        :col-span="3"
        data-field="categories"
        editor-type="dxTagBox"
        :editor-options="categoryOptions"
      >
        <DxLabel :text="$t('contacts.contact.card.categories')" />
      </DxSimpleItem>
      <!-- CATEGORIES -->

      <!-- ADDRESS PHONE SOCIAL -->
      <DxGroupItem :col-span="3" :col-count="3">
        <DxSimpleItem data-field="addresses" template="addressesList">
          <DxLabel :text="$t('contacts.contact.card.addresses')" />
        </DxSimpleItem>
        <DxSimpleItem data-field="phoneNumbers" template="phonesList">
          <DxLabel :text="$t('contacts.contact.card.phoneNumbers')" />
        </DxSimpleItem>
        <DxSimpleItem data-field="socialMedias" template="socialMediaList">
          <DxLabel :text="$t('contacts.contact.card.socialMedias')" />
        </DxSimpleItem>
      </DxGroupItem>
      <!-- ADDRESS PHONE SOCIAL -->

      <!-- TEMPLATES -->
      <template #addressesList>
        <AddressesList @addressAdded="throwAddresToFormData" />
      </template>
      <template #phonesList>
        <PhonesListBox @phoneAdded="throwPhonesToFormData" />
      </template>
      <template #socialMediaList>
        <SocialMediaList @socialMediaAdded="throwSocialMediaToFormData" />
      </template>
      <!-- TEMPLATES -->

      <!-- PHOTOS TEMPLATES -->
      <template #contactPhotoFirst>
        <ImageUploader
          :id="`contactPhotoFirst`"
          :width="`100%`"
          :height="`160px`"
          @valueChanged="
            (data) => {
              setPhoto(data, 'contactPhotoFirstData', 0);
            }
          "
          @imageDeleted="deleteImage('contactPhotoFirstData')"
        />
      </template>
      <template #contactPhotoSecond>
        <ImageUploader
          :id="`contactPhotoSecond`"
          :width="`100%`"
          :height="`160px`"
          @valueChanged="
            (data) => {
              setPhoto(data, 'contactPhotoSecondData', 1);
            }
          "
          @imageDeleted="deleteImage('contactPhotoSecondData')"
        />
      </template>
      <template #contactPhotoThird>
        <ImageUploader
          :id="`contactPhotoThird`"
          :width="`100%`"
          :height="`160px`"
          @valueChanged="
            (data) => {
              setPhoto(data, 'contactPhotoThirdData', 2);
            }
          "
          @imageDeleted="deleteImage('contactPhotoThirdData')"
        />
      </template>
      <template #contactPhotoFour>
        <ImageUploader
          :id="`contactPhotoFour`"
          :width="`100%`"
          :height="`160px`"
          @valueChanged="
            (data) => {
              setPhoto(data, 'contactPhotoFourData', 3);
            }
          "
          @imageDeleted="deleteImage('contactPhotoFourData')"
        />
      </template>
      <template #contactPhotoFive>
        <ImageUploader
          :id="`contactPhotoFive`"
          :width="`100%`"
          :height="`160px`"
          @valueChanged="
            (data) => {
              setPhoto(data, 'contactPhotoFiveData', 4);
            }
          "
          @imageDeleted="deleteImage('contactPhotoFiveData')"
        />
      </template>
      <template #contactPhotoSix>
        <ImageUploader
          :id="`contactPhotoSix`"
          :width="`100%`"
          :height="`160px`"
          @valueChanged="
            (data) => {
              setPhoto(data, 'contactPhotoSixData', 5);
            }
          "
          @imageDeleted="deleteImage('contactPhotoSixData')"
        />
      </template>

      <template #contactBanner>
        <ImageUploader
          :height="`290px`"
          :width="`100%`"
          :id="`contactBanner`"
          @valueChanged="
            (data) => {
              setContactBanner(data);
            }
          "
          @imageDeleted="deleteContactBanner"
        />
      </template>
      <!-- PHOTOS TEMPLATES -->
    </DxForm>
    <div class="save-button" @click="saveContact">
      <span>{{ $t("contacts.contact.card.saveButton") }}</span>
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

import { TagBoxPropertiesWithDataSource } from "../../../../infrastructure/components-properties/TagBox/TagBoxPropertiesWithDataSource";
import { Contacts } from "../../../../infrastructure/classes/Contacts";
import { ShopPhotoType } from "../../../../infrastructure/enums/ShopPhotoType";
import { nullableGUID } from "../../../../nullableGUID";

import ImageUploader from "../../../../components/pages-components/common/avatar.vue";
import AddressesList from "../../../../components/pages-components/common/addresses-list-box.vue";
import PhonesListBox from "../../../../components/pages-components/common/phones-list-box.vue";
import SocialMediaList from "../../../../components/pages-components/common/social-medias-box.vue";

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
  },
  data() {
    let formData: Contacts = new Contacts();
    let contactBanner = new FormData();
    return {
      formData,
      contactBanner,
      contactBannerUploaded: false,
      queue: [],
    };
  },
  computed: {
    categoryOptions() {
      return new TagBoxPropertiesWithDataSource(this, {
        loadUrl: this.$dataApi.contactCategory,
        filter: ["parrentId", "<>", `${nullableGUID}`],
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
    setContactBanner(image: File) {
      this.contactBanner = new FormData();
      this.contactBanner.append("image", image);
      this.contactBannerUploaded = true;
    },
    deleteContactBanner() {
      this.contactBanner = new FormData();
      this.contactBannerUploaded = false;
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
    setPhoto(image: File, photoType, index) {
      const photoIndex = this.queue.findIndex(
        (el) => el.photoType === photoType
      );
      const data = new FormData();
      data.append("image", image);
      const photoObj = {
        photoType,
        orderNumber: index,
        data,
      };
      if (photoIndex !== -1) {
        this.queue[photoIndex] = photoObj;
      } else {
        this.queue.push(photoObj);
      }
    },
    deleteImage(index, type) {
      const photoIndex = this.queue.findIndex((el) => el.photoType === type);
      this.queue.splice(photoIndex, 1);
    },
    getCategoryIds(item) {
      return [item.id].join(" ");
    },

    async uploadContactBanner(contactId) {
      this.contactBanner.append("contactId", contactId);
      this.contactBanner.append("shopPhotoType", ShopPhotoType.ContactBanner);
      await this.$axios.post(this.$dataApi.image.imageCRUD, this.contactBanner);
    },

    async uploadImage(contactId) {
      const request = this.queue.map((el) => {
        const { data } = el;
        if (data) {
          data.append("contactId", contactId);
          data.append("orderNumber", el.orderNumber);
          return this.$axios.post(this.$dataApi.image.imageCRUD, data);
        }
        return el;
      });

      const res = await Promise.all(request);
    },

    saveContact() {
      let result = this.$refs["form"].instance.validate();
      if (result.isValid) {
        this.$awn.asyncBlock(
          this.$axios.post(this.$dataApi.contact, this.formData),
          (e) => {
            if (this.contactBannerUploaded) {
              this.uploadContactBanner(e.data.id);
            }
            this.uploadImage(e.data.id);
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
.contact-create-card {
  margin-top: 20px;
  width: 100%;
  word-wrap: break-word !important;
  background-color: $body-background-color;
  padding: 20px;
  border-radius: 4px;
}
</style>