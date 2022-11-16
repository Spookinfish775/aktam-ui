<template>
  <div class="social-medias-list">
    <div class="social-media-adding-button" @click="showSocialAddingForm">
      <span>{{ $t("labels.buttons.add") }}</span>
    </div>
    <BasePopup
      ref="social-media-popup"
      width="30vw"
      height="40vh"
      :showTitle="true"
      :title="$t('shopPage.shopCard.addingSocialMedia')"
      :shading="true"
    >
      <DxForm ref="social-media-form" :form-data.sync="socialMedias">
        <DxSimpleItem
          data-field="socialMediaType"
          editor-type="dxSelectBox"
          :editor-options="socialMediaTypeOptions"
        >
          <DxLabel :text="$t('shopPage.shopCard.socialMediaType')" />
        </DxSimpleItem>
        <DxSimpleItem data-field="url" editor-type="dxTextBox">
          <DxLabel :text="$t('shopPage.shopCard.socialMediaUrl')" />
        </DxSimpleItem>
        <DxButtonItem
          :button-options="saveButtonOptions"
          horizontalAlignment="center"
        />
      </DxForm>
    </BasePopup>
    <div class="list-wrap" v-if="this.listData.length != 0">
      <DxList
        :data-source="listData"
        :height="140"
        :allow-item-deleting="true"
        item-delete-mode="static"
        @itemDeleted="itemDeleted"
      >
        <template #item="{ data: item }">
          <div class="social-list-box-item">
            <p>{{ item.url }}</p>
            <button class="social-edit-button" @click="editItem(item)">
              <span :class="`mdi mdi-pencil `"></span>
            </button>
          </div>
        </template>
      </DxList>
    </div>
    <BasePopup
      ref="update-social-media-popup"
      width="30vw"
      height="40vh"
      :showTitle="true"
      :title="$t('shopPage.shopCard.updateSocialMedia')"
      :shading="true"
    >
      <SocialMediasItemUpdate
        :itemData="selectedSocial"
        @socialUpdated="socialUpdated"
      />
    </BasePopup>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

import DxForm, {
  DxGroupItem,
  DxSimpleItem,
  DxButtonItem,
  DxLabel,
} from "devextreme-vue/form";
import DxButton from "devextreme-vue/button";
import DxList from "devextreme-vue/list";

import { SelectBoxPropertiesWithLocalData } from "../../../infrastructure/components-properties/SelectBox/SelectBoxPropertiesWithLocalData";
import { SocialMedias } from "../../../infrastructure/classes/SocialMedias";
import { SocialMediaTypes } from "../../../infrastructure/data-sources/SocialMediaTypes";
import { SocialMediaType } from "../../../infrastructure/enums/SocialMediaType";

import BasePopup from "../../../components/global-components/popup.vue";
import SocialMediasItemUpdate from "./social-medias-item-update.vue";

export default Vue.extend({
  components: {
    DxForm,
    DxGroupItem,
    DxSimpleItem,
    DxButtonItem,
    DxLabel,
    DxButton,
    DxList,
    BasePopup,
    SocialMediasItemUpdate,
  },
  props: {
    items: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    let socialMedias: SocialMedias = new SocialMedias();
    return {
      socialMedias,
      listData: [...this.items],
      selectedSocial: null,
    };
  },
  computed: {
    socialMediaTypeOptions() {
      return new SelectBoxPropertiesWithLocalData({
        dataSource: SocialMediaTypes(this),
        showClearButton: false,
        placeholder: "Выбор социальной сети",
      });
    },
    saveButtonOptions() {
      return {
        text: this.$t("labels.buttons.save"),
        type: "default",
        onClick: () => {
          this.onSave();
        },
      };
    },
  },
  methods: {
    socialUpdated() {
      this.$refs["update-social-media-popup"].close();
    },
    editItem(item) {
      this.selectedSocial = item;
      this.$refs["update-social-media-popup"].open();
    },
    itemDeleted(e) {
      this.$emit("itemDeleted", e.itemData.id);
    },
    showSocialAddingForm() {
      this.$refs["social-media-popup"].open();
    },
    onSave() {
      this.listData.push(this.socialMedias);
      this.$emit("socialMediaAdded", this.listData);
      this.$refs["social-media-popup"].close();

      this.socialMedias = null;
    },
  },
});
</script>

<style lang="scss">
.socialMediaItemTitle {
  font-weight: 700;
}
.list-wrap {
  border: 2px solid #e3e3e3;
  border-radius: 4px;
  padding: 6px;
}
.social-media-adding-button {
  width: 100%;
  height: 36px;
  margin-top: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: $main-button-color;
  border-radius: 4px;
  color: $content-background-color;
  font-size: 14px;
  font-weight: 700;
  transition: 0.4s;
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

.social-list-box-item {
  position: relative;
  p {
    font-size: 16px;
    font-weight: 500;
  }
  .social-edit-button {
    z-index: 10;
    position: absolute;
    width: 40px;
    height: 40px;
    right: -16px;
    top: 50%;
    transform: translate(-50%, -50%);
    border: none;
    color: $main-link-color;
    background-color: inherit;
    font-size: 18px;
    outline: none;
    border-radius: 10px;
    transition: 0.3s;
    &:hover {
      background-color: rgba($color: $main-link-color, $alpha: 0.2);
    }
  }
}
</style>