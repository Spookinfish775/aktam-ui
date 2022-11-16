<template>
  <div class="custom-item">
    <img class="item-image" :src="getImage(itemData.images)" />
    <div class="item-name">
      {{ itemData.nameRu }}
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

import { ShopPhotoType } from "../../../../infrastructure/enums/ShopPhotoType";

export default Vue.extend({
  props: {
    itemData: {
      type: Object,
      required: true,
    },
  },
  methods: {
    getImage(data) {
      const { SERVER_URL } = process.env;
      let result = data.find(
        (item) => item.shopPhotoType == ShopPhotoType.Logo
      );
      if (result !== undefined) {
        return `${SERVER_URL}/${result.directoryThumbnails}`;
      } else {
        return "/admin/product.png";
      }
    },
  },
});
</script>

<style lang="scss">
.custom-item {
  display: flex;
  align-items: center;
  height: 48px;
  .item-image {
    margin: 0;
    width: 40px;
    border-radius: 10px;
  }
  .item-name {
    margin: 0 0 0 10px;
    font-size: 20px;
  }
}
</style>