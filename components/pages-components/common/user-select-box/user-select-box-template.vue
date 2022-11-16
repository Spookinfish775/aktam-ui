<template>
  <div>
    <DxSelectBox
      :data-source="usersData"
      displayExpr="fullName"
      valueExpr="this"
      :searchEnabled="true"
      :searchExpr="`${'nameRu' || 'nameEn' || 'nameTm'}`"
      placeholder="Выбор пользователя"
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

import { UserRole } from "../../../../infrastructure/enums/UserRole";

import DataSource from "devextreme/data/data_source";
import DxSelectBox from "devextreme-vue/select-box";
import DxTextBox from "devextreme-vue/text-box";

import SelectBoxItem from "./user-select-box-item.vue";

export default Vue.extend({
  components: {
    DxSelectBox,
    DxTextBox,
    SelectBoxItem,
  },
  props: {
    userId: {
      type: String,
      default: null,
    },
    disabled: {
      type: Boolean,
      default: true,
    },
    showDropDownButton: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      value: this.userId,
      usersData: new DataSource({
        store: this.$dxStore({
          key: "id",
          loadUrl: this.$dataApi.users.userCRUD,
        }),
        filter: ["role", "=", `${UserRole.Saller}`],
      }),
    };
  },
  methods: {
    valueChanged(data) {
      if (data.value) {
        this.$emit("userIdChanged", data.value.id);
      } else {
        this.$emit("userIdChanged", data.value);
      }
    },
  },
});
</script>