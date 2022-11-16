<template>
  <div>
    <p v-for="(item, index) in categoryData" :key="index">
      {{ item.nameRu }}
    </p>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  props: {
    categoryData: {
      type: Array,
      required: true,
    },
  },
});
</script>
