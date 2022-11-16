<template>
  <div>
    <p>{{ item.number }}</p>
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

<style lang="scss">
</style>