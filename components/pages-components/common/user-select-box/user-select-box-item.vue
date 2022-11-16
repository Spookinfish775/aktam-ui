<template>
  <div class="custom-item">
    <img class="item-image" :src="getImage(itemData)" alt="user-avatar" />
    <div class="item-name">
      {{ itemData.fullName }}
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

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

      if (data.image !== null) {
        return `${SERVER_URL}/${data.image.directoryCompressed}`;
      } else {
        return "/admin/user.png";
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