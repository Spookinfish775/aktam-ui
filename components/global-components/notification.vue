<template>
  <div>
    <DxToast
      :visible="isVisible"
      :type="type"
      :message="message"
      :display-time="displayTime"
    >
      <DxPosition
        offset="-20 -20"
        my="right bottom"
        at="right bottom"
        of="#root"
      />
    </DxToast>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

import { DxButton } from "devextreme-vue/button";
import { DxToast, DxPosition } from "devextreme-vue/toast";

export default Vue.extend({
  components: {
    DxToast,
    DxPosition,
    DxButton,
  },
  data() {
    return {
      isVisible: false,
      type: "info",
      message: "",
      displayTime: 3000,
    };
  },
  methods: {
    showMessage({ text, type }) {
      this.isVisible = true;
      this.message = text;
      this.type = type;
      setTimeout(() => {
        this.isVisible = false;
      }, 2600);
    },
  },
});
</script>

<style lang="scss">
</style>