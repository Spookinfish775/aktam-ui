<template>
  <div class="dx-viewport" id="root">
    <HeaderToolbar @toggleMenu="toggleMenu" />
    <DxDrawer
      id="navigation-menu-drawer"
      opened-state-mode="shrink"
      position="left"
      reveal-mode="slide"
      template="navigation-list"
      :opened="isActive"
      :close-on-outside-click="false"
    >
      <template #navigation-list>
        <div>
          <ListMenu />
        </div>
      </template>
      <div id="main-content-wrapper">
        <div class="main-content">
          <transition name="route">
            <nuxt />
          </transition>
        </div>
      </div>
    </DxDrawer>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

import DxDrawer from "devextreme-vue/drawer";

import HeaderToolbar from "~/components/layout/header-toolbar.vue";
import ListMenu from "~/components/layout/list-menu.vue";

export default Vue.extend({
  components: {
    DxDrawer,
    HeaderToolbar,
    ListMenu,
  },
  data() {
    const isActive: boolean = true;
    return {
      isActive,
    };
  },
  methods: {
    toggleMenu(): void {
      this.isActive = !this.isActive;
    },
  },
});
</script>

<style lang="scss">
#root {
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

#navigation-menu-drawer {
  .dx-drawer-panel-content {
    background-color: $body-background-color;
    width: 256px;
  }

  #main-content-wrapper {
    width: 98.8%;
    height: 90%;
    padding: 20px 20px 20px 30px;
    position: relative !important;
    overflow: hidden;
    background-color: $content-background-color;
    border-radius: 20px;
    .main-content {
      width: 100%;
      height: 100%;
      overflow-y: scroll;
      position: relative;
    }
    @include max($tablets) {
      padding: 15px 20px;
    }
    .route-enter-active,
    .route-leave-active {
      transition: opacity 0.6s;
    }
    .route-enter,
    .route-leave-to {
      opacity: 0;
    }
  }
}
</style>
