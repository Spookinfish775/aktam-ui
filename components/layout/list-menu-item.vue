<template>
  <div class="my-list-menu-item">
    <nuxt-link class="my-navigation-link" :to="item.to">
      <span :class="`mdi ${item.icon} my-icon`"></span>
      <p class="item-text">{{ item.text }}</p>
    </nuxt-link>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  props: {
    item: {
      type: Object,
      required: true,
      default: {},
    },
  },
});
</script>

<style lang="scss">
.my-icon {
  &::before {
    font-size: 24px;
    color: $second-text-color;
  }
}
.my-list-menu-item {
  width: 100%;
  padding: 0;
  .my-navigation-link {
    display: flex;
    align-items: center;
    border-radius: 4px !important;
    padding-left: 12px;
    height: 48px;

    .item-text {
      margin-left: 14px;
      font-size: 16px;
      font-weight: 500;
      color: $second-text-color;
    }
  }
}
</style>