<template>
  <div class="contact-update-card">
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
        <AddressesList
          @addressAdded="throwAddresToFormData"
          @itemDeleted="addressItemDelete"
          :items="formData.addresses"
        />
      </template>
      <template #phonesList>
        <PhonesListBox
          @phoneAdded="throwPhonesToFormData"
          @itemDeleted="phoneItemDelete"
          :items="formData.phoneNumbers"
        />
      </template>
      <template #socialMediaList>
        <SocialMediaList
          @socialMediaAdded="throwSocialMediaToFormData"
          @itemDeleted="socialMediaItemDelete"
          :items="formData.socialMedias"
        />
      </template>
      <!-- TEMPLATES -->

      <!-- PHOTOS TEMPLATES -->
      <template #contactPhotoFirst>
        <ImageUploader
          :id="`contactPhotoFirst`"
          :width="`100%`"
          :height="`160px`"
          :path="getPhotoPath(0)"
          @valueChanged="
            (data) => {
              setPhoto(data, 'contactPhotoFirstData', 0);
            }
          "
          @imageDeleted="deleteImage(0, 'contactPhotoFirstData')"
        />
      </template>
      <template #contactPhotoSecond>
        <ImageUploader
          :id="`contactPhotoSecond`"
          :width="`100%`"
          :height="`160px`"
          :path="getPhotoPath(1)"
          @valueChanged="
            (data) => {
              setPhoto(data, 'contactPhotoSecondData', 1);
            }
          "
          @imageDeleted="deleteImage(1, 'contactPhotoSecondData')"
        />
      </template>
      <template #contactPhotoThird>
        <ImageUploader
          :id="`contactPhotoThird`"
          :width="`100%`"
          :height="`160px`"
          :path="getPhotoPath(2)"
          @valueChanged="
            (data) => {
              setPhoto(data, 'contactPhotoThirdData', 2);
            }
          "
          @imageDeleted="deleteImage(2, 'contactPhotoThirdData')"
        />
      </template>
      <template #contactPhotoFour>
        <ImageUploader
          :id="`contactPhotoFour`"
          :width="`100%`"
          :height="`160px`"
          :path="getPhotoPath(3)"
          @valueChanged="
            (data) => {
              setPhoto(data, 'contactPhotoFourData', 3);
            }
          "
          @imageDeleted="deleteImage(3, 'contactPhotoFourData')"
        />
      </template>
      <template #contactPhotoFive>
        <ImageUploader
          :id="`contactPhotoFive`"
          :width="`100%`"
          :height="`160px`"
          :path="getPhotoPath(4)"
          @valueChanged="
            (data) => {
              setPhoto(data, 'contactPhotoFiveData', 4);
            }
          "
          @imageDeleted="deleteImage(4, 'contactPhotoFiveData')"
        />
      </template>
      <template #contactPhotoSix>
        <ImageUploader
          :id="`contactPhotoSix`"
          :width="`100%`"
          :height="`160px`"
          :path="getPhotoPath(5)"
          @valueChanged="
            (data) => {
              setPhoto(data, 'contactPhotoSixData', 5);
            }
          "
          @imageDeleted="deleteImage(5, 'contactPhotoSixData')"
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
          :path="hasBanner"
          @imageDeleted="deleteContactBanner(contactBannerForDeleting)"
        />
      </template>
      <!-- PHOTOS TEMPLATES -->
    </DxForm>
    <div class="save-button" @click="updateContact">
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
import { ContactsUpdate } from "../../../../infrastructure/classes/ContactsUpdate";
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
  props: {
    contactData: {
      type: Object,
      required: true,
    },
  },
  data() {
    let formData: ContactsUpdate = new ContactsUpdate(
      this.contactData.id,
      this.contactData.nameRu,
      this.contactData.nameEn,
      this.contactData.nameTm,
      this.contactData.descriptionRu,
      this.contactData.descriptionEn,
      this.contactData.descriptionTm,
      this.contactData.email,
      this.contactData.contactCategories,
      this.contactData.addresses,
      this.contactData.phoneNumbers,
      this.contactData.socialMedias
    );
    let contactBanner = new FormData();
    return {
      formData,
      contactBanner,
      contactBannerUploaded: false,
      queue: [],
    };
  },
  computed: {
    hasBanner() {
      let imageIs = this.contactData.image.find(
        (item) => item.shopPhotoType == ShopPhotoType.ContactBanner
      );
      if (imageIs) {
        return imageIs.directoryThumbnails;
      } else {
        return null;
      }
    },
    contactBannerForDeleting() {
      let image = this.contactData.image.find(
        (item) => item.shopPhotoType == ShopPhotoType.ContactBanner
      );
      if (image) {
        return image;
      } else {
        return null;
      }
    },
    categoryOptions() {
      return new TagBoxPropertiesWithDataSource(this, {
        loadUrl: this.$dataApi.contactCategory,
        filter: ["parrentId", "<>", `${nullableGUID}`],
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
    removeImageFromReceivedData(image) {
      let indexOfImage = this.contactData.image.indexOf(image);
      if (indexOfImage !== -1) {
        this.contactData.image.splice(indexOfImage, 1);
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
    deleteImage(index, type) {
      let imageIndex = this.contactData.image.findIndex((el) => {
        if (el) return el.orderNumber === index;
      });
      let image = this.contactData.image[imageIndex];

      if (image?.directoryThumbnails) {
        this.removeImage(image);
        this.removeImageFromReceivedData(index);
      } else {
        const photoIndex = this.queue.findIndex((el) => el.photoType === type);
        this.queue.splice(photoIndex, 1);
      }
    },

    // method for setting gallery photos
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
      const uploadedImageindex = this.contactData.image.findIndex((el) => {
        if (el) return el.orderNumber === index;
      });
      const uploadedImage = this.contactData.image[uploadedImageindex];
      if (uploadedImage?.directoryThumbnails) {
        uploadedImage.directoryThumbnails = null;
        const req = this.$axios.delete(
          `${this.$dataApi.image.imageCRUD}/${uploadedImage.id}`
        );
        this.queue.push(req);
      }
      if (photoIndex !== -1) {
        this.queue[photoIndex] = photoObj;
      } else {
        this.queue.push(photoObj);
      }
    },
    // method for setting gallery photos

    setContactBanner(image: File) {
      this.contactBanner = new FormData();
      this.contactBanner.append("image", image);
      this.contactBannerUploaded = true;
    },
    deleteContactBanner(image) {
      if (image) {
        this.removeImage(image);
      }
      this.removeImageFromReceivedData(image);
      this.contactBanner = new FormData();
      this.contactBannerUploaded = false;
    },

    // methood for getting galery images
    getPhotoPath(index) {
      let path = this.contactData.image.find(
        (item) => item.orderNumber === index
      );
      if (path) {
        return path.directoryThumbnails;
      } else {
        return null;
      }
    },
    // methood for getting galery images

    // work with templates
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
    // work with templates

    getCategoryIds(item) {
      return [item.id].join(" ");
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
    async updateImage(contactId, imageId) {
      const request = this.queue.map((el) => {
        const { data } = el;
        data.append("contactId", contactId);
        data.append("orderNumber", el.index);
        data.append("id", imageId);
        return this.$axios.put(this.$dataApi.image.imageCRUD, data);
      });
      const res = await Promise.all(request);
    },

    // banner operations
    async uploadContactBanner() {
      let contactId = this.contactData.id;
      this.contactBanner.append("contactId", contactId);
      this.contactBanner.append("shopPhotoType", ShopPhotoType.ContactBanner);
      await this.$axios.post(this.$dataApi.image.imageCRUD, this.contactBanner);
    },
    async updateContactBanner() {
      let image = this.contactData.image.find(
        (item) => item.shopPhotoType == ShopPhotoType.ContactBanner
      );
      this.contactBanner.append("contactId", image.contactId);
      this.contactBanner.append("id", image.id);
      this.contactBanner.append("shopPhotoType", ShopPhotoType.ContactBanner);
      await this.$axios.put(this.$dataApi.image.imageCRUD, this.contactBanner);
    },

    requestToUploadUpdateBanner() {

      let hasContactBanner = this.contactData.image.filter(
        (obj) => obj.shopPage === ShopPhotoType.ContactBanner
      );
      if (hasContactBanner.length === 0) {
        this.uploadContactBanner();
      } else if (hasContactBanner.length > 0) {
        this.updateContactBanner();
      }
    },
    // banner operations

    async updateContact() {
      let result = this.$refs["form"].instance.validate();

      if (result) {
        this.formData.categories = this.formData.categories.map(
          this.getCategoryIds
        );

        this.$awn.asyncBlock(
          this.$axios.put(`${this.$dataApi.contact}`, this.formData),
          (e) => {
            if (this.contactBannerUploaded) {
              this.requestToUploadUpdateBanner();
            }
            this.uploadImage(this.formData.id);
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
.contact-update-card {
  margin-top: 20px;
  width: 100%;
  word-wrap: break-word !important;
  background-color: $body-background-color;
  padding: 20px;
  border-radius: 4px;
}
</style>