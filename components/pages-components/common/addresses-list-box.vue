<template>
  <div class="addresses-list">
    <div class="address-adding-button" @click="showAddingForm">
      <span>{{ $t("labels.buttons.add") }}</span>
    </div>
    <BasePopup
      ref="addresses-popup"
      width="30vw"
      height="50vh"
      :showTitle="true"
      :title="$t('userPage.userCard.contacts.addresses')"
      :shading="true"
    >
      <DxForm ref="addresses-form" :form-data.sync="addresses">
        <DxSimpleItem
          data-field="nameRu"
          data-type="string"
          editor-type="dxTextBox"
        >
          <DxLabel :text="$t('labels.addresses.addressRu')" />
        </DxSimpleItem>
        <DxSimpleItem
          data-field="nameEn"
          data-type="string"
          editor-type="dxTextBox"
        >
          <DxLabel :text="$t('labels.addresses.addressEn')" />
        </DxSimpleItem>
        <DxSimpleItem
          data-field="nameTm"
          data-type="string"
          editor-type="dxTextBox"
        >
          <DxLabel :text="$t('labels.addresses.addressTm')" />
        </DxSimpleItem>
        <DxSimpleItem
          data-field="coordinates"
          data-type="string"
          editor-type="dxTextBox"
        >
          <DxLabel :text="$t('labels.addresses.coordinates')" />
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
          <AddressesListBoxItem :item="item" @editItem="editItem(item)" />
        </template>
      </DxList>
    </div>
    <BasePopup
      ref="update-addresses-popup"
      width="30vw"
      height="50vh"
      :showTitle="true"
      :title="$t('userPage.userCard.contacts.addresses')"
      :shading="true"
    >
      <AddressesItemUpdate
        :itemData="selectedAddress"
        @addressUpdated="addressUpdated"
      />
    </BasePopup>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

import { IAddresses } from "../../../infrastructure/interfaces/IAddresses";
import { Addresses } from "../../../infrastructure/classes/Addresses";

import DxForm, {
  DxGroupItem,
  DxSimpleItem,
  DxButtonItem,
  DxLabel,
} from "devextreme-vue/form";
import DxButton from "devextreme-vue/button";
import DxList from "devextreme-vue/list";

import BasePopup from "../../../components/global-components/popup.vue";
import AddressesListBoxItem from "./addresses-list-box-item.vue";
import AddressesItemUpdate from "./addresses-item-update.vue";

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
    AddressesListBoxItem,
    AddressesItemUpdate,
  },
  props: {
    items: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    let addresses: IAddresses = new Addresses();
    return {
      addresses,
      listData: [...this.items],
      selectedAddress: null,
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
    addressUpdated(updatedItem) {
      this.$refs["update-addresses-popup"].close();
    },
    editItem(item) {
      this.selectedAddress = item;
      this.$refs["update-addresses-popup"].open();
    },
    itemDeleted(e) {
      this.$emit("itemDeleted", e.itemData.id);
    },
    showAddingForm() {
      this.$refs["addresses-popup"].open();
    },
    onSave() {
      this.listData.push(this.addresses);
      this.$emit("addressAdded", this.listData);
      this.$refs["addresses-popup"].close();
      this.addresses = null;
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
.address-adding-button {
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