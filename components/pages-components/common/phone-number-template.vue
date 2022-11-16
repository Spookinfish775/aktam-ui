<template>
  <div>
    <p v-for="(item, index) in phoneData" :key="index">
      {{ item.number }}
    </p>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  props: {
    phoneData: {
      type: Array,
      required: true,
    },
  },
});
</script>
