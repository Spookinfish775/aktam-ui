<template>
  <header>
    <DxToolbar class="my-toolbar">
      <DxItem location="before" template="logo" />
      <template #logo>
        <nuxt-link no-prefetch :to="routes.home">
          <img class="ak-tam-logo" src="/admin/logo.png" alt="" />
        </nuxt-link>
      </template>
      <DxItem location="after" template="lang-selector" />
      <template #lang-selector>
        <LanguageSwitcher />
      </template>
      <DxItem location="after" template="avatar" />
      <template #avatar>
        <div class="my-avatar">
          <img :src="getImage()" alt="userAvatar" />
          <div class="menu">
            <div class="item">
              <DxButton
                type="success"
                icon="arrowright"
                :text="$t('labels.buttons.logout')"
                @click="logout"
              />
            </div>
          </div>
        </div>
      </template>
    </DxToolbar>
  </header>
</template>

<script lang="ts">
import Vue from "vue";

import DxToolbar, { DxItem } from "devextreme-vue/toolbar";
import DxButton from "devextreme-vue/button";

import LanguageSwitcher from "~/components/layout/language-switcher.vue";
import { routes } from "../../routes";

export default Vue.extend({
  components: {
    DxToolbar,
    DxItem,
    DxButton,
    LanguageSwitcher,
  },
  data() {
    return {
      routes,
    };
  },
  computed: {
    userInfo() {
      return this.$store.getters["auth/user"];
    },
  },
  methods: {
    getImage() {
      const { SERVER_URL } = process.env;
      if (this.userInfo.image !== null) {
        return `${SERVER_URL}/${this.userInfo.image.directoryThumbnails}`;
      } else {
        return "/admin/user.png";
      }
    },
    logout() {
      this.$router.push("/admin/auth");
      setTimeout(() => {
        this.$store.dispatch("auth/logout");
      }, 500);
    },
  },
});
</script>

<style lang="scss">
.ak-tam-logo {
  width: 152px;
}
header {
  padding: 0 20px 0 40px;
  min-height: 80px;
  display: flex;
  align-items: center;
  .my-toolbar {
    background-color: $body-background-color;
    .my-avatar {
      width: 40px;
      height: 40px;
      background-color: $main-link-color;
      position: relative;
      border-radius: 100%;
      &:hover {
        .menu {
          opacity: 1;
          z-index: 10;
        }
      }
      img {
        border-radius: 100%;
        width: 100%;
      }
      .menu {
        position: absolute;
        padding: 6px;
        border-radius: 10px;
        background-color: $card-backgroud-blue-color;
        z-index: 20;
        top: 120%;
        right: 0%;
        opacity: 0;
        z-index: -1;
        transition: 0.3s;
        .item {
          margin: 5px;
          .dx-button-text {
            font-size: 14px;
          }
        }
      }
    }
  }
}
</style>