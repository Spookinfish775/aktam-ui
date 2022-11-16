<template>
  <div class="product-update-card">
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
        data-field="categoriesId"
        editor-type="dxTagBox"
        :editor-options="categoryOptions"
      >
        <DxRequiredRule :message="$t('labels.ruleErrors.basic')" />
        <DxLabel :text="$t('products.productCard.categories')" />
      </DxSimpleItem>
      <!-- CATEGORIES OF PRODUCT -->

      <!-- IS PAID -->
      <DxSimpleItem
        v-if="isAdmin"
        :col-span="4"
        data-field="isPaid"
        template="isPaidCheckBox"
      >
        <DxLabel text=" " />
      </DxSimpleItem>
      <!-- IS PAID -->

      <!-- TEMPLATES -->

      <template #isPaidCheckBox>
        <DxCheckBox
          v-model="formData.isPaid"
          :text="$t('products.productCard.isPaid')"
        />
      </template>
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
          :disabled="!isAdmin"
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
          ref="productPhotoFirst"
          :id="`productPhotoFirst`"
          :width="`100%`"
          :height="`160px`"
          :path="getPhotoPath(0)"
          @valueChanged="
            (data) => {
              setPhoto(data, 'productPhotoFirstData', 0);
            }
          "
          @imageDeleted="deleteImage(0, 'productPhotoFirstData')"
        />
      </template>
      <template #productPhotoSecond>
        <ImageUploader
          :id="`productPhotoSecond`"
          :width="`100%`"
          :height="`160px`"
          :path="getPhotoPath(1)"
          @valueChanged="
            (data) => {
              setPhoto(data, 'productPhotoSecond', 1);
            }
          "
          @imageDeleted="deleteImage(1, 'productPhotoSecond')"
        />
      </template>
      <template #productPhotoThird>
        <ImageUploader
          :id="`productPhotoThird`"
          :width="`100%`"
          :height="`160px`"
          :path="getPhotoPath(2)"
          @valueChanged="
            (data) => {
              setPhoto(data, 'productPhotoThird', 2);
            }
          "
          @imageDeleted="deleteImage(2, 'productPhotoThird')"
        />
      </template>
      <template #productPhotoFour>
        <ImageUploader
          :id="`productPhotoFour`"
          :width="`100%`"
          :height="`160px`"
          :path="getPhotoPath(3)"
          @valueChanged="
            (data) => {
              setPhoto(data, 'productPhotoFour', 3);
            }
          "
          @imageDeleted="deleteImage(3, 'productPhotoFour')"
        />
      </template>
      <template #productPhotoFive>
        <ImageUploader
          :id="`productPhotoFive`"
          :width="`100%`"
          :height="`160px`"
          :path="getPhotoPath(4)"
          @valueChanged="
            (data) => {
              setPhoto(data, 'productPhotoFive', 4);
            }
          "
          @imageDeleted="deleteImage(4, 'productPhotoFive')"
        />
      </template>
      <template #productPhotoSix>
        <ImageUploader
          :id="`productPhotoSix`"
          :width="`100%`"
          :height="`160px`"
          :path="getPhotoPath(5)"
          @valueChanged="
            (data) => {
              setPhoto(data, 'productPhotoSix', 5);
            }
          "
          @imageDeleted="deleteImage(5, 'productPhotoSix')"
        />
      </template>
      <!-- PHOTO UPLOADERS TEMPLATES -->
    </DxForm>
    <!-- <div class="create-product-variation-button" @click="pushToCreateVariation">
      <span>{{ $t("products.productCard.createProductVariation") }}</span>
    </div> -->
    <div class="save-button" @click="updateProduct">
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
import { DxCheckBox } from "devextreme-vue/check-box";

import { TagBoxPropertiesWithDataSource } from "../../../../infrastructure/components-properties/TagBox/TagBoxPropertiesWithDataSource";
import { ProductsUpdate } from "../../../../infrastructure/classes/ProductsUpdate";

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
    DxCheckBox,
    ImageUploader,
    PersonalCharacteristicList,
    ShopSelectBox,
    CharacteristicList,
  },
  props: {
    productData: {
      type: Object,
      required: true,
    },
  },
  data() {
    let formData: ProductsUpdate = new ProductsUpdate(
      this.productData.id,
      this.productData.groupId,
      this.productData.isMain,
      this.productData.nameRu,
      this.productData.nameEn,
      this.productData.nameTm,
      this.productData.descriptionRu,
      this.productData.descriptionEn,
      this.productData.descriptionTm,
      this.productData.createDate,
      this.productData.numberView,
      this.productData.isPaid,
      this.productData.namePersonalCharacteristics,
      this.productData.shopId,
      this.productData.characteristics,
      this.productData.personalCharacteristics,
      this.productData.categories
    );
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
        valueExpr: "this",
        searchEnabled: true,
        searchExpr: `${"nameRu" || "nameEn" || "nameTm"}`,
        placeholder: "Выбор категорий",
        showDropDownButton: true,
      });
    },
  },
  methods: {
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
      const uploadedImageindex = this.productData.images.findIndex((el) => {
        if (el) return el.orderNumber === index;
      });
      const uploadedImage = this.productData.images[uploadedImageindex];
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
    deleteImage(index, type) {
      let imageIndex = this.productData.images.findIndex((el) => {
        if (el) return el.orderNumber === index;
      });
      let image = this.productData.images[imageIndex];

      if (image?.directoryThumbnails) {
        this.removeImage(image);
        this.removeImageFromReceivedData(index);
      } else {
        const photoIndex = this.queue.findIndex((el) => el.photoType === type);
        this.queue.splice(photoIndex, 1);
      }
    },
    removeImageFromReceivedData(index) {
      this.productData.images[index] = null;
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

    getPhotoPath(index) {
      let path = this.productData.images.find(
        (item) => item.orderNumber === index
      );
      if (path) {
        return path.directoryThumbnails;
      } else {
        return null;
      }
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
    async updateImage(productId, imageId) {
      const request = this.queue.map((el) => {
        const { data } = el;
        data.append("productId", productId);
        data.append("orderNumber", el.index);
        data.append("id", imageId);
        return this.$axios.put(this.$dataApi.image.imageCRUD, data);
      });
      const res = await Promise.all(request);
    },

    async updateProduct() {
      let result = this.$refs["form"].instance.validate();

      if (result.isValid) {
        this.formData.categoriesId = this.formData.categoriesId.map(
          this.getCategoryIds
        );

        this.$awn.asyncBlock(
          this.$axios.put(`${this.$dataApi.product}`, this.formData),
          (e) => {
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
    pushToCreateVariation() {
      this.$router.push(
        `/admin/products-and-services/products/create-from?productSlug=${this.productData.slug}`
      );
    },
  },
});
</script>

<style lang="scss">
.product-update-card {
  margin-top: 20px;
  width: 100%;
  word-wrap: break-word !important;
  background-color: $body-background-color;
  padding: 20px;
  border-radius: 4px;
  .create-product-variation-button {
    right: 0;
    width: 100%;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: $main-link-color;
    border-radius: 4px;
    color: $content-background-color;
    font-size: 14px;
    font-weight: 700;
    transition: 0.4s;
    margin-top: 20px;
    margin-bottom: 20px;
    cursor: pointer;
    span {
      user-select: none;
    }
    &:hover {
      background-color: rgba($color: $main-link-color, $alpha: 0.9);
      color: white;
    }

    &:active {
      background-color: rgba($color: $main-link-color, $alpha: 1);
      transform: scale(0.992);
    }
  }
}
</style>