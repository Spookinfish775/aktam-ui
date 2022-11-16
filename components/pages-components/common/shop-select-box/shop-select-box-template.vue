<template>
  <div>
    <DxSelectBox
      :data-source="shopsData"
      displayExpr="nameRu"
      valueExpr="this"
      :searchEnabled="true"
      :searchExpr="`${'nameRu' || 'nameEn' || 'nameTm'}`"
      placeholder="Выбор магазина"
      @valueChanged="valueChanged"
      :showDropDownButton="showDropDownButton"
      :showClearButton="true"
      :value="value"
      :disabled="disabled"
    >
      <template #item="{ data }">
        <SelectBoxItem :item-data="data" />
      </template>
    </DxSelectBox>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

import DataSource from "devextreme/data/data_source";
import DxSelectBox from "devextreme-vue/select-box";
import DxTextBox from "devextreme-vue/text-box";

import SelectBoxItem from "./shop-select-box-item.vue";

export default Vue.extend({
  components: {
    DxSelectBox,
    DxTextBox,
    SelectBoxItem,
  },
  props: {
    shopId: {
      type: String,
      default: null,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    showDropDownButton: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      value: this.shopId,
      shopsData: new DataSource({
        store: this.$dxStore({
          key: "id",
          loadUrl: this.$dataApi.shop,
        }),
      }),
    };
  },
  methods: {
    valueChanged(data) {
      if (data.value) {
        this.$emit("shopIdChanged", data.value.id);
      } else {
        this.$emit("shopIdChanged", data.value);
      }
    },
  },
});
</script>