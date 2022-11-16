<template>
  <nuxt-link
    :to="`/admin/products-and-services/products/${productData.slug}`"
    class="small-product-card"
  >
    <div
      class="discount-icon"
      v-if="productData.personalCharacteristics[0].discountPrice !== null"
    >
      <span class="mdi mdi-percent-outline"></span>
    </div>

    <div class="image-wrapper">
      <img
        :src="`${serverUrl}/${productData.images[0].directoryOriginal}`"
        alt="product-photo"
      />
    </div>
    <div class="info-wrapper">
      <h4 class="name">{{ productData.nameRu }}</h4>
      <h4 class="price">{{ getPrice() }}</h4>
      <h4 class="characteristic">
        <span class="characteristic-name">
          {{ productData.namePersonalCharacteristics }}
        </span>
        <span class="characteristic-value">
          {{ productData.personalCharacteristics[0].value }}
        </span>
      </h4>
      <h4 class="count">
        <!-- {{ productData }} -->
      </h4>
    </div>
  </nuxt-link>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  props: {
    productData: {
      type: Object,
      required: true,
    },
  },
  computed: {
    serverUrl() {
      const { SERVER_URL } = process.env;
      return SERVER_URL;
    },
  },
  methods: {
    getPrice() {
      let price = this.productData.personalCharacteristics[0];
      if (price.discountPrice) {
        return price.discountPrice;
      } else {
        return price.price;
      }
    },
  },
});
</script>

<style lang="scss">
.small-product-card {
  background-color: $content-background-color;
  border-radius: 20px;
  padding: 10px;
  margin: 6px;
  width: 210px;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: 0.3s;
  position: relative;
  &:hover {
    background-color: $card-backgroud-blue-color;
    cursor: pointer;
    .image-wrapper {
      transform: scale(0.99);
    }
    .info-wrapper {
      transform: scale(0.98);
    }
  }
  .discount-icon {
    position: absolute;
    z-index: 1;
    bottom: 8px;
    right: 8px;
    width: 26px;
    height: 26px;
    border-radius: 100%;
    background-color: $main-link-color;
    display: flex;
    justify-content: center;
    align-items: center;
    color: $user-card-background-color;
  }
  .image-wrapper {
    height: 200px;
    width: 100%;
    border-radius: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 0.3s;
    img {
      max-width: 100%;
      max-height: 100%;
      border-radius: 20px;
    }
  }
  .info-wrapper {
    width: 100%;
    margin-top: 10px;
    transition: 0.3s;
    .name {
      word-break: break-word;
      width: 100%;
      font-size: 14px;
      font-weight: 400;
      color: $second-text-color;
    }
    .price {
      font-size: 16px;
      font-weight: 700;
      color: $main-text-color;
    }
    .characteristic-name {
      color: $second-text-color;
    }
    .characteristic-value {
      color: $main-button-color;
    }
    .count {
      font-size: 14px;
      font-weight: 500;
    }
  }
}
</style>