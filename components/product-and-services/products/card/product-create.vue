<template>
  <div class="product-create-card">
    <DxForm ref="form" :col-count="4" :form-data.sync="formData">
      <!-- PHOTOS OF PRODUCT -->
      <DxGroupItem
        :col-span="4"
        :col-count="6"
        :caption="$t('products.productCard.photos')"
      >
        <DxSimpleItem
          :col-span="1"
          data-field="productPhotoFirst"
          template="productPhotoFirst"
        >
          <DxLabel text=" " />
        </DxSimpleItem>
        <DxSimpleItem
          :col-span="1"
          data-field="productPhotoSecond"
          template="productPhotoSecond"
        >
          <DxLabel text=" " />
        </DxSimpleItem>
        <DxSimpleItem
          :col-span="1"
          data-field="productPhotoThird"
          template="productPhotoThird"
        >
          <DxLabel text=" " />
        </DxSimpleItem>
        <DxSimpleItem
          :col-span="1"
          data-field="productPhotoFour"
          template="productPhotoFour"
        >
          <DxLabel text=" " />
        </DxSimpleItem>
        <DxSimpleItem
          :col-span="1"
          data-field="productPhotoFive"
          template="productPhotoFive"
        >
          <DxLabel text=" " />
        </DxSimpleItem>
        <DxSimpleItem
          :col-span="1"
          data-field="productPhotoSix"
          template="productPhotoSix"
        >
          <DxLabel text=" " />
        </DxSimpleItem>
      </DxGroupItem>
      <!-- PHOTOS OF PRODUCT -->

      <!-- NAME OF PRODUCT -->
      <DxGroupItem :col-span="4" :col-count="3" v-if="isAdmin">
        <DxSimpleItem data-field="nameRu" editor-type="dxTextBox">
          <DxRequiredRule :message="$t('labels.ruleErrors.basic')" />
          <DxLabel :text="$t('products.productCard.nameRu')" />
        </DxSimpleItem>
        <DxSimpleItem data-field="nameEn" editor-type="dxTextBox">
          <DxLabel :text="$t('products.productCard.nameEn')" />
        </DxSimpleItem>
        <DxSimpleItem data-field="nameTm" editor-type="dxTextBox">
          <DxLabel :text="$t('products.productCard.nameTm')" />
        </DxSimpleItem>
      </DxGroupItem>

      <DxGroupItem :col-span="4" :col-count="1" v-else>
        <DxSimpleItem data-field="nameRu" editor-type="dxTextBox">
          <DxRequiredRule :message="$t('labels.ruleErrors.basic')" />
          <DxLabel :text="$t('products.productCard.name')" />
        </DxSimpleItem>
      </DxGroupItem>
      <!-- NAME OF PRODUCT -->

      <!-- DESCRIPTION OF PRODUCT -->
      <DxGroupItem :col-span="4" :col-count="3" v-if="isAdmin">
        <DxSimpleItem data-field="descriptionRu" editor-type="dxTextArea">
          <DxRequiredRule :message="$t('labels.ruleErrors.basic')" />
          <DxLabel :text="$t('products.productCard.descriptionRu')" />
        </DxSimpleItem>
        <DxSimpleItem data-field="descriptionEn" editor-type="dxTextArea">
          <DxLabel :text="$t('products.productCard.descriptionEn')" />
        </DxSimpleItem>
        <DxSimpleItem data-field="descriptionTm" editor-type="dxTextArea">
          <DxLabel :text="$t('products.productCard.descriptionTm')" />
        </DxSimpleItem>
      </DxGroupItem>

      <DxGroupItem :col-span="4" :col-count="1" v-else>
        <DxSimpleItem data-field="descriptionRu" editor-type="dxTextArea">
          <DxRequiredRule :message="$t('labels.ruleErrors.basic')" />
          <DxLabel :text="$t('products.productCard.description')" />
        </DxSimpleItem>
      </DxGroupItem>
      <!-- DESCRIPTION OF PRODUCT -->

      <!-- PERSONAL CHARACTERISTIC OF PRODUCT -->
      <DxGroupItem :col-span="2" :col-count="1">
        <DxSimpleItem
          data-field="namePersonalCharacteristics"
          editor-type="dxTextBox"
          :col-span="1"
        >
          <DxRequiredRule :message="$t('labels.ruleErrors.basic')" />
          <DxLabel
            :text="$t('products.productCard.namePersonalCharacteristics')"
          />
        </DxSimpleItem>
        <DxSimpleItem
          data-field="personalCharacteristics"
          template="personalCharacteristicList"
        >
          <DxLabel :text="$t('products.productCard.personalCharacteristics')" />
        </DxSimpleItem>
      </DxGroupItem>
      <!-- PERSONAL CHARACTERISTIC OF PRODUCT -->

      <!-- GENERAl CHARACTERISTICS AND SHOP OF PRODUCT -->
      <DxGroupItem :col-span="2" :col-count="1">
        <DxSimpleItem data-field="shopId" template="shopIdSelectBox">
          <DxLabel :text="$t('products.productCard.shopId')" />
        </DxSimpleItem>
        <DxSimpleItem
          data-field="characteristics"
          template="characteristicsList"
        >
          <DxLabel :text="$t('products.productCard.characteristics')" />
        </DxSimpleItem>
      </DxGroupItem>
      <!-- GENERAl CHARACTERISTICS AND SHOP OF PRODUCT -->

      <!-- CATEGORIES OF PRODUCT -->
      <DxSimpleItem
        :col-span="4"
        data-field="categories"
        editor-type="dxTagBox"
        :editor-options="categoryOptions"
      >
        <DxRequiredRule :message="$t('labels.ruleErrors.basic')" />
        <DxLabel :text="$t('products.productCard.categories')" />
      </DxSimpleItem>
      <!-- CATEGORIES OF PRODUCT -->

      <!-- TEMPLATES -->
      <template #personalCharacteristicList>
        <PersonalCharacteristicList
          tabindex="0"
          :items="formData.personalCharacteristics"
          @personalCharacteristicAdded="throwPersonalCharacteristicToFormData"
          @itemDeleted="personalCharacteristicItemDelete"
        />
      </template>

      <template #shopIdSelectBox>
        <ShopSelectBox
          tabindex="0"
          :disabled="shopIdReadOnly"
          :showDropDownButton="false"
          :shopId="formData.shopId"
          @shopIdChanged="throwShopIdToFormData"
        />
      </template>

      <template #characteristicsList>
        <CharacteristicList
          tabindex="0"
          :items="formData.characteristics"
          @characteristicAdded="throwCharacteristicToFormData"
          @itemDeleted="characteristicItemDelete"
        />
      </template>
      <!-- TEMPLATES -->

      <!-- PHOTO UPLOADERS TEMPLATES -->
      <template #productPhotoFirst>
        <ImageUploader
          :id="`productPhotoFirst`"
          :width="`100%`"
          :height="`160px`"
          @valueChanged="
            (data) => {
              setPhoto(data, 'productPhotoFirstData', 0);
            }
          "
          @imageDeleted="deleteImage('productPhotoFirstData')"
        />
      </template>
      <template #productPhotoSecond>
        <ImageUploader
          :id="`productPhotoSecond`"
          :width="`100%`"
          :height="`160px`"
          @valueChanged="
            (data) => {
              setPhoto(data, 'productPhotoSecond', 1);
            }
          "
          @imageDeleted="deleteImage('productPhotoSecond')"
        />
      </template>
      <template #productPhotoThird>
        <ImageUploader
          :id="`productPhotoThird`"
          :width="`100%`"
          :height="`160px`"
          @valueChanged="
            (data) => {
              setPhoto(data, 'productPhotoThird', 2);
            }
          "
          @imageDeleted="deleteImage('productPhotoThird')"
        />
      </template>
      <template #productPhotoFour>
        <ImageUploader
          :id="`productPhotoFour`"
          :width="`100%`"
          :height="`160px`"
          @valueChanged="
            (data) => {
              setPhoto(data, 'productPhotoFour', 3);
            }
          "
          @imageDeleted="deleteImage('productPhotoFour')"
        />
      </template>
      <template #productPhotoFive>
        <ImageUploader
          :id="`productPhotoFive`"
          :width="`100%`"
          :height="`160px`"
          @valueChanged="
            (data) => {
              setPhoto(data, 'productPhotoFive', 4);
            }
          "
          @imageDeleted="deleteImage('productPhotoFive')"
        />
      </template>
      <template #productPhotoSix>
        <ImageUploader
          :id="`productPhotoSix`"
          :width="`100%`"
          :height="`160px`"
          @valueChanged="
            (data) => {
              setPhoto(data, 'productPhotoSix', 5);
            }
          "
          @imageDeleted="deleteImage('productPhotoSix')"
        />
      </template>

      <!-- PHOTO UPLOADERS TEMPLATES -->
    </DxForm>
    <div class="save-button" @click="saveProduct">
      <span>{{ $t("products.productCard.saveProduct") }}</span>
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

import { SelectBoxPropertiesWithLocalData } from "../../../../infrastructure/components-properties/SelectBox/SelectBoxPropertiesWithLocalData";
import { SelectBoxPropertiesWithDataSource } from "../../../../infrastructure/components-properties/SelectBox/SelectBoxPropertiesWithDataSource";
import { TagBoxPropertiesWithDataSource } from "../../../../infrastructure/components-properties/TagBox/TagBoxPropertiesWithDataSource";
import { Products } from "../../../../infrastructure/classes/Products";
import { nullableGUID } from "../../../../nullableGUID";

import ImageUploader from "../../../../components/pages-components/common/avatar.vue";
import PersonalCharacteristicList from "./personal-characteristic/personal-characteristic-list-box.vue";
import ShopSelectBox from "../../../../components/pages-components/common/shop-select-box/shop-select-box-template.vue";
import CharacteristicList from "./characteristic/charcteristic-list-box.vue";

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
    PersonalCharacteristicList,
    ShopSelectBox,
    CharacteristicList,
  },
  props: {
    productData: {
      type: Object,
      default: () => {},
    },
    categoryReadOnly: {
      type: Boolean,
      default: false,
    },
    shopIdReadOnly: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    let formData: Products = new Products(this.productData);
    return {
      formData,
      queue: [],
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
    personalCharacteristicItemDelete(value) {
      this.formData.personalCharacteristics =
        this.formData.personalCharacteristics.filter(
          (item) => item.id !== value
        );
    },
    characteristicItemDelete(value) {
      this.formData.characteristics = this.formData.characteristics.filter(
        (item) => item.id !== value
      );
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

    throwPersonalCharacteristicToFormData(personalCharacteristics) {
      this.formData.personalCharacteristics = personalCharacteristics;
    },
    throwShopIdToFormData(shopId) {
      this.formData.shopId = shopId;
    },
    throwCharacteristicToFormData(characteristic) {
      this.formData.characteristics = characteristic;
    },
    getCategoryIds(item) {
      return [item.id].join(" ");
    },

    async uploadImage(productId) {
      const request = this.queue.map((el) => {
        const { data } = el;
        if (data) {
          data.append("productId", productId);
          data.append("orderNumber", el.orderNumber);
          return this.$axios.post(this.$dataApi.image.imageCRUD, data);
        }
        return el;
      });

      const res = await Promise.all(request);
    },
    // removePersonalCharacteristics
    checkCategory() {
      if (this.productData !== null && this.productData !== undefined) {
        this.formData.categories = this.productData.categories.map(
          this.getCategoryIds
        );
      } else {
        return;
      }
    },
    saveProduct() {
      let result = this.$refs["form"].instance.validate();
      if (result.isValid) {
        this.checkCategory();


        this.$awn.asyncBlock(
          this.$axios.post(this.$dataApi.product, this.formData),
          (e) => {
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
.product-create-card {
  margin-top: 20px;
  width: 100%;
  word-wrap: break-word !important;
  background-color: $body-background-color;
  padding: 20px;
  border-radius: 4px;
}
</style>