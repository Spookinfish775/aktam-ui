<template>
  <div class="item-wrapper">
    <p class="item-value">{{ item.nameRu }} :</p>
    <p class="item-price">{{ item.valueRu }}</p>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  props: {
    item: {
      type: Object,
      default: null,
    },
  },
});
</script>

<style lang="scss" scoped>
.item-wrapper {
  padding-top: 6px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  .item-value {
    margin: 0 0 0 10px;
    font-weight: 700;
  }
  .item-price {
    margin: 0 0 0 10px;
    font-weight: 500;
    color: $main-button-color;
  }
}
</style>