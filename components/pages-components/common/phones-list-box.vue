<template>
  <div class="user-card-list">
    <div class="input">
      <input
        ref="input"
        type="text"
        @keypress="sendToList"
        onkeyup="this.value = this.value.replace(/[^\d,+]/g,'');"
      />
      <div class="button" @click="onItemAdding">
        <i class="dx-icon-add add-icon"></i>
      </div>
    </div>
    <div class="list-wrap" v-if="this.listData.length != 0">
      <DxList
        :data-source="listData"
        :height="140"
        :allow-item-deleting="true"
        item-delete-mode="static"
        @itemDeleted="itemDeleted"
      >
        <template #item="{ data: item }">
          <PhonesListBoxItem :item="item" />
        </template>
      </DxList>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

import { IPhones } from "../../../infrastructure/interfaces/IPhones";
import { Phones } from "../../../infrastructure/classes/Phones";

import DxTextBox from "devextreme-vue/text-box";
import DxList from "devextreme-vue/list";

import PhonesListBoxItem from "./phones-list-box-item.vue";

export default Vue.extend({
  components: {
    DxTextBox,
    DxList,
    PhonesListBoxItem,
  },
  props: {
    items: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    let phones: Phones = new Phones();
    return {
      phones,
      listData: [...this.items],
    };
  },
  methods: {
    itemDeleted(e) {
      this.$emit("itemDeleted", e.itemData.id);
    },
    onItemAdding() {
      if (this.$refs["input"].value) {
        this.phones.number = this.$refs["input"].value;

        this.listData.push(this.phones);
        this.$emit("phoneAdded", this.listData);
        this.$refs["input"].value = null;
        this.phones = new Phones();
      } else {
        console.log("INPUT IS EMPTY");
      }
    },
    sendToList(keyCode) {
      if (keyCode.charCode === 13 && this.$refs["input"].value) {
        this.phones.number = this.$refs["input"].value;

        this.listData.push(this.phones);
        this.$emit("phoneAdded", this.listData);
        this.$refs["input"].value = null;
        this.phones = new Phones();
      }
    },
  },
});
</script>

<style lang="scss">
.user-card-list {
  margin-top: 6px;
  .dx-scrollview-content {
    height: 32px !important;
    .dx-list-item {
      height: 32px !important;
      margin: 4px 0 0 0;
      border-radius: 4px;
      .dx-list-item-content {
        height: 32px !important;
        padding: 0 0 0 20px;
        width: 100%;
        p {
          margin-top: 7px;
        }
      }
      .dx-list-static-delete-button-container {
        margin-left: 20px !important;
      }
    }
  }
}
.input {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 36px;
  height: 36px;
  // margin-bottom: 20px;
  input {
    width: 90%;
    border: none;
    outline: none;
    background-color: $content-background-color;
    height: 100%;
    border-radius: 4px;
    padding: 4px 10px;
    color: $main-text-color;
    font-size: 16px;
  }
  .button {
    width: 26px;
    height: 26px;
    border-radius: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: $main-button-color;
    color: $body-background-color;
    transition: 0.4s;
    cursor: pointer;
    &:hover {
      background-color: rgba($color: $main-button-color, $alpha: 0.9);
      color: white;
    }
    &:active {
      background-color: rgba($color: $main-button-color, $alpha: 1);
      transform: scale(0.96);
    }
  }
}
.list-wrap {
  border: 2px solid #e3e3e3;
  border-radius: 4px;
  padding: 6px;
}
</style>