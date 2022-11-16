<template>
  <div>
    <div
      class="charecteristic-adding-button"
      @click="showCharacteristicAddingForm"
    >
      <span>{{ $t("labels.buttons.add") }}</span>
    </div>
    <BasePopup
      ref="characteristics-popup"
      width="50vw"
      height="44vh"
      :showTitle="true"
      :title="$t('products.productCard.characteristics')"
      :shading="true"
    >
      <DxForm
        ref="characteristics-form"
        :form-data.sync="characteristics"
        :col-count="3"
      >
        <!-- CHARACTERISTIC RU -->
        <DxSimpleItem :col-span="1" data-field="nameRu" editor-type="dxTextBox">
          <DxLabel :text="$t('products.productCard.nameRu')" />
        </DxSimpleItem>
        <DxSimpleItem
          :col-span="2"
          data-field="valueRu"
          editor-type="dxTextBox"
        >
          <DxLabel :text="$t('products.productCard.descriptionRu')" />
        </DxSimpleItem>
        <!-- CHARACTERISTIC RU -->

        <!-- CHARACTERISTIC EN -->
        <DxSimpleItem :col-span="1" data-field="nameEn" editor-type="dxTextBox">
          <DxLabel :text="$t('products.productCard.nameEn')" />
        </DxSimpleItem>
        <DxSimpleItem
          :col-span="2"
          data-field="valueEn"
          editor-type="dxTextBox"
        >
          <DxLabel :text="$t('products.productCard.descriptionEn')" />
        </DxSimpleItem>
        <!-- CHARACTERISTIC EN -->

        <!-- CHARACTERISTIC TM -->
        <DxSimpleItem :col-span="1" data-field="nameTm" editor-type="dxTextBox">
          <DxLabel :text="$t('products.productCard.nameTm')" />
        </DxSimpleItem>
        <DxSimpleItem
          :col-span="2"
          data-field="valueTm"
          editor-type="dxTextBox"
        >
          <DxLabel :text="$t('products.productCard.descriptionTm')" />
        </DxSimpleItem>
        <!-- CHARACTERISTIC TM -->

        <DxButtonItem
          :col-span="3"
          :button-options="saveButtonOptions"
          horizontalAlignment="center "
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
          <CharacteristicListBoxItem :item="item" />
        </template>
      </DxList>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

import { CharacteristicOfProduct } from "../../../../../infrastructure/classes/CharacteristicOfProduct";

import DxForm, {
  DxGroupItem,
  DxSimpleItem,
  DxButtonItem,
  DxLabel,
} from "devextreme-vue/form";
import DxButton from "devextreme-vue/button";
import DxList from "devextreme-vue/list";

import BasePopup from "../../../../../components/global-components/popup.vue";
import CharacteristicListBoxItem from "./charcteristic-list-box-item.vue";

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
    CharacteristicListBoxItem,
  },
  props: {
    items: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    let characteristics: CharacteristicOfProduct =
      new CharacteristicOfProduct();
    return {
      characteristics,
      listData: [...this.items],
    };
  },
  computed: {
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
    itemDeleted(e) {
      this.$emit("itemDeleted", e.itemData.id);
    },
    showCharacteristicAddingForm() {
      this.$refs["characteristics-popup"].open();
    },
    onSave() {
      this.listData.push(this.characteristics);
      this.$emit("characteristicAdded", this.listData);
      this.$refs["characteristics-popup"].close();
      this.characteristics = new CharacteristicOfProduct();
    },
  },
});
</script>

<style lang="scss">
.list-wrap {
  border: 2px solid #e3e3e3;
  border-radius: 4px;
  padding: 6px;
}
.charecteristic-adding-button {
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
</style>