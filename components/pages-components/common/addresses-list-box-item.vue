<template>
  <div class="address-list-box-item">
    <p>{{ item.nameRu }}</p>
    <button class="address-edit-button" @click="editItem">
      <span :class="`mdi mdi-pencil `"></span>
    </button>
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
  methods: {
    editItem() {
      this.$emit("editItem");
    },
  },
});
</script>
<style lang="scss">
.address-list-box-item {
  position: relative;
  p {
    font-size: 16px;
    font-weight: 500;
  }
  .address-edit-button {
    z-index: 10;
    position: absolute;
    width: 40px;
    height: 40px;
    right: -16px;
    top: 50%;
    transform: translate(-50%, -50%);
    border: none;
    color: $main-link-color;
    background-color: inherit;
    font-size: 18px;
    outline: none;
    border-radius: 10px;
    transition: 0.3s;
    &:hover {
      background-color: rgba($color: $main-link-color, $alpha: 0.2);
    }
  }
}
</style>