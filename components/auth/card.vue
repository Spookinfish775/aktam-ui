<template>
  <div class="auth-fowm-wrapper">
    <div class="logo">
      <img src="/admin/logo.svg" alt="aktam-logo" />
    </div>
    <div class="form-wrapper">
      <h3 class="form-title">{{ $t("labels.authPage.title") }}</h3>
      <DxForm ref="authForm" :form-data.sync="authData">
        <DxSimpleItem
          data-field="email"
          data-type="string"
          editor-type="dxTextBox"
          height="40px"
        >
          <DxRequiredRule :message="$t('labels.ruleErrors.basic')" />
          <DxLabel :text="$t('labels.authPage.login')" />
        </DxSimpleItem>
        <DxSimpleItem
          data-field="password"
          data-type="string"
          editor-type="dxTextBox"
          height="40px"
        >
          <DxRequiredRule :message="$t('labels.ruleErrors.basic')" />
          <DxLabel :text="$t('labels.authPage.password')" />
        </DxSimpleItem>
      </DxForm>
      <div class="remember-me">
        <DxCheckBox
          v-model="rememberMe"
          :text="$t('labels.authPage.rememberMe')"
        />
      </div>
      <div class="save-button" @click="authUser">
        <span>{{ $t("labels.authPage.signIn") }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

import { routes } from "../../routes";

import DxForm, {
  DxGroupItem,
  DxSimpleItem,
  DxButtonItem,
  DxLabel,
  DxEmailRule,
  DxRequiredRule,
  DxCompareRule,
} from "devextreme-vue/form";
import { DxCheckBox } from "devextreme-vue/check-box";

export default Vue.extend({
  components: {
    DxForm,
    DxGroupItem,
    DxSimpleItem,
    DxButtonItem,
    DxLabel,
    DxEmailRule,
    DxRequiredRule,
    DxCompareRule,
    DxCheckBox,
  },
  data() {
    return {
      authData: {},
      rememberMe: false,
    };
  },
  methods: {
    async authUser() {
      let result = this.$refs["authForm"].instance.validate();

      if (result.isValid) {
        this.authData.rememberMe = this.rememberMe;
        try {
          await this.$store.dispatch("auth/login", this.authData);

          this.$router.push(routes.home);
        } catch (error) {
          console.log(error);
        }
      }
    },
  },
});
</script>

<style lang="scss">
.auth-fowm-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 80px;
  .form-wrapper {
    margin-top: 50px;
    width: 340px;
    padding: 30px;
    background-color: $content-background-color;
    border-radius: 20px;
    .form-title {
      text-align: center;
      font-size: 16px !important;
      font-weight: 700 !important;
      margin: 0 0 40px 0;
    }
    .dx-texteditor-container {
      background-color: $body-background-color;
    }
    .dx-textbox {
      height: 40px;
      margin-top: 6px;
    }
    .dx-field-item-label-text {
      font-weight: 500;
      font-size: 14px;
    }
    .remember-me {
      margin-top: 10px;
    }
    .save-button {
      width: 100%;
      height: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: $main-button-color;
      border-radius: 4px;
      color: $content-background-color;
      font-size: 14px;
      font-weight: 700;
      transition: 0.4s;
      margin: 40px 0 0 0;
      cursor: pointer;
      &:hover {
        background-color: rgba($color: $main-button-color, $alpha: 0.9);
        color: white;
      }
      &:active {
        background-color: rgba($color: $main-button-color, $alpha: 1);
        transform: scale(0.992);
      }
    }
  }
}
</style>