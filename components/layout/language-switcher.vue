<template>
  <div class="my-lang-switcher">
    <div class="my-current-lang-icon-wrapper" @click="openLangs">
      <img
        :src="currentLangImage"
        alt="current-lang-image"
        class="my-current-lang-icon"
      />
    </div>
    <div class="my-langs-list-wrapper" ref="myLangsList">
      <div
        class="my-lang-btn"
        v-for="(lang, index) in langs"
        :key="index"
        @click="setLocale(lang.code)"
      >
        <img
          class="my-lang-icon"
          :src="`/icons/flag/${lang.iso}.png`"
          alt="lang-image"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

import { locale, loadMessages } from "devextreme/localization";
import tk from "../../lang/devextreme-localization/tk.json";
import en from "../../lang/devextreme-localization/en.json";

export default Vue.extend({
  computed: {
    currentLang() {
      return this.$i18n.locales.find(
        (lang) => lang.code === this.$i18n.loadedLanguages[0]
      );
    },
    currentLangImage() {
      return `/icons/flag/${this.currentLang.iso}.png`;
    },
    langs() {
      let langs = [];
      for (let i = 0; i < this.$i18n.locales.length; i++) {
        if (this.$i18n.locales[i].iso !== this.currentLang.iso) {
          langs.push(this.$i18n.locales[i]);
        }
      }
      return langs;
    },
  },
  methods: {
    openLangs(event) {
      this.$refs.myLangsList.classList.toggle("opened-langs-list");
    },
    setLocale(lang) {
      if (this.currentLang.code !== lang) {
        this.$i18n.setLocale(lang);
        // loadMessages(lang);
        // locale(this.$i18n.locale);
        window.location.reload();
      }
    },
    setDevExtremeLocale() {
      if (this.currentLang.code === "tk") {
        loadMessages(tk);
      } else if (this.currentLang.code === "en") {
        loadMessages(en);
      }
      locale(this.$i18n.locale);
    },
  },
  mounted() {
    this.setDevExtremeLocale();
  },
});
</script>

<style lang="scss">
.my-lang-switcher {
  position: relative;
  margin-right: 15px;
  .my-current-lang-icon-wrapper {
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: $content-background-color;
    border-radius: 4px;
    transition: 0.2s;
    &:hover {
      background-color: #e8e8e8;
    }
    &:active {
      transform: scale(0.96);
    }
    .my-current-lang-icon {
      width: 20px;
    }
  }
  .my-langs-list-wrapper {
    width: 40px;
    height: 100px;
    position: absolute;
    top: 110%;
    background-color: #e8e8e8;
    border-radius: 4px;
    z-index: 0;
    opacity: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    .my-lang-btn {
      width: 40px;
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #e8e8e8;
      border-radius: 4px;
      transition: 0.2s;
      &:hover {
        background-color: $content-background-color;
      }
      img {
        width: 20px;
      }
    }
  }
  .opened-langs-list {
    z-index: 100;
    opacity: 1;
  }
}
</style>