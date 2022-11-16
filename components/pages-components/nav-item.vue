<template>
  <nuxt-link class="catalogue-navigation-item" :to="item.to">
    <div class="nav-item">
      <span :class="`mdi ${item.icon} my-icon`"></span>
      <p class="item-text">{{ item.text }}</p>
    </div>
  </nuxt-link>
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
.catalogue-navigation-item {
  width: 100%;
  .nav-item {
    width: 100%;
    height: 60px;
    // border: 0.1px solid $main-link-color;
    border: 0.1px solid #dadada;
    border-radius: 4px;
    display: flex;
    align-items: center;
    transition: 0.4s;
    .my-icon::before {
      transition: 0.4s;
    }
    .my-icon {
      margin-left: 20px;
      transition: 0.4s;
    }
    .item-text {
      margin-left: 20px;
      font-size: 16px;
      font-weight: 500;
      transition: 0.4s;
    }
    &:hover {
      background-color: $main-link-color;
      .my-icon::before {
        color: $body-background-color !important;
      }
      .item-text {
        color: $body-background-color !important;
      }
    }
  }
}
</style>