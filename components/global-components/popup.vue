<template>
  <div v-if="visible">
    <DxPopup
      :width="width"
      :height="height"
      :showTitle="showTitle"
      :title="title"
      :close-on-outside-click="closeOnOutsideClick"
      :visible.sync="visible"
      :deferRendering="deferRendering"
      :disabled="disabled"
      :dragEnabled="dragEnabled"
      :focusStateEnabled="focusStateEnabled"
      :fullScreen="fullScreen"
      :hint="hint"
      :hoverStateEnabled="hoverStateEnabled"
      :maxHeight="maxHeight"
      :maxWidth="maxWidth"
      :minHeight="minHeight"
      :minWidth="minWidth"
      :position="position"
      :resizeEnabled="resizeEnabled"
      :shading="shading"
      shading-color="rgba(235, 238, 246, 0.96)"
      :showCloseButton="showCloseButton"
      :tabIndex="tabIndex"
      @hiding="close"
    >
      <DxScrollView :use-native="true">
        <slot> </slot>
      </DxScrollView>
    </DxPopup>
  </div>
</template>

<script>
import Vue from "vue";
import { DxPopup } from "devextreme-vue/popup";
import { DxScrollView } from "devextreme-vue/scroll-view";

export default Vue.extend({
  components: {
    DxPopup,
    DxScrollView,
  },
  props: {
    closeOnOutsideClick: { type: Boolean, default: false },
    deferRendering: { type: Boolean, default: true },
    disabled: { type: Boolean, default: false },
    dragEnabled: { type: Boolean, default: false },
    focusStateEnabled: { type: Boolean, default: true },
    fullScreen: { type: Boolean, default: false },
    hoverStateEnabled: { type: Boolean, default: false },
    showTitle: { type: Boolean, default: true },
    resizeEnabled: { type: Boolean, default: false },
    shading: { type: Boolean, default: true },
    showCloseButton: { type: Boolean, default: true },
    hint: { type: String, default: undefined },
    title: { type: String, default: "" },
    tabIndex: { type: Number, default: 0 },
    width: { default: null },
    height: { default: null },
    maxHeight: { default: null },
    maxWidth: { default: null },
    minHeight: { default: null },
    minWidth: { default: null },
    position: {
      default: () => {
        return { my: "center", at: "center", of: window };
      },
    },
  },
  popupController: { resolve: null, reject: null },
  data() {
    return {
      visible: false,
    };
  },
  methods: {
    open() {
      this.visible = true;
      const popupPromise = new Promise((ok, fail) => {
        this.$options.popupController.resolve = ok;
        this.$options.popupController.reject = fail;
      });
      return popupPromise;
    },
    close(data) {
      this.visible = false;
      this.$options.popupController.resolve(data);
    },
  },
});
</script>

<style lang="scss">
.dx-item-content {
  .dx-closebutton {
    background-color: $body-background-color;
    display: flex !important;
    justify-content: center !important;
    align-items: center !important;
    .dx-button-content {
      background-color: $second-link-color;
      padding: 0;
      margin: 0 !important;
      margin-top: 25%;
      width: 20px;
      height: 20px;
      border-radius: 100%;
      position: static !important;
      i {
        position: relative !important;
        color: white;
        font-size: 16px;
        display: flex;
        justify-content: center;
        align-items: center;
        &::before {
          position: absolute !important;
          bottom: 2px;
          right: 6px;
        }
      }
    }
  }
}
.dx-popup-normal {
  border-radius: 10px !important;
  background-color: $body-background-color !important;
  .dx-popup-title {
    background-color: $body-background-color;
    border-bottom: none !important;
    padding: 10px 18px 0 20px;
    .dx-toolbar-before {
      width: 90%;
      .dx-toolbar-label {
        .dx-toolbar-item-content {
          div {
            font-weight: 700;
          }
        }
      }
    }
  }
  .dx-popup-content {
    background-color: $body-background-color;
  }
}
</style>
