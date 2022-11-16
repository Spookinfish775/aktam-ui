<template>
  <div>
    <div
      class="personal-charecteristic-adding-button"
      @click="showPersonalCharacteristicAddingForm"
    >
      <span>{{ $t("labels.buttons.add") }}</span>
    </div>
    <BasePopup
      ref="personal-characteristics-popup"
      width="40vw"
      height="50vh"
      :showTitle="true"
      :title="$t('products.productCard.personalCharacteristics')"
      :shading="true"
    >
      <DxForm
        ref="personal-characteristic-form"
        :form-data.sync="personalCharacteristics"
      >
        <DxSimpleItem data-field="value" editor-type="dxTextBox">
          <DxLabel
            :text="
              $t('products.productCard.personalCharacteristicObject.value')
            "
          />
        </DxSimpleItem>
        <DxSimpleItem data-field="priceBonus" editor-type="dxNumberBox">
          <DxLabel
            :text="
              $t('products.productCard.personalCharacteristicObject.priceBonus')
            "
          />
        </DxSimpleItem>
        <DxSimpleItem data-field="price" editor-type="dxNumberBox">
          <DxLabel
            :text="
              $t('products.productCard.personalCharacteristicObject.price')
            "
          />
        </DxSimpleItem>
        <DxSimpleItem data-field="discountPrice" editor-type="dxNumberBox">
          <DxLabel
            :text="
              $t(
                'products.productCard.personalCharacteristicObject.discountPrice'
              )
            "
          />
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
          <PersonalCharacteristicListBoxItem :item="item" />
        </template>
      </DxList>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

import { PersonalCharacteristicOfProduct } from "../../../../../infrastructure/classes/PersonalCharacteristicOfProduct";

import DxForm, {
  DxGroupItem,
  DxSimpleItem,
  DxButtonItem,
  DxLabel,
} from "devextreme-vue/form";
import DxButton from "devextreme-vue/button";
import DxList from "devextreme-vue/list";

import BasePopup from "../../../../../components/global-components/popup.vue";
import PersonalCharacteristicListBoxItem from "./personal-characteristic-list-box-item.vue";

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
    PersonalCharacteristicListBoxItem,
  },
  props: {
    items: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    let personalCharacteristics: PersonalCharacteristicOfProduct =
      new PersonalCharacteristicOfProduct();
    return {
      personalCharacteristics,
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
    showPersonalCharacteristicAddingForm() {
      this.$refs["personal-characteristics-popup"].open();
    },
    onSave() {
      this.listData.push(this.personalCharacteristics);
      this.$emit("personalCharacteristicAdded", this.listData);
      this.$refs["personal-characteristics-popup"].close();
      this.personalCharacteristics = new PersonalCharacteristicOfProduct();
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
.personal-charecteristic-adding-button {
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